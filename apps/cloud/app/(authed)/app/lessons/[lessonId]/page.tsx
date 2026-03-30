// Lesson detail page.
// Purpose:
// - Shows a single lesson and its files.
// - Files belong to exactly one lesson (no global file library for MVP).
// - Later: upload files here, mark files for offline, etc.

"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import supabase from "@/api/supabase/client";
import OfflineToggle from "@/components/OfflineToggle";
import * as style from "./style";

type PageProps = {
  params: Promise<{ lessonId: string }>;
};

const MOCK_FILES_BY_LESSON: Record<string, { id: string; name: string }[]> = {
  "lesson-001": [
    { id: "f1", name: "Fractions Worksheet.pdf" },
    { id: "f2", name: "Fractions Slides.pptx" },
  ],
  "lesson-002": [{ id: "f1", name: "Plant Diagram.png" }],
  "lesson-003": [{ id: "f1", name: "Short Story.pdf" }],
};

async function checkIfIsOffline(lessonId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("OfflineLibrary")
    .select("lesson_id")
    .eq("lesson_id", lessonId);

  if (error) {
    console.error("Error checking offline status:", error.message);
    throw error;
  }

  const isOffline = data && data.length > 0;
  return isOffline;
}

export default function LessonDetailPage({ params }: PageProps) {
  const { lessonId } = use(params);
  const files = MOCK_FILES_BY_LESSON[lessonId] ?? [];
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    checkIfIsOffline(lessonId).then(setIsOffline);
  }, [lessonId]);

  return (
    <main>
      <style.HeaderBox>
        <h1>Lesson: {lessonId}</h1>
        <OfflineToggle
          lessonId={lessonId}
          isOffline={isOffline}
          setIsOffline={setIsOffline}
        />
      </style.HeaderBox>

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
