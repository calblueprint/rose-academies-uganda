"use client";

import React from "react";
import { useRouter } from "next/navigation";
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
        <BackButtonIconSlot>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="11"
            viewBox="0 0 8 11"
            fill="none"
          >
            <path
              d="M0 5.5L6.47542 11L8 9.70691L3.04377 5.5L8 1.29401L6.4765 0L0 5.5Z"
              fill="white"
            />
          </svg>
        </BackButtonIconSlot>
        <span>{label}</span>
      </BackButton>
    </LessonHeaderContainer>
  );
}
