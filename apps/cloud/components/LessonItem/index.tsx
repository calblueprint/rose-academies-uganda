"use client";

import { useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FileTypeBadge from "@/components/FileTypeBadge";
import { DataContext } from "@/context/DataContext";
import { IconSvgs } from "@/lib/icons";
import StatusPill from "../StatusPill";
import {
  ActionButton,
  ActionLabel,
  FileLeft,
  FileMeta,
  FileName,
  FileRow,
  FilesContainer,
  LessonHeader,
  LessonIcon,
  LessonLeft,
  LessonName,
  LessonRight,
  LessonWrapper,
} from "./styles";

type LessonAction = "remove" | "restore";

function RemoveIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M3 3L9 9M9 3L3 9"
        stroke="#4B4A49"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RestoreIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M11.6667 7C11.6667 9.57733 9.57733 11.6667 7 11.6667C4.42267 11.6667 2.33333 9.57733 2.33333 7C2.33333 4.42267 4.42267 2.33333 7 2.33333C8.45567 2.33333 9.75567 3 10.6113 4.04467"
        stroke="#4B4A49"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M10.1113 1.94434V4.27767H12.4447"
        stroke="#4B4A49"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LessonItem({
  lessonId,
  lessonName,
  status,
  action,
  onAction,
  isActionLoading = false,
  showIcon = true,
}: {
  lessonId: number;
  lessonName: string;
  status?: "available" | "pending";
  action?: LessonAction;
  onAction?: (lessonId: number) => void | Promise<void>;
  isActionLoading?: boolean;
  showIcon?: boolean;
}) {
  const [opened, setOpened] = useState(false);
  const data = useContext(DataContext);
  const router = useRouter();

  const files = useMemo(() => {
    if (!data) return [];
    return data.files.filter(file => file.lesson_id === lessonId);
  }, [data, lessonId]);

  const actionLabel = action === "remove" ? "Remove" : "Restore";

  return (
    <LessonWrapper>
      <LessonHeader onClick={() => setOpened(prev => !prev)}>
        <LessonLeft>
          {showIcon ? <LessonIcon /> : null}
          <LessonName>{lessonName}</LessonName>

          {/* status stays on LEFT */}
          {status ? <StatusPill status={status} /> : null}
        </LessonLeft>

        <LessonRight>
          {/* action button */}
          {action && onAction && (
            <ActionButton
              $variant={action}
              type="button"
              disabled={isActionLoading}
              onClick={e => {
                e.stopPropagation(); // prevent expand toggle
                void onAction(lessonId);
              }}
            >
              {action === "remove" ? <RemoveIcon /> : <RestoreIcon />}
              <ActionLabel>
                {isActionLoading ? "Working..." : actionLabel}
              </ActionLabel>
            </ActionButton>
          )}

          {/* dropdown arrow */}
          {opened ? IconSvgs.upArrow : IconSvgs.downArrow}
        </LessonRight>
      </LessonHeader>

      {opened && files.length > 0 && (
        <FilesContainer>
          {files.map(file => (
            <FileRow
              key={file.id}
              onClick={() => router.push(`/lessons/${lessonId}/files`)}
            >
              <FileLeft>
                <FileTypeBadge fileName={file.name} />
                <FileMeta>
                  <FileName>{file.name}</FileName>
                </FileMeta>
              </FileLeft>

              {IconSvgs.download}
            </FileRow>
          ))}
        </FilesContainer>
      )}
    </LessonWrapper>
  );
}
