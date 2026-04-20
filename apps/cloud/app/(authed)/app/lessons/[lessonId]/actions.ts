"use server";

import { getSupabaseServerClient } from "@/api/supabase/server";

type DeleteLessonFilesInput = {
  lessonId: number;
  fileIds: string[];
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

  return { success: true };
}
