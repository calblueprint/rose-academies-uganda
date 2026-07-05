"use client";

import { useLanguage } from "@/lib/i18n";
import { CheckMark, Dot, Pill } from "./styles";

export default function StatusPill({
  status,
}: {
  status: "available" | "pending" | "pending_removal" | "dashboard";
}) {
  const { t } = useLanguage();
  const label =
    status === "available"
      ? t("status.synced")
      : status === "pending"
        ? t("status.pendingSync")
        : status === "pending_removal"
          ? t("status.pendingRemoval")
          : t("status.dashboardOnly");
  const displayLabel =
    status === "available" ? label.replace(/^✓\s*/, "") : label;

  return (
    <Pill $status={status}>
      {status === "available" ? (
        <CheckMark aria-hidden="true">✓</CheckMark>
      ) : (
        <Dot $status={status} aria-hidden="true" />
      )}
      {displayLabel}
    </Pill>
  );
}
