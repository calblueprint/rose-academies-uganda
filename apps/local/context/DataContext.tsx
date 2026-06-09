"use client";

import { createContext, useEffect, useState } from "react";
import { fetchLocalDatabase } from "@/api/sqlite/queries/query";
import { Group, Lesson, LocalFile } from "@/types/schema";

export type LocalLessonFile = {
  lesson_id: number;
  file_id: number;
};

interface DataContextType {
  groups: Group[];
  lessons: Lesson[];
  files: LocalFile[];
  lessonFiles: LocalLessonFile[];
}

type LocalDatabaseResponse = {
  groups: Group[];
  lessons: Lesson[];
  files: LocalFile[];
  lessonFiles?: LocalLessonFile[];
};

export const DataContext = createContext<DataContextType | null>(null);

export function DataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<DataContextType | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = (await fetchLocalDatabase()) as LocalDatabaseResponse;

        setData({
          groups: data.groups,
          lessons: data.lessons,
          files: data.files,
          lessonFiles: data.lessonFiles ?? [],
        });
      } catch (error) {
        console.error("Error fetching local database:", error);
      }
    }

    fetchData();
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
