import type { ReadableStream as NodeReadableStream } from "stream/web";
import fs from "fs";
import os from "os";
import path from "path";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import Database from "better-sqlite3";
import mime from "mime-types";
import supabase from "@/api/supabase/client";
import { getDeviceId } from "@/lib/getDeviceId";
import { getStorageInfo } from "@/lib/storage/getStorageInfo";

const BUCKET = "lesson-files";
const LOCAL_DIR =
  process.env.LOCAL_FILES_DIR ?? path.join(os.homedir(), "rose-files");
const DEVICE_ID = getDeviceId();

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

type LessonFileRow = {
  lesson_id: number;
  file_id: number;
};

type DeviceLessonRow = {
  lesson_id: number;
  status: "pending" | "available" | "failed";
};

type CloudSyncRunId = string | number;

type RunSyncOptions = {
  syncRunId?: CloudSyncRunId;
};

type SyncPayload = {
  groups: Group[];
  lessons: Lesson[];
  files: FileRow[];
  lessonFiles: LessonFileRow[];
};

function createSchema(db: DB) {
  const tableSchemaSql = [
    `CREATE TABLE IF NOT EXISTS lesson_files (
      lesson_id INTEGER NOT NULL,
      file_id INTEGER NOT NULL,
      PRIMARY KEY (lesson_id, file_id),
      FOREIGN KEY (lesson_id) REFERENCES lessons(id),
      FOREIGN KEY (file_id) REFERENCES files(id)
    )`,
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

async function fetchAssignedSyncData(): Promise<SyncPayload> {
  console.log("[SYNC] Fetching assigned lessons for device:", DEVICE_ID);

  const { data: deviceLessons, error: deviceLessonsError } = await supabase
    .from("DeviceLessons")
    .select("lesson_id, status")
    .eq("device_id", DEVICE_ID);

  if (deviceLessonsError) {
    throw new Error(deviceLessonsError.message);
  }

  const lessonIds = Array.from(
    new Set(
      ((deviceLessons ?? []) as DeviceLessonRow[])
        .map(row => row.lesson_id)
        .filter((lessonId): lessonId is number => Number.isInteger(lessonId)),
    ),
  );

  if (lessonIds.length === 0) {
    console.log("[SYNC] No assigned lessons found for device");
    return {
      groups: [],
      lessons: [],
      files: [],
      lessonFiles: [],
    };
  }

  const { data: lessons, error: lessonError } = await supabase
    .from("Lessons")
    .select("id, name, description, image_path, group_id")
    .in("id", lessonIds);

  if (lessonError) {
    throw new Error(lessonError.message);
  }

  const typedLessons = (lessons ?? []) as Lesson[];
  const returnedLessonIds = new Set(typedLessons.map(lesson => lesson.id));
  const missingLessonIds = lessonIds.filter(
    lessonId => !returnedLessonIds.has(lessonId),
  );

  if (missingLessonIds.length > 0) {
    throw new Error(
      `DeviceLessons references missing lessons: ${missingLessonIds.join(", ")}`,
    );
  }

  // We fetch from LessonFiles which gives us a set of lesson_id and file_id pairs instead of tying a file row to a lesson_id directly.
  // We use a LessonFiles table to save storage since the same file can appear in multiple lessons without being duplicated or downloaded multiple times.
  const { data: lessonFilesData, error: lessonFilesError } = await supabase
    .from("LessonFiles")
    .select("lesson_id, file_id")
    .in("lesson_id", lessonIds);

  if (lessonFilesError) {
    throw new Error(lessonFilesError.message);
  }

  const lessonFiles = (lessonFilesData ?? []) as LessonFileRow[];

  const fileIds = Array.from(
    new Set(
      lessonFiles
        .map(row => row.file_id)
        .filter((fileId): fileId is number => Number.isInteger(fileId)),
    ),
  );

  let files: FileRow[] = [];
  if (fileIds.length > 0) {
    const { data: filesData, error: fileError } = await supabase
      .from("Files")
      .select("id, name, size_bytes, storage_path, lesson_id")
      .in("id", fileIds);

    if (fileError) {
      throw new Error(fileError.message);
    }

    files = (filesData ?? []) as FileRow[];

    const returnedFileIds = new Set(files.map(file => file.id));
    const missingFileIds = fileIds.filter(
      fileId => !returnedFileIds.has(fileId),
    );

    if (missingFileIds.length > 0) {
      throw new Error(
        `LessonFiles references missing files: ${missingFileIds.join(", ")}`,
      );
    }
  }

  const groupIds = Array.from(
    new Set(
      typedLessons
        .map(lesson => lesson.group_id)
        .filter((groupId): groupId is number => Number.isInteger(groupId)),
    ),
  );

  let groups: Group[] = [];
  if (groupIds.length > 0) {
    const { data: groupsData, error: groupError } = await supabase
      .from("Groups")
      .select("id, name, join_code")
      .in("id", groupIds);

    if (groupError) {
      throw new Error(groupError.message);
    }

    groups = (groupsData ?? []) as Group[];

    const returnedGroupIds = new Set(groups.map(group => group.id));
    const missingGroupIds = groupIds.filter(
      groupId => !returnedGroupIds.has(groupId),
    );

    if (missingGroupIds.length > 0) {
      throw new Error(
        `Lessons reference missing groups: ${missingGroupIds.join(", ")}`,
      );
    }
  }

  console.log("[SYNC] Device-scoped fetch complete:", {
    lessonIds: lessonIds.length,
    lessons: typedLessons.length,
    lessonFiles: lessonFiles.length,
    files: files.length,
    groups: groups.length,
  });

  return {
    groups,
    lessons: typedLessons,
    files,
    lessonFiles,
  };
}

function insertIntoSQLite(
  db: DB,
  groups: Group[],
  lessons: Lesson[],
  files: FileRow[],
  lessonFiles: LessonFileRow[],
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
    for (const r of rows) {
      stmt.run(r.id, r.name, r.description, r.image_path, r.group_id);
    }
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

  const insertLessonFiles = db.transaction((rows: LessonFileRow[]) => {
    const stmt = db.prepare(
      "INSERT OR REPLACE INTO lesson_files (lesson_id, file_id) VALUES (?, ?)",
    );
    for (const r of rows) {
      stmt.run(r.lesson_id, r.file_id);
    }
  });

  db.prepare("DELETE FROM lesson_files").run();
  insertLessonFiles(lessonFiles);
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
  lessonFiles: LessonFileRow[],
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

  const fileToLessonIds = new Map<number, number[]>();
  for (const row of lessonFiles) {
    const existing = fileToLessonIds.get(row.file_id) ?? [];
    existing.push(row.lesson_id);
    fileToLessonIds.set(row.file_id, existing);
  }

  const printedLessons = new Set<number>();

  for (const file of files) {
    if (!file.storage_path) continue;

    const linkedLessonIds = fileToLessonIds.get(file.id) ?? [];

    for (const lessonId of linkedLessonIds) {
      if (!printedLessons.has(lessonId)) {
        console.log(
          `Syncing lesson: "${lessonMap.get(lessonId) ?? "Unknown Lesson"}" (lesson_id=${lessonId})`,
        );
        printedLessons.add(lessonId);
      }
    }

    if (linkedLessonIds.length === 0) {
      console.log(`Syncing file "${file.name}" with no LessonFiles mapping`);
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

function finalizeDownloadedFiles(db: DB, files: FileRow[], stagingDir: string) {
  const updateStmt = db.prepare(
    "UPDATE files SET mime_type = ?, local_path = ? WHERE id = ?",
  );

  for (const file of files) {
    if (!file.storage_path) continue;

    const objectKey = storageUrlToKey(file.storage_path, BUCKET);
    const stagedPath = path.join(stagingDir, objectKey);
    const finalPath = path.join(LOCAL_DIR, objectKey);

    if (!fs.existsSync(stagedPath)) {
      continue;
    }

    fs.mkdirSync(path.dirname(finalPath), { recursive: true });
    fs.copyFileSync(stagedPath, finalPath);
    fs.unlinkSync(stagedPath);

    const inferredMime =
      mime.lookup(file.name || finalPath) || "application/octet-stream";

    updateStmt.run(inferredMime, finalPath, file.id);
  }
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

let isSyncRunning = false;

export function getIsSyncRunning() {
  return isSyncRunning;
}

export async function runSync({ syncRunId }: RunSyncOptions = {}) {
  console.log("[SYNC] Starting runSync", { syncRunId, deviceId: DEVICE_ID });

  if (isSyncRunning) {
    return {
      ok: false,
      message: "Sync already running",
    };
  }

  isSyncRunning = true;

  let stagingDir: string | null = null;
  let runId: number | bigint | undefined;
  let startedAt = "";
  let finishedAt = "";
  let db: DB | null = null;

  try {
    fs.mkdirSync(LOCAL_DIR, { recursive: true });
    stagingDir = fs.mkdtempSync(path.join(os.tmpdir(), "rose-sync-"));

    const DB_PATH = path.join(process.cwd(), "rose-academies-uganda.db");
    db = new Database(DB_PATH);
    createSchema(db);

    startedAt = new Date().toISOString();

    if (syncRunId !== undefined) {
      await updateCloudSyncRun(syncRunId, {
        status: "in_progress",
        started_at: startedAt,
        error_message: null,
      });
    }

    const result = db
      .prepare("INSERT INTO sync_runs (started_at, status) VALUES (?, ?)")
      .run(startedAt, "running");

    runId = result.lastInsertRowid;

    const syncPayload = await fetchAssignedSyncData();

    // Get all lesson IDs currently stored locally in SQLite
    const existingLessons = db
      .prepare<[], { id: number }>("SELECT id FROM lessons")
      .all();

    // Create a set of lesson IDs that SHOULD exist after sync (from Supabase)
    const newLessonIds = new Set(syncPayload.lessons.map(l => l.id));

    // Find lessons that exist locally but are NOT in the new sync payload
    const lessonsToDelete = existingLessons.filter(
      l => !newLessonIds.has(l.id),
    );

    const lessonIdsToDelete = lessonsToDelete.map(l => l.id);

    const filesToDelete = db
      .prepare<number[], { id: number; local_path: string | null }>(
        `
    SELECT f.id, f.local_path
    FROM files f
    JOIN lesson_files lf ON lf.file_id = f.id
    WHERE lf.lesson_id IN (${lessonIdsToDelete.map(() => "?").join(",")})
    `,
      )
      .all(...lessonIdsToDelete);

    // Delete the actual file contents from disk
    for (const file of filesToDelete) {
      if (file.local_path && fs.existsSync(file.local_path)) {
        console.log("[SYNC] Deleting file:", file.local_path);
        fs.unlinkSync(file.local_path);
      }
    }

    if (lessonIdsToDelete.length > 0) {
      const placeholders = lessonIdsToDelete.map(() => "?").join(",");

      // Get file IDs BEFORE deleting mappings
      const fileIdsToDelete = db
        .prepare<number[], { file_id: number }>(
          `SELECT DISTINCT file_id FROM lesson_files WHERE lesson_id IN (${placeholders})`,
        )
        .all(...lessonIdsToDelete)
        .map(r => r.file_id);

      // Delete lesson-file mappings
      db.prepare(
        `DELETE FROM lesson_files WHERE lesson_id IN (${placeholders})`,
      ).run(...lessonIdsToDelete);

      // Break foreign key from files → lessons
      db.prepare(
        `UPDATE files SET lesson_id = NULL WHERE lesson_id IN (${placeholders})`,
      ).run(...lessonIdsToDelete);

      // Delete files using cached IDs
      if (fileIdsToDelete.length > 0) {
        const filePlaceholders = fileIdsToDelete.map(() => "?").join(",");
        db.prepare(`DELETE FROM files WHERE id IN (${filePlaceholders})`).run(
          ...fileIdsToDelete,
        );
      }

      // Delete lessons
      db.prepare(`DELETE FROM lessons WHERE id IN (${placeholders})`).run(
        ...lessonIdsToDelete,
      );
    }

    await downloadFiles(
      syncPayload.files,
      syncPayload.lessons,
      syncPayload.lessonFiles,
      stagingDir,
    );

    insertIntoSQLite(
      db,
      syncPayload.groups,
      syncPayload.lessons,
      syncPayload.files,
      syncPayload.lessonFiles,
    );

    finalizeDownloadedFiles(db, syncPayload.files, stagingDir);

    fs.rmSync(stagingDir, { recursive: true, force: true });
    stagingDir = null;

    finishedAt = new Date().toISOString();

    try {
      const storage = await getStorageInfo();

      await supabase.from("devices").upsert({
        id: DEVICE_ID,
        total_kb: storage.disk.totalKb,
        used_kb: storage.disk.usedKb,
        available_kb: storage.disk.availableKb,
        use_percent: storage.disk.usePercent,
        rose_files_kb: storage.directories.roseFilesKb,
        repo_kb: storage.directories.repoKb,
        sync_requested_at: new Date().toISOString(),
        last_synced_at: finishedAt,
      });
    } catch (err) {
      console.error("Failed to upload storage info:", err);
    }

    db.prepare(
      "UPDATE sync_runs SET finished_at = ?, status = ? WHERE id = ?",
    ).run(finishedAt, "success", runId);

    if (syncRunId !== undefined) {
      await updateCloudSyncRun(syncRunId, {
        status: "success",
        completed_at: finishedAt,
        error_message: null,
      });
    }

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
    }

    if (db && runId !== undefined) {
      finishedAt = new Date().toISOString();

      db.prepare(
        "UPDATE sync_runs SET finished_at = ?, status = ? WHERE id = ?",
      ).run(finishedAt, "failed", runId);
    }

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
    }

    isSyncRunning = false;
  }
}
