import { redirect } from "next/navigation";
import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";

// Auth pages are only for signed-out users, so this layout redirects existing
// sessions away from /login before rendering the login form.
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await getSupabaseServerClientReadOnly();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/app");
  }

  return <>{children}</>;
}
