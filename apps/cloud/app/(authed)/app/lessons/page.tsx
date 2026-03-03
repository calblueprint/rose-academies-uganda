import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";
import LessonsClient from "./LessonsClient";

export default async function LessonsPage() {
  const supabase = await getSupabaseServerClientReadOnly();

  const { data: lessons, error } = await supabase
    .from("Lessons")
    .select("id, name, description, image_path, group_id")
    .order("id", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return <LessonsClient initialLessons={lessons ?? []} />;
}
