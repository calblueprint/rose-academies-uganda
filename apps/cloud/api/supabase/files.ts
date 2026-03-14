import type { LocalFile } from "@/types/schema";
import { getSupabaseBrowserClient } from "./browser";

async function hashFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function uploadFile(
  lessonId: number,
  file: File,
): Promise<LocalFile> {
  const supabase = getSupabaseBrowserClient();

  const hash = await hashFile(file);

  // check if a file with this hash already exists
  const { data: existingFile } = await supabase
    .from("Files")
    .select("*")
    .eq("hash", hash)
    .maybeSingle();

  if (existingFile) {
    // reuse the existing file — just link the lesson to it
    const { error } = await supabase.from("LessonFiles").insert({
      lesson_id: lessonId,
      file_id: existingFile.id,
    });

    if (error) throw error;

    return existingFile as LocalFile;
  }

  // truly new file — upload to storage
  const objectPath = `teacher-1/${file.name}`;

  const { error: storageError } = await supabase.storage
    .from("files")
    .upload(objectPath, file, { upsert: true });

  if (storageError) throw storageError;

  const { data: pub } = supabase.storage.from("files").getPublicUrl(objectPath);

  const publicUrl = pub?.publicUrl;
  if (!publicUrl) throw new Error("Failed to compute public URL");

  // create Files row with hash
  const { data: fileRow, error: fileError } = await supabase
    .from("Files")
    .insert({
      name: file.name,
      size_bytes: file.size,
      storage_path: publicUrl,
      hash,
    })
    .select()
    .single();

  if (fileError) throw fileError;

  // link lesson to file
  const { error: joinError } = await supabase.from("LessonFiles").insert({
    lesson_id: lessonId,
    file_id: fileRow.id,
  });

  if (joinError) throw joinError;

  return fileRow as LocalFile;
}
