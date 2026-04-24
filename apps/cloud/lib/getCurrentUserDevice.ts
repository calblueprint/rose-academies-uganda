import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";

type GetCurrentDeviceIdOptions = {
  userId?: string;
};

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
