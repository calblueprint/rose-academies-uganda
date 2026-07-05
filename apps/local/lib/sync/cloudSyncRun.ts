import type {
  CloudSyncRunId,
  SyncRunStatus,
  SyncStage,
} from "@/lib/sync/types";
import supabase from "@/api/supabase/client";
import { getDevicePairingCode } from "@/lib/devicePairing";
import { getDeviceId } from "@/lib/getDeviceId";

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
  const { error } = await supabase.rpc("update_device_sync_run", {
    p_device_id: getDeviceId(),
    p_pairing_code: getDevicePairingCode(),
    p_sync_run_id: String(syncRunId),
    p_status: payload.status,
    p_stage: payload.stage ?? null,
    p_started_at: payload.started_at ?? null,
    p_completed_at: payload.completed_at ?? null,
    p_error_message: payload.error_message ?? null,
  });

  if (error) {
    console.error("[SYNC] Failed updating cloud sync run:", error);
    throw error;
  }
}
