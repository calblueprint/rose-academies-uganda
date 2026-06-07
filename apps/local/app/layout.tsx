import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import "./global.css";
import HeaderWrapper from "@/components/HeaderWrapper";
import { DataContextProvider } from "@/context/DataContext";

// site metadata - what shows up on embeds
export const metadata: Metadata = {
  title: "Rose Academies",
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
          <HeaderWrapper />
          <DataContextProvider>{children}</DataContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
