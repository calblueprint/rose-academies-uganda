import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import { Group, Lesson, RoseFile, Teacher } from "@/types/schema";

export async function GET(): Promise<NextResponse> {
  try {
    const db = new Database("rose-academies-uganda.db");

    const teachers = db.prepare("SELECT * FROM teachers").all() as Teacher[];
    const groups = db.prepare("SELECT * FROM groups").all() as Group[];
    const lessons = db.prepare("SELECT * FROM lessons").all() as Lesson[];
    const files = db.prepare("SELECT * FROM files").all() as RoseFile[];

    db.close();

    return new NextResponse(
      JSON.stringify({ teachers, groups, lessons, files }),
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
