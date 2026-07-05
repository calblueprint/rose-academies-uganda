import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
import Database from "better-sqlite3";
import mime from "mime-types";
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

function isGenericMimeType(mimeType?: string | null) {
  return !mimeType || mimeType === "application/octet-stream";
}

function resolveContentType(row: FileRow): string {
  const inferredMimeType = mime.lookup(row.name)?.toString() ?? null;

  return isGenericMimeType(row.mime_type)
    ? (inferredMimeType ?? "application/octet-stream")
    : (row.mime_type ?? "application/octet-stream");
}

function parseRangeHeader(rangeHeader: string, fileSize: number) {
  const match = rangeHeader.match(/^bytes=(\d*)-(\d*)$/);
  if (!match) return null;

  const [, startText, endText] = match;
  const requestedStart = startText ? Number(startText) : 0;
  const requestedEnd = endText ? Number(endText) : fileSize - 1;

  if (
    !Number.isInteger(requestedStart) ||
    !Number.isInteger(requestedEnd) ||
    requestedStart < 0 ||
    requestedEnd < requestedStart ||
    requestedStart >= fileSize
  ) {
    return null;
  }

  return {
    start: requestedStart,
    end: Math.min(requestedEnd, fileSize - 1),
  };
}

function nodeStreamToWeb(stream: fs.ReadStream) {
  return Readable.toWeb(stream) as ReadableStream<Uint8Array>;
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

  // Send the raw file to the browser.
  const dispositionType =
    req.nextUrl.searchParams.get("download") === "1" ? "attachment" : "inline";
  const contentType = resolveContentType(row);
  const fileSize = fs.statSync(row.local_path).size;
  const rangeHeader = req.headers.get("range");
  const sharedHeaders = {
    "Content-Type": contentType,
    "Content-Disposition": `${dispositionType}; filename="${safeHeaderFilename(row.name)}"; filename*=UTF-8''${encodeURIComponent(row.name)}`,
    "Cache-Control": "no-store",
    "Accept-Ranges": "bytes",
  };

  if (rangeHeader) {
    const range = parseRangeHeader(rangeHeader, fileSize);

    if (!range) {
      return new NextResponse(null, {
        status: 416,
        headers: {
          ...sharedHeaders,
          "Content-Range": `bytes */${fileSize}`,
        },
      });
    }

    const stream = fs.createReadStream(row.local_path, {
      start: range.start,
      end: range.end,
    });
    const chunkSize = range.end - range.start + 1;

    return new NextResponse(nodeStreamToWeb(stream), {
      status: 206,
      headers: {
        ...sharedHeaders,
        "Content-Length": String(chunkSize),
        "Content-Range": `bytes ${range.start}-${range.end}/${fileSize}`,
      },
    });
  }

  return new NextResponse(
    nodeStreamToWeb(fs.createReadStream(row.local_path)),
    {
      status: 200,
      headers: {
        ...sharedHeaders,
        "Content-Length": String(fileSize),
      },
    },
  );
}
