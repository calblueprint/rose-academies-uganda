import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";
import { getCurrentDeviceId } from "@/lib/getCurrentUserDevice";
import LessonsClient from "./LessonsClient";

export default async function LessonsPage() {
  const supabase = await getSupabaseServerClientReadOnly();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data: lessons, error } = await supabase
    .from("Lessons")
    .select(
      "id, name, description, image_path, group_id, is_archived, created_at, updated_at",
    )
    .order("id", { ascending: true })
    .eq("is_archived", false)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  const deviceId = await getCurrentDeviceId({ userId: user.id });

  const { data: deviceLessons, error: deviceLessonsError } = await supabase
    .from("DeviceLessons")
    .select("lesson_id, status")
    .eq("device_id", deviceId);

  if (deviceLessonsError) {
    throw new Error(deviceLessonsError.message);
  }

  const lessonStatuses = Object.fromEntries(
    (deviceLessons ?? [])
      .filter(row => row.status === "available" || row.status === "pending")
      .map(row => [row.lesson_id, row.status]),
  ) as Partial<Record<number, "available" | "pending">>;

  return (
    <LessonsClient
      initialLessons={lessons ?? []}
      lessonStatuses={lessonStatuses}
      variant="dashboard"
      showSortButton
    />
  );
}
