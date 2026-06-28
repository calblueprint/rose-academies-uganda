"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  LanguageCode,
  LANGUAGES,
  TranslationKey,
  translations,
} from "@/lib/i18n/translations";

const STORAGE_KEY = "rose-cloud-language";
const DEFAULT_LANGUAGE: LanguageCode = "en";

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: TranslationKey) => string;
  dir: "ltr" | "rtl";
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguageCode(value: string | null): value is LanguageCode {
  return LANGUAGES.some(language => language.code === value);
}

function getLanguageDirection(language: LanguageCode): "ltr" | "rtl" {
  return LANGUAGES.find(item => item.code === language)?.dir ?? "ltr";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
    if (isLanguageCode(savedLanguage)) {
      window.queueMicrotask(() => setLanguageState(savedLanguage));
    }
  }, []);

  const dir = getLanguageDirection(language);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [dir, language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      dir,
      setLanguage: nextLanguage => {
        setLanguageState(nextLanguage);
        window.localStorage.setItem(STORAGE_KEY, nextLanguage);
      },
      t: key => translations[language][key] ?? translations.en[key],
    }),
    [dir, language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}

export { LANGUAGES };
