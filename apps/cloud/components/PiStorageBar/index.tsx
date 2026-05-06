"use client";

import { useEffect, useState } from "react";
import supabase from "@/api/supabase/client";
import {
  Content,
  ProgressBar,
  ProgressFill,
  StatusText,
  StorageInfo,
} from "./styles";

type StorageResponse = {
  disk: {
    totalKb: number;
    usedKb: number;
    availableKb: number;
    usePercent: number;
  };
};

// The Pi uploads these storage fields to the devices table after sync. The
// cloud dashboard reads that cached row instead of calling the Pi directly,
// because the Pi may not be reachable from the public internet.
export default function PiStorageBar({ userId }: { userId: string }) {
  const [storage, setStorage] = useState<StorageResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadStorage() {
      // Each teacher is linked to one device, so user_id scopes the storage
      // lookup to the Raspberry Pi that this dashboard controls.
      const { data, error } = await supabase
        .from("devices")
        .select("total_kb, used_kb, available_kb, use_percent")
        .eq("user_id", userId)
        .single();

      if (error || !data) {
        setErrorMessage(error?.message ?? "No device found for this user");
        return;
      }

      setStorage({
        disk: {
          totalKb: data.total_kb ?? 0,
          usedKb: data.used_kb ?? 0,
          availableKb: data.available_kb ?? 0,
          usePercent: data.use_percent ?? 0,
        },
      });
    }

    loadStorage();
  }, [userId]);

  if (errorMessage) {
    return (
      <Content>
        <StatusText>{errorMessage}</StatusText>
      </Content>
    );
  }

  if (!storage) {
    return (
      <Content>
        <StatusText>Loading storage...</StatusText>
      </Content>
    );
  }

  const totalGb = Math.round(storage.disk.totalKb / 1024 / 1024);
  const usedGb = Math.round(storage.disk.usedKb / 1024 / 1024);
  const percent =
    storage.disk.totalKb > 0
      ? Math.round((storage.disk.usedKb / storage.disk.totalKb) * 100)
      : 0;

  return (
    <Content>
      <ProgressBar>
        <ProgressFill percent={percent} />
      </ProgressBar>

      <StorageInfo>
        <StatusText>
          {usedGb} GB of {totalGb} GB Used
        </StatusText>
        <StatusText>{percent}% Used</StatusText>
      </StorageInfo>
    </Content>
  );
}
