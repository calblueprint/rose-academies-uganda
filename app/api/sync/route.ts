import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import supabase from "@/api/supabase/client";

const BUCKET = "lesson-files";
// TODO: fix local directories.
const LOCAL_DIR = "/home/nathantam/rose-files";

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

export async function GET(): Promise<NextResponse> {
  try {
    // Make sure that the local directory exists.
    fs.mkdirSync(LOCAL_DIR, { recursive: true });
    const db = new Database("rose-academies-uganda.db");

    // Create tables if they don't exist
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

    // Add new columns.
    try {
      db.prepare(`ALTER TABLE files ADD COLUMN mime_type TEXT`).run();
    } catch {}
    try {
      db.prepare(`ALTER TABLE files ADD COLUMN local_path TEXT`).run();
    } catch {}

    // Fetch data from Supabase
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

    // Insert data into local SQLite database
    const insertTeachers = db.transaction(teachers => {
      const stmt = db.prepare(
        "INSERT OR REPLACE INTO teachers (id, name) VALUES (?, ?)",
      );
      for (const teacher of teachers) {
        stmt.run(teacher.id, teacher.name);
      }
    });
    insertTeachers(teachers);

    const insertGroups = db.transaction(groups => {
      const stmt = db.prepare(
        "INSERT OR REPLACE INTO groups (id, name, join_code) VALUES (?, ?, ?)",
      );
      for (const group of groups) {
        stmt.run(group.id, group.name, group.join_code);
      }
    });
    insertGroups(groups);

    const insertLessons = db.transaction(lessons => {
      const stmt = db.prepare(
        "INSERT OR REPLACE INTO lessons (id, name, group_id) VALUES (?, ?, ?)",
      );
      for (const lesson of lessons) {
        stmt.run(lesson.id, lesson.name, lesson.group_id);
      }
    });
    insertLessons(lessons);

    const insertFiles = db.transaction(files => {
      const stmt = db.prepare(
        "INSERT OR REPLACE INTO files (id, name, size_bytes, storage_path, lesson_id) VALUES (?, ?, ?, ?, ?)",
      );
      for (const file of files) {
        stmt.run(
          file.id,
          file.name,
          file.size_bytes,
          file.storage_path,
          file.lesson_id,
        );
      }
    });
    insertFiles(files);

    // Prepare SQL statement for updating files row with mime and path.
    const updateStmt = db.prepare(
      "UPDATE files SET mime_type = ?, local_path = ? WHERE id = ?",
    );

    for (const file of files) {
      if (!file.storage_path) {
        continue;
      }

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

      // Convert Array Buffer to Node Buffer. This is needed in order
      // to work with Node's file system.
      // TODO: Consider using stream instead of buffers.
      const arrayBuffer = await downloaded.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Build folder structure and write the files to disk.
      const localPath = path.join(LOCAL_DIR, objectKey);
      fs.mkdirSync(path.dirname(localPath), { recursive: true });
      fs.writeFileSync(localPath, buffer);

      // Uses mime to tell browser what type of file it is in
      // order to render it properly.
      // TODO: Consider using mime type detectin library instead.
      let mime = "application/octet-stream";
      if (file.name?.endsWith(".pdf")) mime = "application/pdf";
      else if (file.name?.endsWith(".png")) mime = "image/png";
      else if (file.name?.endsWith(".jpg") || file.name?.endsWith(".jpeg"))
        mime = "image/jpeg";

      updateStmt.run(mime, localPath, file.id);
    }

    db.close();

    // Return success response or report errors.
    return new NextResponse(
      JSON.stringify({ message: "Data synchronized successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Error synchronizing data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
