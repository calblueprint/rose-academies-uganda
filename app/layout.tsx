import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import "@/styles/global.css";
import localFont from "next/font/local";
import { DataContextProvider } from "@/context/DataContext";

// font definitions
const gilroy = localFont({
  src: [
    { path: "../assets/fonts/Gilroy-Thin.ttf", weight: "100", style: "normal" },
    {
      path: "../assets/fonts/Gilroy-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },

    {
      path: "../assets/fonts/Gilroy-UltraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../assets/fonts/Gilroy-UltraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },

    {
      path: "../assets/fonts/Gilroy-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/Gilroy-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },

    {
      path: "../assets/fonts/Gilroy-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Gilroy-RegularItalic.ttf",
      weight: "400",
      style: "italic",
    },

    {
      path: "../assets/fonts/Gilroy-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Gilroy-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },

    {
      path: "../assets/fonts/Gilroy-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/Gilroy-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },

    { path: "../assets/fonts/Gilroy-Bold.ttf", weight: "700", style: "normal" },
    {
      path: "../assets/fonts/Gilroy-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },

    {
      path: "../assets/fonts/Gilroy-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../assets/fonts/Gilroy-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },

    {
      path: "../assets/fonts/Gilroy-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../assets/fonts/Gilroy-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },

    {
      path: "../assets/fonts/Gilroy-Heavy.ttf",
      weight: "1000",
      style: "normal",
    },
    {
      path: "../assets/fonts/Gilroy-HeavyItalic.ttf",
      weight: "1000",
      style: "italic",
    },
  ],
  variable: "--font-gilroy",
});

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
    <html lang="en">
      <body className={gilroy.variable}>
        <StyledComponentsRegistry>
          <DataContextProvider>{children}</DataContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
