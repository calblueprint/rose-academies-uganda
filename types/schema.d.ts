/**
 * Raw course data from Canvas API.
 */
export type CanvasCourse = {
  id: number;
  course_code: string;
  name: string;
};

/**
 * A Canvas course for the Groupts table.
 */
export type Group = {
  id: number;
  join_code: string;
  name: string;
};
