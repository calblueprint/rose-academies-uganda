import { getSupabaseServerClient } from "@/api/supabase/server";
import LessonsClient from "./LessonsClient";

export default async function LessonsPage() {
  const supabase = await getSupabaseServerClient();

  const { data: lessons, error } = await supabase
    .from("Lessons")
    .select("id, name, description, image_path, group_id")
    .order("id", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return <LessonsClient initialLessons={lessons ?? []} />;
}
