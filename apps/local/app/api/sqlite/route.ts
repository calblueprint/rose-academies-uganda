import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { getClassroomSession } from "@/lib/classroom/session";
import { createSchema } from "@/lib/sync/sqliteStore";
import { Group, Lesson, LocalFile } from "@/types/schema";

type LocalLessonFile = {
  lesson_id: number;
  file_id: number;
};

export async function GET(): Promise<NextResponse> {
  try {
    const session = await getClassroomSession();

    if (!session) {
      return NextResponse.json(
        { error: "Join a classroom to view its lessons." },
        { status: 401, headers: { "Cache-Control": "no-store" } },
      );
    }

    const DB_PATH =
      process.env.ROSE_DB_PATH ??
      path.join(process.cwd(), "rose-academies-uganda.db");

    // ensure directory exists
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

    const db = new Database(DB_PATH);

    // The join page can load before this device has completed its first sync.
    // Initialize the empty offline database here so those first reads return
    // empty collections instead of failing because the tables do not exist.
    createSchema(db);

    const groups = db
      .prepare("SELECT * FROM groups WHERE id = ?")
      .all(session.groupId) as Group[];
    const lessons = db
      .prepare(
        `SELECT DISTINCT l.*
         FROM lessons l
         LEFT JOIN lesson_groups lg ON lg.lesson_id = l.id
         WHERE l.group_id = ? OR lg.group_id = ?`,
      )
      .all(session.groupId, session.groupId) as Lesson[];
    const lessonFiles = db
      .prepare(
        `SELECT DISTINCT lf.lesson_id, lf.file_id
         FROM lesson_files lf
         INNER JOIN lessons l ON l.id = lf.lesson_id
         LEFT JOIN lesson_groups lg ON lg.lesson_id = l.id
         WHERE l.group_id = ? OR lg.group_id = ?`,
      )
      .all(session.groupId, session.groupId) as LocalLessonFile[];
    const files = db
      .prepare(
        `SELECT DISTINCT f.*
         FROM files f
         INNER JOIN lesson_files lf ON lf.file_id = f.id
         INNER JOIN lessons l ON l.id = lf.lesson_id
         LEFT JOIN lesson_groups lg ON lg.lesson_id = l.id
         WHERE l.group_id = ? OR lg.group_id = ?`,
      )
      .all(session.groupId, session.groupId) as LocalFile[];

    db.close();

    return new NextResponse(
      JSON.stringify({ groups, lessons, files, lessonFiles }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
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
