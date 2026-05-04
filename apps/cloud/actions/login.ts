"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/api/supabase/server";
import Logger from "./logging";

// Login runs as a server action because Supabase needs to write the new auth
// session into HTTP-only cookies after the password is accepted.
export async function loginWithEmailPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await getSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    Logger.error(`Error attempting sign in: ${error.message} (${error.code})`);
    return { error: JSON.parse(JSON.stringify(error)) };
  }

  // The auth layouts read session state from cookies during rendering, so
  // revalidating the root prevents stale pre-login route data from being reused.
  revalidatePath("/");

  // Redirect only after Supabase has written the cookie-backed session.
  redirect("/app");
}
