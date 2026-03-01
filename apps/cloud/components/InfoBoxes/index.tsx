"use client";

import { IconSvgs } from "@/lib/icons";
import {
  BoxesRow,
  IconCircle,
  InfoBox,
  InfoLabel,
  InfoLeft,
  InfoValue,
} from "./styles";

export default function InfoBoxes({
  availableOfflineCount,
  pendingDownloadCount,
  lastSyncedLabel,
}: {
  availableOfflineCount: number;
  pendingDownloadCount: number;
  lastSyncedLabel: string;
}) {
  return (
    <BoxesRow>
      <InfoBox>
        <IconCircle $variant="available">{IconSvgs.greenCheck}</IconCircle>
        <InfoLeft>
          <InfoLabel>Available Offline</InfoLabel>
          <InfoValue>{availableOfflineCount}</InfoValue>
        </InfoLeft>
      </InfoBox>

      <InfoBox>
        <IconCircle $variant="pending">{IconSvgs.orangeDownload}</IconCircle>
        <InfoLeft>
          <InfoLabel>Pending Download</InfoLabel>
          <InfoValue>{pendingDownloadCount}</InfoValue>
        </InfoLeft>
      </InfoBox>

      <InfoBox>
        <IconCircle $variant="synced">{IconSvgs.redClock}</IconCircle>
        <InfoLeft>
          <InfoLabel>Last Synced</InfoLabel>
          <InfoValue>{lastSyncedLabel}</InfoValue>
        </InfoLeft>
      </InfoBox>
    </BoxesRow>
  );
}
