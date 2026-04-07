type GetCurrentDeviceIdOptions = {
  userId?: string;
};

export async function getCurrentDeviceId(
  options: GetCurrentDeviceIdOptions = {},
) {
  const { userId: providedUserId } = options;

  if (typeof window === "undefined") {
    const [{ getSupabaseServerClientReadOnly }] = await Promise.all([
      import("@/api/supabase/server-readonly"),
    ]);
    const supabase = await getSupabaseServerClientReadOnly();

    const userId =
      providedUserId ?? (await supabase.auth.getUser()).data.user?.id;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data: device, error } = await supabase
      .from("devices")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (error || !device?.id) {
      throw error ?? new Error("Unable to find device for user.");
    }

    return device.id as string;
  }

  const [{ getSupabaseBrowserClient }] = await Promise.all([
    import("@/api/supabase/browser"),
  ]);
  const supabase = getSupabaseBrowserClient();

  const userId =
    providedUserId ?? (await supabase.auth.getUser()).data.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { data: device, error } = await supabase
    .from("devices")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (error || !device?.id) {
    throw error ?? new Error("Unable to find device for user.");
  }

  return device.id as string;
}
