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

  return (
    <DataContextProvider>
      <Header />
      {children}
    </DataContextProvider>
  );
}
