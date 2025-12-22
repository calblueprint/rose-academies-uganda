"use client";

import { useContext, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import FilePreview from "@/components/FilePreview/";
import FilePreviewModal from "@/components/FilePreviewModal";
import { FileRow, FilesTable } from "@/components/FilesTable";
import FileTypeDropdown from "@/components/FileTypeDropdown";
import LessonHeader from "@/components/LessonHeader";
import SearchBarComponent from "@/components/SearchBar";
import { DataContext } from "@/context/DataContext";
import { LocalFile } from "@/types/schema";
import {
  HeaderRight,
  HeaderRow,
  PageContainer,
  SearchBar as SearchBarWrapper,
  Title,
} from "./style";

export default function FilesPage() {
  const lessonId = Number(useParams().lessonId);
  const data = useContext(DataContext);

  const [selectedFile, setSelectedFile] = useState<LocalFile | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const lesson = useMemo(() => {
    if (!data) return null;
    return data.lessons.find(l => l.id === lessonId);
  }, [data, lessonId]);

  const files = useMemo(() => {
    if (!data) return [];
    return data.files.filter(file => file.lesson_id === lessonId);
  }, [data, lessonId]);

  const filteredFiles = useMemo(
    () =>
      files.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [files, searchTerm],
  );

  const tableFiles: FileRow[] = useMemo(
    () =>
      filteredFiles.map(file => ({
        id: file.id,
        name: file.name,
        // TODO: dates are not currently in LocalFile type, should probably add them
        dateAdded: "Feb 12, 2022",
        dateModified: "Feb 12, 2022",
        sizeBytes: file.size_bytes,
      })),
    [filteredFiles],
  );

  function handleRowClick(row: FileRow) {
    const file = filteredFiles.find(f => f.id === row.id);
    if (file) {
      setSelectedFile(file);
    }
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <LessonHeader label="My Lessons" image={lesson?.image_path} />

      <HeaderRow>
        <Title>{lesson?.name ?? "Lesson Files"}</Title>

        <HeaderRight>
          <SearchBarWrapper>
            <SearchBarComponent
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Search for file"
            />
          </SearchBarWrapper>

          <FileTypeDropdown />
        </HeaderRight>
      </HeaderRow>

      {tableFiles.length === 0 ? (
        <div>No files in this lesson yet.</div>
      ) : (
        <FilesTable files={tableFiles} onRowClick={handleRowClick} />
      )}

      {selectedFile && (
        <FilePreviewModal onClose={() => setSelectedFile(null)}>
          <FilePreview file={selectedFile} />
        </FilePreviewModal>
      )}
    </PageContainer>
  );
}
