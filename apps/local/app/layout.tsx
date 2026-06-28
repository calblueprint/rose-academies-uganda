import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import "./global.css";
import HeaderWrapper from "@/components/HeaderWrapper";
import { DataContextProvider } from "@/context/DataContext";
import { LanguageProvider } from "@/lib/i18n";

// site metadata - what shows up on embeds
export const metadata: Metadata = {
  title: "Rose Portable Classroom Hub",
  description: "Portable Classroom Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <body>
        <StyledComponentsRegistry>
          <LanguageProvider>
            <HeaderWrapper />
            <DataContextProvider>{children}</DataContextProvider>
          </LanguageProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
