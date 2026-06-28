"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function HeaderWrapper() {
  const pathname = usePathname();

  // Join and device setup use focused, full-screen layouts.
  if (pathname === "/join" || pathname === "/setup") {
    return null;
  }

  return <Header />;
}
