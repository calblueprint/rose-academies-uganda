"use client";

import { useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DataContext } from "@/context/DataContext";
import { IconSvgs } from "@/lib/icons";
import {
  DownloadLink,
  EmptyFilesMessage,
  FileIcon,
  FileLeft,
  FileName,
  FileRow,
  FilesContainer,
  LessonHeader,
  LessonLeft,
  LessonName,
  LessonRight,
  LessonWrapper,
} from "./styles";

export default function LessonItem({
  lessonId,
  lessonName,
}: {
  lessonId: number;
  lessonName: string;
}) {
  const [opened, setOpened] = useState(false);
  const data = useContext(DataContext);
  const router = useRouter();

  const files = useMemo(() => {
    if (!data) return [];

    const fileIdsForLesson = new Set(
      data.lessonFiles
        .filter(lessonFile => lessonFile.lesson_id === lessonId)
        .map(lessonFile => lessonFile.file_id),
    );

    return data.files.filter(file => fileIdsForLesson.has(file.id));
  }, [data, lessonId]);

  return (
    <LessonWrapper>
      <LessonHeader onClick={() => setOpened(prev => !prev)}>
        <LessonLeft>
          <LessonName>{lessonName}</LessonName>
        </LessonLeft>

        <LessonRight>
          {opened ? IconSvgs.upArrow : IconSvgs.downArrow}
        </LessonRight>
      </LessonHeader>

      {opened && (
        <FilesContainer>
          {files.length > 0 ? (
            files.map(file => (
              <FileRow
                key={file.id}
                onClick={() => router.push(`/lessons/${lessonId}/files`)}
              >
                <FileLeft>
                  <FileIcon>{IconSvgs.textSnippet}</FileIcon>
                  <FileName>{file.name}</FileName>
                </FileLeft>
                <DownloadLink
                  href={`/api/sqlite/files/${file.id}?download=1`}
                  download={file.name}
                  title={`Download ${file.name}`}
                  aria-label={`Download ${file.name}`}
                  onClick={event => event.stopPropagation()}
                >
                  {IconSvgs.download}
                </DownloadLink>
              </FileRow>
            ))
          ) : (
            <EmptyFilesMessage>No files in this lesson yet.</EmptyFilesMessage>
          )}
        </FilesContainer>
      )}
    </LessonWrapper>
  );
}
