import type { ReadableStream as NodeReadableStream } from "stream/web";
import { NextResponse } from "next/server";
import fs from "fs";
import os from "os";
import path from "path";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import Database from "better-sqlite3";
import mime from "mime-types";
import supabase from "@/api/supabase/client";

const BUCKET = "lesson-files";
// Create local directory as /home/<user>/rose-files.
const LOCAL_DIR =
  process.env.LOCAL_FILES_DIR ?? path.join(os.homedir(), "rose-files");

type DB = InstanceType<typeof Database>;

type Teacher = { id: number; name: string };
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

/**
 * Initializes or updates the SQLite schema. Creates required tables if missing
 * and adds new columns (mime_type, local_path) if they don't already exist.
 */
function createSchema(db: DB) {
  const tableSchemaSql = [
    `CREATE TABLE IF NOT EXISTS teachers (
      id INTEGER PRIMARY KEY,
      name TEXT
    )`,
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

  // Add new columns if not present.
  try {
    db.prepare(`ALTER TABLE files ADD COLUMN mime_type TEXT`).run();
  } catch {}
  try {
    db.prepare(`ALTER TABLE files ADD COLUMN local_path TEXT`).run();
  } catch {}
}

/**
 * Fetches the latest Teachers, Groups, Lessons, and Files data from Supabase.
 */
async function fetchFromSupabase(): Promise<{
  teachers: Teacher[];
  groups: Group[];
  lessons: Lesson[];
  files: FileRow[];
}> {
  const { data: teachers, error: teacherError } = await supabase
    .from("Teachers")
    .select("*");
  const { data: groups, error: groupError } = await supabase
    .from("Groups")
    .select("*");
  const { data: lessons, error: lessonError } = await supabase
    .from("Lessons")
    .select("*");
  const { data: files, error: fileError } = await supabase
    .from("Files")
    .select("*");

  if (teacherError || groupError || lessonError || fileError) {
    throw new Error("Error fetching data from Supabase");
  }

  return {
    teachers: teachers ?? [],
    groups: groups ?? [],
    lessons: lessons ?? [],
    files: files ?? [],
  };
}

/**
 * Inserts or replaces the fetched data into the local SQLite database.
 */
function insertIntoSQLite(
  db: DB,
  teachers: Teacher[],
  groups: Group[],
  lessons: Lesson[],
  files: FileRow[],
) {
  const insertTeachers = db.transaction((rows: Teacher[]) => {
    const stmt = db.prepare(
      "INSERT OR REPLACE INTO teachers (id, name) VALUES (?, ?)",
    );
    for (const r of rows) stmt.run(r.id, r.name);
  });
  insertTeachers(teachers);

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

// Since our file storage paths are saved as full URLs, we
// strip off the prefix ("https://tyc...") and keep the file path.
function storageUrlToKey(url: string, bucket: string): string {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const idx = url.indexOf(marker);
  // If the URL isn't in the expected format, leave it as is.
  if (idx === -1) {
    return url;
  }
  return url.slice(idx + marker.length);
}

/**
 * Downloads all files listed in the `files` table from Supabase Storage.
 * Writes them to disk under LOCAL_DIR, determines basic MIME type from extension,
 * and updates the corresponding database rows with mime_type and local_path.
 */
async function downloadFiles(db: DB, files: FileRow[]) {
  const updateStmt = db.prepare(
    "UPDATE files SET mime_type = ?, local_path = ? WHERE id = ?",
  );

  for (const file of files) {
    if (!file.storage_path) continue;

    const objectKey = storageUrlToKey(file.storage_path, BUCKET);

    // Stream file directly from Supabase public URL
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
      // Convert Web ReadableStream to Node Readable stream.
      const webStream =
        response.body as unknown as NodeReadableStream<Uint8Array>;
      const nodeReadable = Readable.fromWeb(webStream);

      // Runs pipeline with readable and writable stream in order to stream to disk.
      await pipeline(nodeReadable, fs.createWriteStream(localPath));
    } catch (err) {
      console.warn("Error streaming file to disk", file.storage_path, err);
      continue;
    }

    // Use mime-types to infer the MIME type from the file name or path.
    // Falls back to application/octet-stream if unknown.
    const inferredMime =
      mime.lookup(file.name || localPath) || "application/octet-stream";

    updateStmt.run(inferredMime, localPath, file.id);
  }
}

/**
 * GET handler — synchronizes Supabase content to local SQLite and filesystem.
 * Steps:
 *   1. Ensure local folder exists
 *   2. Create schema
 *   3. Fetch data from Supabase
 *   4. Insert into SQLite
 *   5. Download files and update their paths
 * Returns JSON response indicating success or error.
 */
export async function GET(): Promise<NextResponse> {
  try {
    // Make sure that the local directory exists.
    fs.mkdirSync(LOCAL_DIR, { recursive: true });
    const db = new Database("rose-academies-uganda.db");

    createSchema(db);
    const { teachers, groups, lessons, files } = await fetchFromSupabase();
    insertIntoSQLite(db, teachers, groups, lessons, files);
    await downloadFiles(db, files);
    db.close();

    // Return success response or report errors.
    return new NextResponse(
      JSON.stringify({ message: "Data synchronized successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Error synchronizing data" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
