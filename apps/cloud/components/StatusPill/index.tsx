"use client";

import { useLanguage } from "@/lib/i18n";
import { Dot, Pill } from "./styles";

export default function StatusPill({
  status,
}: {
  status: "available" | "pending";
}) {
  const { t } = useLanguage();
  const label =
    status === "available" ? t("status.synced") : t("status.pendingSync");

  return (
    <Pill $status={status}>
      <Dot $status={status} />
      {label}
    </Pill>
  );
}
