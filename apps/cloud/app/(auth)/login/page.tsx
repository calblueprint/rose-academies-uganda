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
          <S.Label>
            Email
            <S.Input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Email"
            />
          </S.Label>

          <S.Label>
            Password
            <S.Input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Password"
            />
          </S.Label>

          <S.Button type="submit">Log in</S.Button>
        </S.Form>

        <S.Paragraph>
          Invite-only. Contact an administrator for access.
        </S.Paragraph>
      </S.Card>
    </S.Main>
  );
}