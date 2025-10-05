import { fetchAllModules } from "@/api/canvas/queries/query";
import { CanvasModule, Lesson } from "@/types/schema";
import supabase from "../client";

// Fetch modules from Canvas for a specific group and insert them into Supabase
export async function updateLessons(groupId: number) {
  const modules = await fetchAllModules(groupId);

  const lessons = modules.map((module: CanvasModule) => ({
    id: module.id,
    title: module.name,
    created_at: new Date(),
    group_id: groupId,
  })) as Lesson[];

  const { error } = await supabase.from("Lessons").insert(lessons);

  if (error) {
    throw new Error(`Error inserting data: ${error.message}`);
  }
}
