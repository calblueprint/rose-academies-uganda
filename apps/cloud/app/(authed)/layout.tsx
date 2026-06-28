import { redirect } from "next/navigation";
import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";
import Header from "@/components/Header";
import { DataContextProvider } from "@/context/DataContext";
import { getCurrentDeviceId } from "@/lib/getCurrentUserDevice";

// This layout is the Cloud App's auth boundary: every route in this group must
// have a Supabase session before we render shared app data or navigation.
export default async function AuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await getSupabaseServerClientReadOnly();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // A linked Classroom Hub is only required for sync/device-specific actions.
  // New educators can prepare lessons and classrooms before their hub is ready.
  const deviceId = await getCurrentDeviceId({ userId: user.id });

  const { data, error } = await supabase
    .from("Profiles")
    .select("display_name")
    .eq("id", user.id)
    .single();

  if (error) {
    console.log("error: ", error);
  }

  const displayName = data?.display_name ?? "User";

  return (
    <DataContextProvider userId={user.id}>
      <Header
        displayName={displayName}
        email={user.email ?? null}
        deviceId={deviceId}
      />
      {children}
    </DataContextProvider>
  );
}
