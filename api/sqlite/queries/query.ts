import { Group, Lesson, LocalFile, Teacher } from "@/types/schema";

/**
 * Fetches the local SQLite database and returns its contents.
 * @returns An object containing the database's contents, with the following properties:
 *   - teachers: An array of Teacher objects.
 *   - groups: An array of Group objects.
 *   - lessons: An array of Lesson objects.
 *   - files: An array of LocalFile objects.
 */
export async function fetchLocalDatabase(): Promise<{
  teachers: Teacher[];
  groups: Group[];
  lessons: Lesson[];
  files: LocalFile[];
}> {
  try {
    const response = await fetch("/api/sqlite");
    if (!response.ok) {
      throw new Error("Failed to fetch data from local database");
    }
    const data = await response.json();
    return {
      teachers: data.teachers,
      groups: data.groups,
      lessons: data.lessons,
      files: data.files,
    };
  } catch (error) {
    console.error("Error fetching data from local database:", error);
    return {
      teachers: [],
      groups: [],
      lessons: [],
      files: [],
    };
  }
}
