"use client";

import PiStorageBar from "@/components/PiStorageBar";
import { useLanguage } from "@/lib/i18n";
import COLORS from "@/styles/colors";
import {
  Card,
  Content,
  Dot,
  Label,
  LeftGroup,
  Row,
  Title,
  TopSection,
  Value,
} from "./styles";

interface SyncSummaryCardProps {
  userId?: string | null;
  deviceId?: string | null;
  availableCount: number;
  pendingCount: number;
}

export default function SyncSummaryCard({
  userId,
  deviceId,
  availableCount,
  pendingCount,
}: SyncSummaryCardProps) {
  const { t } = useLanguage();

  return (
    <Card>
      <Content>
        <TopSection>
          <Title>{t("sync.summary")}</Title>

          <PiStorageBar userId={userId} deviceId={deviceId} />

          <Row>
            <LeftGroup>
              <Dot $color={COLORS.lightLightGreen} />
              <Label>{t("status.synced")}</Label>
            </LeftGroup>
            <Value>{availableCount}</Value>
          </Row>

          <Row>
            <LeftGroup>
              <Dot $color={COLORS.orange100} />
              <Label>{t("status.pendingSync")}</Label>
            </LeftGroup>
            <Value>{pendingCount}</Value>
          </Row>
        </TopSection>
      </Content>
    </Card>
  );
}
