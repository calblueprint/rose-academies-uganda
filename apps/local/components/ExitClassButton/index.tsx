"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ActionButton from "@/components/ActionButton";
import COLORS from "@/styles/colors";

export default function ExitClassButton() {
  const router = useRouter();

  return (
    <ActionButton
      onClick={() => router.push("/join")}
      backgroundColor={COLORS.white}
      textColor={COLORS.black}
      iconColor={COLORS.black}
      iconType={"exitClass"}
      text={"Exit Class"}
      title="Click to refresh status"
      animationDuration="1s"
      borderColor="#e5e7eb"
    />
  );
}
