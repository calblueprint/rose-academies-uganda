"use client";

import { useState } from "react";
import Link from "next/link";
import ArchiveToggle from "@/components/ArchiveToggle/ArchiveToggle";
import EditLessonButton from "@/components/EditLessonButton";
import LessonHeader from "@/components/LessonHeader";
import OfflineToggle from "@/components/OfflineToggle";
import UploadFilesButton from "@/components/UploadFilesButton";
import VillageTags from "@/components/VillageTags";
import * as style from "./style";

type Lesson = {
  id: number;
  name: string;
  description: string | null;
  group_id: number | null;
  image_path: string | null;
  is_archived: boolean;
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
  villages: string[];
};

export default function LessonDetailClient({
  lesson,
  deviceId,
  initialIsOffline,
  files,
  villages,
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

      <ArchiveToggle lesson_Id={lesson.id} isArchived={lesson.is_archived} />

      {lesson.description && <p>{lesson.description}</p>}

      <VillageTags villages={villages} />

      <h2>Files</h2>

      <div>
        <UploadFilesButton lessonId={lesson.id} />
      </div>

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
