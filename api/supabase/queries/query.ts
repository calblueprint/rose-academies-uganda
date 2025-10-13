import { fetchAllCourses } from "@/api/canvas/queries/query";
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
