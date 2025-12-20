"use client";

import type { ModalVariant } from "@/components/SyncModal/styles";
import React, { useState } from "react";
import ActionButton from "@/components/ActionButton";
import SyncModal from "@/components/SyncModal";
import COLORS from "@/styles/colors";

export default function SyncButton() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [modalVariant, setModalVariant] = useState<ModalVariant | null>(null);
  // null = no modal shown; "success" or "error" = show that modal

  const handleSync = async () => {
    setIsSyncing(true);
    setModalVariant(null);

    // minimum loading time promise (1 second)
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const response = await fetch("/api/sync");

      // Wait for minimum loading time before updating
      await minLoadingTime;

      if (response.ok) {
        // Optional: Show success message
        console.log("Sync successful");
        setModalVariant("success");
      } else {
        console.error("Sync failed");
        setModalVariant("error");
      }
    } catch (error) {
      console.error("Error syncing:", error);
      await minLoadingTime;
      setModalVariant("error");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <>
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

      {modalVariant && (
        <SyncModal
          variant={modalVariant}
          onClose={() => setModalVariant(null)}
          onSyncAgain={handleSync}
        />
      )}
    </>
  );
}
