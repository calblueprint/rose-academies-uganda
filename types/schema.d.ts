/**
 * Raw course data from Canvas API.
 */
export type CanvasCourse = {
  id: number;
  course_code: string;
  name: string;
};

/**
 * A Canvas course for the Groups table.
 */
export type Group = {
  id: number;
  join_code: string;
  name: string;
};

/**
 * A Canvas module for the Lessons table.
 */
export type CanvasModule = {
  id: number;
  name: string;
};

/**
 * A Lesson for the Lessons table.
 */
export type Lesson = {
  id: number;
  name: string;
  group_id: number;
};

/**
 * A file from Canvas.
 */
export type CanvasFile = {
  id: number;
  filename: string;
  content_type: string;
  size: number;
  updated_at: string;
  url: string;
};

/**
 * A file to be inserted into Files table.
 */
export type File = {
  name: string;
  size_bytes: number;
  storage_path: string;
  lesson_id: number | null;
};
