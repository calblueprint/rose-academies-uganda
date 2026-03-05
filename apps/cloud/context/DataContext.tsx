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

  const fetchData = useCallback(async () => {
    const [
      { data: groupsData, error: groupsError },
      { data: lessonsData, error: lessonsError },
      { data: filesData, error: filesError },
    ] = await Promise.all([
      supabase.from("Groups").select("*"),
      supabase.from("Lessons").select("*"),
      supabase.from("Files").select("*"),
    ]);

    if (groupsError) throw groupsError;
    if (lessonsError) throw lessonsError;
    if (filesError) throw filesError;

    setGroups(groupsData ?? []);
    setLessons(lessonsData ?? []);
    setFiles(filesData ?? []);
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
