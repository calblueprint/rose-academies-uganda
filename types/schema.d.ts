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
 * A teacher for the Teachers table.
 */
export type Teacher = {
  id: number;
  name: string;
};

/**
 * A file for the Files table. Named RoseFile to avoid conflict with built-in File type.
 */
export type RoseFile = {
  id: number;
  name: string;
  size_bytes: number;
  storage_path: string;
  lesson_id: number;
};
