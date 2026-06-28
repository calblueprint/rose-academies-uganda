"use client";

import { useLanguage } from "@/lib/i18n";

export default function TranslatedText({ tKey }: { tKey: string }) {
  const { t } = useLanguage();

  return <>{t(tKey)}</>;
}
