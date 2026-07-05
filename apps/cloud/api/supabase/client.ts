import { createBrowserClient } from "@supabase/ssr";

// Browser code uses the public anon key so it can call Supabase without
// exposing these credentials.
if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  throw new Error(
    "No Supabase environment variables detected, please make sure they are in place!",
  );
}

// Browser code must use the SSR browser client because login stores the
// Supabase session in cookies. RLS-protected client queries need those cookies
// so Supabase can evaluate auth.uid().
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default supabase;
