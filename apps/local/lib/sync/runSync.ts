import type { ReadableStream as NodeReadableStream } from "stream/web";
import fs from "fs";
import os from "os";
import path from "path";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import Database from "better-sqlite3";
import mime from "mime-types";
import supabase from "@/api/supabase/client";

const BUCKET = "lesson-files";
const LOCAL_DIR =
  process.env.LOCAL_FILES_DIR ?? path.join(os.homedir(), "rose-files");

type DB = InstanceType<typeof Database>;
type SyncRunStatus = "requested" | "in_progress" | "success" | "failed";

type Group = { id: number; name: string; join_code: string | null };
type Lesson = {
  id: number;
  name: string;
  description: string | null;
  image_path: string | null;
  group_id: number;
};
type FileRow = {
  id: number;
  name: string;
  size_bytes: number | null;
  storage_path: string | null;
  lesson_id: number | null;
};

type CloudSyncRunId = string | number;

type RunSyncOptions = {
  syncRunId?: CloudSyncRunId;
};

function createSchema(db: DB) {
  const tableSchemaSql = [
    `CREATE TABLE IF NOT EXISTS groups (
      id INTEGER PRIMARY KEY,
      name TEXT,
      join_code TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT,
      image_path TEXT,
      group_id INTEGER,
      FOREIGN KEY (group_id) REFERENCES groups(id)
    )`,
    `CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY,
      name TEXT,
      size_bytes INTEGER,
      storage_path TEXT,
      lesson_id INTEGER,
      FOREIGN KEY (lesson_id) REFERENCES lessons(id)
    )`,
    `CREATE TABLE IF NOT EXISTS sync_runs (
      id INTEGER PRIMARY KEY,
      started_at TEXT NOT NULL,
      finished_at TEXT,
      status TEXT NOT NULL
    )`,
  ];

  for (const sql of tableSchemaSql) {
    db.prepare(sql).run();
  }

  try {
    db.prepare(`ALTER TABLE lessons ADD COLUMN description TEXT`).run();
  } catch {}

  try {
    db.prepare(`ALTER TABLE files ADD COLUMN mime_type TEXT`).run();
  } catch {}

  try {
    db.prepare(`ALTER TABLE files ADD COLUMN local_path TEXT`).run();
  } catch {}
}

async function fetchFromSupabase(): Promise<{
  groups: Group[];
  lessons: Lesson[];
  files: FileRow[];
}> {
  console.log("[SYNC] Fetching groups, lessons, and files from Supabase");
  const { data: groups, error: groupError } = await supabase
    .from("Groups")
    .select("*");
  const { data: lessons, error: lessonError } = await supabase
    .from("Lessons")
    .select("*");
  const { data: files, error: fileError } = await supabase
    .from("Files")
    .select("*");

  if (groupError || lessonError || fileError) {
    throw new Error("Error fetching data from Supabase");
  }
  console.log("[SYNC] Supabase fetch complete:", {
    groups: groups?.length ?? 0,
    lessons: lessons?.length ?? 0,
    files: files?.length ?? 0,
  });
  return {
    groups: groups ?? [],
    lessons: lessons ?? [],
    files: files ?? [],
  };
}

function insertIntoSQLite(
  db: DB,
  groups: Group[],
  lessons: Lesson[],
  files: FileRow[],
) {
  const insertGroups = db.transaction((rows: Group[]) => {
    const stmt = db.prepare(
      "INSERT OR REPLACE INTO groups (id, name, join_code) VALUES (?, ?, ?)",
    );
    for (const r of rows) stmt.run(r.id, r.name, r.join_code);
  });
  insertGroups(groups);

  const insertLessons = db.transaction((rows: Lesson[]) => {
    const stmt = db.prepare(
      "INSERT OR REPLACE INTO lessons (id, name, description, image_path, group_id) VALUES (?, ?, ?, ?, ?)",
    );
    for (const r of rows)
      stmt.run(r.id, r.name, r.description, r.image_path, r.group_id);
  });
  insertLessons(lessons);

  const insertFiles = db.transaction((rows: FileRow[]) => {
    const stmt = db.prepare(
      "INSERT OR REPLACE INTO files (id, name, size_bytes, storage_path, lesson_id) VALUES (?, ?, ?, ?, ?)",
    );
    for (const r of rows) {
      stmt.run(r.id, r.name, r.size_bytes, r.storage_path, r.lesson_id);
    }
  });
  insertFiles(files);
}

