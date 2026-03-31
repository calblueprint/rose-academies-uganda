import { getSupabaseBrowserClient } from "@/api/supabase/browser";

export async function getCurrentUserOrThrow() {
  const supabase = getSupabaseBrowserClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  if (!user) throw new Error("User not authenticated");

  return user;
}
