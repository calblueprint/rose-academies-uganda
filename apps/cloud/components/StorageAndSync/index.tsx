"use client";

import CloudSyncButton from "@/components/CloudSyncButton";
import PiStorageBar from "@/components/PiStorageBar";
import { Actions, Wrapper } from "./styles";

export default function StorageAndSync({ userId }: { userId: string }) {
  return (
    <Wrapper>
      <PiStorageBar userId={userId} />
      <Actions>
        <CloudSyncButton userId={userId} />
      </Actions>
    </Wrapper>
  );
}
