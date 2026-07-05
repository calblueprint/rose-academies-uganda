"use client";

import { useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FileTypeBadge from "@/components/FileTypeBadge";
import { DataContext } from "@/context/DataContext";
import { useLanguage } from "@/lib/i18n";
import { IconSvgs } from "@/lib/icons";
import StatusPill from "../StatusPill";
import {
  ActionButton,
  ActionLabel,
  DownloadLink,
  ExpandButton,
  FileLeft,
  FileMeta,
  FileName,
  FileRow,
  FilesContainer,
  LessonHeader,
  LessonLeft,
  LessonLink,
  LessonName,
  LessonRight,
  LessonWrapper,
  NoFilesMessage,
  PreviewButton,
} from "./styles";

type LessonAction = "remove" | "restore";
type ActionPresentation = "button" | "icon";
type LessonStatus = "available" | "pending" | "pending_removal" | "dashboard";

function RemoveIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M3 3L9 9M9 3L3 9"
        stroke="currentColor"
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
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M10.1113 1.94434V4.27767H12.4447"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function inferMimeTypeFromFileName(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!extension) return "";

  const mimeByExtension: Record<string, string> = {
    gif: "image/gif",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    mp4: "video/mp4",
    pdf: "application/pdf",
    png: "image/png",
    svg: "image/svg+xml",
    webp: "image/webp",
  };

  return mimeByExtension[extension] ?? "";
}

function canPreviewFile(fileName: string, mimeType?: string | null): boolean {
  const resolvedMimeType = mimeType || inferMimeTypeFromFileName(fileName);

  return (
    resolvedMimeType.startsWith("image/") ||
    resolvedMimeType.startsWith("video/") ||
    resolvedMimeType === "application/pdf"
  );
}

export default function LessonItem({
  lessonId,
  lessonName,
  status,
  action,
  onAction,
  isActionLoading = false,
  actionLabel,
  actionPresentation = "button",
}: {
  lessonId: number;
  lessonName: string;
  status?: LessonStatus;
  action?: LessonAction;
  onAction?: (lessonId: number) => void | Promise<void>;
  isActionLoading?: boolean;
  actionLabel?: string;
  actionPresentation?: ActionPresentation;
  showIcon?: boolean;
}) {
  const [opened, setOpened] = useState(false);
  const data = useContext(DataContext);
  const router = useRouter();
  const { t } = useLanguage();

  const files = useMemo(() => {
    if (!data) return [];
    return data.files.filter(file => file.lesson_id === lessonId);
  }, [data, lessonId]);

  const openFilePreview = (fileId: number | string) => {
    router.push(
      `/app/lessons/${lessonId}?file=${encodeURIComponent(String(fileId))}`,
    );
  };

  const defaultActionLabel =
    action === "remove" ? t("lessons.remove") : t("lessons.restore");

  return (
    <LessonWrapper>
      <LessonHeader>
        <LessonLeft>
          <LessonLink href={`/app/lessons/${lessonId}`}>
            <LessonName>{lessonName}</LessonName>
          </LessonLink>

          {/* status stays on LEFT */}
          {status ? <StatusPill status={status} /> : null}
        </LessonLeft>

        <LessonRight>
          {/* action button */}
          {action && onAction && (
            <ActionButton
              $variant={action}
              $presentation={actionPresentation}
              type="button"
              disabled={isActionLoading}
              aria-label={actionLabel ?? defaultActionLabel}
              title={actionLabel ?? defaultActionLabel}
              onClick={e => {
                e.stopPropagation(); // prevent expand toggle
                void onAction(lessonId);
              }}
            >
              {action === "remove" ? <RemoveIcon /> : <RestoreIcon />}
              {actionPresentation === "button" && (
                <ActionLabel>
                  {isActionLoading
                    ? t("common.working")
                    : (actionLabel ?? defaultActionLabel)}
                </ActionLabel>
              )}
            </ActionButton>
          )}

          <ExpandButton
            type="button"
            onClick={() => setOpened(prev => !prev)}
            aria-label={opened ? "Hide lesson files" : "Show lesson files"}
            aria-expanded={opened}
          >
            {opened ? IconSvgs.upArrow : IconSvgs.downArrow}
          </ExpandButton>
        </LessonRight>
      </LessonHeader>

      {opened && (
        <FilesContainer>
          {files.length > 0 ? (
            files.map(file => (
              <FileRow key={file.id} onClick={() => openFilePreview(file.id)}>
                <FileLeft>
                  <FileTypeBadge fileName={file.name} />
                  <FileMeta>
                    <FileName>{file.name}</FileName>
                  </FileMeta>
                </FileLeft>

                {canPreviewFile(file.name, file.mime_type) ? (
                  <PreviewButton
                    type="button"
                    title={`${t("lessonModal.previewAlt")} ${file.name}`}
                    aria-label={`${t("lessonModal.previewAlt")} ${file.name}`}
                    onClick={event => {
                      event.stopPropagation();
                      openFilePreview(file.id);
                    }}
                  >
                    {IconSvgs.download}
                  </PreviewButton>
                ) : file.storage_path ? (
                  <DownloadLink
                    href={file.storage_path}
                    download={file.name}
                    title={`${t("files.download")} ${file.name}`}
                    aria-label={`${t("files.download")} ${file.name}`}
                    onClick={event => event.stopPropagation()}
                  >
                    {IconSvgs.download}
                  </DownloadLink>
                ) : null}
              </FileRow>
            ))
          ) : (
            <NoFilesMessage>{t("lessons.noFilesAttached")}</NoFilesMessage>
          )}
        </FilesContainer>
      )}
    </LessonWrapper>
  );
}
