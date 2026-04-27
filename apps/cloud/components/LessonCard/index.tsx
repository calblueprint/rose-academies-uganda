"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import VillageTags from "../VillageTags";
import { Card, ImageFrame, TagRow, Title, Titleholder } from "./styles";

export default function LessonCard({
  lessonId,
  lessonName,
  lessonImage,
  status,
  villages = [],
}: {
  lessonId: number;
  lessonName: string;
  lessonImage: string | null;
  status?: "available" | "pending";
  villages?: string[];
}) {
  const router = useRouter();

  return (
    <Card onClick={() => router.push(`/app/lessons/${lessonId}`)}>
      {lessonImage ? (
        <ImageFrame>
          <Image
            src={lessonImage}
            alt={lessonName}
            fill
            sizes="21.875rem"
            style={{ objectFit: "cover" }}
          />
        </ImageFrame>
      ) : null}

      <Titleholder>
        <Title>{lessonName}</Title>
        {(status || villages.length > 0) && (
          <TagRow>
            {villages.length > 0 ? <VillageTags villages={villages} /> : null}
          </TagRow>
        )}
      </Titleholder>
    </Card>
  );
}
