"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function HeaderWrapper() {
  const pathname = usePathname();

  // Hide header on join page
  if (pathname === "/join") {
    return null;
  }

  return <Header />;
}
