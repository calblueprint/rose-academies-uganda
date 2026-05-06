import type { CloudSyncRunId, DB } from "@/lib/sync/types";
import fs from "fs";
import os from "os";
import path from "path";
import Database from "better-sqlite3";
import { getDeviceId } from "@/lib/getDeviceId";
import { updateCloudSyncRun } from "@/lib/sync/cloudSyncRun";
import { fetchAssignedSyncData } from "@/lib/sync/fetchAssignedSyncData";
import { downloadFiles, finalizeDownloadedFiles } from "@/lib/sync/fileSync";
import { pruneLocalLessons } from "@/lib/sync/pruneLocalLessons";
import { reportDeviceStorage } from "@/lib/sync/reportDeviceStorage";
import {
  createSchema,
  finishLocalSyncRun,
  insertIntoSQLite,
  startLocalSyncRun,
} from "@/lib/sync/sqliteStore";
import { updateLastSyncedAt } from "@/lib/sync/updateLastSynced";
import { updateDeviceLessonStatuses } from "@/lib/sync/updateLessonStatus";

const BUCKET = "lesson-files";
const LOCAL_DIR =
  process.env.LOCAL_FILES_DIR ?? path.join(os.homedir(), "rose-files");
const DEVICE_ID = getDeviceId();

type RunSyncOptions = {
  syncRunId?: CloudSyncRunId;
};

let isSyncRunning = false;

export function getIsSyncRunning() {
  return isSyncRunning;
}

// runSync is the local app's sync orchestrator. Helper functions have the details
// for fetching cloud data, staging files, pruning stale content, and reporting
// status so this function can show the order of the sync.
export async function runSync({ syncRunId }: RunSyncOptions = {}) {
  console.log("[SYNC] Starting runSync", { syncRunId, deviceId: DEVICE_ID });

  if (isSyncRunning) {
    return {
      ok: false,
      message: "Sync already running",
    };
  }

  // The Pi has one SQLite database and one file library, so overlapping syncs
  // could corrupt local state or race while moving staged files into place.
  isSyncRunning = true;

  let stagingDir: string | null = null;
  let runId: number | bigint | undefined;
  let startedAt = "";
  let finishedAt = "";
  let db: DB | null = null;

  try {
    fs.mkdirSync(LOCAL_DIR, { recursive: true });
    // Each sync gets its own temporary staging directory so incomplete files can
    // be removed cleanly if any part of the all-or-nothing sync fails.
    stagingDir = fs.mkdtempSync(path.join(os.tmpdir(), "rose-sync-"));

    const DB_PATH = path.join(process.cwd(), "rose-academies-uganda.db");
    db = new Database(DB_PATH);
    createSchema(db);

    startedAt = new Date().toISOString();

    if (syncRunId !== undefined) {
      await updateCloudSyncRun(syncRunId, {
        status: "in_progress",
        stage: "preparing",
        started_at: startedAt,
        error_message: null,
      });
    }

    // Local sync_runs records are kept even for locally-started syncs so the Pi
    // has its own audit trail independent of cloud connectivity.
    runId = startLocalSyncRun(db, startedAt);

    const syncPayload = await fetchAssignedSyncData(DEVICE_ID);

    pruneLocalLessons(db, syncPayload.lessons);

    if (syncRunId !== undefined) {
      await updateCloudSyncRun(syncRunId, {
        status: "in_progress",
        stage: "downloading_files",
      });
    }

    await downloadFiles(
      syncPayload.files,
      syncPayload.lessons,
      syncPayload.lessonFiles,
      stagingDir,
      BUCKET,
    );

    if (syncRunId !== undefined) {
      await updateCloudSyncRun(syncRunId, {
        status: "in_progress",
        stage: "finalizing",
      });
    }

    insertIntoSQLite(
      db,
      syncPayload.groups,
      syncPayload.lessons,
      syncPayload.files,
      syncPayload.lessonFiles,
    );

    finalizeDownloadedFiles(
      db,
      syncPayload.files,
      stagingDir,
      LOCAL_DIR,
      BUCKET,
    );

    // Staging cleanup happens only after finalization succeeds. On failure, the
    // catch block removes the same directory without touching existing files.
    fs.rmSync(stagingDir, { recursive: true, force: true });
    stagingDir = null;

    finishedAt = new Date().toISOString();

    await updateDeviceLessonStatuses(DEVICE_ID, syncPayload.lessons);
    await updateLastSyncedAt(DEVICE_ID, finishedAt);
    await reportDeviceStorage(DEVICE_ID);
    finishLocalSyncRun(db, runId, finishedAt, "success");

    if (syncRunId !== undefined) {
      await updateCloudSyncRun(syncRunId, {
        status: "success",
        stage: null,
        completed_at: finishedAt,
        error_message: null,
      });
    }

    return {
      ok: true,
      message: "Data synchronized successfully",
      runId,
      startedAt,
      finishedAt,
      syncRunId,
    };
  } catch (error) {
    console.error("[SYNC] runSync failed:", error);

    if (stagingDir) {
      fs.rmSync(stagingDir, { recursive: true, force: true });
    }

    if (db && runId !== undefined) {
      finishedAt = new Date().toISOString();

      finishLocalSyncRun(db, runId, finishedAt, "failed");
    }

    if (syncRunId !== undefined) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "The sync failed on the Raspberry Pi.";

      // A failure to report failure should not hide the original sync error, so
      // this nested update is logged separately and the function still returns.
      try {
        await updateCloudSyncRun(syncRunId, {
          status: "failed",
          stage: null,
          completed_at: new Date().toISOString(),
          error_message: errorMessage,
        });
      } catch (updateError) {
        console.error("[SYNC] Failed to update cloud sync run:", updateError);
      }
    }

    return {
      ok: false,
      message: "Error synchronizing data",
      runId,
      startedAt,
      finishedAt,
      syncRunId,
    };
  } finally {
    if (db) {
      db.close();
    }

    isSyncRunning = false;
  }
}
