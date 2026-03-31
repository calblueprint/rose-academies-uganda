import { getCurrentUserOrThrow } from "@/lib/getCurrentUser";
import { getSupabaseServerClient } from "../api/supabase/server";

export async function getLessonSizeBytes(lessonId: number): Promise<number> {
  const supabase = await getSupabaseServerClient();
  const user = await getCurrentUserOrThrow();

  const { data, error } = await supabase
    .from("Files")
    .select("size_bytes")
    .eq("lesson_id", lessonId)
    .eq("user_id", user.id);

  if (error) throw error;

  let size = 0;
  for (let i = 0; i < data.length; i++) {
    size += data[i].size_bytes;
  }

  return size;
}
