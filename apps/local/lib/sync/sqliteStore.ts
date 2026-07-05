import type {
  DB,
  FileRow,
  Group,
  Lesson,
  LessonFileRow,
  LessonGroupRow,
} from "@/lib/sync/types";

// The local app reads from SQLite even when the Pi has no internet. These
// helpers keep the schema and writes in one place so runSync can stay focused on
// orchestration.
export function createSchema(db: DB) {
  const tableSchemaSql = [
    `CREATE TABLE IF NOT EXISTS lesson_files (
      lesson_id INTEGER NOT NULL,
      file_id INTEGER NOT NULL,
      PRIMARY KEY (lesson_id, file_id),
      FOREIGN KEY (lesson_id) REFERENCES lessons(id),
      FOREIGN KEY (file_id) REFERENCES files(id)
    )`,
    `CREATE TABLE IF NOT EXISTS lesson_groups (
      lesson_id INTEGER NOT NULL,
      group_id INTEGER NOT NULL,
      PRIMARY KEY (lesson_id, group_id),
      FOREIGN KEY (lesson_id) REFERENCES lessons(id),
      FOREIGN KEY (group_id) REFERENCES groups(id)
    )`,
    `CREATE TABLE IF NOT EXISTS groups (
      id INTEGER PRIMARY KEY,
      name TEXT,
      join_code TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT,
      image_path TEXT,
      group_id INTEGER,
      FOREIGN KEY (group_id) REFERENCES groups(id)
    )`,
    `CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY,
      name TEXT,
      size_bytes INTEGER,
      storage_path TEXT,
      hash TEXT,
      created_at TEXT,
      updated_at TEXT,
      lesson_id INTEGER,
      FOREIGN KEY (lesson_id) REFERENCES lessons(id)
    )`,
    `CREATE TABLE IF NOT EXISTS sync_runs (
      id INTEGER PRIMARY KEY,
      started_at TEXT NOT NULL,
      finished_at TEXT,
      status TEXT NOT NULL
    )`,
  ];

  for (const sql of tableSchemaSql) {
    db.prepare(sql).run();
  }

  // Older Pi installs may already have a database from a previous schema, so
  // these ALTER TABLE attempts make sync startup backward-compatible.
  try {
    db.prepare(`ALTER TABLE lessons ADD COLUMN description TEXT`).run();
  } catch {}

  try {
    db.prepare(`ALTER TABLE files ADD COLUMN mime_type TEXT`).run();
  } catch {}

  try {
    db.prepare(`ALTER TABLE files ADD COLUMN local_path TEXT`).run();
  } catch {}

  try {
    db.prepare(`ALTER TABLE files ADD COLUMN hash TEXT`).run();
  } catch {}

  try {
    db.prepare(`ALTER TABLE files ADD COLUMN created_at TEXT`).run();
  } catch {}

  try {
    db.prepare(`ALTER TABLE files ADD COLUMN updated_at TEXT`).run();
  } catch {}
}

export function insertIntoSQLite(
  db: DB,
  groups: Group[],
  lessons: Lesson[],
  files: FileRow[],
  lessonFiles: LessonFileRow[],
  lessonGroups: LessonGroupRow[],
) {
  // The cloud payload is authoritative for this hub. Apply the full graph in
  // one transaction so old lesson/classroom links cannot violate foreign keys
  // while rows are being replaced.
  const replaceAssignedGraph = db.transaction(() => {
    db.prepare("DELETE FROM lesson_files").run();
    db.prepare("DELETE FROM lesson_groups").run();

    const stmt = db.prepare(
      "INSERT OR REPLACE INTO groups (id, name, join_code) VALUES (?, ?, ?)",
    );
    for (const r of groups) stmt.run(r.id, r.name, r.join_code);

    const lessonStmt = db.prepare(
      "INSERT OR REPLACE INTO lessons (id, name, description, image_path, group_id) VALUES (?, ?, ?, ?, ?)",
    );
    for (const r of lessons) {
      lessonStmt.run(r.id, r.name, r.description, r.image_path, r.group_id);
    }

    const lessonIds = new Set(lessons.map(lesson => lesson.id));
    const fileStmt = db.prepare(
      "INSERT OR REPLACE INTO files (id, name, size_bytes, storage_path, hash, created_at, updated_at, lesson_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    );
    for (const r of files) {
      const lessonId =
        r.lesson_id !== null && lessonIds.has(r.lesson_id) ? r.lesson_id : null;
      fileStmt.run(
        r.id,
        r.name,
        r.size_bytes,
        r.storage_path,
        r.hash,
        r.created_at ?? null,
        r.updated_at ?? r.created_at ?? null,
        lessonId,
      );
    }

    if (files.length > 0) {
      const filePlaceholders = files.map(() => "?").join(",");
      db.prepare(`DELETE FROM files WHERE id NOT IN (${filePlaceholders})`).run(
        ...files.map(file => file.id),
      );
    } else {
      db.prepare("DELETE FROM files").run();
    }

    if (lessons.length > 0) {
      const lessonPlaceholders = lessons.map(() => "?").join(",");
      db.prepare(
        `DELETE FROM lessons WHERE id NOT IN (${lessonPlaceholders})`,
      ).run(...lessons.map(lesson => lesson.id));
    } else {
      db.prepare("DELETE FROM lessons").run();
    }

    if (groups.length > 0) {
      const groupPlaceholders = groups.map(() => "?").join(",");
      db.prepare(
        `DELETE FROM groups WHERE id NOT IN (${groupPlaceholders})`,
      ).run(...groups.map(group => group.id));
    } else {
      db.prepare("DELETE FROM groups").run();
    }

    const lessonFileStmt = db.prepare(
      "INSERT OR REPLACE INTO lesson_files (lesson_id, file_id) VALUES (?, ?)",
    );
    for (const r of lessonFiles) {
      lessonFileStmt.run(r.lesson_id, r.file_id);
    }

    const lessonGroupStmt = db.prepare(
      "INSERT OR REPLACE INTO lesson_groups (lesson_id, group_id) VALUES (?, ?)",
    );
    for (const r of lessonGroups) {
      lessonGroupStmt.run(r.lesson_id, r.group_id);
    }
  });

  replaceAssignedGraph();
}

export function startLocalSyncRun(db: DB, startedAt: string) {
  // The local sync_runs table records every sync attempt on the Pi, including
  // manual syncs that may not have a matching cloud sync_run row.
  return db
    .prepare("INSERT INTO sync_runs (started_at, status) VALUES (?, ?)")
    .run(startedAt, "running").lastInsertRowid;
}

export function finishLocalSyncRun(
  db: DB,
  runId: number | bigint,
  finishedAt: string,
  status: "success" | "failed",
) {
  // Finish status is written at the end of runSync or in the catch block so
  // local history shows whether the last attempt completed or failed.
  db.prepare(
    "UPDATE sync_runs SET finished_at = ?, status = ? WHERE id = ?",
  ).run(finishedAt, status, runId);
}
