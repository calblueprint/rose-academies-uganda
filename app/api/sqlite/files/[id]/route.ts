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
  const row = db.prepare("SELECT * FROM files WHERE id = ?").get(Number(id)) as
    | FileRow
    | undefined;
  db.close();

  if (!row) {
    return new NextResponse("Not found", { status: 404 });
  }
  if (!row.local_path) {
    return new NextResponse("File not downloaded", { status: 404 });
  }

  const buf = fs.readFileSync(row.local_path);

  return new NextResponse(buf, {
    status: 200,
    headers: {
      "Content-Type": row.mime_type ?? "application/octet-stream",
      "Content-Disposition": `inline; filename="${row.name}"`,
    },
  });
}
