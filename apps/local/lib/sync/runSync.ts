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

type Group = { id: number; name: string; join_code: string | null };
type Lesson = {
  id: number;
  name: string;
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
  ];

  for (const sql of tableSchemaSql) {
    db.prepare(sql).run();
  }

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
      "INSERT OR REPLACE INTO lessons (id, name, image_path, group_id) VALUES (?, ?, ?, ?)",
    );
    for (const r of rows) stmt.run(r.id, r.name, r.image_path, r.group_id);
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

async function downloadFiles(db: DB, files: FileRow[], lessons: Lesson[]) {
  const updateStmt = db.prepare(
    "UPDATE files SET mime_type = ?, local_path = ? WHERE id = ?",
  );

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
      console.warn(
        "Could not stream download",
        file.storage_path,
        response.status,
      );
      continue;
    }

    const localPath = path.join(LOCAL_DIR, objectKey);
    fs.mkdirSync(path.dirname(localPath), { recursive: true });

    try {
      const webStream =
        response.body as unknown as NodeReadableStream<Uint8Array>;
      const nodeReadable = Readable.fromWeb(webStream);

      await pipeline(nodeReadable, fs.createWriteStream(localPath));
    } catch (err) {
      console.warn("Error streaming file to disk", file.storage_path, err);
      continue;
    }

    const inferredMime =
      mime.lookup(file.name || localPath) || "application/octet-stream";

    updateStmt.run(inferredMime, localPath, file.id);
  }
}

let isSyncRunning = false;

export function getIsSyncRunning() {
  return isSyncRunning;
}

export async function runSync() {
  if (isSyncRunning) {
    return {
      ok: false,
      message: "Sync already running",
    };
  }

  isSyncRunning = true;

  try {
    fs.mkdirSync(LOCAL_DIR, { recursive: true });

    const DB_PATH = path.join(process.cwd(), "rose-academies-uganda.db");

    const db = new Database(DB_PATH);

    try {
      createSchema(db);
      const { groups, lessons, files } = await fetchFromSupabase();
      insertIntoSQLite(db, groups, lessons, files);
      await downloadFiles(db, files, lessons);
    } finally {
      db.close();
    }

    return {
      ok: true,
      message: "Data synchronized successfully",
    };
  } catch (error) {
    console.error("Sync failed:", error);

    return {
      ok: false,
      message: "Error synchronizing data",
    };
  } finally {
    isSyncRunning = false;
  }
}
