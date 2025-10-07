/**
 * Raw course data that gets returned from Canvas API.
 */
export type RawCanvasCourse = {
  id: number;
  name: string;
  created_at: string;
};

/**
 * Canvas courses with fields to match the Groups table.
 */
export type GroupsInsert = {
  id: number;
  title: string;
  teacher_id: number | null; // TODO: add category for teacher_id
  join_code: string | null; // TODO: add category for join_code
};
