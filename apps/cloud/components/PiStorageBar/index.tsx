"use client";

import { useEffect, useState } from "react";
import supabase from "@/api/supabase/client";
import {
  Content,
  ProgressBar,
  ProgressFill,
  StatusText,
  StorageInfo,
  Title,
} from "./styles";

type StorageResponse = {
  disk: {
    totalKb: number;
    usedKb: number;
    availableKb: number;
    usePercent: number;
  };
};

export default function PiStorageBar({ userId }: { userId: string }) {
  const [storage, setStorage] = useState<StorageResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadStorage() {
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
          totalKb: data.total_kb,
          usedKb: data.used_kb,
          availableKb: data.available_kb,
          usePercent: data.use_percent,
        },
      });
    }

    loadStorage();
  }, [userId]);

  if (errorMessage) {
    return (
      <Content>
        <Title>Raspberry Pi</Title>
        <StatusText>{errorMessage}</StatusText>
      </Content>
    );
  }

  if (!storage) {
    return (
      <Content>
        <Title>Raspberry Pi</Title>
        <StatusText>Loading storage...</StatusText>
      </Content>
    );
  }

  const totalGb = Math.round(storage.disk.totalKb / 1024 / 1024);
  const usedGb = Math.round(storage.disk.usedKb / 1024 / 1024);
  const percent = Math.round((usedGb / totalGb) * 100);

  return (
    <Content>
      <Title>Raspberry Pi</Title>

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
