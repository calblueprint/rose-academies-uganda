import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import supabase from "@/api/supabase/client";

export async function GET(): Promise<NextResponse> {
  try {
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

    db.close();

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
