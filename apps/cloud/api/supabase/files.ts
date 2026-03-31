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
): Promise<LocalFile> {
  const supabase = getSupabaseBrowserClient();

  const user = await getCurrentUserOrThrow();

  const hash = await hashFile(file);

  const { data: existingFile } = await supabase
    .from("Files")
    .select("*")
    .eq("hash", hash)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingFile) {
    const { error } = await supabase.from("LessonFiles").insert({
      lesson_id: lessonId,
      file_id: existingFile.id,
    });

    if (error) throw error;

    return existingFile as LocalFile;
  }

  const objectPath = `${user.id}/${file.name}`;

  const { error: storageError } = await supabase.storage
    .from("files")
    .upload(objectPath, file, { upsert: true });

  if (storageError) throw storageError;

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

  if (fileError) throw fileError;

  const { error: joinError } = await supabase.from("LessonFiles").insert({
    lesson_id: lessonId,
    file_id: fileRow.id,
  });

  if (joinError) throw joinError;

  return fileRow as LocalFile;
}
