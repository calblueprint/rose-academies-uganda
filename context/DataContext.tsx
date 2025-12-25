"use client";

import { createContext, useEffect, useState } from "react";
import supabase from "@/api/supabase/client";
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
        const [teachersRes, groupsRes, lessonsRes, filesRes] =
          await Promise.all([
            supabase.from("Teachers").select("*"),
            supabase.from("Groups").select("*"),
            supabase.from("Lessons").select("*"),
            supabase.from("Files").select("*"),
          ]);

        if (
          teachersRes.error ||
          groupsRes.error ||
          lessonsRes.error ||
          filesRes.error
        ) {
          throw new Error("Error fetching data from Supabase");
        }

        setData({
          teachers: teachersRes.data ?? [],
          groups: groupsRes.data ?? [],
          lessons: lessonsRes.data ?? [],
          files: filesRes.data ?? [],
        });
      } catch (error) {
        console.error("Error fetching demo data:", error);
      }
    }
    fetchData();
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
