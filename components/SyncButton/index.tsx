"use client";

import React, { useState } from "react";
import Icon from "@/components/Icon";
import { StyledSyncButton, SyncIcon, SyncText } from "./styles";

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
    <StyledSyncButton onClick={handleSync} disabled={isSyncing}>
      <SyncIcon $isSyncing={isSyncing}>
        <Icon type="refresh" />
      </SyncIcon>
      <SyncText>{isSyncing ? "Syncing..." : "Sync"}</SyncText>
    </StyledSyncButton>
  );
}
