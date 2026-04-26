import supabase from "@/api/supabase/client";
import { getDeviceId } from "@/lib/getDeviceId";

const DEVICE_ID = getDeviceId();
const POLL_INTERVAL_MS = 30000;
const LOCAL_APP_ORIGIN = `http://127.0.0.1:${process.env.PORT ?? "3000"}`;

let intervalId: ReturnType<typeof setInterval> | null = null;
let isPolling = false;

type PendingSyncRun = {
  id: string | number;
  status: "requested";
  requested_at: string;
};

async function pollForRequestedSync() {
  if (isPolling) {
    console.log("[PI] Sync poll already in progress.");
    return;
  }

  isPolling = true;

  try {
    console.log("[PI] Polling for sync...", new Date().toLocaleTimeString());

    const { data, error } = await supabase
      .from("sync_runs")
      .select("id, status, requested_at")
      .eq("device_id", DEVICE_ID)
      .eq("status", "requested")
      .order("requested_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("[PI] Poll error:", error);
      return;
    }

    if (!data) {
      console.log("[PI] No pending sync");
      return;
    }

    const pendingRun = data as PendingSyncRun;
    console.log("[PI] Found requested sync:", pendingRun.id);

    const { data: claimedRun, error: claimError } = await supabase
      .from("sync_runs")
      .update({ status: "in_progress" })
      .eq("id", pendingRun.id)
      .eq("status", "requested")
      .select("id")
      .maybeSingle();

    if (claimError) {
      console.error("[PI] Failed to claim sync run:", claimError);
      return;
    }

    if (!claimedRun) {
      console.log("[PI] Sync run was already claimed:", pendingRun.id);
      return;
    }

    const syncUrl = new URL("/api/sync", LOCAL_APP_ORIGIN);
    syncUrl.searchParams.set("syncRunId", String(pendingRun.id));

    const response = await fetch(syncUrl);

    if (!response.ok) {
      const body = await response.text();
      console.error("[PI] Sync route failed:", response.status, body);
      return;
    }

    console.log("[PI] Sync finished:", pendingRun.id);
  } catch (err) {
    console.error("[PI] Error polling for sync:", err);
  } finally {
    isPolling = false;
  }
}

export function startSyncPolling() {
  if (intervalId) {
    console.log("[PI] Sync polling already started.");
    return;
  }

  console.log("[PI] Starting sync polling.");
  void pollForRequestedSync();

  intervalId = setInterval(() => {
    void pollForRequestedSync();
  }, POLL_INTERVAL_MS);
}
