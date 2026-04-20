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
  sizeBytes: number | null;
  createdAt: string | null;
  updatedAt: string | null;
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

  const initialTableFiles = useMemo<FileRow[]>(
    () =>
      files.map((file, index) => ({
        id: file.id,
        name: file.name,
        sizeBytes: file.sizeBytes ?? 0,
        createdAt: file.createdAt ?? new Date(2026, 0, index + 1).toISOString(),
        updatedAt:
          file.updatedAt ??
          file.createdAt ??
          new Date(2026, 0, index + 1).toISOString(),
        order: index,
      })),
    [files],
  );

  const [tableFiles, setTableFiles] = useState<FileRow[]>(initialTableFiles);

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
          <UploadFilesButton lessonId={lesson.id} />
        </SearchBarRow>

        <FilesTable
          files={tableFiles}
          setFiles={setTableFiles}
          searchTerm={searchTerm}
        />
      </LessonInformation>
    </PageContainer>
  );
}
