// Auth layout.
// Purpose:
// - Wraps unauthenticated pages like /login.
// - Keep separate from the authenticated "app shell" layout.

import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
