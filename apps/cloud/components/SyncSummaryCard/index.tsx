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
}

export default function SyncSummaryCard({ lastSynced }: SyncSummaryCardProps) {
  return (
    <Card>
      <Content>
        <TopSection>
          <Title>Sync Summary</Title>

          <Row>
            <LeftGroup>
              <Dot $color={COLORS.lightLightGreen} />
              <Label>Available</Label>
            </LeftGroup>
            <Value>2</Value>
          </Row>

          <Row>
            <LeftGroup>
              <Dot $color={COLORS.orange} />
              <Label>Pending Sync</Label>
            </LeftGroup>
            <Value>2</Value>
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
