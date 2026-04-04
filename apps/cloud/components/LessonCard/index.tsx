"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import StatusPill from "../StatusPill";
import { Card, ImagePlaceholder, Title, Titleholder } from "./styles";

export default function LessonCard({
  lessonId,
  lessonName,
  lessonImage,
  status,
}: {
  lessonId: number;
  lessonName: string;
  lessonImage: string | null;
  status?: "available" | "pending";
}) {
  const router = useRouter();
  lessonId = 1;

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
        {status ? <StatusPill status={status} /> : null}
      </Titleholder>
    </Card>
  );
}
