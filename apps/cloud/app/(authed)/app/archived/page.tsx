import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";
import LessonsClient from "../lessons/LessonsClient";

export default async function ArchivedLessonsPage() {
  const supabase = await getSupabaseServerClientReadOnly();

  const { data: lessons, error } = await supabase
    .from("Lessons_copy")
    .select("id, name, description, image_path, group_id, is_archived")
    .order("id", { ascending: true })
    .eq("is_archived", true);

  if (error) {
    throw new Error(error.message);
  }

  return <LessonsClient initialLessons={lessons ?? []} />;
}
