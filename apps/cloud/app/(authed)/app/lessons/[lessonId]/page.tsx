// Lesson detail page.
// Purpose:
// - Shows a single lesson and its files.
// - Files belong to exactly one lesson (no global file library for MVP).
// - Later: upload files here, mark files for offline, etc.

"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import supabase from "@/api/supabase/client";
import LessonHeader from "@/components/LessonHeader";
import OfflineToggle from "@/components/OfflineToggle";
import { getCurrentDeviceId } from "@/lib/getCurrentUserDevice";

type PageProps = {
  params: Promise<{ lessonId: string }>;
};
type Lesson = {
  id: number;
  name: string;
  image_path: string | null;
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

  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const loadOfflineStatus = async () => {
      if (Number.isNaN(numericLessonId)) {
        console.error(`Invalid lessonId for DeviceLessons: ${lessonId}`);
        return;
      }

      try {
        const currentDeviceId = await getCurrentDeviceId();
        setDeviceId(currentDeviceId);

        const offlineStatus = await checkIfIsOffline(
          currentDeviceId,
          numericLessonId,
        );
        setIsOffline(offlineStatus);
        const { data: lessonData, error: lessonError } = await supabase
          .from("Lessons")
          .select("id, name, image_path")
          .eq("id", numericLessonId)
          .single();

        if (lessonError) {
          console.error("Error fetching lesson data:", lessonError.message);
          return;
        }

        // store fetched lesson so the header can display actual lesson data
        setLesson(lessonData ?? null);
      } catch (error) {
        console.error("Failed to load offline status:", error);
      }
    };

    void loadOfflineStatus();
  }, [lessonId, numericLessonId]);

  return (
    <main>
      <LessonHeader
        lessonId={numericLessonId}
        lessonName={lesson?.name ?? `Lesson ${lessonId}`}
        imagePath={lesson?.image_path ?? null}
      />

      <OfflineToggle
        deviceId={deviceId}
        lessonId={numericLessonId}
        isOffline={isOffline}
        setIsOffline={setIsOffline}
      />

      <p>
        <button
          type="button"
          onClick={() => {
            // Placeholder for future modal open
            alert("Edit Lesson (modal later)");
          }}
        >
          Edit Lesson (placeholder)
        </button>
      </p>

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
                  // Placeholder for later "mark for offline" behavior
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
