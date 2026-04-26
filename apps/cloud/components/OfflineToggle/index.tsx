"use client";

import { useState } from "react";
import supabase from "@/api/supabase/client";
import ConfirmationModal from "@/components/modals/ConfirmationModal/ConfirmationModal";
import { IconSvgs } from "@/lib/icons";
import { SyncButton, SyncButtonText } from "./styles";

function OfflineToggle({
  deviceId,
  lessonId,
  isOffline,
  setIsOffline,
  hasFiles,
}: {
  deviceId: string | null;
  lessonId: number;
  isOffline: boolean;
  setIsOffline: (isOffline: boolean) => void;
  hasFiles: boolean;
}) {
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
        .delete()
        .eq("device_id", deviceId)
        .eq("lesson_id", lessonId);

      if (error) {
        console.error(
          `An error occurred trying to remove lesson ${lessonId}: ${error.message}`,
        );
        return;
      }

      setIsOffline(false);
      setIsRemoveConfirmOpen(false);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggle = async () => {
    if (isUpdating || !deviceId || Number.isNaN(lessonId) || !hasFiles) {
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
    } finally {
      setIsUpdating(false);
    }
  };

  const syncLabel = {
    offline_updating: "Syncing...",
    offline_idle: "Send to Sync",
    online_updating: "Removing...",
    online_idle: "Remove from Sync",
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
        {IconSvgs.sync}
        <SyncButtonText>{syncLabel[syncButtonKey]}</SyncButtonText>
      </SyncButton>

      <ConfirmationModal
        isOpen={isRemoveConfirmOpen}
        title="Remove Lesson from Sync"
        description="The lesson will still be saved, but you’ll need to send it to the Sync Lessons page to use it on the Raspberry Pi."
        confirmText="Remove Lesson"
        onCancel={() => setIsRemoveConfirmOpen(false)}
        onConfirm={handleRemoveConfirm}
        isLoading={isUpdating}
      />
    </>
  );
}

export default OfflineToggle;
