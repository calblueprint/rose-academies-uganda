import type { LocalFile } from "@/types/schema";
import { getSupabaseBrowserClient } from "@/api/supabase/browser";
import { getCurrentUserOrThrow } from "@/lib/getCurrentUser";

async function hashFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function uploadFile(
  lessonId: number,
  file: File,
  displayOrder: number,
): Promise<LocalFile> {
  const supabase = getSupabaseBrowserClient();

  const user = await getCurrentUserOrThrow();

  const hash = await hashFile(file);

  const { data: existingFile, error: existingFileError } = await supabase
    .from("Files")
    .select("*")
    .eq("hash", hash)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingFileError) throw new Error(existingFileError.message);

  if (existingFile) {
    const { error } = await supabase.from("LessonFiles").insert({
      lesson_id: lessonId,
      file_id: existingFile.id,
      display_order: displayOrder,
    });

    if (error) throw new Error(error.message);

    return existingFile as LocalFile;
  }

  const objectPath = `${user.id}/${file.name}`;

  const { error: storageError } = await supabase.storage
    .from("files")
    .upload(objectPath, file, { upsert: true });

  if (storageError) throw new Error(storageError.message);

  const { data: pub } = supabase.storage.from("files").getPublicUrl(objectPath);

  const publicUrl = pub?.publicUrl;
  if (!publicUrl) throw new Error("Failed to compute public URL");

  const { data: fileRow, error: fileError } = await supabase
    .from("Files")
    .insert({
      name: file.name,
      size_bytes: file.size,
      storage_path: publicUrl,
      hash,
      user_id: user.id,
    })
    .select()
    .single();

  if (fileError) throw new Error(fileError.message);

  const { error: joinError } = await supabase.from("LessonFiles").insert({
    lesson_id: lessonId,
    file_id: fileRow.id,
    display_order: displayOrder,
  });

  if (joinError) throw new Error(joinError.message);

  return fileRow as LocalFile;
}
