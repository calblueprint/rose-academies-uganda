import type { LocalFile } from "@/types/schema";
import { getSupabaseBrowserClient } from "@/api/supabase/browser";
import { getCurrentUserOrThrow } from "@/lib/getCurrentUser";

const DEFAULT_MAX_LESSON_FILE_SIZE_MB = 50;

function resolveMaxLessonFileSizeMb() {
  const configuredLimit = Number(
    process.env.NEXT_PUBLIC_MAX_LESSON_FILE_SIZE_MB,
  );

  return Number.isFinite(configuredLimit) && configuredLimit > 0
    ? configuredLimit
    : DEFAULT_MAX_LESSON_FILE_SIZE_MB;
}

export const MAX_LESSON_FILE_SIZE_MB = resolveMaxLessonFileSizeMb();
export const MAX_LESSON_FILE_SIZE_BYTES = MAX_LESSON_FILE_SIZE_MB * 1024 * 1024;

export async function hashFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

function formatUploadSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getOversizedLessonFiles(files: File[]) {
  return files.filter(file => file.size > MAX_LESSON_FILE_SIZE_BYTES);
}

export function getLessonFileSizeError(files: File[]) {
  const oversizedFiles = getOversizedLessonFiles(files);
  if (oversizedFiles.length === 0) return null;

  const maxSize = `${MAX_LESSON_FILE_SIZE_MB} MB`;
  const fileList = oversizedFiles
    .slice(0, 3)
    .map(file => `"${file.name}" (${formatUploadSize(file.size)})`)
    .join(", ");
  const remainingCount = oversizedFiles.length - 3;
  const remainingText = remainingCount > 0 ? ` and ${remainingCount} more` : "";

  return oversizedFiles.length === 1
    ? `${fileList} is too large. The current upload limit is ${maxSize}.`
    : `These files are too large: ${fileList}${remainingText}. The current upload limit is ${maxSize} per file.`;
}

function buildStorageObjectPath(userId: string, fileName: string): string {
  const normalizedFileName = fileName || "unnamed-file";
  const safeFileName = normalizedFileName.replace(/\s+/g, "_");

  return `${userId}/${safeFileName}`;
}

function inferMimeType(file: File): string | null {
  if (file.type) return file.type;

  const extension = file.name.split(".").pop()?.toLowerCase();

  const mimeByExtension: Record<string, string> = {
    apk: "application/vnd.android.package-archive",
    pps: "application/vnd.ms-powerpoint",
    ppsx: "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ppx: "application/vnd.ms-powerpoint",
  };

  return extension ? (mimeByExtension[extension] ?? null) : null;
}

async function linkFileToLesson(
  lessonId: number,
  fileId: number,
  displayOrder: number,
) {
  const supabase = getSupabaseBrowserClient();

  const { data: existingLink, error: existingLinkError } = await supabase
    .from("LessonFiles")
    .select("lesson_id")
    .eq("lesson_id", lessonId)
    .eq("file_id", fileId)
    .maybeSingle();

  if (existingLinkError) throw new Error(existingLinkError.message);

  if (existingLink) return;

  const { error } = await supabase.from("LessonFiles").insert({
    lesson_id: lessonId,
    file_id: fileId,
    display_order: displayOrder,
  });

  if (error) {
    if (error.code === "23505") return;
    throw new Error(error.message);
  }
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
  const mimeType = inferMimeType(file);

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
    await linkFileToLesson(lessonId, existingFile.id, displayOrder);

    if (!existingFile.size_bytes || !existingFile.mime_type) {
      const { data: updatedFile, error: updateError } = await supabase
        .from("Files")
        .update({
          size_bytes: existingFile.size_bytes || file.size,
          mime_type: existingFile.mime_type || mimeType,
        })
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
      mime_type: mimeType,
    })
    .select()
    .single();

  if (fileError) throw new Error(fileError.message);

  await linkFileToLesson(lessonId, fileRow.id, displayOrder);

  return fileRow as LocalFile;
}
