"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/api/supabase/server";

export async function signOut(): Promise<void> {
  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error.message);
    throw new Error("Failed to sign out");
  }

  revalidatePath("/app", "layout");
  redirect("/login");
}
