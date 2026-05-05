import supabase from "@/api/supabase/client";

export async function updateLastSyncedAt(deviceId: string, syncedAt: string) {
  const { error } = await supabase
    .from("devices")
    .update({
      last_synced_at: syncedAt,
    })
    .eq("id", deviceId);

  if (error) {
    console.error("Failed to update last synced time:", error);
    throw error;
  }
}
