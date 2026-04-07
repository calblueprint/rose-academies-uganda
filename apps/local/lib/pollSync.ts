import supabase from "@/api/supabase/client";
import { getDeviceId } from "@/lib/getDeviceId";

const DEVICE_ID = getDeviceId();

console.log("pollSync file loaded.");

let intervalId: ReturnType<typeof setInterval> | null = null;
let isTriggeringSync = false;

type PendingSyncRun = {
  id: string | number;
  status: "requested";
  requested_at: string;
};

export function startSyncPolling() {
  if (intervalId) {
    return () => {};
  }

  async function poll() {
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
      console.error("Poll error:", error);
      return;
    }

    if (!data) {
      console.log("[PI] No pending sync");
      return;
    }

    const pendingRun = data as PendingSyncRun;
    console.log("[PI] Found requested sync:", pendingRun.id);

    if (isTriggeringSync) {
      console.log("Sync trigger already in progress.");
      return;
    }

    isTriggeringSync = true;

    try {
      console.log("[PI] Triggering local sync route:", pendingRun.id);

      const response = await fetch(`/api/sync?syncRunId=${pendingRun.id}`);
      console.log("[PI] Local sync route response:", response.status);

      if (!response.ok) {
        console.error("Local sync route failed:", response.status);
        return;
      }

      console.log(`SYNC FINISHED: ${pendingRun.id}`);
    } catch (err) {
      console.error("[PI] Error triggering local sync:", err);
    } finally {
      isTriggeringSync = false;
    }
  }

  void poll();

  intervalId = setInterval(() => {
    void poll();
  }, 30000);

  return () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
}
