import type { Group } from "@/types/schema";
import type { SupabaseClient } from "@supabase/supabase-js";

type LessonGroupRow = {
  lesson_id?: number;
  group_id: number | null;
};

type LessonRow = {
  id: number;
  name?: string;
  description?: string | null;
  group_id: number | null;
};

type LessonFileRow = {
  lesson_id: number | null;
};

type DeviceLessonRow = {
  lesson_id: number | null;
  status: string | null;
};

export type ClassroomLessonSyncStatus =
  | "available"
  | "pending"
  | "pending_removal"
  | null;

export type ClassroomLessonOverview = {
  id: number;
  name: string;
  description: string | null;
  fileCount: number;
  syncStatus: ClassroomLessonSyncStatus;
};

export type ClassroomOverview = Omit<Group, "join_code"> & {
  join_code: string | null;
  lessons: ClassroomLessonOverview[];
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

export async function fetchClassroomOverviews(
  supabase: SupabaseClient,
  userId: string,
  deviceId?: string | null,
): Promise<ClassroomOverview[]> {
  const classrooms = await fetchVisibleClassrooms(supabase, userId);

  const { data: lessonsData, error: lessonsError } = await supabase
    .from("Lessons")
    .select("id, name, description, group_id")
    .eq("user_id", userId)
    .eq("is_archived", false);

  if (lessonsError) throw lessonsError;

  const lessons = (lessonsData ?? []) as {
    id: number;
    name: string;
    description: string | null;
    group_id: number | null;
  }[];
  const lessonIds = lessons.map(lesson => lesson.id);

  const { data: lessonGroupsData, error: lessonGroupsError } =
    lessonIds.length > 0
      ? await supabase
          .from("LessonGroups")
          .select("lesson_id, group_id")
          .in("lesson_id", lessonIds)
      : { data: [], error: null };

  if (lessonGroupsError) throw lessonGroupsError;

  const { data: lessonFilesData, error: lessonFilesError } =
    lessonIds.length > 0
      ? await supabase
          .from("LessonFiles")
          .select("lesson_id")
          .in("lesson_id", lessonIds)
      : { data: [], error: null };

  if (lessonFilesError) throw lessonFilesError;

  const { data: deviceLessonsData, error: deviceLessonsError } = deviceId
    ? await supabase
        .from("DeviceLessons")
        .select("lesson_id, status")
        .eq("device_id", deviceId)
    : { data: [], error: null };

  if (deviceLessonsError) throw deviceLessonsError;

  const classroomIdsByLessonId = new Map<number, Set<number>>();

  for (const lesson of lessons) {
    if (
      typeof lesson.group_id === "number" &&
      Number.isInteger(lesson.group_id)
    ) {
      classroomIdsByLessonId.set(lesson.id, new Set([lesson.group_id]));
    }
  }

  for (const row of (lessonGroupsData ?? []) as LessonGroupRow[]) {
    if (typeof row.lesson_id !== "number" || typeof row.group_id !== "number") {
      continue;
    }

    const classroomIds =
      classroomIdsByLessonId.get(row.lesson_id) ?? new Set<number>();
    classroomIds.add(row.group_id);
    classroomIdsByLessonId.set(row.lesson_id, classroomIds);
  }

  const fileCountByLessonId = new Map<number, number>();

  for (const row of (lessonFilesData ?? []) as LessonFileRow[]) {
    if (typeof row.lesson_id !== "number") continue;

    fileCountByLessonId.set(
      row.lesson_id,
      (fileCountByLessonId.get(row.lesson_id) ?? 0) + 1,
    );
  }

  const syncStatusByLessonId = new Map<number, ClassroomLessonSyncStatus>();

  for (const row of (deviceLessonsData ?? []) as DeviceLessonRow[]) {
    if (typeof row.lesson_id !== "number") continue;
    if (
      row.status !== "available" &&
      row.status !== "pending" &&
      row.status !== "pending_removal"
    ) {
      continue;
    }

    syncStatusByLessonId.set(row.lesson_id, row.status);
  }

  const lessonOverviews = lessons.map(lesson => ({
    id: lesson.id,
    name: lesson.name,
    description: lesson.description ?? null,
    fileCount: fileCountByLessonId.get(lesson.id) ?? 0,
    syncStatus: syncStatusByLessonId.get(lesson.id) ?? null,
    classroomIds: classroomIdsByLessonId.get(lesson.id) ?? new Set<number>(),
  }));

  return classrooms.map(classroom => ({
    ...classroom,
    lessons: lessonOverviews
      .filter(lesson => lesson.classroomIds.has(classroom.id))
      .sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
      )
      .map(lesson => ({
        id: lesson.id,
        name: lesson.name,
        description: lesson.description,
        fileCount: lesson.fileCount,
        syncStatus: lesson.syncStatus,
      })),
  }));
}
