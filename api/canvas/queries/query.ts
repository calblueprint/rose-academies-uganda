"use server";

import { CanvasModule } from "@/types/schema";

const CANVAS_API_KEY = process.env.CANVAS_API_KEY;

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
