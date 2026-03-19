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

export default function PiStorageBar() {
  const [storage, setStorage] = useState<StorageResponse | null>(null);

  useEffect(() => {
    async function loadStorage() {
      const { data, error } = await supabase
        .from("devices")
        .select("*")
        .eq("id", "nathans-pi")
        .single();

      if (error) {
        console.error("Failed to fetch storage:", error);
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
  }, []);

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
  const percent = storage.disk.usePercent;

  // Placeholder test data incase storage function not working but still want to compile
  // const totalGb = Math.round(10000000 / 1024 / 1024);
  // const usedGb = Math.round(1000000 / 1024 / 1024);
  // const percent = 10;

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
