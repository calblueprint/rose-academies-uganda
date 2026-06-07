import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// This is the server file for reading only, which is used in layouts and pages (basically everything else).

// Use this read-only server client inside layouts and pages. Those files need
// to read the session cookie to decide whether to redirect, but Next.js does
// not allow them to write cookies while rendering.
export async function getSupabaseServerClientReadOnly() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      // Supabase may ask to refresh the session while checking auth. We ignore
      // cookie writes here because layout/page rendering should only answer
      // "who is logged in?", not mutate the user's session.
      setAll() {},
    },
  });
}
