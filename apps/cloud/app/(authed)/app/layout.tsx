// Authenticated app shell layout.
// Purpose:
// - Persistent navigation (Lessons / Offline Library).
// - Later: enforce auth here (server-side) and redirect to /login if no session.

import type { ReactNode } from "react";
import Link from "next/link";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header>
        <nav>
          <Link href="/app/lessons">Lessons</Link>
          {" | "}
          <Link href="/app/offline-library">Offline Library</Link>
          {" | "}
          <Link href="/login">Logout (placeholder)</Link>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}
