import type { Lesson } from "@/lib/sync/types";
import supabase from "@/api/supabase/client";

// After a successful sync, every lesson assigned to this Pi is now available
// locally, so the cloud assignment status can move from pending to available.
export async function updateDeviceLessonStatuses(
  deviceId: string,
  lessons: Lesson[],
) {
  const lessonIds = lessons.map(lesson => lesson.id);

  if (lessonIds.length === 0) {
    return;
  }

  const { error } = await supabase
    .from("DeviceLessons")
    .update({
      status: "available",
    })
    .eq("device_id", deviceId)
    .in("lesson_id", lessonIds);

  if (error) {
    console.error("[SYNC] Failed to update DeviceLessons statuses:", error);
    throw error;
  }
}
