import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";

type GetCurrentDeviceIdOptions = {
  userId?: string;
};

// Device-scoped features need the Raspberry Pi assigned to the current teacher.
// Accepting userId lets server pages reuse an already-fetched auth user instead
// of asking Supabase auth for the same user twice.
export async function getCurrentDeviceId(
  options: GetCurrentDeviceIdOptions = {},
) {
  const supabase = await getSupabaseServerClientReadOnly();
  const { userId: providedUserId } = options;

  const userId =
    providedUserId ?? (await supabase.auth.getUser()).data.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // The devices table connects a cloud user to the Pi that should receive their
  // offline lesson assignments.
  const { data: device, error } = await supabase
    .from("devices")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return device?.id ?? null;
}
