import type { DB, FileRow, Lesson, LessonFileRow } from "@/lib/sync/types";
import type { ReadableStream as NodeReadableStream } from "stream/web";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import mime from "mime-types";

const DEFAULT_MIME_TYPE = "application/octet-stream";

// Supabase stores public file URLs, but the local disk should preserve just the
// object key inside the lesson-files bucket so paths stay stable across devices.
function storageUrlToKey(url: string, bucket: string): string {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const idx = url.indexOf(marker);

  if (idx === -1) {
    return url;
  }

  return url.slice(idx + marker.length);
}

export async function downloadFiles(
  files: FileRow[],
  lessons: Lesson[],
  lessonFiles: LessonFileRow[],
  stagingDir: string,
  bucket: string,
) {
  // This function only downloads into the staging directory. runSync finalizes
  // those files later so one failed download can cancel the whole sync safely.
  console.log("[SYNC] Starting downloadFiles", {
    fileCount: files.length,
    stagingDir,
  });

  const lessonMap = new Map<number, string>();
  for (const lesson of lessons) {
    lessonMap.set(lesson.id, lesson.name);
  }

  const fileToLessonIds = new Map<number, number[]>();
  for (const row of lessonFiles) {
    const existing = fileToLessonIds.get(row.file_id) ?? [];
    existing.push(row.lesson_id);
    fileToLessonIds.set(row.file_id, existing);
  }

  const printedLessons = new Set<number>();

  for (const file of files) {
    if (!file.storage_path) continue;

    const linkedLessonIds = fileToLessonIds.get(file.id) ?? [];

    // Files can be shared across lessons, so we log by linked lesson without
    // assuming the old files.lesson_id field tells the full story.
    for (const lessonId of linkedLessonIds) {
      if (!printedLessons.has(lessonId)) {
        console.log(
          `Syncing lesson: "${lessonMap.get(lessonId) ?? "Unknown Lesson"}" (lesson_id=${lessonId})`,
        );
        printedLessons.add(lessonId);
      }
    }

    if (linkedLessonIds.length === 0) {
      console.log(`Syncing file "${file.name}" with no LessonFiles mapping`);
    }

    const objectKey = storageUrlToKey(file.storage_path, bucket);
    const response = await fetch(file.storage_path);

    if (!response.ok || !response.body) {
      throw new Error(`Download failed for ${file.storage_path}`);
    }

    // Files are written to a staging directory first so a failed download does
    // not leave the visible offline library half-updated.
    const stagedPath = path.join(stagingDir, objectKey);
    fs.mkdirSync(path.dirname(stagedPath), { recursive: true });

    try {
      const webStream =
        response.body as unknown as NodeReadableStream<Uint8Array>;
      const nodeReadable = Readable.fromWeb(webStream);

      await pipeline(nodeReadable, fs.createWriteStream(stagedPath));
    } catch (err) {
      throw new Error(`Streaming failed for ${file.storage_path}, ${err}`);
    }
  }

  // If we get here, then we were able to download all the files into the staging directory,
  // and can move on to finalize the downloads.
  console.log("[SYNC] downloadFiles complete");
}

export function finalizeDownloadedFiles(
  db: DB,
  files: FileRow[],
  stagingDir: string,
  localDir: string,
  bucket: string,
) {
  // SQLite should only point at permanent files, not temporary staged paths.
  // This keeps the local app from trying to open files that cleanup may delete.
  const updateStmt = db.prepare(
    "UPDATE files SET mime_type = ?, local_path = ? WHERE id = ?",
  );

  for (const file of files) {
    if (!file.storage_path) continue;

    const objectKey = storageUrlToKey(file.storage_path, bucket);
    const stagedPath = path.join(stagingDir, objectKey);
    const finalPath = path.join(localDir, objectKey);

    if (!fs.existsSync(stagedPath)) {
      continue;
    }

    // Only after every download has succeeded do we copy staged files into the
    // permanent directory and point SQLite at those final paths.
    fs.mkdirSync(path.dirname(finalPath), { recursive: true });
    fs.copyFileSync(stagedPath, finalPath);
    fs.unlinkSync(stagedPath);

    const inferredMime =
      mime.lookup(file.name || finalPath) || DEFAULT_MIME_TYPE;

    updateStmt.run(inferredMime, finalPath, file.id);
  }
}
