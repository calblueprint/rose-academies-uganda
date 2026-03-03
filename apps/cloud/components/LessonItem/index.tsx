"use client";

import { useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DataContext } from "@/context/DataContext";
import { IconSvgs } from "@/lib/icons";
import StatusPill from "../StatusPill";
import {
  FileIcon,
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

  // some random set data for determing which lessons have which tags
  const AVAILABLE_LESSONS = new Set([1, 4, 6]);

  const status: "available" | "pending" = AVAILABLE_LESSONS.has(lessonId)
    ? "available"
    : "pending";

  const files = useMemo(() => {
    if (!data) return [];
    return data.files.filter(file => file.lesson_id === lessonId);
  }, [data, lessonId]);

  return (
    <LessonWrapper>
      <LessonHeader onClick={() => setOpened(prev => !prev)}>
        <LessonLeft>
          <LessonIcon />
          <LessonName>{lessonName}</LessonName>
        </LessonLeft>

        <LessonRight>
          <StatusPill
            status={status} // can change to "pending" as well, just temp placeholder
          />
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
                <FileIcon>{IconSvgs.textSnippet}</FileIcon>

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
