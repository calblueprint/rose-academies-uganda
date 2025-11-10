import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import supabase from "@/api/supabase/client";

const BUCKET = "lesson-files";
const LOCAL_DIR = process.env.LOCAL_FILES_DIR ?? "/home/pi/rose-files";

type DB = InstanceType<typeof Database>;

type Teacher = { id: number; name: string };
type Group = { id: number; name: string; join_code: string | null };
type Lesson = { id: number; name: string; group_id: number };
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
      "INSERT OR REPLACE INTO lessons (id, name, group_id) VALUES (?, ?, ?)",
    );
    for (const r of rows) stmt.run(r.id, r.name, r.group_id);
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

    // Download the file bytes from Supabase storage.
    const { data: downloaded, error: downloadError } = await supabase.storage
      .from(BUCKET)
      .download(objectKey);

    // If a download fails, log and continue.
    if (downloadError || !downloaded) {
      console.warn("Could not download", file.storage_path, downloadError);
      continue;
    }

    // Convert Array Buffer to Node Buffer. This is needed in order to work with Node's file system.
    // TODO: Consider using stream instead of buffers.
    const arrayBuffer = await downloaded.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Build folder structure and write the files to disk.
    const localPath = path.join(LOCAL_DIR, objectKey);
    fs.mkdirSync(path.dirname(localPath), { recursive: true });
    fs.writeFileSync(localPath, buffer);

    // Uses mime to tell browser what type of file it is in order to render it properly.
    // TODO: Consider using mime type detectin library instead.
    let mime = "application/octet-stream";
    if (file.name?.endsWith(".pdf")) mime = "application/pdf";
    else if (file.name?.endsWith(".png")) mime = "image/png";
    else if (file.name?.endsWith(".jpg") || file.name?.endsWith(".jpeg"))
      mime = "image/jpeg";

    updateStmt.run(mime, localPath, file.id);
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
