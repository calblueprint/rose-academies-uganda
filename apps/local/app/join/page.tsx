"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RoseLogo from "@/assets/images/rose-academies-logo.png";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/lib/i18n";
import {
  Card,
  CodeInput,
  CodeInputSection,
  CodeSection,
  ErrorMessage,
  HeaderSection,
  Helper,
  JoinButton,
  LogoContainer,
  Outer,
  SetupLink,
  Title,
  TopRow,
} from "./style";

export default function JoinPage() {
  const { t } = useLanguage();
  const [joinCode, setJoinCode] = useState("");
  const [error, setError] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  function normalizeJoinCode(value: string) {
    return value
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 6);
  }

  async function handleJoin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isJoining) return;

    const normalizedCode = normalizeJoinCode(joinCode);

    if (!normalizedCode) {
      setError(t("join.invalidCode"));
      return;
    }

    setIsJoining(true);
    setError("");

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ joinCode: normalizedCode }),
      });
      const result = (await response.json()) as {
        groupId?: number;
        error?: string;
      };

      if (!response.ok || !result.groupId) {
        setError(result.error ?? t("join.invalidCode"));
        return;
      }

      setJoinCode("");
      window.location.assign(`/groups/${result.groupId}/lessons`);
    } catch {
      setError(t("join.unableToJoin"));
    } finally {
      setIsJoining(false);
    }
  }

  return (
    <Outer>
      <Card>
        <TopRow>
          <LanguageSelector />
        </TopRow>
        <HeaderSection>
          <LogoContainer>
            <Image src={RoseLogo} alt="Rose Academies Logo" unoptimized />
          </LogoContainer>
          <Title>{t("join.title")}</Title>
          <Helper>{t("join.helper")}</Helper>
        </HeaderSection>
        <CodeSection
          as="form"
          action="/api/join"
          method="post"
          onSubmit={handleJoin}
        >
          <CodeInputSection>
            <CodeInput
              id="joinCode"
              name="joinCode"
              placeholder={t("join.placeholder")}
              value={joinCode}
              onChange={e => {
                setJoinCode(normalizeJoinCode(e.target.value));
                if (error) setError("");
              }}
              maxLength={6}
              inputMode="text"
              autoCapitalize="characters"
              spellCheck={false}
              $error={error !== ""}
              autoComplete="off"
              disabled={isJoining}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </CodeInputSection>
          <JoinButton type="submit" disabled={isJoining}>
            {isJoining ? t("join.joining") : t("join.join")}
          </JoinButton>
          <SetupLink as={Link} href="/setup">
            {t("join.setupLink")}
          </SetupLink>
        </CodeSection>
      </Card>
    </Outer>
  );
}
