import { getCurrentUserOrThrow } from "@/lib/getCurrentUser";
import { getSupabaseServerClient } from "../api/supabase/server";

export async function getLessonSizeBytes(lessonId: number): Promise<number> {
  const supabase = await getSupabaseServerClient();

  const { data: lessonFiles, error: lessonFilesError } = await supabase
    .from("LessonFiles")
    .select("file_id")
    .eq("lesson_id", lessonId);

  if (lessonFilesError) throw lessonFilesError;

  const fileIds = lessonFiles.map(row => row.file_id);

  if (fileIds.length === 0) {
    return 0;
  }

  const { data: files, error: filesError } = await supabase
    .from("Files")
    .select("size_bytes")
    .in("id", fileIds);

  if (filesError) throw filesError;

  let size = 0;
  for (let i = 0; i < files.length; i++) {
    size += files[i].size_bytes;
  }

  return size;
}
