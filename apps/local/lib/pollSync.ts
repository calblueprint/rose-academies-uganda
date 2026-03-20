import supabase from "@/api/supabase/client";

const DEVICE_ID = "nathans-pi"; // hardcoded for now

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
    console.log("Polling for sync...", new Date().toLocaleTimeString());

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
      return;
    }

    const pendingRun = data as PendingSyncRun;

    if (isTriggeringSync) {
      console.log("Sync trigger already in progress.");
      return;
    }

    isTriggeringSync = true;

    try {
      console.log(`SYNC REQUEST DETECTED: ${pendingRun.id}`);

      const response = await fetch(`/api/sync?syncRunId=${pendingRun.id}`);

      if (!response.ok) {
        console.error("Local sync route failed:", response.status);
        return;
      }

      console.log(`SYNC FINISHED: ${pendingRun.id}`);
    } catch (err) {
      console.error("Error triggering local sync:", err);
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
