import supabase from "@/api/supabase/client";
import { getDevicePairingCode } from "@/lib/devicePairing";
import { getStorageInfo } from "@/lib/storage/getStorageInfo";

// After sync, the Pi reports disk usage back to Supabase so the cloud dashboard
// can show whether the device has enough space for future lesson downloads.
// Storage reporting is best-effort and should not make a successful content sync fail.
export async function reportDeviceStorage(deviceId: string) {
  try {
    const storage = await getStorageInfo();

    const { error } = await supabase.rpc("report_device_storage", {
      p_device_id: deviceId,
      p_pairing_code: getDevicePairingCode(),
      p_total_kb: storage.disk.totalKb,
      p_used_kb: storage.disk.usedKb,
      p_available_kb: storage.disk.availableKb,
      p_use_percent: storage.disk.usePercent,
      p_rose_files_kb: storage.directories.roseFilesKb,
      p_repo_kb: storage.directories.repoKb,
    });

    if (error) throw error;
  } catch (err) {
    console.error("Failed to upload storage info:", err);
  }
}
