"use client";

import supabase from "@/api/supabase/client";

/**
 * This is a page with a button to flag that we are requesting a sync.
 *
 * We currently hardcode "nathans-pi". Later, we should store device IDs
 * of all of the Pis locally, then load that in instead.
 *
 * The pi should poll and detect that the supabase row for "nathans-pi"
 * is requesting a sync, and then should initiate sync.
 */
export default function TestSyncPage() {
  async function requestSync() {
    const { error } = await supabase
      .from("devices")
      .update({ sync_requested_at: new Date().toISOString() })
      .eq("id", "nathans-pi"); // this is currently hardcoded.
    if (error) {
      console.error(error);
    } else {
      console.log("Sync requested");
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={requestSync}>Request Sync</button>
    </div>
  );
}
