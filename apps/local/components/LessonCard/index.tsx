"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  DescriptionText,
  ImagePlaceholder,
  Title,
  Titleholder,
} from "./styles";

export default function LessonCard({
  lessonId,
  lessonName,
  lessonImage,
  lessonDescription,
}: {
  lessonId: number;
  lessonName: string;
  lessonImage: string | null;
  lessonDescription: string | null;
}) {
  const router = useRouter();

  return (
    <Card onClick={() => router.push(`/lessons/${lessonId}/files`)}>
      <ImagePlaceholder>
        {lessonImage && (
          <Image
            src={lessonImage}
            alt={lessonName}
            fill
            sizes="21.875rem"
            style={{ objectFit: "cover" }}
          />
        )}
      </ImagePlaceholder>
      <Titleholder>
        <Title>{lessonName}</Title>
        <DescriptionText>{lessonDescription}</DescriptionText>
      </Titleholder>
    </Card>
  );
}
