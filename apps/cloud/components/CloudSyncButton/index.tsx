"use client";

import type { ModalVariant } from "@/components/SyncModal/styles";
import React, { useState } from "react";
import supabase from "@/api/supabase/client";
import SyncModal from "@/components/SyncModal";
import { IconSvgs } from "@/lib/icons";
import { ButtonWrapper, IconWrapper } from "./styles";

const DEVICE_ID = "nathans-pi"; // hardcoded for now
const POLL_INTERVAL_MS = 3000; // polls every 3 seconds
const POLL_TIMEOUT_MS = 60 * 1000; // This is one minute, can increase if we want

type SyncRunRow = {
  id: number;
  status: "requested" | "in_progress" | "success" | "failed";
  error_message: string | null;
};

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function CloudSyncButton() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [modalVariant, setModalVariant] = useState<ModalVariant | null>(null);
  const [modalBodyText, setModalBodyText] = useState<string | undefined>();

  const waitForSyncRunCompletion = async (syncRunId: number) => {
    const startedAt = Date.now();

    while (Date.now() - startedAt < POLL_TIMEOUT_MS) {
      const { data, error } = await supabase
        .from("sync_runs")
        .select("id, status, error_message")
        .eq("id", syncRunId)
        .single();

      if (error) {
        throw error;
      }

      const syncRun = data as SyncRunRow;

      if (syncRun.status === "success" || syncRun.status === "failed") {
        return syncRun;
      }

      await delay(POLL_INTERVAL_MS);
    }

    throw new Error("Timed out waiting for the sync to finish.");
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setModalVariant(null);
    setModalBodyText(undefined);

    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const { data, error } = await supabase
        .from("sync_runs")
        .insert({
          device_id: DEVICE_ID,
          status: "requested",
        })
        .select("id")
        .single();

      if (error || !data) {
        throw error ?? new Error("Unable to create sync run.");
      }

      const completedRun = await waitForSyncRunCompletion(
        (data as { id: number }).id,
      );

      await minLoadingTime;

      if (completedRun.status === "success") {
        console.log("Sync completed successfully");
        setModalVariant("success");
      } else {
        console.error("Sync failed:", completedRun.error_message);
        setModalBodyText(
          completedRun.error_message ??
            "The sync could not be completed. Please try again later.",
        );
        setModalVariant("error");
      }
    } catch (syncError) {
      console.error("Error requesting sync:", syncError);
      await minLoadingTime;
      setModalBodyText("The sync request could not be completed.");
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
          bodyText={modalBodyText}
          onClose={() => setModalVariant(null)}
          onSyncAgain={handleSync}
        />
      )}
    </>
  );
}
