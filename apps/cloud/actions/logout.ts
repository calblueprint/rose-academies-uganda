"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/api/supabase/server";

export async function signOut() {
  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error.message);
    return { error: JSON.parse(JSON.stringify(error)) };
  }

  revalidatePath("/app", "layout");
  redirect("/login");
}
