"use client";

import { FormEvent, useState } from "react";
import {
  loginWithEmailPassword,
  signUpWithEmailPassword,
} from "@/actions/login";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/lib/i18n";
import * as style from "./style";

type AuthMode = "signin" | "signup";

export default function LoginForm() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const result =
      mode === "signin"
        ? await loginWithEmailPassword({ email, password })
        : await signUpWithEmailPassword({ displayName, email, password });

    if (result?.error) {
      setErrorMessage(
        mode === "signin" ? t("login.invalid") : t("login.createError"),
      );
      setIsSubmitting(false);
      return;
    }

    if (result && "success" in result && result.success) {
      setSuccessMessage(t("login.checkEmail"));
      setDisplayName("");
      setPassword("");
      setIsSubmitting(false);
    }
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <style.Main>
      <style.Card>
        <style.TopRow>
          <LanguageSelector />
        </style.TopRow>

        <style.LogoWrap>
          <style.Logo src="/logo.png" alt="Logo" />
        </style.LogoWrap>

        <style.Title>
          {mode === "signin" ? t("login.title") : t("login.createTitle")}
        </style.Title>
        <style.Subtitle>
          {mode === "signin" ? t("login.subtitle") : t("login.createSubtitle")}
        </style.Subtitle>

        {successMessage ? (
          <style.SuccessPanel>
            <style.Success>{successMessage}</style.Success>
            <style.Button type="button" onClick={() => switchMode("signin")}>
              {t("login.signIn")}
            </style.Button>
          </style.SuccessPanel>
        ) : (
          <>
            <style.ModeSwitch aria-label={t("login.title")}>
              <style.ModeButton
                type="button"
                $active={mode === "signin"}
                onClick={() => switchMode("signin")}
              >
                {t("login.signIn")}
              </style.ModeButton>
              <style.ModeButton
                type="button"
                $active={mode === "signup"}
                onClick={() => switchMode("signup")}
              >
                {t("login.createAccount")}
              </style.ModeButton>
            </style.ModeSwitch>

            <style.Form onSubmit={handleSubmit}>
              {mode === "signup" ? (
                <style.Input
                  name="displayName"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={t("login.fullName")}
                  value={displayName}
                  onChange={e => {
                    setDisplayName(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                />
              ) : null}

              <style.Input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={t("login.email")}
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage("");
                }}
              />

              <style.PasswordField>
                <style.PasswordInput
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  autoComplete={
                    mode === "signin" ? "current-password" : "new-password"
                  }
                  placeholder={t("login.password")}
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                />
                <style.PasswordToggle
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword(value => !value)}
                >
                  {showPassword ? (
                    <svg
                      aria-hidden="true"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M3 3L21 21"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10.6 10.6A2 2 0 0 0 13.4 13.4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9.5 5.3A9.9 9.9 0 0 1 12 5C17.5 5 21 12 21 12A16 16 0 0 1 18.8 15.2"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.4 6.7C4.2 8.2 3 12 3 12S6.5 19 12 19C13.4 19 14.7 18.6 15.8 18"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M3 12S6.5 5 12 5S21 12 21 12S17.5 19 12 19S3 12 3 12Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 15A3 3 0 1 0 12 9A3 3 0 0 0 12 15Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                  )}
                </style.PasswordToggle>
              </style.PasswordField>

              {errorMessage ? <style.Error>{errorMessage}</style.Error> : null}

              <style.Button
                type="submit"
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting
                  ? mode === "signin"
                    ? t("login.signingIn")
                    : t("login.creatingAccount")
                  : mode === "signin"
                    ? t("login.signIn")
                    : t("login.createAccount")}
              </style.Button>
            </style.Form>
          </>
        )}

        {!successMessage ? (
          <style.HelperText>
            {mode === "signin"
              ? t("login.newEducator")
              : t("login.haveAccount")}
          </style.HelperText>
        ) : null}
      </style.Card>
    </style.Main>
  );
}
