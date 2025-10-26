"use server";

import { CanvasCourse, CanvasFile, CanvasModule } from "@/types/schema";

const CANVAS_API_KEY = process.env.CANVAS_API_KEY;
if (!CANVAS_API_KEY) {
  throw new Error("Missing CANVAS_API_KEY.");
}

/**
 * Fetches the user's list of courses from Canvas. This currently does not
 * handle pagination and has only been tested with one courses.
 *
 * @param - none
 * @returns {RawCanvasCourse[]} - an array of raw courses from the canvas API (or empty array).
 */
export async function fetchAllCourses(): Promise<CanvasCourse[]> {
  const myHeader = new Headers();
  myHeader.append("Authorization", `Bearer ${CANVAS_API_KEY}`);
  myHeader.append("Accept", "application/json");

  const url = "https://canvas.instructure.com/api/v1/courses";
  try {
    const response = await fetch(url, {
      headers: myHeader,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching courses:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return [];
  }
}

/**
 * Fetch all modules for a specific group from Canvas.
 * @param groupId - Canvas course ID
 * @returns Array of CanvasModules
 */
export async function fetchAllModules(
  groupId: number,
): Promise<CanvasModule[]> {
  const url = `https://canvas.instructure.com/api/v1/courses/${groupId}/modules?per_page=100&include[]=items`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${CANVAS_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch modules");
  }

  const modules = await response.json();
  return modules;
}

/**
 * Fetch a list of all files for a specific Canvas course.
 * @param {number} courseId - Canvas course ID
 * @returns {array} - array of CanvasFiles or empty array
 */
export async function fetchAllFiles(courseId: number): Promise<CanvasFile[]> {
  const url = `https://canvas.instructure.com/api/v1/courses/${courseId}/files`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${CANVAS_API_KEY}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch files: ${response.status}`);
    }

    const files = await response.json();
    console.log(files);
    return files;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching files:", error.message);
    } else {
      console.error("Unknown error fetching files:", error);
    }
    return [];
  }
}

/**
 * Downloads files from Canvas.
 * @param {CanvasFile} file
 */
export async function downloadFile(file: CanvasFile) {
  const response = await fetch(file.url, {
    headers: { Authorization: `Bearer ${CANVAS_API_KEY}` },
    redirect: "follow",
  });

  if (!response.ok) {
    console.error(
      `Failed to download file ${file.filename}: ${response.status}`,
    );
    return null;
  }

  return await response.arrayBuffer();
}
