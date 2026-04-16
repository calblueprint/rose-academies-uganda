import { redirect } from "next/navigation";
import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";
import Header from "@/components/Header";
import { DataContextProvider } from "@/context/DataContext";

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
      {children}
    </DataContextProvider>
  );
}
