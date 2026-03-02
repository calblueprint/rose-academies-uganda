// Lessons list page.
// Purpose:
// - Shows teacher's lessons.
// - Clicking a lesson goes to /app/lessons/[lessonId].
// - "New Lesson" opens the create lesson modal (via test page for now).

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const MOCK_LESSONS = [
  { id: "lesson-001", title: "healthcare" },
  { id: "lesson-002", title: "postnatal care" },
  { id: "lesson-003", title: "vocational" },
];

export default function LessonsListPage() {
  const router = useRouter();

  return (
    <main>
      <h1>Lessons</h1>

      <p>
        <button
          type="button"
          onClick={() => router.push("/app/test-create-lesson")}
        >
          New Lesson
        </button>
      </p>

      <ul>
        {MOCK_LESSONS.map(l => (
          <li key={l.id}>
            <Link href={`/app/lessons/${l.id}`}>{l.title}</Link>
          </li>
        ))}
      </ul>

      <p>
        <Link href="/app/offline-library">Go to Offline Library</Link>
      </p>
    </main>
  );
}
