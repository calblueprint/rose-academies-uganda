"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/api/supabase/client";
import ConfirmationModal from "@/components/modals/ConfirmationModal/ConfirmationModal";
import { useLanguage } from "@/lib/i18n";
import { SyncButton, SyncButtonText } from "./styles";

function OfflineToggle({
  deviceId,
  lessonId,
  isOffline,
  setIsOffline,
  hasFiles,
  syncStatus,
  onSyncStatusChange,
}: {
  deviceId: string | null;
  lessonId: number;
  isOffline: boolean;
  setIsOffline: (isOffline: boolean) => void;
  hasFiles: boolean;
  syncStatus?: "available" | "pending" | "pending_removal" | null;
  onSyncStatusChange?: (
    status: "available" | "pending" | "pending_removal" | null,
  ) => void;
}) {
  const router = useRouter();
  const { t } = useLanguage();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] = useState(false);

  const handleRemoveConfirm = async () => {
    if (isUpdating || !deviceId || Number.isNaN(lessonId) || !hasFiles) {
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await supabase
        .from("DeviceLessons")
        .update({ status: "pending_removal" })
        .eq("device_id", deviceId)
        .eq("lesson_id", lessonId);

      if (error) {
        console.error(
          `An error occurred trying to remove lesson ${lessonId}: ${error.message}`,
        );
        return;
      }

      setIsOffline(true);
      onSyncStatusChange?.("pending_removal");
      setIsRemoveConfirmOpen(false);
      router.refresh();
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggle = async () => {
    if (isUpdating || !deviceId || Number.isNaN(lessonId) || !hasFiles) {
      return;
    }

    if (syncStatus === "pending" || syncStatus === "pending_removal") {
      router.push("/app/offline-library");
      return;
    }

    if (isOffline) {
      setIsRemoveConfirmOpen(true);
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await supabase.from("DeviceLessons").insert({
        device_id: deviceId,
        lesson_id: lessonId,
        status: "pending",
      });

      if (error) {
        console.error(
          `An error occurred trying to add lesson ${lessonId}: ${error.message}`,
        );
        return;
      }

      setIsOffline(true);
      onSyncStatusChange?.("pending");
      router.refresh();
    } finally {
      setIsUpdating(false);
    }
  };

  const syncLabel = {
    offline_updating: t("common.saving"),
    offline_idle: t("sync.addToHub"),
    online_updating: t("common.working"),
    online_idle:
      syncStatus === "pending" || syncStatus === "pending_removal"
        ? t("sync.button")
        : t("sync.removeFromHub"),
  } as const;

  const syncButtonKey =
    `${isOffline ? "online" : "offline"}_${isUpdating ? "updating" : "idle"}` as const;

  return (
    <>
      <SyncButton
        onClick={handleToggle}
        disabled={
          isUpdating || !deviceId || Number.isNaN(lessonId) || !hasFiles
        }
      >
        <SyncButtonText>{syncLabel[syncButtonKey]}</SyncButtonText>
      </SyncButton>

      <ConfirmationModal
        isOpen={isRemoveConfirmOpen}
        title={t("lessons.removeSyncTitle")}
        description={t("lessons.removeSyncDescription")}
        confirmText={t("lessons.removeOnNextUpdate")}
        onCancel={() => setIsRemoveConfirmOpen(false)}
        onConfirm={handleRemoveConfirm}
        isLoading={isUpdating}
      />
    </>
  );
}

export default OfflineToggle;
