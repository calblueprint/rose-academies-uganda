// Global 404 page.
// Purpose:
// - Renders when a route doesn't exist.
// - Also used if a page calls notFound() (e.g., invalid lessonId).

import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Not Found</h1>
      <p>This page does not exist.</p>
      <p>
        <Link href="/app/lessons">Go to Lessons</Link>
      </p>
    </main>
  );
}
