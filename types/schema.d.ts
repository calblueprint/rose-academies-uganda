/**
 * Raw course data that gets returned from Canvas API.
 */
export type RawCanvasCourse = {
  id: number;
  name: string;
  created_at: string;
  account_id: number;
};

/**
 * Canvas courses with fields to match the Groups table.
 */
export type GroupsInsert = {
  id: number;
  title: string;
  teacher_id: number;
  join_code: string | null; // TODO: update type for join_code
};
