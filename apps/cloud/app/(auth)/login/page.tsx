// Login page (public).
// Purpose:
// - Authenticate teacher into cloud app.
// - For now: includes links to simulate "logged in" navigation.
// - Later: replace with Supabase Auth / your own login form.

import { loginWithEmailPassword } from "@/actions/login";
import * as S from "./style";

export default function LoginPage() {
  async function loginAction(formData: FormData) {
    "use server";
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    await loginWithEmailPassword({ email, password });
  }

  return (
    <S.Main>
      <S.Card>
        <S.LogoWrap>
          <S.Logo src="/logo.png" alt="Logo" />
        </S.LogoWrap>
        <S.H1>Login</S.H1>

        <S.Form action={loginAction}>
          <S.Input
            placeholder="Email"
            type="email"
            required
            autoComplete="email"
          />
          <S.Input
            placeholder="Password"
            type="password"
            required
            autoComplete="current-password"
          />
          <S.Button type="submit">Join</S.Button>
        </S.Form>

        <S.Paragraph>
          Invite-only: ask an admin to create your account.
        </S.Paragraph>
      </S.Card>
    </S.Main>
  );
}
