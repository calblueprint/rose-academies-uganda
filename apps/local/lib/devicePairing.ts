import supabase from "@/api/supabase/client";
import { getDeviceId } from "@/lib/getDeviceId";

export type DevicePairingStatus = "ready" | "claimed" | "not_registered";

export type DevicePairingResult = {
  deviceId: string;
  pairingCode: string;
  status: DevicePairingStatus;
  claimed: boolean;
  linkedEducatorEmail?: string | null;
  linkedEducatorName?: string | null;
};

type PairingRpcResult = {
  status?: DevicePairingStatus;
  claimed?: boolean;
  linked_educator_email?: string | null;
  linked_educator_name?: string | null;
};

const PAIRING_CODE_PATTERN = /^([A-Z0-9]{8}|[A-F0-9]{12})$/;

export function getDevicePairingCode() {
  const code = process.env.DEVICE_PAIRING_CODE?.trim().toUpperCase();

  if (!code || !PAIRING_CODE_PATTERN.test(code)) {
    throw new Error(
      "Missing Classroom Hub pairing code. Run setup again to create one.",
    );
  }

  return code;
}

export function formatDevicePairingCode(code: string) {
  if (code.length === 8) {
    return `${code.slice(0, 4)}-${code.slice(4)}`;
  }

  return `${code.slice(0, 6)}-${code.slice(6)}`;
}

export async function registerDeviceForPairing(): Promise<DevicePairingResult> {
  const deviceId = getDeviceId();
  const pairingCode = getDevicePairingCode();

  if (process.env.ROSE_WIFI_MOCK === "true") {
    const claimed = process.env.ROSE_PAIRING_MOCK_CLAIMED === "true";

    return {
      deviceId,
      pairingCode: formatDevicePairingCode(pairingCode),
      status: claimed ? "claimed" : "ready",
      claimed,
      linkedEducatorEmail: claimed ? "educator@example.com" : null,
      linkedEducatorName: claimed ? "Educator" : null,
    };
  }

  const { data, error } = await supabase.rpc("register_device_for_pairing", {
    p_device_id: deviceId,
    p_pairing_code: pairingCode,
  });

  if (error) {
    throw new Error(error.message);
  }

  const result = (data ?? {}) as PairingRpcResult;
  const status = result.status ?? "not_registered";

  return {
    deviceId,
    pairingCode: formatDevicePairingCode(pairingCode),
    status,
    claimed: result.claimed === true || status === "claimed",
    linkedEducatorEmail: result.linked_educator_email ?? null,
    linkedEducatorName: result.linked_educator_name ?? null,
  };
}
