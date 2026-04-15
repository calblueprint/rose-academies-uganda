"use client";

import { useState } from "react";
import Link from "next/link";
import EditLessonButton from "@/components/EditLessonButton";
import LessonHeader from "@/components/LessonHeader";
import OfflineToggle from "@/components/OfflineToggle";
import * as style from "./style";

type Lesson = {
  id: number;
  name: string;
  description: string | null;
  group_id: number | null;
  image_path: string | null;
};

type LessonFile = {
  id: string;
  name: string;
};

type LessonDetailClientProps = {
  lesson: Lesson;
  deviceId: string;
  initialIsOffline: boolean;
  files: LessonFile[];
};

export default function LessonDetailClient({
  lesson,
  deviceId,
  initialIsOffline,
  files,
}: LessonDetailClientProps) {
  const [isOffline, setIsOffline] = useState(initialIsOffline);

  return (
    <main>
      <LessonHeader
        lessonId={lesson.id}
        lessonName={lesson.name}
        imagePath={lesson.image_path}
      />

      <style.HeaderBox>
        <OfflineToggle
          deviceId={deviceId}
          lessonId={lesson.id}
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
