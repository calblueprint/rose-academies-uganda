import supabase from "@/api/supabase/client";
import { getDevicePairingCode } from "@/lib/devicePairing";

export async function updateLastSyncedAt(deviceId: string, syncedAt: string) {
  const { error } = await supabase.rpc("update_device_last_synced", {
    p_device_id: deviceId,
    p_pairing_code: getDevicePairingCode(),
    p_synced_at: syncedAt,
  });

  if (error) {
    console.error("Failed to update last synced time:", error);
    throw error;
  }
}
