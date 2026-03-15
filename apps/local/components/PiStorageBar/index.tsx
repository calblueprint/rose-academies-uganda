"use client";

import { useEffect, useState } from "react";
import {
  Card,
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
      try {
        const res = await fetch("/api/system/storage");
        const data = await res.json();
        setStorage(data);
      } catch (err) {
        console.error("Failed to fetch storage:", err);
      }
    }

    loadStorage();
  }, []);

  if (!storage) {
    return (
      <Card>
        <Content>
          <Title>Raspberry Pi</Title>
          <StatusText>Loading storage...</StatusText>
        </Content>
      </Card>
    );
  }

  const totalGb = Math.round(storage.disk.totalKb / 1024 / 1024);
  const usedGb = Math.round(storage.disk.usedKb / 1024 / 1024);
  const percent = storage.disk.usePercent;

  return (
    <Card>
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
    </Card>
  );
}
