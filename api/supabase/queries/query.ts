import {
  downloadFile,
  fetchAllCourses,
  fetchAllFiles,
  fetchAllModules,
} from "@/api/canvas/queries/query";
import { CanvasFile, CanvasModule, File, Lesson } from "@/types/schema";
import supabase from "../client";

/**
 * Updates/inserts Canvas courses into the "Groups" table.
 */
export async function updateCourses() {
  const courses = (await fetchAllCourses()).map(course => ({
    id: course.id,
    join_code: course.course_code,
    name: course.name,
  }));

  const { error } = await supabase.from("Groups").upsert(courses);

  if (error) {
    console.error("Upsert error:", error);
  }
}

/**
 * Fetches modules from Canvas and updates the Lessons table in Supabase.
 * @param groupId - Canvas course ID
 */
export async function updateLessons(groupId: number) {
  const modules = await fetchAllModules(groupId);

  const lessons = modules.map((module: CanvasModule) => ({
    id: module.id,
    name: module.name,
    group_id: groupId,
  })) as Lesson[];

  const { error } = await supabase.from("Lessons").insert(lessons);

  if (error) {
    throw new Error(`Error inserting data: ${error.message}`);
  }
}

export async function uploadToSupabase(
  file: CanvasFile,
  data: ArrayBuffer,
  courseId: number,
) {
  const objectPath = `course_${courseId}/${file.filename}`;

  const { error } = await supabase.storage
    .from("lesson-files")
    .upload(objectPath, data, { upsert: true });

  if (error) {
    console.error("Error:", error.message);
    return null;
  }

  const { data: pub } = supabase.storage
    .from("lesson-files")
    .getPublicUrl(objectPath);
  return pub.publicUrl;
}

export async function saveFileMetadata(row: File) {
  const { error } = await supabase.from("Files").upsert(
    {
      name: row.name,
      size_bytes: row.size_bytes,
      storage_path: row.storage_path,
      lesson_id: row.lesson_id ?? null,
    },
    { onConflict: "storage_path" },
  );

  if (error) {
    console.error("Upsert metadata error:", error.message);
  }
}

export async function syncCourseFilesToSupabase(
  courseId: number,
  opts?: { lessonId?: number | null; categories?: string[] | null },
) {
  const files: CanvasFile[] = await fetchAllFiles(courseId);

  for (const f of files) {
    const data = await downloadFile(f);
    if (!data) continue;

    const publicUrl = await uploadToSupabase(f, data, courseId);
    if (!publicUrl) continue;

    const row: File = {
      name: f.filename,
      size_bytes: f.size,
      storage_path: publicUrl,
      lesson_id: opts?.lessonId ?? null,
    };

    await saveFileMetadata(row);
  }

  console.log(`Synced ${files.length} files for course ${courseId}`); // REMOVE
}
