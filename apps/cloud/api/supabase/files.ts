import type { LocalFile } from "@/types/schema";
import { getSupabaseBrowserClient } from "@/api/supabase/browser";
import { getCurrentUserOrThrow } from "@/lib/getCurrentUser";

export async function hashFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

function buildStorageObjectPath(userId: string, fileName: string): string {
  const normalizedFileName = fileName || "unnamed-file";
  const safeFileName = normalizedFileName.replace(/\s+/g, "_");

  return `${userId}/${safeFileName}`;
}

/**
 * Uploads a file and associates it with a lesson.
 *
 * Flow:
 * 1. Compute file hash (for deduplication)
 * 2. Check if file already exists for this user
 * 3. If it exists:
 *    - Reuse existing file record
 *    - Just create a LessonFiles link
 * 4. If it does NOT exist:
 *    - Upload file to storage
 *    - Insert file metadata into DB
 *    - Link file to lesson
 */

export async function uploadFile(
  lessonId: number,
  file: File,
  displayOrder: number,
): Promise<LocalFile> {
  const supabase = getSupabaseBrowserClient();

  const user = await getCurrentUserOrThrow();

  const hash = await hashFile(file);

  // Check if this exact file (same hash) already exists for the user
  const { data: existingFile, error: existingFileError } = await supabase
    .from("Files")
    .select("*")
    .eq("hash", hash)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingFileError) throw new Error(existingFileError.message);

  /**
   * CASE 1: File already exists
   * - Do not upload again
   * - Just link it to the lesson
   */
  if (existingFile) {
    const { error } = await supabase.from("LessonFiles").insert({
      lesson_id: lessonId,
      file_id: existingFile.id,
      display_order: displayOrder,
    });

    if (error) throw new Error(error.message);

    if (!existingFile.size_bytes) {
      const { data: updatedFile, error: updateError } = await supabase
        .from("Files")
        .update({ size_bytes: file.size })
        .eq("id", existingFile.id)
        .select()
        .single();

      if (updateError) throw new Error(updateError.message);

      return updatedFile as LocalFile;
    }

    return existingFile as LocalFile;
  }

  /**
   * CASE 2: File does NOT exist
   * - Upload to storage
   * - Create DB record
   * - Link to lesson
   */
  const objectPath = buildStorageObjectPath(user.id, file.name);

  const { error: storageError } = await supabase.storage
    .from("files")
    .upload(objectPath, file, { upsert: true });

  if (storageError) {
    throw new Error(
      `Storage upload failed for key "${objectPath}": ${storageError.message}`,
    );
  }

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
