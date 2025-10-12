import type { GroupsInsert, RawCanvasCourse } from "../../types/schema.d.ts";

/**
 * Transforms RawCanvasCourse into GroupsInsert to be uploaded to Groups Supabase table.
 *
 * @param {RawCanvasCourse[]} rawArr - an array of raw canvas courses, straight from API
 * @returns {GroupsInsert[]} - an array of canvas courses in proper format
 */
export default function transformCourses(
  rawArr: RawCanvasCourse[],
): GroupsInsert[] {
  return rawArr.map(course => ({
    id: course.id,
    title: course.name,
    teacher_id: course.account_id,
    join_code: course.course_code,
  }));
}
