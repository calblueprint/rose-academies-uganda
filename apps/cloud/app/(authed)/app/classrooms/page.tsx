import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";
import { fetchClassroomOverviews } from "@/lib/classrooms";
import { getCurrentDeviceId } from "@/lib/getCurrentUserDevice";
import ClassroomsClient from "./ClassroomsClient";

export default async function ClassroomsPage() {
  const supabase = await getSupabaseServerClientReadOnly();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const deviceId = await getCurrentDeviceId({ userId: user.id });
  const classrooms = await fetchClassroomOverviews(supabase, user.id, deviceId);

  return (
    <ClassroomsClient
      initialClassrooms={classrooms}
      userId={user.id}
      deviceId={deviceId}
    />
  );
}
