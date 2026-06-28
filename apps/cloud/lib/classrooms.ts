import type { Group } from "@/types/schema";
import type { SupabaseClient } from "@supabase/supabase-js";

type LessonGroupRow = {
  group_id: number | null;
};

type LessonRow = {
  id: number;
  group_id: number | null;
};

export async function fetchVisibleClassrooms(
  supabase: SupabaseClient,
  userId: string,
) {
  const { data: lessonsData, error: lessonsError } = await supabase
    .from("Lessons")
    .select("id, group_id")
    .eq("user_id", userId);

  if (lessonsError) throw lessonsError;

  const lessons = (lessonsData ?? []) as LessonRow[];
  const lessonIds = lessons.map(lesson => lesson.id);
  const assignedGroupIds = new Set(
    lessons
      .map(lesson => lesson.group_id)
      .filter((groupId): groupId is number => Number.isInteger(groupId)),
  );

  if (lessonIds.length > 0) {
    const { data: lessonGroupsData, error: lessonGroupsError } = await supabase
      .from("LessonGroups")
      .select("group_id")
      .in("lesson_id", lessonIds);

    if (lessonGroupsError) throw lessonGroupsError;

    for (const row of (lessonGroupsData ?? []) as LessonGroupRow[]) {
      if (typeof row.group_id === "number" && Number.isInteger(row.group_id)) {
        assignedGroupIds.add(row.group_id);
      }
    }
  }

  const ownedClassroomsRequest = supabase
    .from("Groups")
    .select("id, name, join_code, user_id")
    .eq("user_id", userId);

  const assignedClassroomsRequest =
    assignedGroupIds.size > 0
      ? supabase
          .from("Groups")
          .select("id, name, join_code, user_id")
          .in("id", [...assignedGroupIds])
      : Promise.resolve({ data: [], error: null });

  const [
    { data: ownedClassrooms, error: ownedError },
    { data: assignedClassrooms, error: assignedError },
  ] = await Promise.all([ownedClassroomsRequest, assignedClassroomsRequest]);

  if (ownedError) throw ownedError;
  if (assignedError) throw assignedError;

  const classroomsById = new Map<number, Group>();

  for (const classroom of [
    ...((ownedClassrooms ?? []) as Group[]),
    ...((assignedClassrooms ?? []) as Group[]),
  ]) {
    classroomsById.set(classroom.id, classroom);
  }

  return [...classroomsById.values()].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
  );
}
