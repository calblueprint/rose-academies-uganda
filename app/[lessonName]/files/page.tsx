"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { fetchLocalDatabase } from "@/api/sqlite/queries/query";
import FilePreview from "@/components/FilePreview/";
import FilePreviewModal from "@/components/FilePreviewModal";
import { FileRow, FilesTable } from "@/components/FilesTable";
import FileTypeDropdown from "@/components/FileTypeDropdown";
import SearchBarComponent from "@/components/SearchBar";
import { LocalFile } from "@/types/schema";
import {
  BackButton,
  BackButtonIconSlot,
  HeaderRight,
  HeaderRow,
  LessonHeader,
  PageContainer,
  SearchBar as SearchBarWrapper,
  Title,
} from "./style";

export default function FilesPage() {
  const lessonName = useParams().lessonName;
  const [files, setFiles] = useState<LocalFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<LocalFile | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function load() {
      const localData = await fetchLocalDatabase();
      setFiles(localData.files);
    }
    load();
  }, []);

  const tableFiles: FileRow[] = useMemo(
    () =>
      files.map(file => ({
        id: file.id,
        name: file.name,
        // TODO: dates are not currently in LocalFile type, should probably add them
        dateAdded: "Feb 12, 2022",
        dateModified: "Feb 12, 2022",
        sizeBytes: file.size_bytes,
      })),
    [files],
  );

  function handleRowClick(row: FileRow) {
    const file = files.find(f => f.id === row.id);
    if (file) {
      setSelectedFile(file);
    }
  }

  return (
    <PageContainer>
      <LessonHeader>
        <BackButton>
          <BackButtonIconSlot>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="11"
              viewBox="0 0 8 11"
              fill="none"
            >
              <path
                d="M0 5.5L6.47542 11L8 9.70691L3.04377 5.5L8 1.29401L6.4765 0L0 5.5Z"
                fill="white"
              />
            </svg>
          </BackButtonIconSlot>
          <span>My Lessons</span>
        </BackButton>
      </LessonHeader>

      <HeaderRow>
        <Title>{lessonName}</Title>

        <HeaderRight>
          <SearchBarWrapper>
            <SearchBarComponent
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Search for file"
            />
          </SearchBarWrapper>

          {/* File type dropdown (non-functional, just UI) */}
          <FileTypeDropdown />
        </HeaderRight>
      </HeaderRow>

      <FilesTable files={tableFiles} onRowClick={handleRowClick} />

      {selectedFile && (
        <FilePreviewModal onClose={() => setSelectedFile(null)}>
          <FilePreview file={selectedFile} />
        </FilePreviewModal>
      )}
    </PageContainer>
  );
}
