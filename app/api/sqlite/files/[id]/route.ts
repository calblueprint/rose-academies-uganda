import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import Database from "better-sqlite3";

type FileRow = {
  id: number;
  name: string;
  mime_type: string | null;
  local_path: string | null;
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const db = new Database("rose-academies-uganda.db");
  // Look up the file row by numeric id.
  const row = db.prepare("SELECT * FROM files WHERE id = ?").get(Number(id)) as
    | FileRow
    | undefined;
  db.close();

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
  return new NextResponse(buf, {
    status: 200,
    headers: {
      // Tell browser the type of file (with generic bytes as fallback).
      "Content-Type": row.mime_type ?? "application/octet-stream",
      // Show as inline.
      "Content-Disposition": `inline; filename="${row.name}"`,
    },
  });
}
