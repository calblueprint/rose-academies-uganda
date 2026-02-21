import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// This file was created for layout and pages as they shouldn't have write access to cookies

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
      // Layouts/pages can't modify cookies in Next.js.
      // If Supabase tries to refresh session and set cookies here, we no-op.
      setAll() {},
    },
  });
}
