import path from "path";
import Database from "better-sqlite3";
import { inspectLocalFile } from "@/lib/offline/fileIntegrity";

export type OfflineReadinessIssueType =
  | "database"
  | "missing_file"
  | "unreadable_file"
  | "size_mismatch"
  | "hash_mismatch";

export type OfflineReadinessIssue = {
  type: OfflineReadinessIssueType;
  fileId?: number;
  fileName?: string;
  message: string;
};

export type OfflineReadinessReport = {
  ready: boolean;
  checkedAt: string;
  groups: number;
  lessons: number;
  expectedFiles: number;
  readableFiles: number;
  sizeVerifiedFiles: number;
  hashVerifiedFiles: number;
  lastSuccessfulSync: string | null;
  issues: OfflineReadinessIssue[];
};

type ManifestFile = {
  id: number;
  name: string;
  size_bytes: number | null;
  hash: string | null;
  local_path: string | null;
};

function emptyReport(issue: string): OfflineReadinessReport {
  return {
    ready: false,
    checkedAt: new Date().toISOString(),
    groups: 0,
    lessons: 0,
    expectedFiles: 0,
    readableFiles: 0,
    sizeVerifiedFiles: 0,
    hashVerifiedFiles: 0,
    lastSuccessfulSync: null,
    issues: [{ type: "database", message: issue }],
  };
}

export async function verifyOfflineReadiness(): Promise<OfflineReadinessReport> {
  const databasePath =
    process.env.ROSE_DB_PATH ??
    path.join(process.cwd(), "rose-academies-uganda.db");
  let db: Database.Database | null = null;

  try {
    db = new Database(databasePath, {
      readonly: true,
      fileMustExist: true,
    });

    const tableRows = db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('groups', 'lessons', 'files', 'lesson_files', 'sync_runs')",
      )
      .all() as { name: string }[];
    const tables = new Set(tableRows.map(row => row.name));
    const requiredTables = ["groups", "lessons", "files", "lesson_files"];

    if (requiredTables.some(table => !tables.has(table))) {
      return emptyReport(
        "The offline library has not completed its first sync.",
      );
    }

    const fileColumns = new Set(
      (db.prepare("PRAGMA table_info(files)").all() as { name: string }[]).map(
        column => column.name,
      ),
    );
    const hashExpression = fileColumns.has("hash") ? "f.hash" : "NULL";
    const localPathExpression = fileColumns.has("local_path")
      ? "f.local_path"
      : "NULL";
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
    const expectedFileIds = (
      db
        .prepare("SELECT COUNT(DISTINCT file_id) AS count FROM lesson_files")
        .get() as { count: number }
    ).count;
    const manifestFiles = db
      .prepare(
        `SELECT DISTINCT f.id, f.name, f.size_bytes, ${hashExpression} AS hash, ${localPathExpression} AS local_path
         FROM files f
         INNER JOIN lesson_files lf ON lf.file_id = f.id
         ORDER BY f.id`,
      )
      .all() as ManifestFile[];
    const lastSuccessfulSync = tables.has("sync_runs")
      ? ((
          db
            .prepare(
              "SELECT finished_at FROM sync_runs WHERE status = 'success' ORDER BY id DESC LIMIT 1",
            )
            .get() as { finished_at: string | null } | undefined
        )?.finished_at ?? null)
      : null;

    db.close();
    db = null;

    const issues: OfflineReadinessIssue[] = [];
    let readableFiles = 0;
    let sizeVerifiedFiles = 0;
    let hashVerifiedFiles = 0;

    if (manifestFiles.length !== expectedFileIds) {
      issues.push({
        type: "database",
        message:
          "The offline manifest references file records that are missing from the local database.",
      });
    }

    for (const file of manifestFiles) {
      if (!file.local_path) {
        issues.push({
          type: "missing_file",
          fileId: file.id,
          fileName: file.name,
          message: `${file.name} has not been downloaded.`,
        });
        continue;
      }

      let inspection: Awaited<ReturnType<typeof inspectLocalFile>>;

      try {
        inspection = await inspectLocalFile(file.local_path);
        readableFiles += 1;
      } catch {
        issues.push({
          type: "unreadable_file",
          fileId: file.id,
          fileName: file.name,
          message: `${file.name} is missing or cannot be read.`,
        });
        continue;
      }

      if (
        file.size_bytes !== null &&
        inspection.sizeBytes !== file.size_bytes
      ) {
        issues.push({
          type: "size_mismatch",
          fileId: file.id,
          fileName: file.name,
          message: `${file.name} did not download completely.`,
        });
        continue;
      }

      if (file.size_bytes !== null) sizeVerifiedFiles += 1;

      if (
        file.hash &&
        inspection.sha256.toLowerCase() !== file.hash.toLowerCase()
      ) {
        issues.push({
          type: "hash_mismatch",
          fileId: file.id,
          fileName: file.name,
          message: `${file.name} did not download correctly.`,
        });
        continue;
      }

      if (file.hash) hashVerifiedFiles += 1;
    }

    if (groups === 0 || lessons === 0) {
      issues.push({
        type: "database",
        message:
          "At least one classroom and lesson must be synced for offline use.",
      });
    }

    return {
      ready: issues.length === 0,
      checkedAt: new Date().toISOString(),
      groups,
      lessons,
      expectedFiles: expectedFileIds,
      readableFiles,
      sizeVerifiedFiles,
      hashVerifiedFiles,
      lastSuccessfulSync,
      issues,
    };
  } catch (error) {
    return emptyReport(
      error instanceof Error
        ? `Unable to verify the offline library: ${error.message}`
        : "Unable to verify the offline library.",
    );
  } finally {
    db?.close();
  }
}
