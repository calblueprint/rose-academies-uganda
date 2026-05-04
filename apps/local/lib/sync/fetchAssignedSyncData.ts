import type {
  DeviceLessonRow,
  FileRow,
  Group,
  Lesson,
  LessonFileRow,
  SyncPayload,
} from "@/lib/sync/types";
import supabase from "@/api/supabase/client";

// The Pi only syncs lessons assigned to its device record in Supabase. This
// function gathers that device-scoped lesson graph so the local database does
// not download every lesson in the cloud app.
export async function fetchAssignedSyncData(
  deviceId: string, // pass in deviceId
): Promise<SyncPayload> {
  console.log("[SYNC] Fetching assigned lessons for device:", deviceId);

  // DeviceLessons is the source of truth for what this Pi should keep offline.
  // We start there instead of Lessons so removed assignments disappear locally
  // during the prune step in runSync.
  const { data: deviceLessons, error: deviceLessonsError } = await supabase
    .from("DeviceLessons")
    .select("lesson_id, status")
    .eq("device_id", deviceId);

  if (deviceLessonsError) {
    throw new Error(deviceLessonsError.message);
  }

  // We get the lessonIDs here.
  const lessonIds = Array.from(
    new Set(
      ((deviceLessons ?? []) as DeviceLessonRow[])
        .map(row => row.lesson_id)
        .filter((lessonId): lessonId is number => Number.isInteger(lessonId)),
    ),
  );

  if (lessonIds.length === 0) {
    // Returning an empty payload lets the rest of the sync pipeline clear local
    // lessons without special-casing an unassigned device.
    console.log("[SYNC] No assigned lessons found for device");
    return {
      groups: [],
      lessons: [],
      files: [],
      lessonFiles: [],
    };
  }

  const { data: lessons, error: lessonError } = await supabase
    .from("Lessons")
    .select("id, name, description, image_path, group_id")
    .in("id", lessonIds);

  if (lessonError) {
    throw new Error(lessonError.message);
  }

  // If DeviceLessons points at missing lesson rows, the sync should stop
  // instead of silently producing an incomplete offline library.
  const typedLessons = (lessons ?? []) as Lesson[];
  const returnedLessonIds = new Set(typedLessons.map(lesson => lesson.id));

  // Count how many missing lesson IDs.
  const missingLessonIds = lessonIds.filter(
    lessonId => !returnedLessonIds.has(lessonId),
  );

  if (missingLessonIds.length > 0) {
    throw new Error(
      `DeviceLessons references missing lessons: ${missingLessonIds.join(", ")}`,
    );
  }

  // LessonFiles is a join table because one uploaded file can belong to more
  // than one lesson. Fetching through it avoids duplicate file downloads.
  const { data: lessonFilesData, error: lessonFilesError } = await supabase
    .from("LessonFiles")
    .select("lesson_id, file_id")
    .in("lesson_id", lessonIds);

  if (lessonFilesError) {
    throw new Error(lessonFilesError.message);
  }

  const lessonFiles = (lessonFilesData ?? []) as LessonFileRow[];

  const fileIds = Array.from(
    new Set(
      lessonFiles
        .map(row => row.file_id)
        .filter((fileId): fileId is number => Number.isInteger(fileId)),
    ),
  );

  // Fetch files only after collecting the unique file IDs referenced by the
  // assigned lessons. Lessons with no files are still valid and sync normally.
  let files: FileRow[] = [];
  if (fileIds.length > 0) {
    // Get the actual files, or throw an error if there are any.
    const { data: filesData, error: fileError } = await supabase
      .from("Files")
      .select("id, name, size_bytes, storage_path, lesson_id")
      .in("id", fileIds);

    if (fileError) {
      throw new Error(fileError.message);
    }

    // Missing file rows indicate a broken LessonFiles reference. Failing here
    // prevents SQLite from recording lesson-file links that cannot be opened.
    files = (filesData ?? []) as FileRow[];

    const returnedFileIds = new Set(files.map(file => file.id));
    const missingFileIds = fileIds.filter(
      fileId => !returnedFileIds.has(fileId),
    );

    if (missingFileIds.length > 0) {
      throw new Error(
        `LessonFiles references missing files: ${missingFileIds.join(", ")}`,
      );
    }
  }

  const groupIds = Array.from(
    new Set(
      typedLessons
        .map(lesson => lesson.group_id)
        .filter((groupId): groupId is number => Number.isInteger(groupId)),
    ),
  );

  // Groups are fetched last because they are only needed for the lessons that
  // actually survived the device assignment lookup.
  let groups: Group[] = [];
  if (groupIds.length > 0) {
    const { data: groupsData, error: groupError } = await supabase
      .from("Groups")
      .select("id, name, join_code")
      .in("id", groupIds);

    if (groupError) {
      throw new Error(groupError.message);
    }

    // A missing group means the lesson metadata is inconsistent, so we fail the
    // sync rather than storing a lesson whose classroom cannot be shown.
    groups = (groupsData ?? []) as Group[];

    const returnedGroupIds = new Set(groups.map(group => group.id));
    const missingGroupIds = groupIds.filter(
      groupId => !returnedGroupIds.has(groupId),
    );

    if (missingGroupIds.length > 0) {
      throw new Error(
        `Lessons reference missing groups: ${missingGroupIds.join(", ")}`,
      );
    }
  }

  console.log("[SYNC] Device-scoped fetch complete:", {
    lessonIds: lessonIds.length,
    lessons: typedLessons.length,
    lessonFiles: lessonFiles.length,
    files: files.length,
    groups: groups.length,
  });

  return {
    groups,
    lessons: typedLessons,
    files,
    lessonFiles,
  };
}
