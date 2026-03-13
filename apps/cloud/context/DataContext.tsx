"use client";

import type { Group, Lesson, LocalFile } from "@/types/schema";
import React, { createContext, useCallback, useEffect, useState } from "react";
import supabase from "@/api/supabase/client";

interface DataContextType {
  groups: Group[];
  lessons: Lesson[];
  files: LocalFile[];
  refresh: () => Promise<void>;
}

const EMPTY_ARRAY: never[] = [];

export const DataContext = createContext<DataContextType>({
  groups: EMPTY_ARRAY as Group[],
  lessons: EMPTY_ARRAY as Lesson[],
  files: EMPTY_ARRAY as LocalFile[],
  refresh: async () => {},
});

export function DataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [files, setFiles] = useState<LocalFile[]>([]);
  type LessonFileRow = {
    lesson_id: number;
    Files: LocalFile[];
  };

  const fetchData = useCallback(async () => {
    const [
      { data: groupsData, error: groupsError },
      { data: lessonsData, error: lessonsError },
      { data: lessonFilesData, error: lessonFilesError },
    ] = await Promise.all([
      supabase.from("Groups").select("*"),
      supabase.from("Lessons").select("*"),
      supabase.from("LessonFiles").select(`
        lesson_id,
        Files (*)
      `),
    ]);

    if (groupsError) throw groupsError;
    if (lessonsError) throw lessonsError;
    if (lessonFilesError) throw lessonFilesError;

    const flattenedFiles: LocalFile[] =
      lessonFilesData?.flatMap((row: LessonFileRow) =>
        row.Files.map(file => ({
          ...file,
          lesson_id: row.lesson_id,
        })),
      ) ?? [];

    setGroups(groupsData ?? []);
    setLessons(lessonsData ?? []);
    setFiles(flattenedFiles);
  }, []);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        await fetchData();
      } catch (error) {
        console.error("Error fetching Supabase data:", error);
        if (isMounted) {
          setGroups([]);
          setLessons([]);
          setFiles([]);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [fetchData]);

  const value: DataContextType = {
    groups,
    lessons,
    files,
    refresh: fetchData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
