"use client";

import React, { useState } from "react";
import ActionButton from "@/components/ActionButton";
import COLORS from "@/styles/colors";

export default function SyncButton() {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);

    // minimum loading time promise (1 second)
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const response = await fetch("/api/sync");

      // Wait for minimum loading time before updating
      await minLoadingTime;

      if (response.ok) {
        // Optional: Show success message
        console.log("Sync successful");
      } else {
        console.error("Sync failed");
      }
    } catch (error) {
      console.error("Error syncing:", error);
      await minLoadingTime;
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
      title="Click to sync data from cloud"
      animationDuration="1s"
    />
  );
}
