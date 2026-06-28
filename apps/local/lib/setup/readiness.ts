import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

export type LocalReadiness = {
  ready: boolean;
  groups: number;
  lessons: number;
};

const EMPTY_READINESS: LocalReadiness = {
  ready: false,
  groups: 0,
  lessons: 0,
};

export function getLocalReadiness(): LocalReadiness {
  const databasePath =
    process.env.ROSE_DB_PATH ??
    path.join(process.cwd(), "rose-academies-uganda.db");

  if (!fs.existsSync(databasePath)) return EMPTY_READINESS;

  let db: Database.Database | null = null;

  try {
    db = new Database(databasePath, {
      readonly: true,
      fileMustExist: true,
    });

    const tableRows = db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('groups', 'lessons')",
      )
      .all() as { name: string }[];
    const tableNames = new Set(tableRows.map(row => row.name));

    if (!tableNames.has("groups") || !tableNames.has("lessons")) {
      return EMPTY_READINESS;
    }

    const groups = (
      db.prepare("SELECT COUNT(*) AS count FROM groups").get() as {
        count: number;
      }
    ).count;
    const lessons = (
      db.prepare("SELECT COUNT(*) AS count FROM lessons").get() as {
        count: number;
      }
    ).count;

    return {
      ready: groups > 0 && lessons > 0,
      groups,
      lessons,
    };
  } catch (error) {
    console.error("[SETUP] Unable to inspect local readiness:", error);
    return EMPTY_READINESS;
  } finally {
    db?.close();
  }
}
