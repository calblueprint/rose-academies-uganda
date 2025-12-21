"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, ImageArea, Title, Titleholder } from "./styles";

export default function LessonCard({
  lessonId,
  lessonName,
}: {
  lessonId: number;
  lessonName: string;
}) {
  const router = useRouter();

  return (
    <Card onClick={() => router.push(`/lessons/${lessonId}/files`)}>
      <ImageArea />
      <Titleholder>
        <Title>{lessonName}</Title>
      </Titleholder>
    </Card>
  );
}
