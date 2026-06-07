import { redirect } from "next/navigation";
import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";
import Header from "@/components/Header";
import MissingDevicePage from "@/components/MissingDevicePage";
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

  // Teachers need a linked device before using app pages because offline sync
  // actions depend on knowing which Raspberry Pi they are managing.
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
    <DataContextProvider>
      <Header displayName={displayName} />
      {deviceId ? children : <MissingDevicePage />}
    </DataContextProvider>
  );
}