function storageUrlToKey(url: string, bucket: string): string {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const idx = url.indexOf(marker);

  if (idx === -1) {
    return url;
  }

  return url.slice(idx + marker.length);
}

async function downloadFiles(
  files: FileRow[],
  lessons: Lesson[],
  stagingDir: string,
) {
  console.log("[SYNC] Starting downloadFiles", {
    fileCount: files.length,
    stagingDir,
  });
  const lessonMap = new Map<number, string>();
  for (const lesson of lessons) {
    lessonMap.set(lesson.id, lesson.name);
  }

  const printedLessons = new Set<number>();

  console.log("Printing all lessons synced with at least one file...");

  for (const file of files) {
    if (!file.storage_path) continue;

    const lessonId = file.lesson_id ?? null;

    if (lessonId !== null && !printedLessons.has(lessonId)) {
      console.log(
        `Syncing lesson: "${lessonMap.get(lessonId) ?? "Unknown Lesson"}" (lesson_id=${lessonId})`,
      );
      printedLessons.add(lessonId);
    } else if (lessonId === null) {
      console.log(`Syncing file "${file.name}" with no lesson_id`);
    }

    const objectKey = storageUrlToKey(file.storage_path, BUCKET);

    const response = await fetch(file.storage_path);
    if (!response.ok || !response.body) {
      throw new Error(`Download failed for ${file.storage_path}`);
    }

    const stagedPath = path.join(stagingDir, objectKey);
    fs.mkdirSync(path.dirname(stagedPath), { recursive: true });

    try {
      const webStream =
        response.body as unknown as NodeReadableStream<Uint8Array>;
      const nodeReadable = Readable.fromWeb(webStream);

      await pipeline(nodeReadable, fs.createWriteStream(stagedPath));
    } catch (err) {
      throw new Error(`Streaming failed for ${file.storage_path}, ${err}`);
    }
  }
  console.log("[SYNC] downloadFiles complete");
}

let isSyncRunning = false;

export function getIsSyncRunning() {
  return isSyncRunning;
}

async function updateCloudSyncRun(
  syncRunId: CloudSyncRunId,
  payload: {
    status: SyncRunStatus;
    started_at?: string;
    completed_at?: string;
    error_message?: string | null;
  },
) {
  console.log("[SYNC] Updating cloud sync run:", { syncRunId, payload });

  const { error } = await supabase
    .from("sync_runs")
    .update(payload)
    .eq("id", syncRunId);

  if (error) {
    console.error("[SYNC] Failed updating cloud sync run:", error);
    throw error;
  }
}

