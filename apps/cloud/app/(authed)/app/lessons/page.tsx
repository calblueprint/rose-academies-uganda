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
  const lessonIds = (lessons ?? []).map(lesson => lesson.id);

  const { data: lessonGroupRows, error: lessonGroupsError } = await supabase
    .from("LessonGroups")
    .select("lesson_id, group_id")
    .in("lesson_id", lessonIds);

  if (lessonGroupsError) {
    throw new Error(lessonGroupsError.message);
  }

  const groupIds = [
    ...new Set((lessonGroupRows ?? []).map(row => row.group_id)),
  ];

  const { data: groupRows, error: groupsError } = await supabase
    .from("Groups")
    .select("id, name")
    .in("id", groupIds);

  if (groupsError) {
    throw new Error(groupsError.message);
  }

  const groupNamesById = Object.fromEntries(
    (groupRows ?? []).map(group => [group.id, group.name]),
  );

  const villagesByLessonId: Record<number, string[]> = {};

  for (const row of lessonGroupRows ?? []) {
    const villageName = groupNamesById[row.group_id];

    if (!villageName) continue;

    if (!villagesByLessonId[row.lesson_id]) {
      villagesByLessonId[row.lesson_id] = [];
    }

    villagesByLessonId[row.lesson_id].push(villageName);
  }

  const lessonsWithVillages = (lessons ?? []).map(lesson => ({
    ...lesson,
    villages: villagesByLessonId[lesson.id] ?? [],
  }));

  // DeviceLessons stores the offline-library state for the user's Pi. The main
  // lessons dashboard uses it only to show whether each lesson is pending or
  // already available offline.
  const deviceId = await getCurrentDeviceId({ userId: user.id });
  if (!deviceId) return null;

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
      initialLessons={lessonsWithVillages}
      lessonStatuses={lessonStatuses}
      variant="dashboard"
      showSortButton
    />
  );
}
