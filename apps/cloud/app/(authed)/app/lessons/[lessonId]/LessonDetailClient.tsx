"use client";

import { useMemo, useState } from "react";
import ArchiveToggle from "@/components/ArchiveToggle/ArchiveToggle";
import EditLessonButton from "@/components/EditLessonButton";
import FilesTable, { FileRow } from "@/components/FilesTable";
import LessonHeader from "@/components/LessonHeader";
import OfflineToggle from "@/components/OfflineToggle";
import SearchBar from "@/components/SearchBar";
import UploadFilesButton from "@/components/UploadFilesButton";
import VillageTags from "@/components/VillageTags";
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

  const filteredFiles = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return files;
    }

    return files.filter(file =>
      file.name.toLowerCase().includes(normalizedSearch),
    );
  }, [files, searchTerm]);

  const tableFiles = useMemo<FileRow[]>(
    () =>
      filteredFiles.map((file, index) => ({
        id: file.id,
        name: file.name,
        sizeBytes: 1024 * (index + 1),
        createdAt: new Date(2026, 0, index + 1).toISOString(),
        updatedAt: new Date(2026, 1, index + 1).toISOString(),
        order: index,
      })),
    [filteredFiles],
  );

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
              hasFiles={files.length > 0}
            />
            <EditLessonButton lesson={lesson} />
          </HeaderButtons>
        </HeaderBox>

        <LessonDescription>{lesson.description}</LessonDescription>

        <VillageTags villages={villages} />

        <SearchBarRow>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <UploadFilesButton lessonId={lesson.id} />
        </SearchBarRow>

        <FilesTable initialFiles={tableFiles} />
      </LessonInformation>
    </PageContainer>
  );
}
