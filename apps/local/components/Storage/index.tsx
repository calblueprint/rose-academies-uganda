"use client";

import { useLanguage } from "@/lib/i18n";
import { IconSvgs } from "@/lib/icons";
import {
  Card,
  Content,
  IconWrapper,
  StatusText,
  StorageInfo,
  Title,
} from "./styles";

export default function Storage() {
  const { t } = useLanguage();

  return (
    <Card>
      <IconWrapper>{IconSvgs.storage}</IconWrapper>
      <Content>
        <Title>{t("status.storageTitle")}</Title>
        <StorageInfo>
          <StatusText>{t("status.storageExample")}</StatusText>
          <StatusText>{t("status.storagePercentExample")}</StatusText>
        </StorageInfo>
      </Content>
    </Card>
  );
}
