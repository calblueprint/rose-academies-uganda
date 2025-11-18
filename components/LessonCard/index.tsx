"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, ImageArea, Title, Titleholder } from "./styles";

export function LessonCard({ lessonName }: { lessonName: string }) {
  const router = useRouter();

  function handleLessonClick() {
    router.push(`/${lessonName}/files`);
  }

  return (
    <Card onClick={handleLessonClick}>
      <ImageArea />
      <Titleholder>
        <Title>{lessonName}</Title>
      </Titleholder>
    </Card>
  );
}

export default LessonCard;
