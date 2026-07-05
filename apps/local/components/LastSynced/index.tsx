"use client";

import { useLanguage } from "@/lib/i18n";
import { IconSvgs } from "@/lib/icons";
import { Card, Content, IconWrapper, StatusText, Title } from "./style";

export default function LastSynced() {
  const { t } = useLanguage();

  return (
    <Card>
      <IconWrapper>{IconSvgs.clock}</IconWrapper>
      <Content>
        <Title>{t("status.lastUpdated")}</Title>
        <StatusText>{t("status.lastUpdatedExample")}</StatusText>
      </Content>
    </Card>
  );
}
