// Login page (public).
// Purpose:
// - Authenticate teacher into cloud app.
// - For now: includes links to simulate "logged in" navigation.
// - Later: replace with Supabase Auth / your own login form.

import { loginWithEmailPassword } from "@/actions/login";

export default function LoginPage() {
  async function loginAction(formData: FormData) {
    "use server";
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    await loginWithEmailPassword({ email, password });
  }

  return (
    <main style={{ maxWidth: 360, margin: "80px auto", padding: 16 }}>
      <h1>Login</h1>

      <form action={loginAction} style={{ display: "grid", gap: 12 }}>
        <label>
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <button type="submit">Log in</button>
      </form>

      <p style={{ marginTop: 12, fontSize: 14, opacity: 0.75 }}>
        Invite-only: ask an admin to create your account.
      </p>
    </main>
  );
}
