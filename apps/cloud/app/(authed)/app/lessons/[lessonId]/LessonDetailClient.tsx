"use client";

import type { LocalFile } from "@/types/schema";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
  useTransition,
} from "react";
import ArchiveToggle from "@/components/ArchiveToggle/ArchiveToggle";
import DeleteSelectedFilesButton from "@/components/DeleteSelectedFilesButton";
import EditLessonButton from "@/components/EditLessonButton";
import FilePreview from "@/components/FilePreview";
import FilePreviewModal from "@/components/FilePreviewModal";
import FilesTable, { FileRow } from "@/components/FilesTable";
import LessonHeader from "@/components/LessonHeader";
import OfflineToggle from "@/components/OfflineToggle";
import SearchBar from "@/components/SearchBar";
import StatusPill from "@/components/StatusPill";
import UploadFilesButton from "@/components/UploadFilesButton";
import VillageTags from "@/components/VillageTags";
import { useLanguage } from "@/lib/i18n";
import { deleteLessonFilesAction, reorderLessonFilesAction } from "./actions";
import {
  ClassroomSection,
  EmptyMetadataText,
  ErrorMessage,
  FileControlsLeft,
  FileControlsRight,
  FilesCount,
  FilesTitle,
  FilesTitleGroup,
  HeaderBox,
  HeaderButtons,
  LessonDescription,
  LessonInformation,
  LessonMetadata,
  LessonTitle,
  PageContainer,
  SearchBarRow,
  TitleRow,
} from "./style";

type LessonFile = {
  id: string;
  name: string;
  sizeBytes: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  order: number;
  storagePath: string | null;
  mimeType: string | null;
};

type Lesson = {
  id: number;
  name: string;
  description: string | null;
  group_id: number | null;
  image_path: string | null;
  is_archived: boolean;
};

type LessonSyncStatus = "available" | "pending" | null;

type LessonDetailClientProps = {
  lesson: Lesson;
  deviceId: string | null;
  initialSyncStatus: LessonSyncStatus;
  files: LessonFile[];
  villages: string[];
  initialPreviewFileId?: string;
};

export default function LessonDetailClient({
  lesson,
  deviceId,
  initialSyncStatus,
  files,
  villages,
  initialPreviewFileId,
}: LessonDetailClientProps) {
  const [syncStatus, setSyncStatus] =
    useState<LessonSyncStatus>(initialSyncStatus);
  const [isOffline, setIsOffline] = useState(initialSyncStatus !== null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [reorderError, setReorderError] = useState<string | null>(null);
  const [isDeleting, startDeleteTransition] = useTransition();
  const [isReordering, startReorderTransition] = useTransition();
  const { t } = useLanguage();

  const updateOfflineState: Dispatch<SetStateAction<boolean>> = useCallback(
    nextIsOffline => {
      setIsOffline(previousIsOffline => {
        const resolvedIsOffline =
          typeof nextIsOffline === "function"
            ? nextIsOffline(previousIsOffline)
            : nextIsOffline;

        setSyncStatus(resolvedIsOffline ? "pending" : null);

        return resolvedIsOffline;
      });
    },
    [],
  );

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
        storagePath: file.storagePath,
        mimeType: file.mimeType,
      })),
    [files],
  );

  const [selectedPreviewFile, setSelectedPreviewFile] =
    useState<FileRow | null>(
      () =>
        initialTableFiles.find(file => file.id === initialPreviewFileId) ??
        null,
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

        const nextFiles = tableFiles
          .filter(file => !fileIds.includes(file.id))
          .map((file, index) => ({
            ...file,
            order: index,
          }));

        setTableFiles(nextFiles);
        if (nextFiles.length <= 1) {
          setSearchTerm("");
        }

        setSelectedFileIds([]);

        if (selectedPreviewFile && fileIds.includes(selectedPreviewFile.id)) {
          setSelectedPreviewFile(null);
        }
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

  const handleSelectionChange = useCallback((fileIds: string[]) => {
    setSelectedFileIds(fileIds);
  }, []);

  const fileCountText =
    tableFiles.length === 1
      ? `1 ${t("files.fileSingular")}`
      : `${tableFiles.length} ${t("files.filePlural")}`;

  return (
    <PageContainer>
      <LessonInformation>
        <LessonHeader
          lessonId={lesson.id}
          lessonName={lesson.name}
          imagePath={lesson.image_path}
        />

        <HeaderBox>
          <TitleRow>
            <LessonTitle>{lesson.name}</LessonTitle>
            {syncStatus && <StatusPill status={syncStatus} />}
          </TitleRow>

          <HeaderButtons>
            <EditLessonButton lesson={lesson} />
            <OfflineToggle
              deviceId={deviceId}
              lessonId={lesson.id}
              isOffline={isOffline}
              setIsOffline={updateOfflineState}
              hasFiles={tableFiles.length > 0}
            />
            <ArchiveToggle
              lesson_Id={lesson.id}
              isArchived={lesson.is_archived}
              deviceId={deviceId}
            />
          </HeaderButtons>
        </HeaderBox>

        <LessonMetadata>
          <LessonDescription>
            {lesson.description || t("files.noDescription")}
          </LessonDescription>

          <ClassroomSection>
            {villages.length > 0 ? (
              <VillageTags villages={villages} variant="lessonPage" />
            ) : (
              <EmptyMetadataText>{t("files.noClassrooms")}</EmptyMetadataText>
            )}
          </ClassroomSection>
        </LessonMetadata>

        <SearchBarRow>
          <FileControlsLeft>
            <FilesTitleGroup>
              <FilesTitle>{t("files.files")}</FilesTitle>
              <FilesCount>{fileCountText}</FilesCount>
            </FilesTitleGroup>

            {tableFiles.length > 1 && (
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            )}
          </FileControlsLeft>

          <FileControlsRight>
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
          </FileControlsRight>
        </SearchBarRow>

        {deleteError && <ErrorMessage>{deleteError}</ErrorMessage>}
        {reorderError && <ErrorMessage>{reorderError}</ErrorMessage>}

        <FilesTable
          files={tableFiles}
          searchTerm={searchTerm}
          onDeleteFiles={handleDeleteFiles}
          isDeleting={isDeleting}
          onReorderFiles={handleReorderFiles}
          isReordering={isReordering}
          selectedFileIds={selectedFileIds}
          onSelectionChange={handleSelectionChange}
          onRowClick={setSelectedPreviewFile}
        />
      </LessonInformation>

      {selectedPreviewFile && (
        <FilePreviewModal onClose={() => setSelectedPreviewFile(null)}>
          <FilePreview file={selectedPreviewFile} />
        </FilePreviewModal>
      )}
    </PageContainer>
  );
}
