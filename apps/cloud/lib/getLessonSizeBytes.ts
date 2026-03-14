import { getSupabaseServerClient } from "../api/supabase/server";

export async function lessonFileSize(lessonId: number): Promise<number> {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from("Files")
    .select("size_bytes")
    .eq("lesson_id", lessonId);

  if (error) throw error;

  let size = 0;
  for (let i = 0; i < data.length; i++) {
    size += data[i].size_bytes;
  }

  return size;
}
