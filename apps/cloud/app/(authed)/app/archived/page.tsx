import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";
import LessonsClient from "../lessons/LessonsClient";

export default async function ArchivedLessonsPage() {
  const supabase = await getSupabaseServerClientReadOnly();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data: lessons, error } = await supabase
    .from("Lessons")
    .select("id, name, description, image_path, group_id, is_archived")
    .order("id", { ascending: true })
    .eq("is_archived", true)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  return <LessonsClient initialLessons={lessons ?? []} lessonStatuses={{}} />;
}
