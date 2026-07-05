"use client";

import { useLanguage } from "@/lib/i18n";
import { IconSvgs } from "@/lib/icons";
import { Card, Content, IconWrapper, StatusText, Title } from "./style";

export default function WifiStatus() {
  const { t } = useLanguage();

  return (
    <Card>
      <IconWrapper>{IconSvgs.wifi}</IconWrapper>
      <Content>
        <Title>{t("status.wifiTitle")}</Title>
        <StatusText>{t("status.broadcasting")}</StatusText>
      </Content>
    </Card>
  );
}
