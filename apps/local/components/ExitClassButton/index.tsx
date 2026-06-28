"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import ActionButton from "@/components/ActionButton";
import { useLanguage } from "@/lib/i18n";
import COLORS from "@/styles/colors";

export default function ExitClassButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  let buttonText = t("header.signOut");

  if (pathname.startsWith("/sync")) {
    buttonText = t("header.viewLessons");
  }

  return (
    <ActionButton
      onClick={() => {
        void fetch("/api/join", { method: "DELETE" }).finally(() => {
          router.push("/join");
          router.refresh();
        });
      }}
      backgroundColor={COLORS.evergreen}
      textColor={COLORS.white}
      iconColor={COLORS.white}
      iconType={pathname.startsWith("/sync") ? "gridActive" : "exitClass"}
      text={buttonText}
      title={t("header.leaveClassroom")}
      animationDuration="1s"
      borderColor={COLORS.surfaceBorder}
    />
  );
}
