"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IconSvgs } from "@/lib/icons";
import {
  BackButton,
  BackButtonIconSlot,
  BackgroundImage,
  LessonHeaderContainer,
} from "./style";

type LessonHeaderProps = {
  label: string;
  image?: string | null;
  onBack?: () => void;
};

export default function LessonHeader({
  label,
  image,
  onBack,
}: LessonHeaderProps) {
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
      {image && (
        <BackgroundImage>
          <Image
            src={image}
            alt={label}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </BackgroundImage>
      )}
      <BackButton onClick={handleBackClick}>
        <BackButtonIconSlot>{IconSvgs.backChevron}</BackButtonIconSlot>
        <span>{label}</span>
      </BackButton>
    </LessonHeaderContainer>
  );
}
