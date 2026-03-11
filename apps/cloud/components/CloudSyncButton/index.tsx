"use client";

import type { ModalVariant } from "@/components/SyncModal/styles";
import React, { useState } from "react";
import supabase from "@/api/supabase/client";
import SyncModal from "@/components/SyncModal";
import { IconSvgs } from "@/lib/icons";
import { ButtonWrapper, IconWrapper } from "./styles";

const DEVICE_ID = "nathans-pi"; // hardcoded for now

export default function CloudSyncButton() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [modalVariant, setModalVariant] = useState<ModalVariant | null>(null);

  const handleSync = async () => {
    setIsSyncing(true);
    setModalVariant(null);

    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const { error } = await supabase
        .from("devices")
        .update({ sync_requested_at: new Date().toISOString() })
        .eq("id", DEVICE_ID);

      await minLoadingTime;

      if (error) {
        console.error("Failed to request sync:", error);
        setModalVariant("error");
      } else {
        console.log("Sync requested successfully");
        setModalVariant("success");
      }
    } catch (syncError) {
      console.error("Error requesting sync:", syncError);
      await minLoadingTime;
      setModalVariant("error");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <>
      <ButtonWrapper
        onClick={handleSync}
        disabled={isSyncing}
        title="Click to request sync on the Pi"
      >
        <IconWrapper $isSpinning={isSyncing}>{IconSvgs.refresh}</IconWrapper>
        {"Sync Lessons"}
      </ButtonWrapper>

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
