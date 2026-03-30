"use client";

import { useState } from "react";
import supabase from "@/api/supabase/client";
import { SyncButton } from "./styles";

function OfflineToggle({
  lessonId,
  isOffline,
}: {
  lessonId: number;
  isOffline: boolean;
}) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async () => {
    setIsUpdating(true);

    if (isOffline) {
      const { error } = await supabase
        .from("OfflineLibrary")
        .delete()
        .eq("lesson_id", lessonId);
      if (error) {
        console.error(
          `An error occurred trying to remove lesson ${lessonId}: ${error.message}`,
        );
      }
    } else {
      const { data, error } = await supabase
        .from("OfflineLibrary")
        .insert({ lesson_id: lessonId })
        .select();
      if (error) {
        console.error(
          `An error occurred trying to add lesson ${lessonId}: ${error.message}`,
        );
      }
      console.log("inserted lesson " + data);
    }

    setIsUpdating(false);
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
    <SyncButton onClick={handleToggle} disabled={isUpdating}>
      {syncLabel[syncButtonKey]}
    </SyncButton>
  );
}

export default OfflineToggle;
