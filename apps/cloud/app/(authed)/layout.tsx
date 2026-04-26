import { redirect } from "next/navigation";
import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";
import Header from "@/components/Header";
import MissingDevicePage from "@/components/MissingDevicePage";
import { DataContextProvider } from "@/context/DataContext";
import { getCurrentDeviceId } from "@/lib/getCurrentUserDevice";

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
