import { Group, Lesson, LocalFile } from "@/types/schema";

export type LocalLessonFile = {
  lesson_id: number;
  file_id: number;
};

/**
 * Fetches the local SQLite database and returns its contents.
 * @returns An object containing the database's contents, with the following properties:
 *   - groups: An array of Group objects.
 *   - lessons: An array of Lesson objects.
 *   - files: An array of LocalFile objects.
 *   - lessonFiles: An array of lesson-file relationship rows.
 */
export async function fetchLocalDatabase(): Promise<{
  groups: Group[];
  lessons: Lesson[];
  files: LocalFile[];
  lessonFiles: LocalLessonFile[];
}> {
  try {
    const response = await fetch("/api/sqlite");

    if (!response.ok) {
      throw new Error("Failed to fetch data from local database");
    }

    const data = await response.json();

    return {
      groups: data.groups,
      lessons: data.lessons,
      files: data.files,
      lessonFiles: data.lessonFiles ?? [],
    };
  } catch (error) {
    console.error("Error fetching data from local database:", error);

    return {
      groups: [],
      lessons: [],
      files: [],
      lessonFiles: [],
    };
  }
}
