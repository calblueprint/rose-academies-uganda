"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import StatusPill from "@/components/StatusPill";
import { useLanguage } from "@/lib/i18n";
import { IconSvgs } from "@/lib/icons";
import VillageTags from "../VillageTags";
import {
  ActionButton,
  ActionLabel,
  Card,
  CardActions,
  ImageFrame,
  TagRow,
  Title,
  Titleholder,
  TitleRow,
} from "./styles";

const FALLBACK_LESSON_IMAGE = "/placeholders/preset-0.jpg";
type LessonAction = "remove" | "restore";
type ActionPresentation = "button" | "icon";
type LessonStatus = "available" | "pending" | "pending_removal" | "dashboard";

function RemoveIcon() {
  return (
    <svg
      aria-hidden="true"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M3 3L9 9M9 3L3 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function LessonCard({
  lessonId,
  lessonName,
  lessonImage,
  status,
  villages = [],
  action,
  onAction,
  isActionLoading = false,
  actionLabel,
  actionPresentation = "button",
}: {
  lessonId: number;
  lessonName: string;
  lessonImage: string | null;
  status?: LessonStatus;
  villages?: string[];
  action?: LessonAction;
  onAction?: (lessonId: number) => void | Promise<void>;
  isActionLoading?: boolean;
  actionLabel?: string;
  actionPresentation?: ActionPresentation;
}) {
  const router = useRouter();
  const { t } = useLanguage();

  const defaultActionLabel =
    action === "remove" ? t("lessons.remove") : t("lessons.restore");

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
          {status && <StatusPill status={status} />}
        </TitleRow>

        {villages.length > 0 && (
          <TagRow>
            <VillageTags villages={villages} />
          </TagRow>
        )}

        {action && onAction && (
          <CardActions>
            <ActionButton
              $variant={action}
              $presentation={actionPresentation}
              type="button"
              disabled={isActionLoading}
              aria-label={actionLabel ?? defaultActionLabel}
              title={actionLabel ?? defaultActionLabel}
              onClick={event => {
                event.stopPropagation();
                void onAction(lessonId);
              }}
            >
              {action === "remove" ? <RemoveIcon /> : IconSvgs.refresh}
              {actionPresentation === "button" && (
                <ActionLabel>
                  {isActionLoading
                    ? t("common.working")
                    : (actionLabel ?? defaultActionLabel)}
                </ActionLabel>
              )}
            </ActionButton>
          </CardActions>
        )}
      </Titleholder>
    </Card>
  );
}