export async function runSync({ syncRunId }: RunSyncOptions = {}) {
  console.log("[SYNC] Starting runSync", { syncRunId });
  if (isSyncRunning) {
    return {
      ok: false,
      message: "Sync already running",
    };
  }

  isSyncRunning = true;
  console.log("[SYNC] Marked sync as running");

  let stagingDir: string | null = null;
  let runId: number | bigint | undefined;
  let startedAt = "";
  let finishedAt = "";
  let db: DB | null = null;
  let cloudSyncStartedAt = "";

  try {
    fs.mkdirSync(LOCAL_DIR, { recursive: true });
    stagingDir = fs.mkdtempSync(path.join(os.tmpdir(), "rose-sync-"));

    console.log("[SYNC] Prepared directories:", {
      LOCAL_DIR,
      stagingDir,
    });

    const DB_PATH = path.join(process.cwd(), "rose-academies-uganda.db");

    db = new Database(DB_PATH);

    console.log("[SYNC] Opened SQLite DB:", DB_PATH);
    createSchema(db);
    console.log("[SYNC] SQLite schema ensured");
    startedAt = new Date().toISOString();

    if (syncRunId !== undefined) {
      console.log("[SYNC] Marking sync run in_progress:", syncRunId);
      cloudSyncStartedAt = new Date().toISOString();
      await updateCloudSyncRun(syncRunId, {
        status: "in_progress",
        started_at: cloudSyncStartedAt,
        error_message: null,
      });
    }

    const result = db
      .prepare("INSERT INTO sync_runs (started_at, status) VALUES (?, ?)")
      .run(startedAt, "running");

    runId = result.lastInsertRowid;
    console.log("[SYNC] Inserted local sync_runs row:", { runId, startedAt });

    const { groups, lessons, files } = await fetchFromSupabase();
    console.log("[SYNC] Received fetched data in runSync:", {
      groups: groups.length,
      lessons: lessons.length,
      files: files.length,
    });

    await downloadFiles(files, lessons, stagingDir);
    insertIntoSQLite(db, groups, lessons, files);
    console.log("[SYNC] Inserted groups, lessons, and files into SQLite");

    const updateStmt = db.prepare(
      "UPDATE files SET mime_type = ?, local_path = ? WHERE id = ?",
    );

    for (const file of files) {
      if (!file.storage_path) continue;

      const objectKey = storageUrlToKey(file.storage_path, BUCKET);
      const stagedPath = path.join(stagingDir, objectKey);
      const finalPath = path.join(LOCAL_DIR, objectKey);

      if (fs.existsSync(stagedPath)) {
        fs.mkdirSync(path.dirname(finalPath), { recursive: true });
        fs.copyFileSync(stagedPath, finalPath);
        fs.unlinkSync(stagedPath);

        const inferredMime =
          mime.lookup(file.name || finalPath) || "application/octet-stream";

        updateStmt.run(inferredMime, finalPath, file.id);
      }
    }

    fs.rmSync(stagingDir, { recursive: true, force: true });
    console.log("[SYNC] Removed staging directory:", stagingDir);

    finishedAt = new Date().toISOString();

    db.prepare(
      "UPDATE sync_runs SET finished_at = ?, status = ? WHERE id = ?",
    ).run(finishedAt, "success", runId);
    console.log("[SYNC] Marked local sync_runs row success:", {
      runId,
      finishedAt,
    });

    if (syncRunId !== undefined) {
      await updateCloudSyncRun(syncRunId, {
        status: "success",
        completed_at: finishedAt,
        error_message: null,
      });
    }
    console.log("[SYNC] runSync completed successfully");

    return {
      ok: true,
      message: "Data synchronized successfully",
      runId,
      startedAt,
      finishedAt,
      syncRunId,
    };
  } catch (error) {
    console.error("[SYNC] runSync failed:", error);

    if (stagingDir) {
      fs.rmSync(stagingDir, { recursive: true, force: true });
      console.log(
        "[SYNC] Removed staging directory after failure:",
        stagingDir,
      );
    }

    if (db && runId !== undefined) {
      finishedAt = new Date().toISOString();

      db.prepare(
        "UPDATE sync_runs SET finished_at = ?, status = ? WHERE id = ?",
      ).run(finishedAt, "failed", runId);
    }
    console.log("[SYNC] Marked local sync_runs row failed:", {
      runId,
      finishedAt,
    });

    if (syncRunId !== undefined) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "The sync failed on the Raspberry Pi.";

      try {
        await updateCloudSyncRun(syncRunId, {
          status: "failed",
          completed_at: new Date().toISOString(),
          error_message: errorMessage,
        });
      } catch (updateError) {
        console.error("[SYNC] Failed to update cloud sync run:", updateError);
      }
    }

    return {
      ok: false,
      message: "Error synchronizing data",
      runId,
      startedAt,
      finishedAt,
      syncRunId,
    };
  } finally {
    if (db) {
      db.close();
      console.log("[SYNC] Closed SQLite DB");
    }
    isSyncRunning = false;
  }
}
