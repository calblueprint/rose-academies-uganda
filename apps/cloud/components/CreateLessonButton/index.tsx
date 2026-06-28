"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { IconSvgs } from "@/lib/icons";
import { Button, Label } from "./styles";

type Props = {
  onClick: () => void;
};

export default function CreateButton({ onClick }: Props) {
  const { t } = useLanguage();

  return (
    <Button type="button" onClick={onClick}>
      {IconSvgs.plus}
      <Label>{t("lessons.create")}</Label>
    </Button>
  );
}
