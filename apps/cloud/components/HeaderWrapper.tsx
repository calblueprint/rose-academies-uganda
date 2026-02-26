"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function HeaderWrapper() {
  const pathname = usePathname();

  // Hide header on login page
  if (pathname === "/login") {
    return null;
  }

  return <Header />;
}
