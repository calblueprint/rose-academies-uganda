"use client";

import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      if (pathname === "/join" || pathname === "/setup") {
        setData(null);
        return;
      }

      try {
        const sessionResponse = await fetch("/api/join", {
          cache: "no-store",
        });
        const session = (await sessionResponse.json()) as { joined?: boolean };

        if (!session.joined) {
          setData(null);
          router.replace("/join");
          return;
        }

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

    void fetchData();
  }, [pathname, router]);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
