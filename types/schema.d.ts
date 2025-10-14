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

export type CanvasModule = {
  id: number;
  name: string;
};

export type Lesson = {
  id: number;
  name: string;
  group_id: number;
};
