"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import ActionButton from "@/components/ActionButton";
import COLORS from "@/styles/colors";

export default function ExitClassButton() {
  const router = useRouter();
  const pathname = usePathname();

  let buttonText = "Exit Class";

  if (pathname.startsWith("/sync")) {
    buttonText = "View Lessons";
  }

  return (
    <ActionButton
      onClick={() => router.push("/join")}
      backgroundColor={COLORS.evergreen}
      textColor={COLORS.white}
      iconColor={COLORS.white}
      iconType={"exitClass"}
      text={buttonText}
      title="Click to refresh status"
      animationDuration="1s"
      borderColor="#e5e7eb"
    />
  );
}
