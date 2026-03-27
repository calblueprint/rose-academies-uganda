import { getSupabaseBrowserClient } from "./browser";

export async function uploadLessonImage(
  lessonId: number,
  file: File,
): Promise<string> {
  const supabase = getSupabaseBrowserClient();

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `lessons/${lessonId}/cover.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("lesson-images")
    .upload(path, file, { upsert: true });

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("lesson-images").getPublicUrl(path);

  const { error: updateError } = await supabase
    .from("Lessons")
    .update({ image_path: publicUrl })
    .eq("id", lessonId);

  if (updateError) throw updateError;

  return publicUrl;
}
