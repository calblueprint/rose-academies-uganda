"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, ImagePlaceholder, Title, Titleholder } from "./styles";

export function LessonCard({
  lessonName,
  lessonImage,
}: {
  lessonName: string;
  lessonImage: string | null;
}) {
  const router = useRouter();

  function handleLessonClick() {
    router.push(`/${lessonName}/files`);
  }

  return (
    <Card onClick={handleLessonClick}>
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

export default LessonCard;
