export type SyncRunStatus = "requested" | "in_progress" | "success" | "failed";

export type SyncStage =
  | "waiting_for_device"
  | "preparing"
  | "downloading_files"
  | "finalizing";

export const SYNC_STAGE_MESSAGES: Record<SyncStage, string> = {
  waiting_for_device: "Waiting for device",
  preparing: "Preparing offline content…",
  downloading_files: "Downloading lesson files…",
  finalizing: "Finalizing sync…",
};

// Arbitrary loading stage percentage numbers.
// This can be later changed to reflect number of actual files/lessons being downloaded,
// but that will take some rework.
export const SYNC_STAGE_PROGRESS: Record<SyncStage, number> = {
  waiting_for_device: 10,
  preparing: 30,
  downloading_files: 65,
  finalizing: 90,
};
