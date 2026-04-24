"use client";

import { useState } from "react";
import UploadLessonImageModal from "@/components/modals/UploadLessonImageModal/UploadLessonImageModal";
import { IconSvgs } from "@/lib/icons";
import * as style from "./styles";

type LessonHeaderProps = {
  lessonName: string;
  imagePath: string | null;
  lessonId: number;
};

export default function LessonHeader({
  lessonName,
  imagePath,
  lessonId,
}: LessonHeaderProps) {
  const [isUploadLessonImageModalOpen, setIsUploadLessonImageModalOpen] =
    useState(false);
  return (
    <>
      <style.HeaderContainer>
        <style.ImageBanner $imagePath={imagePath}>
          <style.HeaderTopRow>
            <style.BackLink href="/app/lessons">
              <style.IconContainer>{IconSvgs.coolicon}</style.IconContainer>
              <span>Lessons</span>
              <span>/</span>
              <span>{lessonName}</span>
            </style.BackLink>
            <style.CustomizeButton
              type="button"
              onClick={() => {
                setIsUploadLessonImageModalOpen(true);
              }}
            >
              <style.IconContainer>
                {IconSvgs.pencilEvergreen}
              </style.IconContainer>
              <span>Customize</span>
            </style.CustomizeButton>
          </style.HeaderTopRow>
        </style.ImageBanner>
      </style.HeaderContainer>
      <UploadLessonImageModal
        isOpen={isUploadLessonImageModalOpen}
        onClose={() => {
          setIsUploadLessonImageModalOpen(false);
        }}
        lessonId={lessonId}
      />
    </>
  );
}
