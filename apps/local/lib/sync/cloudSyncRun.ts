import type {
  CloudSyncRunId,
  SyncRunStatus,
  SyncStage,
} from "@/lib/sync/types";
import supabase from "@/api/supabase/client";

// Cloud-initiated syncs create a sync_runs row in Supabase before the Pi starts
// working. This helper keeps that cloud row in sync with the Pi's local status
// so the dashboard can show whether the request is running, succeeded, or failed.
export async function updateCloudSyncRun(
  syncRunId: CloudSyncRunId,
  payload: {
    status: SyncRunStatus;
    stage?: SyncStage | null;
    started_at?: string;
    completed_at?: string;
    error_message?: string | null;
  },
) {
  console.log("[SYNC] Updating cloud sync run:", { syncRunId, payload });

  // The local sync process is the source of truth for completion details, so it
  // writes timestamps and any failure message back to the matching cloud row.
  const { error } = await supabase
    .from("sync_runs")
    .update(payload)
    .eq("id", syncRunId);

  if (error) {
    console.error("[SYNC] Failed updating cloud sync run:", error);
    throw error;
  }
}
