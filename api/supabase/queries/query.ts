import { fetchAllCourses, fetchAllModules } from "@/api/canvas/queries/query";
import { CanvasModule, Lesson } from "@/types/schema";
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
