"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, ImagePlaceholder, Title, Titleholder } from "./styles";

export default function LessonCard({
  lessonId,
  lessonName,
  lessonImage,
}: {
  lessonId: number;
  lessonName: string;
  lessonImage: string | null;
}) {
  const router = useRouter();

  return (
    <Card onClick={() => router.push(`/lessons/${lessonId}/files`)}>
      {lessonImage ? (
        <Image
          src={lessonImage}
          alt={lessonName}
          width={330}
          height={147.29}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <ImagePlaceholder />
      )}
      <Titleholder>
        <Title>{lessonName}</Title>
      </Titleholder>
    </Card>
  );
}
