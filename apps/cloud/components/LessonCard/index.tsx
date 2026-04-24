"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import StatusPill from "../StatusPill";
import {
  Card,
  ImageFrame,
  ImagePlaceholder,
  Title,
  Titleholder,
} from "./styles";

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

  return (
    <Card onClick={() => router.push(`/app/lessons/${lessonId}`)}>
      <ImageFrame>
        {lessonImage ? (
          <Image
            src={lessonImage}
            alt={lessonName}
            fill
            sizes="21.875rem"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <ImagePlaceholder />
        )}
      </ImageFrame>

      <Titleholder>
        <Title>{lessonName}</Title>
        {status ? <StatusPill status={status} /> : null}
      </Titleholder>
    </Card>
  );
}
