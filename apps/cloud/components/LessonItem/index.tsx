"use client";

import { useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FileTypeBadge from "@/components/FileTypeBadge";
import { DataContext } from "@/context/DataContext";
import { IconSvgs } from "@/lib/icons";
import StatusPill from "../StatusPill";
import {
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
  status,
}: {
  lessonId: number;
  lessonName: string;
  status?: "available" | "pending";
}) {
  const [opened, setOpened] = useState(false);
  const data = useContext(DataContext);
  const router = useRouter();

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
          {status ? <StatusPill status={status} /> : null}
        </LessonLeft>

        <LessonRight>
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
                <FileTypeBadge fileName={file.name} />

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
