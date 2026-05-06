"use client";

import type { ModalVariant } from "@/components/SyncModal/styles";
import type { SyncRunStatus, SyncStage } from "./syncStages";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/api/supabase/client";
import SyncModal from "@/components/SyncModal";
import { IconSvgs } from "@/lib/icons";
import {
  ButtonText,
  ButtonWrapper,
  CardTitle,
  IconWrapper,
  SyncCard,
} from "./styles";
import SyncStageIndicator from "./SyncStageIndicator";

const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 120 * 1000;

type SyncRunRow = {
  id: string;
  status: SyncRunStatus;
  stage: SyncStage | null;
  error_message: string | null;
  completed_at: string | null;
};

type DeviceRow = {
  id: string;
  last_synced_at: string | null;
};

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function formatLastSynced(lastSyncedAt: string | null) {
  if (!lastSyncedAt) return "Not synced yet";

  const date = new Date(lastSyncedAt);

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function CloudSyncButton({ userId }: { userId: string }) {
  const router = useRouter();

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStage, setSyncStage] = useState<SyncStage | null>(null);
  const [device, setDevice] = useState<DeviceRow | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [modalVariant, setModalVariant] = useState<ModalVariant | null>(null);
  const [modalBodyText, setModalBodyText] = useState<string | undefined>();

  useEffect(() => {
    async function loadDevice() {
      // The cloud app uses the signed-in user to find the Pi this dashboard controls.
      const { data, error } = await supabase
        .from("devices")
        .select("id, last_synced_at")
        .eq("user_id", userId)
        .single();

      if (error || !data) {
        console.error("[CLOUD] Failed to fetch device:", error);
        return;
      }

      const loadedDevice = data as DeviceRow;

      setDevice(loadedDevice);
      setLastSyncedAt(loadedDevice.last_synced_at);
    }

    loadDevice();
  }, [userId]);

  const waitForSyncRunCompletion = async (syncRunId: string) => {
    const startedAt = Date.now();

    while (Date.now() - startedAt < POLL_TIMEOUT_MS) {
      console.log("[CLOUD] Polling sync run:", syncRunId);

      // Poll the sync_runs row so the cloud UI can follow Pi-side progress.
      const { data, error } = await supabase
        .from("sync_runs")
        .select("id, status, stage, error_message, completed_at")
        .eq("id", syncRunId)
        .single();

      if (error) {
        throw error;
      }

      const syncRun = data as SyncRunRow;

      // The Pi writes stage updates as it moves through the sync pipeline.
      if (syncRun.stage) {
        setSyncStage(syncRun.stage);
      }

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
    setSyncStage("waiting_for_device");
    setModalVariant(null);
    setModalBodyText(undefined);

    // Keeps the UI from flashing too quickly on very fast syncs.
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const currentDevice = device;

      if (!currentDevice) {
        throw new Error("Unable to find device.");
      }

      // Creating this row is the cloud-side sync request that the Pi polls for.
      const { data, error } = await supabase
        .from("sync_runs")
        .insert({
          device_id: currentDevice.id,
          status: "requested",
          stage: "waiting_for_device",
          requested_at: new Date().toISOString(),
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

        // Once complete, return the card to its resting last-synced state.
        setLastSyncedAt(completedRun.completed_at ?? new Date().toISOString());
        setSyncStage(null);
        setModalVariant("success");

        // Re-run the server page so SyncSummaryCard and LessonsClient receive
        // fresh DeviceLessons data after the Pi updates lesson statuses.
        router.refresh();
      } else {
        console.error("Sync failed:", completedRun.error_message);
        setSyncStage(null);
        setModalBodyText(
          completedRun.error_message ??
            "The sync could not be completed. Please try again later.",
        );
        setModalVariant("error");
      }
    } catch (syncError) {
      console.error("Error requesting sync:", syncError);
      await minLoadingTime;
      setSyncStage(null);
      setModalBodyText("The sync request could not be completed.");
      setModalVariant("error");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <>
      <SyncCard>
        <CardTitle>Sync Progress</CardTitle>

        <SyncStageIndicator
          stage={syncStage}
          lastSyncedText={formatLastSynced(lastSyncedAt)}
        />

        <ButtonWrapper
          onClick={handleSync}
          disabled={isSyncing || !device}
          title="Click to request sync on the Pi"
        >
          <IconWrapper $isSpinning={isSyncing}>{IconSvgs.refresh}</IconWrapper>
          <ButtonText>Sync</ButtonText>
        </ButtonWrapper>
      </SyncCard>

      {modalVariant && (
        <SyncModal
          variant={modalVariant}
          bodyText={modalBodyText}
          onClose={() => {
            setModalVariant(null);
            setSyncStage(null);
          }}
          onSyncAgain={handleSync}
        />
      )}
    </>
  );
}
