"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IconSvgs } from "@/lib/icons";
import { BackButton, BackButtonIconSlot, LessonHeaderContainer } from "./style";

type LessonHeaderProps = {
  label: string;
  onBack?: () => void;
};

export default function LessonHeader({ label, onBack }: LessonHeaderProps) {
  const router = useRouter();

  function handleBackClick() {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  }

  return (
    <LessonHeaderContainer>
      <BackButton onClick={handleBackClick}>
        <BackButtonIconSlot>{IconSvgs.backChevron}</BackButtonIconSlot>
        <span>{label}</span>
      </BackButton>
    </LessonHeaderContainer>
  );
}
