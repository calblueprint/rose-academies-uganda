"use client";

import CloudSyncButton from "@/components/CloudSyncButton";
import PiStorageBar from "@/components/PiStorageBar";
import { Actions, Wrapper } from "./styles";

export default function StorageAndSync() {
  return (
    <Wrapper>
      <PiStorageBar />
      <Actions>
        <CloudSyncButton />
      </Actions>
    </Wrapper>
  );
}
