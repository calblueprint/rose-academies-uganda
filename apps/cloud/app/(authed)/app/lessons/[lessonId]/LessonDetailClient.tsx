"use client";

import type { LocalFile } from "@/types/schema";
import { useCallback, useMemo, useState, useTransition } from "react";
import ArchiveToggle from "@/components/ArchiveToggle/ArchiveToggle";
import DeleteSelectedFilesButton from "@/components/DeleteSelectedFilesButton";
import EditLessonButton from "@/components/EditLessonButton";
import FilesTable, { FileRow } from "@/components/FilesTable";
import LessonHeader from "@/components/LessonHeader";
import OfflineToggle from "@/components/OfflineToggle";
import SearchBar from "@/components/SearchBar";
import UploadFilesButton from "@/components/UploadFilesButton";
import VillageTags from "@/components/VillageTags";
import { deleteLessonFilesAction, reorderLessonFilesAction } from "./actions";
import {
  HeaderBox,
  HeaderButtons,
  LessonDescription,
  LessonInformation,
  LessonTitle,
  PageContainer,
  SearchBarRow,
} from "./style";

type LessonFile = {
  id: string;
  name: string;
  sizeBytes: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  order: number;
};

type Lesson = {
  id: number;
  name: string;
  description: string | null;
  group_id: number | null;
  image_path: string | null;
  is_archived: boolean;
};

type LessonDetailClientProps = {
  lesson: Lesson;
  deviceId: string;
  initialIsOffline: boolean;
  files: LessonFile[];
  villages: string[];
};

export default function LessonDetailClient({
  lesson,
  deviceId,
  initialIsOffline,
  files,
  villages,
}: LessonDetailClientProps) {
  const [isOffline, setIsOffline] = useState(initialIsOffline);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [reorderError, setReorderError] = useState<string | null>(null);
  const [isDeleting, startDeleteTransition] = useTransition();
  const [isReordering, startReorderTransition] = useTransition();

  const initialTableFiles = useMemo<FileRow[]>(
    () =>
      files.map(file => ({
        id: file.id,
        name: file.name,
        sizeBytes: file.sizeBytes ?? 0,
        createdAt: file.createdAt ?? new Date(2026, 0, 1).toISOString(),
        updatedAt:
          file.updatedAt ??
          file.createdAt ??
          new Date(2026, 0, 1).toISOString(),
        order: file.order,
      })),
    [files],
  );

  const [tableFiles, setTableFiles] = useState<FileRow[]>(
    [...initialTableFiles].sort((a, b) => a.order - b.order),
  );

  const handleFilesUploaded = useCallback((uploaded: LocalFile[]) => {
    setTableFiles(prev => {
      const nextOrder = prev.length;
      const newRows: FileRow[] = uploaded.map((f, i) => ({
        id: String(f.id),
        name: f.name,
        sizeBytes: f.size_bytes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        order: nextOrder + i,
      }));
      return [...prev, ...newRows];
    });
  }, []);

  async function handleDeleteFiles(fileIds: string[]) {
    if (fileIds.length === 0) return;

    setDeleteError(null);

    startDeleteTransition(async () => {
      try {
        await deleteLessonFilesAction({
          lessonId: lesson.id,
          fileIds,
        });

        setTableFiles(currentFiles =>
          currentFiles
            .filter(file => !fileIds.includes(file.id))
            .map((file, index) => ({
              ...file,
              order: index,
            })),
        );

        setSelectedFileIds([]);
      } catch (error) {
        setDeleteError(
          error instanceof Error ? error.message : "Failed to delete files",
        );
      }
    });
  }

  async function handleReorderFiles(nextFiles: FileRow[]) {
    setReorderError(null);

    const previousFiles = tableFiles;
    setTableFiles(nextFiles);

    startReorderTransition(async () => {
      try {
        await reorderLessonFilesAction({
          lessonId: lesson.id,
          orderedFileIds: [...nextFiles]
            .sort((a, b) => a.order - b.order)
            .map(file => file.id),
        });
      } catch (error) {
        setTableFiles(previousFiles);
        setReorderError(
          error instanceof Error ? error.message : "Failed to save file order",
        );
      }
    });
  }

  return (
    <PageContainer>
      <LessonInformation>
        <LessonHeader
          lessonId={lesson.id}
          lessonName={lesson.name}
          imagePath={lesson.image_path}
        />

        <HeaderBox>
          <LessonTitle>{lesson.name}</LessonTitle>
          <HeaderButtons>
            <ArchiveToggle
              lesson_Id={lesson.id}
              isArchived={lesson.is_archived}
            />
            <OfflineToggle
              deviceId={deviceId}
              lessonId={lesson.id}
              isOffline={isOffline}
              setIsOffline={setIsOffline}
              hasFiles={tableFiles.length > 0}
            />
            <EditLessonButton lesson={lesson} />
          </HeaderButtons>
        </HeaderBox>

        <LessonDescription>{lesson.description}</LessonDescription>

        <VillageTags villages={villages} />

        <SearchBarRow>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <DeleteSelectedFilesButton
            selectedCount={selectedFileIds.length}
            onClick={() => {
              void handleDeleteFiles(selectedFileIds);
            }}
            disabled={
              selectedFileIds.length === 0 || isDeleting || isReordering
            }
          />
          <UploadFilesButton
            lessonId={lesson.id}
            onFilesUploadedAction={handleFilesUploaded}
          />
        </SearchBarRow>

        {deleteError && <p>{deleteError}</p>}
        {reorderError && <p>{reorderError}</p>}

        <FilesTable
          files={tableFiles}
          searchTerm={searchTerm}
          onDeleteFiles={handleDeleteFiles}
          isDeleting={isDeleting}
          onReorderFiles={handleReorderFiles}
          isReordering={isReordering}
          selectedFileIds={selectedFileIds}
          onSelectionChange={setSelectedFileIds}
        />
      </LessonInformation>
    </PageContainer>
  );
}
