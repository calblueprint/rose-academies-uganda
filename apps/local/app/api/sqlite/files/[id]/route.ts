import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { getClassroomSession } from "@/lib/classroom/session";

type FileRow = {
  id: number;
  name: string;
  mime_type: string | null;
  local_path: string | null;
};
const DB_PATH =
  process.env.ROSE_DB_PATH ??
  path.join(process.cwd(), "rose-academies-uganda.db");

function safeHeaderFilename(name: string) {
  return name.replace(/[\r\n"]/g, "_");
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await getClassroomSession();

  if (!session) {
    return new NextResponse("Join a classroom to view this file", {
      status: 401,
    });
  }

  let row: FileRow | undefined;
  const db = new Database(DB_PATH, { readonly: true });

  try {
    // A file is available only when it belongs to a lesson in the classroom
    // stored in the signed session cookie.
    row = db
      .prepare(
        `SELECT f.*
         FROM files f
         WHERE f.id = ?
           AND EXISTS (
             SELECT 1
             FROM lesson_files lf
             INNER JOIN lessons l ON l.id = lf.lesson_id
             LEFT JOIN lesson_groups lg ON lg.lesson_id = l.id
             WHERE lf.file_id = f.id
               AND (l.group_id = ? OR lg.group_id = ?)
           )`,
      )
      .get(Number(id), session.groupId, session.groupId) as FileRow | undefined;
  } finally {
    db.close();
  }

  // Error handling for if row is not found for that id or if file has not
  // yet been saved locallly.
  if (!row) {
    return new NextResponse("Not found", { status: 404 });
  }
  if (!row.local_path) {
    return new NextResponse("File not downloaded", { status: 404 });
  }

  // Read the file bytes from disc using the local path.
  const buf = fs.readFileSync(row.local_path);

  // Send the raw file to the browser.
  const dispositionType =
    req.nextUrl.searchParams.get("download") === "1" ? "attachment" : "inline";

  return new NextResponse(buf, {
    status: 200,
    headers: {
      // Tell browser the type of file (with generic bytes as fallback).
      "Content-Type": row.mime_type ?? "application/octet-stream",
      "Content-Disposition": `${dispositionType}; filename="${safeHeaderFilename(row.name)}"; filename*=UTF-8''${encodeURIComponent(row.name)}`,
      "Content-Length": String(buf.byteLength),
      "Cache-Control": "no-store",
    },
  });
}
