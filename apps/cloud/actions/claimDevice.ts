"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/api/supabase/server";

export type ClaimDeviceResult =
  | { success: true }
  | { success: false; error: string };

type ClaimDeviceRpcResult = {
  status?: string;
  claimed?: boolean;
  device_id?: string;
  replaced_device_id?: string | null;
};

const PAIRING_CODE_PATTERN = /^([A-Z0-9]{8}|[A-F0-9]{12})$/;

export async function claimDeviceWithCode(
  pairingCode: string,
): Promise<ClaimDeviceResult> {
  const normalizedCode = pairingCode.trim().toUpperCase().replace(/[\s-]/g, "");

  if (!PAIRING_CODE_PATTERN.test(normalizedCode)) {
    return {
      success: false,
      error: "Enter the code shown on the Classroom Hub setup page.",
    };
  }

  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "Please sign in again before linking a Classroom Hub.",
    };
  }

  const { data, error } = await supabase.rpc("claim_device_with_code", {
    p_pairing_code: normalizedCode,
  });

  if (error) {
    console.error("[PAIRING] Unable to claim device:", error.message);

    return {
      success: false,
      error:
        error.message.includes("Could not find the function") ||
        error.message.includes("schema cache")
          ? "Device pairing has not been enabled in Supabase yet."
          : "That code is invalid, expired, or has already been used.",
    };
  }

  const result = (data ?? {}) as ClaimDeviceRpcResult;

  if (result.status === "already_linked") {
    return {
      success: false,
      error:
        "Hub replacement is not enabled yet. Finish the latest database update, then try again.",
    };
  }

  revalidatePath("/app", "layout");

  return { success: true };
}

export async function unlinkCurrentDevice(): Promise<ClaimDeviceResult> {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "Please sign in again before unlinking a Classroom Hub.",
    };
  }

  const { error } = await supabase.rpc("unlink_current_device");

  if (error) {
    console.error("[PAIRING] Unable to unlink device:", error.message);

    return {
      success: false,
      error:
        error.message.includes("Could not find the function") ||
        error.message.includes("schema cache")
          ? "Hub unlinking has not been enabled in Supabase yet."
          : "We could not unlink this Classroom Hub. Please try again.",
    };
  }

  revalidatePath("/app", "layout");

  return { success: true };
}
