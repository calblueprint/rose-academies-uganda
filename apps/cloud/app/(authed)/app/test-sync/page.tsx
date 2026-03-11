"use client";

import supabase from "@/api/supabase/client";

export default function TestSyncPage() {
  async function requestSync() {
    const { error } = await supabase
      .from("devices")
      .update({ sync_requested_at: new Date().toISOString() })
      .eq("id", "nathans-pi");

    if (error) {
      console.error("Failed to request sync:", error);
    } else {
      console.log("Sync requested");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <button onClick={requestSync}>Request Sync</button>
    </div>
  );
}
