import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// This is the server file for writing, which is mainly used for login/logout actions.

// Use this writable server client inside server actions, where Next.js allows
// cookie updates. Supabase stores auth sessions in cookies, so login, logout,
// and token refreshes all need a client that can both read and write them.
export async function getSupabaseServerClient() {
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
      setAll(cookiesToSet) {
        // Supabase passes back every cookie it needs to create, refresh, or
        // clear so the browser and server stay in sync about the auth session.
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });
}
