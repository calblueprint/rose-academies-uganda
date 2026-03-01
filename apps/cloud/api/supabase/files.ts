import { getSupabaseBrowserClient } from "./browser";
import type { LocalFile } from "@/types/schema";

/**
 * Uploads a file to Supabase Storage and inserts a corresponding row in the Files table.
 * @param lessonId - The ID of the lesson this file belongs to.
 * @param file - The browser File object to upload.
 * @returns The newly created LocalFile row.
 */
export async function uploadFile(
  lessonId: number,
  file: File,
): Promise<LocalFile> {
  const supabase = getSupabaseBrowserClient();

  const storagePath = `lessons/${lessonId}/${Date.now()}-${file.name}`;

  const { error: storageError } = await supabase.storage
    .from("lesson-files")
    .upload(storagePath, file);

  if (storageError) throw storageError;

  const { data, error: insertError } = await supabase
    .from("Files")
    .insert({
      name: file.name,
      size_bytes: file.size,
      storage_path: storagePath,
      lesson_id: lessonId,
      mime_type: file.type || null,
    })
    .select()
    .single();

  if (insertError) throw insertError;

  return data as LocalFile;
}
