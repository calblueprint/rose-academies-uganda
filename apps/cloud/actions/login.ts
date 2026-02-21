"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/api/supabase/server";
import Logger from "./logging";

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

  revalidatePath("/");
  redirect("/app");
}
