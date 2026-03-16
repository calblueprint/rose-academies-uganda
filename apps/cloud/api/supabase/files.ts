import type { LocalFile } from "@/types/schema";
import { getSupabaseBrowserClient } from "./browser";

export async function uploadFile(
  lessonId: number,
  file: File,
): Promise<LocalFile> {
  const supabase = getSupabaseBrowserClient();

  // check if file already exists
  const { data: existingFile } = await supabase
    .from("Files")
    .select("*")
    .eq("name", file.name)
    .eq("size_bytes", file.size)
    .maybeSingle();

  if (existingFile) {
    // just link the lesson to the file
    const { error } = await supabase.from("LessonFiles").insert({
      lesson_id: lessonId,
      file_id: existingFile.id,
    });

    if (error) throw error;

    return existingFile as LocalFile;
  }

  // upload new file
  const objectPath = `teacher-1/${file.name}`;

  const { error: storageError } = await supabase.storage
    .from("files")
    .upload(objectPath, file, { upsert: true });

  if (storageError) throw storageError;

  const { data: pub } = supabase.storage.from("files").getPublicUrl(objectPath);

  const publicUrl = pub?.publicUrl;
  if (!publicUrl) throw new Error("Failed to compute public URL");

  // create file row
  const { data: fileRow, error: fileError } = await supabase
    .from("Files")
    .insert({
      name: file.name,
      size_bytes: file.size,
      storage_path: publicUrl,
    })
    .select()
    .single();

  if (fileError) throw fileError;

  // link lesson + file
  const { error: joinError } = await supabase.from("LessonFiles").insert({
    lesson_id: lessonId,
    file_id: fileRow.id,
  });

  if (joinError) throw joinError;

  return fileRow as LocalFile;
}
