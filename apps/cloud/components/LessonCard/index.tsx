"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IconSvgs } from "@/lib/icons";
import VillageTags from "../VillageTags";
import {
  Card,
  ImageFrame,
  MoreTag,
  StatusIconCircle,
  TagRow,
  Title,
  Titleholder,
  TitleRow,
} from "./styles";

const FALLBACK_LESSON_IMAGE = "/placeholders/preset-0.jpg";

function LessonStatusIcon({ status }: { status?: "available" | "pending" }) {
  if (!status) return null;

  return (
    <StatusIconCircle $status={status} aria-label={status}>
      {status === "available"
        ? IconSvgs.lessonAvailable
        : IconSvgs.lessonPending}
    </StatusIconCircle>
  );
}

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

  const visibleVillages = villages.slice(0, 2);
  const remainingVillageCount = villages.length - visibleVillages.length;

  return (
    <Card onClick={() => router.push(`/app/lessons/${lessonId}`)}>
      <ImageFrame>
        <Image
          src={lessonImage ?? FALLBACK_LESSON_IMAGE}
          alt={lessonName}
          fill
          sizes="21.875rem"
          style={{ objectFit: "cover" }}
        />
      </ImageFrame>

      <Titleholder>
        <TitleRow>
          <Title>{lessonName}</Title>
          <LessonStatusIcon status={status} />
        </TitleRow>

        {villages.length > 0 && (
          <TagRow>
            <VillageTags villages={visibleVillages} />
            {remainingVillageCount > 0 && (
              <MoreTag>+{remainingVillageCount}</MoreTag>
            )}
          </TagRow>
        )}
      </Titleholder>
    </Card>
  );
}
