// Root layout (applies to *all* routes, both authed + unauthed).
// Purpose:
// - Place global providers here later (theme, query client, etc.).
// - Keep it minimal for now.

import "./global.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/i18n";
import StyledComponentsRegistry from "@/lib/registry";

export const metadata: Metadata = {
  title: "Rose Portable Classroom Hub",
  description: "Educator dashboard for portable classroom lessons.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <body>
        <StyledComponentsRegistry>
          <LanguageProvider>{children}</LanguageProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
