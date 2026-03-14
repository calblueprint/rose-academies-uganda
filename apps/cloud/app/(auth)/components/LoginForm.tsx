import * as style from "../components/style";

type LoginFormProps = {
  loginAction: (formData: FormData) => Promise<void>;
};

export default function LoginForm({ loginAction }: LoginFormProps) {
  return (
    <style.Main>
      <style.Card>
        <style.LogoWrap>
          <style.Logo src="/logo.png" alt="Logo" />
        </style.LogoWrap>

        <style.H1>Login</style.H1>

        <style.Form action={loginAction}>
          <style.Label>
            Email
            <style.Input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Email"
            />
          </style.Label>

          <style.Label>
            Password
            <style.Input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Password"
            />
          </style.Label>

          <style.Button type="submit">Log in</style.Button>
        </style.Form>

        <style.Paragraph>
          Invite-only. Contact an administrator for access.
        </style.Paragraph>
      </style.Card>
    </style.Main>
  );
}
