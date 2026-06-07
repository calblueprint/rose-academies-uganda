"use client";

import type { SyncStage } from "./syncStages";
import {
  LastSyncedInfo,
  ProgressBar,
  ProgressFill,
  StageStatusText,
  SyncProgressArea,
} from "./styles";
import { SYNC_STAGE_MESSAGES, SYNC_STAGE_PROGRESS } from "./syncStages";

type SyncStageIndicatorProps = {
  stage: SyncStage | null;
  lastSyncedText: string;
};

export default function SyncStageIndicator({
  stage,
  lastSyncedText,
}: SyncStageIndicatorProps) {
  if (!stage) {
    return (
      <LastSyncedInfo>
        <StageStatusText>Last Sync Completed</StageStatusText>
        <StageStatusText>{lastSyncedText}</StageStatusText>
      </LastSyncedInfo>
    );
  }

  return (
    <SyncProgressArea>
      <ProgressBar>
        <ProgressFill percent={SYNC_STAGE_PROGRESS[stage]} />
      </ProgressBar>

      <StageStatusText>{SYNC_STAGE_MESSAGES[stage]}</StageStatusText>
    </SyncProgressArea>
  );
}
