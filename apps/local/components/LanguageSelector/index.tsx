"use client";

import { LANGUAGES, useLanguage } from "@/lib/i18n";
import { IconWrap, Label, Select, Wrapper } from "./style";

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3.6 9h16.8M3.6 15h16.8M12 3c2.1 2.25 3.15 5.25 3.15 9S14.1 18.75 12 21m0-18C9.9 5.25 8.85 8.25 8.85 12S9.9 18.75 12 21"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <Wrapper dir="ltr">
      <IconWrap>
        <GlobeIcon />
      </IconWrap>
      <Label>{t("language.label")}</Label>
      <Select
        id="language-select"
        aria-label={t("language.label")}
        value={language}
        onChange={event => setLanguage(event.target.value as typeof language)}
      >
        {LANGUAGES.map(option => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
}
