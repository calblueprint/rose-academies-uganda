import COLORS from "@/styles/colors";
import {
  BottomRow,
  Card,
  Content,
  Divider,
  Dot,
  Label,
  LastSyncedValue,
  LeftGroup,
  Row,
  Title,
  TopSection,
  Value,
} from "./styles";

interface SyncSummaryCardProps {
  lastSynced: string;
  availableCount: number;
  pendingCount: number;
}

export default function SyncSummaryCard({
  lastSynced,
  availableCount,
  pendingCount,
}: SyncSummaryCardProps) {
  return (
    <Card>
      <Content>
        <TopSection>
          <Title>Sync Summary</Title>

          <Row>
            <LeftGroup>
              <Dot $color={COLORS.lightLightGreen} />
              <Label>Available Offline</Label>
            </LeftGroup>
            <Value>{availableCount}</Value>
          </Row>

          <Row>
            <LeftGroup>
              <Dot $color={COLORS.orange100} />
              <Label>Pending Sync</Label>
            </LeftGroup>
            <Value>{pendingCount}</Value>
          </Row>
        </TopSection>

        <Divider />

        <BottomRow>
          <Label>Last Synced</Label>
          <LastSyncedValue>{lastSynced}</LastSyncedValue>
        </BottomRow>
      </Content>
    </Card>
  );
}
