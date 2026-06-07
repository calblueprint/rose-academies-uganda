import supabase from "@/api/supabase/client";
import { getStorageInfo } from "@/lib/storage/getStorageInfo";

// After sync, the Pi reports disk usage back to Supabase so the cloud dashboard
// can show whether the device has enough space for future lesson downloads.
// Storage reporting is best-effort and should not make a successful content sync fail.
export async function reportDeviceStorage(deviceId: string) {
  try {
    const storage = await getStorageInfo();

    await supabase
      .from("devices")
      .update({
        total_kb: storage.disk.totalKb,
        used_kb: storage.disk.usedKb,
        available_kb: storage.disk.availableKb,
        use_percent: storage.disk.usePercent,
        rose_files_kb: storage.directories.roseFilesKb,
        repo_kb: storage.directories.repoKb,
      })
      .eq("id", deviceId);
  } catch (err) {
    console.error("Failed to upload storage info:", err);
  }
}
