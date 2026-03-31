// Home route (/).
// Purpose:
// - Make the root URL predictable during development.
// - For now, send users to /login.
// - Later, you might redirect based on auth session.

import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/login");
}
