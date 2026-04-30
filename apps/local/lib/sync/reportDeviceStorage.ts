import supabase from "@/api/supabase/client";
import { getStorageInfo } from "@/lib/storage/getStorageInfo";

// After sync, the Pi reports disk usage back to Supabase so the cloud dashboard
// can show whether the device has enough space for future lesson downloads.
export async function reportDeviceStorage(deviceId: string, syncedAt: string) {
  try {
    const storage = await getStorageInfo();

    // Storage reporting should not make a successful content sync fail, so any
    // error is logged and swallowed in the catch block below.
    await supabase.from("devices").upsert({
      id: deviceId,
      total_kb: storage.disk.totalKb,
      used_kb: storage.disk.usedKb,
      available_kb: storage.disk.availableKb,
      use_percent: storage.disk.usePercent,
      rose_files_kb: storage.directories.roseFilesKb,
      repo_kb: storage.directories.repoKb,
      sync_requested_at: new Date().toISOString(),
      last_synced_at: syncedAt,
    });
  } catch (err) {
    console.error("Failed to upload storage info:", err);
  }
}
