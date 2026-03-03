import type { LocalFile } from "@/types/schema";
import { getSupabaseBrowserClient } from "./browser";

export async function uploadFile(
  lessonId: number,
  file: File,
): Promise<LocalFile> {
  const supabase = getSupabaseBrowserClient();

  const objectPath = `lesson_${lessonId}/${file.name}`;

  const { error: storageError } = await supabase.storage
    .from("lesson-files")
    .upload(objectPath, file, { upsert: true });

  if (storageError) throw storageError;

  const { data: pub } = supabase.storage
    .from("lesson-files")
    .getPublicUrl(objectPath);

  const publicUrl = pub?.publicUrl;
  if (!publicUrl) {
    throw new Error("Failed to compute public URL for uploaded file.");
  }

  const { data, error: insertError } = await supabase
    .from("Files")
    .insert({
      name: file.name,
      size_bytes: file.size,
      storage_path: publicUrl,
      lesson_id: lessonId,
    })
    .select()
    .single();

  if (insertError) throw insertError;

  return data as LocalFile;
}
