"use server";

import { getSupabaseServerClient } from "@/api/supabase/server";

type DeleteLessonFilesInput = {
  lessonId: number;
  fileIds: string[];
};

type ReorderLessonFilesInput = {
  lessonId: number;
  orderedFileIds: string[];
};

export async function deleteLessonFilesAction({
  lessonId,
  fileIds,
}: DeleteLessonFilesInput) {
  if (fileIds.length === 0) {
    return { success: true };
  }

  const supabase = await getSupabaseServerClient();

  const numericFileIds = fileIds.map(fileId => Number(fileId));

  if (numericFileIds.some(fileId => Number.isNaN(fileId))) {
    throw new Error("Invalid file ids");
  }

  const { error } = await supabase
    .from("LessonFiles")
    .delete()
    .eq("lesson_id", lessonId)
    .in("file_id", numericFileIds);

  if (error) {
    throw new Error(error.message);
  }

  await supabase
    .from("Lessons")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", lessonId);

  return { success: true };
}

export async function reorderLessonFilesAction({
  lessonId,
  orderedFileIds,
}: ReorderLessonFilesInput) {
  if (orderedFileIds.length === 0) {
    return { success: true };
  }

  const supabase = await getSupabaseServerClient();

  const numericFileIds = orderedFileIds.map(fileId => Number(fileId));

  if (numericFileIds.some(fileId => Number.isNaN(fileId))) {
    throw new Error("Invalid file ids");
  }

  for (let index = 0; index < numericFileIds.length; index += 1) {
    const fileId = numericFileIds[index];

    const { error } = await supabase
      .from("LessonFiles")
      .update({ display_order: index })
      .eq("lesson_id", lessonId)
      .eq("file_id", fileId);

    if (error) {
      throw new Error(error.message);
    }
  }

  return { success: true };
}
