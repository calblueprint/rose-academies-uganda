"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { IconSvgs } from "@/lib/icons";
import VillageTags from "../VillageTags";
import {
  Card,
  ImageFrame,
  StatusIconCircle,
  TagRow,
  Title,
  Titleholder,
  TitleRow,
} from "./styles";

const FALLBACK_LESSON_IMAGE = "/placeholders/preset-0.jpg";

function LessonStatusIcon({ status }: { status?: "available" | "pending" }) {
  const { t } = useLanguage();

  if (!status) return null;

  const label =
    status === "available" ? t("status.synced") : t("status.pendingSyncLower");

  return (
    <StatusIconCircle $status={status} aria-label={label} title={label}>
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
            <VillageTags villages={villages} />
          </TagRow>
        )}
      </Titleholder>
    </Card>
  );
}
