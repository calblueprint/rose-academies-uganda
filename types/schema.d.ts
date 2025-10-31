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
  items?: CanvasModuleItem[];
};

/**
 * A single item inside a Canvas module.
 */
export type CanvasModuleItem = {
  id: number;
  title: string;
  type: string;
  module_id: number;
  content_id?: number;
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
 * A file to be inserted into Files table. Named LocalFile to avoid conflict with built-in File type.
 */
export type LocalFile = {
  id: number;
  name: string;
  size_bytes: number;
  storage_path: string;
  lesson_id: number | null;
};
