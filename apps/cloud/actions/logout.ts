"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/api/supabase/server";

// Logout uses the writable server client because Supabase needs to clear the
// same cookie-backed session that protected layouts read for access checks.
export async function signOut(): Promise<void> {
  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error.message);
    throw new Error("Failed to sign out");
  }

  // Revalidate the authenticated shell so cached user-specific data is not
  // reused after the session has been cleared.
  revalidatePath("/app", "layout");

  // Redirect only after Supabase has cleared the cookie-backed session.
  redirect("/login");
}
