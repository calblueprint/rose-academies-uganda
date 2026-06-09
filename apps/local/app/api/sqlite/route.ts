import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { Group, Lesson, LocalFile } from "@/types/schema";

type LocalLessonFile = {
  lesson_id: number;
  file_id: number;
};

export async function GET(): Promise<NextResponse> {
  try {
    const DB_PATH = path.join(process.cwd(), "rose-academies-uganda.db");

    // ensure directory exists
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

    const db = new Database(DB_PATH);

    const groups = db.prepare("SELECT * FROM groups").all() as Group[];
    const lessons = db.prepare("SELECT * FROM lessons").all() as Lesson[];
    const files = db.prepare("SELECT * FROM files").all() as LocalFile[];
    const lessonFiles = db
      .prepare("SELECT lesson_id, file_id FROM lesson_files")
      .all() as LocalLessonFile[];

    db.close();

    return new NextResponse(
      JSON.stringify({ groups, lessons, files, lessonFiles }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
