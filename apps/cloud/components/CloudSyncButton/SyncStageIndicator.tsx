"use client";

import type { SyncStage } from "./syncStages";
import { useLanguage } from "@/lib/i18n";
import {
  LastSyncedInfo,
  ProgressBar,
  ProgressFill,
  StageStatusText,
  StageValueText,
  SyncProgressArea,
} from "./styles";
import { SYNC_STAGE_PROGRESS } from "./syncStages";

type SyncStageIndicatorProps = {
  stage: SyncStage | null;
  lastSyncedText: string;
};

export default function SyncStageIndicator({
  stage,
  lastSyncedText,
}: SyncStageIndicatorProps) {
  const { t } = useLanguage();

  const stageMessageKeys: Record<SyncStage, string> = {
    waiting_for_device: "sync.stage.waiting",
    preparing: "sync.stage.preparing",
    downloading_files: "sync.stage.downloading",
    finalizing: "sync.stage.finalizing",
  };

  if (!stage) {
    return (
      <LastSyncedInfo>
        <StageStatusText>{t("sync.lastUpdated")}</StageStatusText>
        <StageValueText>{lastSyncedText}</StageValueText>
      </LastSyncedInfo>
    );
  }

  return (
    <SyncProgressArea>
      <StageValueText>{t(stageMessageKeys[stage])}</StageValueText>
      <ProgressBar>
        <ProgressFill percent={SYNC_STAGE_PROGRESS[stage]} />
      </ProgressBar>
    </SyncProgressArea>
  );
}
