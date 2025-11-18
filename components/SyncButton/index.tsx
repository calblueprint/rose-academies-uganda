"use client";

import React, { useState } from "react";
import ActionButton from "@/components/ActionButton";
import COLORS from "@/styles/colors";

export default function SyncButton() {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const response = await fetch("/api/sync");
      if (response.ok) {
        // Optional: Show success message
        console.log("Sync successful");
      } else {
        console.error("Sync failed");
      }
    } catch (error) {
      console.error("Error syncing:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <ActionButton
      onClick={handleSync}
      backgroundColor={COLORS.evergreen}
      textColor={COLORS.white}
      iconType="refresh"
      text={isSyncing ? "Syncing..." : "Sync"}
      isLoading={isSyncing}
      disabled={isSyncing}
      animationDuration="1s"
    />
  );
}
