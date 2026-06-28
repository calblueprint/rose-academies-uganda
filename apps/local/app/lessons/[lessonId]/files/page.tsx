"use client";

import type { FileTypeFilter } from "@/components/FileTypeDropdown";
import { useContext, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FilePreview from "@/components/FilePreview/";
import FilePreviewModal from "@/components/FilePreviewModal";
import { FileRow, FilesTable } from "@/components/FilesTable";
import FileTypeDropdown from "@/components/FileTypeDropdown";
import LessonHeader from "@/components/LessonHeader";
import SearchBarComponent from "@/components/SearchBar";
import { DataContext } from "@/context/DataContext";
import { useLanguage } from "@/lib/i18n";
import { LocalFile } from "@/types/schema";
import {
  DescriptionText,
  EmptyState,
  HeaderRow,
  PageContainer,
  SearchBar as SearchBarWrapper,
  TableWrapper,
  Title,
} from "./style";

function matchesFileType(fileName: string, filter: FileTypeFilter): boolean {
  if (filter === "all") return true;
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  if (filter === "images") return ["jpg", "jpeg", "png"].includes(ext);
  if (filter === "pdf") return ext === "pdf";
  // "other": anything that's not an image or pdf
  return !["jpg", "jpeg", "png", "pdf"].includes(ext);
}

function formatFileDate(
  value: string | null | undefined,
  notAvailableLabel: string,
): string {
  if (!value) return notAvailableLabel;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return notAvailableLabel;

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function FilesPage() {
  const lessonId = Number(useParams().lessonId);
  const router = useRouter();
  const { t } = useLanguage();
  const data = useContext(DataContext);

  const [selectedFile, setSelectedFile] = useState<LocalFile | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [fileTypeFilter, setFileTypeFilter] = useState<FileTypeFilter>("all");

  const lesson = useMemo(() => {
    if (!data) return null;
    return data.lessons.find(l => l.id === lessonId);
  }, [data, lessonId]);

  const authorizedGroupId = data?.groups[0]?.id;

  useEffect(() => {
    if (data && !lesson && authorizedGroupId) {
      router.replace(`/groups/${authorizedGroupId}/lessons`);
    }
  }, [authorizedGroupId, data, lesson, router]);

  const files = useMemo(() => {
    if (!data) return [];

    const fileIdsForLesson = new Set(
      data.lessonFiles
        .filter(lessonFile => lessonFile.lesson_id === lessonId)
        .map(lessonFile => lessonFile.file_id),
    );

    return data.files.filter(file => fileIdsForLesson.has(file.id));
  }, [data, lessonId]);

  const filteredFiles = useMemo(
    () =>
      files.filter(
        file =>
          file.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          matchesFileType(file.name, fileTypeFilter),
      ),
    [files, searchTerm, fileTypeFilter],
  );

  const tableFiles: FileRow[] = useMemo(
    () =>
      filteredFiles.map(file => ({
        id: file.id,
        name: file.name,
        dateAdded: formatFileDate(file.created_at, t("files.notAvailable")),
        dateModified: formatFileDate(
          file.updated_at ?? file.created_at,
          t("files.notAvailable"),
        ),
        sizeBytes: file.size_bytes,
      })),
    [filteredFiles, t],
  );

  function handleRowClick(row: FileRow) {
    const file = filteredFiles.find(f => f.id === row.id);
    if (file) {
      setSelectedFile(file);
    }
  }

  if (!data) {
    return (
      <PageContainer>
        <EmptyState>{t("files.loading")}</EmptyState>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <LessonHeader label={t("lessons.title")} image={lesson?.image_path} />
      <Title>{lesson?.name ?? t("files.titleFallback")}</Title>

      {lesson?.description && (
        <DescriptionText>{lesson.description}</DescriptionText>
      )}

      <HeaderRow>
        <SearchBarWrapper>
          <SearchBarComponent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder={t("search.filePlaceholder")}
          />
        </SearchBarWrapper>

        <FileTypeDropdown
          selectedType={fileTypeFilter}
          onChange={setFileTypeFilter}
        />
      </HeaderRow>

      {tableFiles.length === 0 ? (
        <EmptyState>{t("files.empty")}</EmptyState>
      ) : (
        <TableWrapper>
          <FilesTable files={tableFiles} onRowClick={handleRowClick} />
        </TableWrapper>
      )}

      {selectedFile && (
        <FilePreviewModal onClose={() => setSelectedFile(null)}>
          <FilePreview file={selectedFile} />
        </FilePreviewModal>
      )}
    </PageContainer>
  );
}
