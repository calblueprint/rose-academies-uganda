"use client";

import type { ModalVariant } from "@/components/SyncModal/styles";
import React, { useState } from "react";
import SyncModal from "@/components/SyncModal";
import { useLanguage } from "@/lib/i18n";
import { IconSvgs } from "@/lib/icons";
import { ButtonWrapper, IconWrapper } from "./style";

export default function SyncButton() {
  const { t } = useLanguage();
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
      <ButtonWrapper
        onClick={handleSync}
        disabled={isSyncing}
        title={t("downloadModal.tooltip")}
      >
        <IconWrapper $isSpinning={isSyncing}>{IconSvgs.refresh}</IconWrapper>
        {t("setup.downloadLatest")}
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
