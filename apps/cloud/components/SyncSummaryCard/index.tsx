import PiStorageBar from "@/components/PiStorageBar";
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
  userId: string;
  availableCount: number;
  pendingCount: number;
}

export default function SyncSummaryCard({
  userId,
  availableCount,
  pendingCount,
}: SyncSummaryCardProps) {
  return (
    <Card>
      <Content>
        <TopSection>
          <Title>Sync Summary</Title>

          <PiStorageBar userId={userId} />

          <Row>
            <LeftGroup>
              <Dot $color={COLORS.lightLightGreen} />
              <Label>Synced</Label>
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
      </Content>
    </Card>
  );
}
