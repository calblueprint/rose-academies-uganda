/**
 * Raw course data that gets returned from Canvas API.
 */
export type RawCanvasCourse = {
  id: number;
  name: string;
  account_id: number;
  course_code: string;
};

/**
 * Canvas courses with fields to match the Groups table.
 */
export type GroupsInsert = {
  id: number;
  title: string;
  teacher_id: number;
  join_code: string;
};
