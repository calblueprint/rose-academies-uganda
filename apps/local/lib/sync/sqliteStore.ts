import type {
  DB,
  FileRow,
  Group,
  Lesson,
  LessonFileRow,
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
}

export function insertIntoSQLite(
  db: DB,
  groups: Group[],
  lessons: Lesson[],
  files: FileRow[],
  lessonFiles: LessonFileRow[],
) {
  // Each entity type is inserted in a transaction so partial writes do not leave
  // a table halfway updated if one row fails.
  const insertGroups = db.transaction((rows: Group[]) => {
    const stmt = db.prepare(
      "INSERT OR REPLACE INTO groups (id, name, join_code) VALUES (?, ?, ?)",
    );
    for (const r of rows) stmt.run(r.id, r.name, r.join_code);
  });
  insertGroups(groups);

  const insertLessons = db.transaction((rows: Lesson[]) => {
    const stmt = db.prepare(
      "INSERT OR REPLACE INTO lessons (id, name, description, image_path, group_id) VALUES (?, ?, ?, ?, ?)",
    );
    for (const r of rows) {
      stmt.run(r.id, r.name, r.description, r.image_path, r.group_id);
    }
  });
  insertLessons(lessons);

  const insertFiles = db.transaction((rows: FileRow[]) => {
    const stmt = db.prepare(
      "INSERT OR REPLACE INTO files (id, name, size_bytes, storage_path, lesson_id) VALUES (?, ?, ?, ?, ?)",
    );
    for (const r of rows) {
      stmt.run(r.id, r.name, r.size_bytes, r.storage_path, r.lesson_id);
    }
  });
  insertFiles(files);

  const insertLessonFiles = db.transaction((rows: LessonFileRow[]) => {
    const stmt = db.prepare(
      "INSERT OR REPLACE INTO lesson_files (lesson_id, file_id) VALUES (?, ?)",
    );
    for (const r of rows) {
      stmt.run(r.lesson_id, r.file_id);
    }
  });

  // LessonFiles reflects the current cloud assignment graph, so we replace the
  // local join table before inserting the latest links.
  db.prepare("DELETE FROM lesson_files").run();
  insertLessonFiles(lessonFiles);
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
