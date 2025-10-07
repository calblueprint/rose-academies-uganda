import fetchCourses from "@/api/canvas/fetchCourses";
import transformCourses from "@/lib/helpers/transformCourses";
import supabase from "../client";

/**
 * Updates/inserts Canvas courses into the "Groups" table.
 */
export default async function syncCourses() {
  const rawCourses = await fetchCourses();
  const courses = transformCourses(rawCourses);
  const { error } = await supabase.from("Groups").upsert(courses);
  if (error) {
    console.error("Upsert error:", error);
  }
}
