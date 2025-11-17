"use client";

import { createContext, useEffect, useState } from "react";
import { fetchLocalDatabase } from "@/api/sqlite/queries/query";
import { Group, Lesson, LocalFile, Teacher } from "@/types/schema";

interface DataContextType {
  teachers: Teacher[];
  groups: Group[];
  lessons: Lesson[];
  files: LocalFile[];
}

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
        const data = await fetchLocalDatabase();
        setData(data);
      } catch (error) {
        console.error("Error fetching local database:", error);
      }
    }
    fetchData();
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
