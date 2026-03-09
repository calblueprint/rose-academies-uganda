import supabase from "@/api/supabase/client";

const DEVICE_ID = "nathans-pi"; // hardcoded for now

console.log("pollSync file loaded.");

export function startSyncPolling() {
  async function poll() {
    console.log("Polling for sync...");

    const { data, error } = await supabase
      .from("devices")
      .select("sync_requested_at")
      .eq("id", DEVICE_ID)
      .single();

    if (error) {
      console.error("Poll error:", error);
      return;
    }

    if (data?.sync_requested_at) {
      console.log("SYNC STARTED");

      // We clear the request so that sync doesn't run multiple times.
      await supabase
        .from("devices")
        .update({ sync_requested_at: null })
        .eq("id", DEVICE_ID);

      // This currently does not actually run our sync -- it just prints to console.
    }
  }

  // Run poll once immediately.
  poll();

  // We currently have it set to poll every 30 seconds, but we can
  // change this in the future.
  setInterval(poll, 30000);
}
