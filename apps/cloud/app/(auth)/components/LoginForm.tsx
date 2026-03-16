"use client";

import { FormEvent, useState } from "react";
import { loginWithEmailPassword } from "@/actions/login";
import * as style from "../components/style";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    const result = await loginWithEmailPassword({ email, password });
    if (result?.error) {
      setErrorMessage("Invalid email or password");
      setIsSubmitting(false);
    }
  };

  return (
    <style.Main>
      <style.Card>
        <style.LogoWrap>
          <style.Logo src="/logo.png" alt="Logo" />
        </style.LogoWrap>
        <style.H1>Login</style.H1>
        <style.Form onSubmit={handleSubmit}>
          <style.Label>
            Email
            <style.Input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
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
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
            />
          </style.Label>
          {errorMessage && <style.Error>{errorMessage}</style.Error>}
          <style.Button
            type="submit"
            disabled={isSubmitting}
            style={{ opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </style.Button>
        </style.Form>
        <style.Paragraph>
          Invite-only. Contact an administrator for access.
        </style.Paragraph>
      </style.Card>
    </style.Main>
  );
}
