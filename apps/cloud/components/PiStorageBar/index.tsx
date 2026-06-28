"use client";

// Displays a progress bar showing how much disk space is used on the teacher's
// Classroom Hub. The hub reports storage fields to the devices table after each
// sync; this component reads that cached row rather than calling the hub directly,
// since the hub may not be reachable from the public internet.
import { useEffect, useState } from "react";
import supabase from "@/api/supabase/client";
import { useLanguage } from "@/lib/i18n";
import {
  Content,
  ProgressBar,
  ProgressFill,
  StatusText,
  StorageInfo,
} from "./styles";

// availableKb and usePercent are fetched from the database and stored here for
// completeness, but the display uses usedKb and totalKb directly (see percent below).
type StorageResponse = {
  disk: {
    totalKb: number;
    usedKb: number;
    availableKb: number;
    usePercent: number;
  };
};

// The Classroom Hub uploads these storage fields to the devices table after sync.
// The cloud dashboard reads that cached row instead of calling the hub directly,
// because the hub may not be reachable from the public internet.
export default function PiStorageBar({
  userId,
  deviceId,
}: {
  userId?: string | null;
  deviceId?: string | null;
}) {
  const { t } = useLanguage();
  const [storage, setStorage] = useState<StorageResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadStorage() {
      const hasDeviceId = Boolean(deviceId && deviceId !== "undefined");
      const hasUserId = Boolean(userId && userId !== "undefined");

      if (!hasDeviceId && !hasUserId) {
        setErrorMessage("No Classroom Hub found for this setup.");
        return;
      }

      // Each teacher is linked to one device, so user_id scopes the storage
      // lookup to the Classroom Hub that this dashboard controls.
      let query = supabase
        .from("devices")
        .select("total_kb, used_kb, available_kb, use_percent");

      query = hasDeviceId
        ? query.eq("id", deviceId as string)
        : query.eq("user_id", userId as string);

      const { data, error } = await query.single();

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
  }, [deviceId, userId]);

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
        <StatusText>{t("storage.loading")}</StatusText>
      </Content>
    );
  }

  const totalGb = Math.round(storage.disk.totalKb / 1024 / 1024);
  const usedGb = Math.round(storage.disk.usedKb / 1024 / 1024);
  // usePercent from the Pi reports used / (used + available), which excludes space
  // reserved by the OS and produces a lower number than the actual disk usage.
  // Recalculating from usedKb / totalKb keeps the bar consistent with the GB labels.
  const hasStorageData =
    Number.isFinite(storage.disk.totalKb) && storage.disk.totalKb > 0;
  const percent = hasStorageData
    ? Math.min(
        100,
        Math.max(
          0,
          Math.round((storage.disk.usedKb / storage.disk.totalKb) * 100),
        ),
      )
    : 0;

  return (
    <Content>
      <ProgressBar>
        <ProgressFill $percent={percent} />
      </ProgressBar>

      <StorageInfo>
        <StatusText>
          {hasStorageData
            ? t("storage.gbUsed")
                .replace("{used}", String(usedGb))
                .replace("{total}", String(totalGb))
            : t("storage.notReported")}
        </StatusText>
        <StatusText>
          {hasStorageData
            ? `${percent}% ${t("storage.usedPercent")}`
            : t("storage.syncToUpdate")}
        </StatusText>
      </StorageInfo>
    </Content>
  );
}
