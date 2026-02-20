// Authenticated app shell layout.
// Purpose:
// - Persistent navigation (Lessons / Offline Library).
// - Later: enforce auth here (server-side) and redirect to /login if no session.

import type { ReactNode } from "react";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header>
        <nav>
          <Link href="/app/lessons">Lessons</Link>
          {" | "}
          <Link href="/app/offline-library">Offline Library</Link>
          {" | "}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <LogoutButton />
          </div>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}
