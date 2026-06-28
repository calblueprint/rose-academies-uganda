import { NextResponse } from "next/server";
import { getWifiStatus, scheduleWifiConnection } from "@/lib/wifi/manager";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await getWifiStatus());
  } catch (error) {
    console.error("[WIFI SETUP] Unable to read Wi-Fi status:", error);
    return NextResponse.json(
      {
        supported: process.platform === "linux",
        error: "Unable to scan for Wi-Fi networks.",
        networks: [],
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const wifiStatus = await getWifiStatus();

    // Network changes are intentionally limited to clients connected through
    // the physical Pi's setup hotspot. This prevents another device on a
    // school or home LAN from remotely changing the Pi's Wi-Fi connection.
    if (!wifiStatus.hotspotActive) {
      return NextResponse.json(
        {
          error:
            "Wi-Fi changes are only available while connected to this Classroom Hub setup network.",
        },
        { status: 409 },
      );
    }

    const body = (await request.json()) as {
      ssid?: unknown;
      password?: unknown;
      hidden?: unknown;
    };
    const ssid = typeof body.ssid === "string" ? body.ssid.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const hidden = body.hidden === true;

    if (
      !ssid ||
      ssid.startsWith("-") ||
      Buffer.byteLength(ssid, "utf8") > 32 ||
      /[\u0000-\u001f\u007f]/.test(ssid)
    ) {
      return NextResponse.json(
        { error: "Enter a valid Wi-Fi network name." },
        { status: 400 },
      );
    }

    if (
      password &&
      (password.length < 8 || password.length > 63 || /[\r\n]/.test(password))
    ) {
      return NextResponse.json(
        { error: "Wi-Fi passwords must contain 8–63 characters." },
        { status: 400 },
      );
    }

    await scheduleWifiConnection({ ssid, password, hidden });

    return NextResponse.json(
      {
        message:
          "Connection scheduled. This setup network may disappear while the Classroom Hub connects.",
      },
      { status: 202 },
    );
  } catch (error) {
    console.error("[WIFI SETUP] Unable to connect:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to configure Wi-Fi.",
      },
      { status: 500 },
    );
  }
}
