"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import StatusPill from "../StatusPill";
import VillageTags from "../VillageTags";
import { Card, ImagePlaceholder, TagRow, Title, Titleholder } from "./styles";

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
  //lessonId = 1;

  return (
    <Card onClick={() => router.push(`/app/lessons/${lessonId}`)}>
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
        {(status || villages.length > 0) && (
          <TagRow>
            {status ? <StatusPill status={status} /> : null}
            {villages.length > 0 ? <VillageTags villages={villages} /> : null}
          </TagRow>
        )}
      </Titleholder>
    </Card>
  );
}
