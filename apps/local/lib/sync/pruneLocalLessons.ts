import type { DB, Lesson } from "@/lib/sync/types";
import fs from "fs";

// Sync is authoritative: if Supabase no longer assigns a lesson to this Pi, the
// local copy should disappear so students only see the current offline library.

// Essentially, this removes stale lessons and files from the local SQLite database.
export function pruneLocalLessons(db: DB, latestLessons: Lesson[]) {
  // We compare the current SQLite lessons against the cloud payload because
  // the local app should only expose lessons still assigned to this device.
  const existingLessons = db
    .prepare<[], { id: number }>("SELECT id FROM lessons")
    .all();

  const latestLessonIds = new Set(latestLessons.map(l => l.id));

  // Compare the two sets of lessons to find out which lessons were removed from this Pi's
  const lessonsToDelete = existingLessons.filter(
    l => !latestLessonIds.has(l.id),
  );

  const lessonIdsToDelete = lessonsToDelete.map(l => l.id);

  const filesToDelete = db
    .prepare<number[], { id: number; local_path: string | null }>(
      `
    SELECT f.id, f.local_path
    FROM files f
    JOIN lesson_files lf ON lf.file_id = f.id
    WHERE lf.lesson_id IN (${lessonIdsToDelete.map(() => "?").join(",")})
    `,
    )
    .all(...lessonIdsToDelete);

  // This query intentionally uses lesson_files because a file may be linked to
  // a lesson even when the older files.lesson_id field is empty or outdated.
  // Remove files from disk before deleting their database rows so we can still
  // use SQLite to find the paths that need cleanup.
  for (const file of filesToDelete) {
    if (file.local_path && fs.existsSync(file.local_path)) {
      console.log("[SYNC] Deleting file:", file.local_path);
      fs.unlinkSync(file.local_path);
    }
  }

  if (lessonIdsToDelete.length === 0) {
    return;
  }

  const placeholders = lessonIdsToDelete.map(() => "?").join(",");

  // Cache file IDs before removing join rows; once lesson_files is deleted, we
  // lose the relationship needed to know which file rows to remove.
  const fileIdsToDelete = db
    .prepare<number[], { file_id: number }>(
      `SELECT DISTINCT file_id FROM lesson_files WHERE lesson_id IN (${placeholders})`,
    )
    .all(...lessonIdsToDelete)
    .map(r => r.file_id);

  db.prepare(
    `DELETE FROM lesson_files WHERE lesson_id IN (${placeholders})`,
  ).run(...lessonIdsToDelete);

  // Clear the denormalized lesson pointer before deleting lessons so older rows
  // do not keep references to content no longer assigned to this Pi.
  db.prepare(
    `UPDATE files SET lesson_id = NULL WHERE lesson_id IN (${placeholders})`,
  ).run(...lessonIdsToDelete);

  if (fileIdsToDelete.length > 0) {
    const filePlaceholders = fileIdsToDelete.map(() => "?").join(",");
    db.prepare(`DELETE FROM files WHERE id IN (${filePlaceholders})`).run(
      ...fileIdsToDelete,
    );
  }

  db.prepare(`DELETE FROM lessons WHERE id IN (${placeholders})`).run(
    ...lessonIdsToDelete,
  );
}
