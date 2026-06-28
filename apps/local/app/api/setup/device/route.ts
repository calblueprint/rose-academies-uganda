import { NextResponse } from "next/server";
import { registerDeviceForPairing } from "@/lib/devicePairing";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await registerDeviceForPairing();

    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to register this Classroom Hub.";

    console.error("[PAIRING] Device registration failed:", message);

    return NextResponse.json(
      {
        error:
          message.includes("Could not find the function") ||
          message.includes("schema cache")
            ? "Device pairing has not been enabled in Supabase yet."
            : message.includes("Missing Classroom Hub pairing code")
              ? "This Classroom Hub setup status could not be loaded. Refresh this page, or open http://rosehub.local/setup while connected to the Classroom Hub."
              : message,
      },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}
