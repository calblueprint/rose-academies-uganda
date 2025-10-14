"use server";

import type { CanvasCourse } from "../../../types/schema.js";
import { CanvasModule } from "@/types/schema";

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
  const url = `https://canvas.instructure.com/api/v1/courses/${groupId}/modules`;

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
