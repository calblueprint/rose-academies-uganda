import type { Lesson } from "@/lib/sync/types";
import supabase from "@/api/supabase/client";
import { getDevicePairingCode } from "@/lib/devicePairing";

// After a successful sync, every lesson assigned to this Pi is now available
// locally, so the cloud assignment status can move from pending to available.
// Rows queued for removal are deleted only after this successful sync, which
// keeps the dashboard honest until the Classroom Hub has actually removed them.
export async function updateDeviceLessonStatuses(
  deviceId: string,
  lessons: Lesson[],
) {
  const lessonIds = lessons.map(lesson => lesson.id);

  const { error } = await supabase.rpc("complete_device_lesson_sync", {
    p_device_id: deviceId,
    p_pairing_code: getDevicePairingCode(),
    p_lesson_ids: lessonIds,
  });

  if (error) {
    console.error("[SYNC] Failed to update DeviceLessons statuses:", error);
    throw error;
  }
}
