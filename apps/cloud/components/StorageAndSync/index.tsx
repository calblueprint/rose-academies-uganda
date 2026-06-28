"use client";

import CloudSyncButton from "@/components/CloudSyncButton";
import PiStorageBar from "@/components/PiStorageBar";
import { Actions, Wrapper } from "./styles";

export default function StorageAndSync({
  userId,
  deviceId,
}: {
  userId: string;
  deviceId?: string | null;
}) {
  return (
    <Wrapper>
      <PiStorageBar userId={userId} deviceId={deviceId} />
      <Actions>
        <CloudSyncButton userId={userId} deviceId={deviceId} />
      </Actions>
    </Wrapper>
  );
}
