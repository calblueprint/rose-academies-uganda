"use client";

import type { ModalVariant } from "@/components/SyncModal/styles";
import React, { useState } from "react";
import supabase from "@/api/supabase/client";
import SyncModal from "@/components/SyncModal";
import { IconSvgs } from "@/lib/icons";
import { ButtonText, ButtonWrapper, IconWrapper } from "./styles";

const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 120 * 1000;

type SyncRunRow = {
  id: string;
  status: "requested" | "in_progress" | "success" | "failed";
  error_message: string | null;
};

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function CloudSyncButton({ userId }: { userId: string }) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [modalVariant, setModalVariant] = useState<ModalVariant | null>(null);
  const [modalBodyText, setModalBodyText] = useState<string | undefined>();

  const waitForSyncRunCompletion = async (syncRunId: string) => {
    const startedAt = Date.now();

    // The cloud app only requests sync; the Pi reports progress and the final result by updating this sync_runs row.
    while (Date.now() - startedAt < POLL_TIMEOUT_MS) {
      console.log("[CLOUD] Polling sync run:", syncRunId);

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
        console.log("[CLOUD] Final status:", syncRun.status);
        return syncRun;
      }

      await delay(POLL_INTERVAL_MS);
    }

    throw new Error("Timed out waiting for the sync to finish.");
  };

  const handleSync = async () => {
    console.log("[CLOUD] Sync button clicked");
    setIsSyncing(true);
    setModalVariant(null);
    setModalBodyText(undefined);

    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const { data: device, error: deviceError } = await supabase
        .from("devices")
        .select("id")
        .eq("user_id", userId)
        .single();

      if (deviceError || !device) {
        console.error("[CLOUD] Failed to fetch device:", deviceError);
        throw deviceError ?? new Error("Unable to find device.");
      }

      const { data, error } = await supabase
        .from("sync_runs")
        .insert({
          device_id: device.id,
          status: "requested",
        })
        .select("id")
        .single();

      if (error || !data) {
        console.error("[CLOUD] Failed to create sync run:", error);
        throw error ?? new Error("Unable to create sync run.");
      }

      console.log("[CLOUD] Sync run created:", data.id);

      const completedRun = await waitForSyncRunCompletion(
        (data as { id: string }).id,
      );
      console.log("[CLOUD] Sync completed:", completedRun);

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
        <ButtonText>Sync</ButtonText>
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
