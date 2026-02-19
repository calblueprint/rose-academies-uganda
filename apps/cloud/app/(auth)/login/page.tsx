// Login page (public).
// Purpose:
// - Authenticate teacher into cloud app.
// - For now: includes links to simulate "logged in" navigation.
// - Later: replace with Supabase Auth / your own login form.

import Link from "next/link";

export default function LoginPage() {
  return (
    <main>
      <h1>Login</h1>

      <p>Placeholder login page.</p>

      <p>
        {/* Mock "log in" link for click-through testing */}
        <Link href="/app/lessons">Mock Login → Lessons</Link>
      </p>

      <p>
        <Link href="/app/offline-library">Mock Login → Offline Library</Link>
      </p>
    </main>
  );
}
