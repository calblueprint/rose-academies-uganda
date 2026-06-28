import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";
import { fetchVisibleClassrooms } from "@/lib/classrooms";
import ClassroomsClient from "./ClassroomsClient";

export default async function ClassroomsPage() {
  const supabase = await getSupabaseServerClientReadOnly();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const classrooms = await fetchVisibleClassrooms(supabase, user.id);

  return <ClassroomsClient initialClassrooms={classrooms} userId={user.id} />;
}
