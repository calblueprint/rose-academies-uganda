// Offline Library page.
// Purpose:
// - Shows the set of lesson files marked to be available offline.
// - Sync execution happens from the local (Pi) app, not here.
// - For MVP: list + remove action placeholder.

"use client";

import Link from "next/link";

const MOCK_OFFLINE_ITEMS = [
  { lessonId: "lesson-001", fileName: "Fractions Worksheet.pdf" },
  { lessonId: "lesson-002", fileName: "Plant Diagram.png" },
];

export default function OfflineLibraryPage() {
  return (
    <main>
      <h1>Offline Library</h1>

      <p>Items marked for offline (mock data).</p>

      <ul>
        {MOCK_OFFLINE_ITEMS.map((item, idx) => (
          <li key={idx}>
            {item.fileName} (from{" "}
            <Link href={`/app/lessons/${item.lessonId}`}>{item.lessonId}</Link>){" "}
            <button
              type="button"
              onClick={() => {
                // Placeholder for later "remove from offline set"
                alert("Remove from Offline (placeholder)");
              }}
            >
              Remove (placeholder)
            </button>
          </li>
        ))}
      </ul>

      <p>
        <Link href="/app/lessons">Back to Lessons</Link>
      </p>
    </main>
  );
}
