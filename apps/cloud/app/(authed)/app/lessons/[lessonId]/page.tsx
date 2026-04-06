"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import supabase from "@/api/supabase/client";
import EditLessonButton from "@/components/EditLessonButton";
import OfflineToggle from "@/components/OfflineToggle";
import { getCurrentDeviceId } from "@/lib/getCurrentUserDevice";
import * as style from "./style";

type PageProps = {
  params: Promise<{ lessonId: string }>;
};

type Lesson = {
  id: number;
  name: string;
  description: string | null;
  group_id: number | null;
};

const MOCK_FILES_BY_LESSON: Record<string, { id: string; name: string }[]> = {
  "lesson-001": [
    { id: "f1", name: "Fractions Worksheet.pdf" },
    { id: "f2", name: "Fractions Slides.pptx" },
  ],
  "lesson-002": [{ id: "f1", name: "Plant Diagram.png" }],
  "lesson-003": [{ id: "f1", name: "Short Story.pdf" }],
};

async function checkIfIsOffline(
  deviceId: string,
  lessonId: number,
): Promise<boolean> {
  const { data, error } = await supabase
    .from("DeviceLessons")
    .select("lesson_id")
    .eq("device_id", deviceId)
    .eq("lesson_id", lessonId);

  if (error) {
    console.error("Error checking offline status:", error.message);
    throw error;
  }

  return !!data && data.length > 0;
}

export default function LessonDetailPage({ params }: PageProps) {
  const { lessonId } = use(params);
  const numericLessonId = Number(lessonId);
  const files = MOCK_FILES_BY_LESSON[lessonId] ?? [];

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const loadPageData = async () => {
      if (Number.isNaN(numericLessonId)) {
        console.error(`Invalid lessonId: ${lessonId}`);
        return;
      }

      try {
        const [{ data: lessonData, error: lessonError }, currentDeviceId] =
          await Promise.all([
            supabase
              .from("Lessons")
              .select("id, name, description, group_id")
              .eq("id", numericLessonId)
              .single(),
            getCurrentDeviceId(),
          ]);

        if (lessonError) {
          console.error("Failed to load lesson:", lessonError.message);
          return;
        }

        setLesson(lessonData);
        setDeviceId(currentDeviceId);

        const offlineStatus = await checkIfIsOffline(
          currentDeviceId,
          numericLessonId,
        );
        setIsOffline(offlineStatus);
      } catch (error) {
        console.error("Failed to load lesson detail page:", error);
      }
    };

    void loadPageData();
  }, [lessonId, numericLessonId]);

  if (Number.isNaN(numericLessonId)) {
    return <main>Invalid lesson ID.</main>;
  }

  if (!lesson) {
    return <main>Loading lesson...</main>;
  }

  return (
    <main>
      <style.HeaderBox>
        <h1>Lesson: {lesson.name}</h1>

        <OfflineToggle
          deviceId={deviceId}
          lessonId={numericLessonId}
          isOffline={isOffline}
          setIsOffline={setIsOffline}
        />

        <EditLessonButton lesson={lesson} />
      </style.HeaderBox>

      {lesson.description && <p>{lesson.description}</p>}

      <h2>Files</h2>

      {files.length === 0 ? (
        <p>No files (mock data).</p>
      ) : (
        <ul>
          {files.map(f => (
            <li key={f.id}>
              {f.name}{" "}
              <button
                type="button"
                onClick={() => {
                  alert("Mark for Offline (placeholder)");
                }}
              >
                Mark for Offline (placeholder)
              </button>
            </li>
          ))}
        </ul>
      )}

      <p>
        <Link href="/app/lessons">Back to Lessons</Link>
      </p>
      <p>
        <Link href="/app/offline-library">Go to Offline Library</Link>
      </p>
    </main>
  );
}
