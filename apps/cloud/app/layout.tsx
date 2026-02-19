// Root layout (applies to *all* routes, both authed + unauthed).
// Purpose:
// - Place global providers here later (theme, query client, etc.).
// - Keep it minimal for now.

import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
