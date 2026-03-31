// Home route (/).
// Purpose:
// - Make the root URL predictable during development.
// - For now, send users to /login.
// - Later, you might redirect based on auth session.

import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/login");
}

// TESTING LAST SYNC COMPONENT
// import SyncSummaryCard from "@/components/SyncSummaryCard";
// import supabase from "@/api/supabase/client";

// function formatLastSynced(lastSyncedAt: string | null) {
//   if (!lastSyncedAt) {
//     return "Not synced yet";
//   }

//   const date = new Date(lastSyncedAt);

//   return date.toLocaleString("en-US", {
//     month: "short",
//     day: "numeric",
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   });
// }

// export default async function LoginPage() {
//   const { data, error } = await supabase
//     .from("devices")
//     .select("last_synced_at")
//     .eq("id", "nathans-pi")
//     .single();

//   if (error) {
//     console.error("Error fetching last_synced_at:", error);
//   }

//   const lastSynced = formatLastSynced(data?.last_synced_at ?? null);

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#f5f5f5",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "flex-start",
//         paddingTop: "3rem",
//       }}
//     >
//       <SyncSummaryCard lastSynced={lastSynced} />
//     </div>
//   );
// }
