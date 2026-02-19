// /app entry.
// Purpose:
// - Canonical entry point for authenticated area.
// - Redirect to the primary landing page (Lessons list).

import { redirect } from "next/navigation";

export default function AppIndexPage() {
  redirect("/app/lessons");
}
