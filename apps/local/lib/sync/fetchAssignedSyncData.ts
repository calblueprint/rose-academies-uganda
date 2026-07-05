import type { SyncPayload } from "@/lib/sync/types";
import supabase from "@/api/supabase/client";
import { getDevicePairingCode } from "@/lib/devicePairing";

// The Pi only syncs lessons assigned to its device record in Supabase. This
// function gathers that device-scoped lesson graph so the local database does
// not download every lesson in the cloud app.
export async function fetchAssignedSyncData(
  deviceId: string, // pass in deviceId
): Promise<SyncPayload> {
  console.log("[SYNC] Fetching assigned lessons for device:", deviceId);

  const { data, error } = await supabase.rpc("get_device_sync_payload", {
    p_device_id: deviceId,
    p_pairing_code: getDevicePairingCode(),
  });

  if (error) {
    throw new Error(error.message);
  }

  const payload = (data ?? {
    groups: [],
    lessons: [],
    files: [],
    lessonFiles: [],
    lessonGroups: [],
  }) as SyncPayload;

  console.log("[SYNC] Device-scoped fetch complete:", {
    lessons: payload.lessons.length,
    lessonFiles: payload.lessonFiles.length,
    lessonGroups: payload.lessonGroups.length,
    files: payload.files.length,
    groups: payload.groups.length,
  });

  return payload;
}
