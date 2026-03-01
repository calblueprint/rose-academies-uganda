"use client";

import { createContext, useEffect, useState } from "react";
import supabase from "@/api/supabase/client";
import { Group, Lesson, LocalFile } from "@/types/schema";

interface DataContextType {
  groups: Group[];
  lessons: Lesson[];
  files: LocalFile[];
}

const EMPTY_DATA: DataContextType = {
  groups: [],
  lessons: [],
  files: [],
};

export const DataContext = createContext<DataContextType>(EMPTY_DATA);

export function DataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<DataContextType>(EMPTY_DATA);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const [
          { data: groups, error: groupsError },
          { data: lessons, error: lessonsError },
          { data: files, error: filesError },
        ] = await Promise.all([
          supabase.from("Groups").select("*"),
          supabase.from("Lessons").select("*"),
          supabase.from("Files").select("*"),
        ]);

        if (groupsError) throw groupsError;
        if (lessonsError) throw lessonsError;
        if (filesError) throw filesError;

        if (!isMounted) return;

        setData({
          groups: groups ?? [],
          lessons: lessons ?? [],
          files: files ?? [],
        });
      } catch (error) {
        console.error("Error fetching Supabase data:", error);
        if (isMounted) setData(EMPTY_DATA);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
