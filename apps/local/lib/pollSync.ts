import supabase from "@/api/supabase/client";

const DEVICE_ID = "nathans-pi"; // hardcoded for now

console.log("pollSync file loaded.");

let intervalId: ReturnType<typeof setInterval> | null = null;
let isTriggeringSync = false;

export function startSyncPolling() {
  if (intervalId) {
    return () => {};
  }

  async function poll() {
    console.log("Polling for sync...", new Date().toLocaleTimeString());

    const { data, error } = await supabase
      .from("devices")
      .select("sync_requested_at")
      .eq("id", DEVICE_ID)
      .single();

    if (error) {
      console.error("Poll error:", error);
      return;
    }

    if (!data?.sync_requested_at) {
      return;
    }

    if (isTriggeringSync) {
      console.log("Sync trigger already in progress.");
      return;
    }

    isTriggeringSync = true;

    try {
      console.log("SYNC REQUEST DETECTED");

      const response = await fetch("/api/sync");

      if (!response.ok) {
        console.error("Local sync route failed:", response.status);
        return;
      }

      console.log("SYNC FINISHED");

      await supabase
        .from("devices")
        .update({ sync_requested_at: null })
        .eq("id", DEVICE_ID);
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
