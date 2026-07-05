import supabase from "@/api/supabase/client";
import { getDevicePairingCode } from "@/lib/devicePairing";
import { getDeviceId } from "@/lib/getDeviceId";

const DEVICE_ID = getDeviceId();
const POLL_INTERVAL_MS = 30000;
const LOCAL_APP_ORIGIN = `http://127.0.0.1:${process.env.PORT ?? "3000"}`;

// The Pi polls Supabase because the cloud app cannot directly call a Raspberry
// Pi that is usually behind a local network or offline from the public internet.
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

    const { data, error } = await supabase.rpc("claim_requested_sync_run", {
      p_device_id: DEVICE_ID,
      p_pairing_code: getDevicePairingCode(),
    });

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

    const syncUrl = new URL("/api/sync", LOCAL_APP_ORIGIN);
    syncUrl.searchParams.set("syncRunId", String(pendingRun.id));

    // Calling the local API route reuses the same sync path as a manual local
    // sync request, including status updates and all-or-nothing file staging.
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
  // Poll once immediately so a requested sync does not wait for the first
  // interval tick after the local server starts.
  void pollForRequestedSync();

  intervalId = setInterval(() => {
    void pollForRequestedSync();
  }, POLL_INTERVAL_MS);
}
