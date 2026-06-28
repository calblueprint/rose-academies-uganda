"use client";

import type { Group, Lesson, LocalFile } from "@/types/schema";
import React, { createContext, useCallback, useEffect, useState } from "react";
import supabase from "@/api/supabase/client";
import { fetchVisibleClassrooms } from "@/lib/classrooms";

interface DataContextType {
  userId: string;
  groups: Group[];
  lessons: Lesson[];
  files: LocalFile[];
  refresh: () => Promise<void>;
}

const EMPTY_ARRAY: never[] = [];

export const DataContext = createContext<DataContextType>({
  userId: "",
  groups: EMPTY_ARRAY as Group[],
  lessons: EMPTY_ARRAY as Lesson[],
  files: EMPTY_ARRAY as LocalFile[],
  refresh: async () => {},
});

export function DataContextProvider({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [files, setFiles] = useState<LocalFile[]>([]);

  type LessonFileRow = {
    lesson_id: number;
    Files: LocalFile | null;
  };

  const fetchData = useCallback(async () => {
    const [
      { data: lessonsData, error: lessonsError },
      { data: lessonFilesData, error: lessonFilesError },
      visibleClassrooms,
    ] = await Promise.all([
      supabase.from("Lessons").select("*").eq("user_id", userId),
      supabase.from("LessonFiles").select(`
        lesson_id,
        Files (*)
      `),
      fetchVisibleClassrooms(supabase, userId),
    ]);

    if (lessonsError) throw lessonsError;
    if (lessonFilesError) throw lessonFilesError;

    const flattenedFiles: LocalFile[] =
      (lessonFilesData as unknown as LessonFileRow[])
        ?.filter(
          (row): row is LessonFileRow & { Files: LocalFile } =>
            row.Files !== null,
        )
        .map(row => ({
          ...row.Files,
          lesson_id: row.lesson_id,
        })) ?? [];

    setGroups(visibleClassrooms);
    setLessons(lessonsData ?? []);
    setFiles(flattenedFiles);
  }, [userId]);

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
    userId,
    groups,
    lessons,
    files,
    refresh: fetchData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
