import { createClient } from "@supabase/supabase-js";

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

// This creates a Supabase client that can be shared across the app
// (not used for server based actions that need the writable client, see server.ts).
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default supabase;
