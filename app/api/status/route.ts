import { NextResponse } from "next/server";
import { exec } from "child_process";
import os from "os";
import { promisify } from "util";

const execPromise = promisify(exec);

async function checkWithNmcli(): Promise<{
  operational: boolean;
  message: string;
}> {
  try {
    // Check if pi-ap connection is active by looking for a device assignment
    // When active, pi-ap will have a device (wlan0) assigned to it
    const { stdout } = await execPromise("nmcli connection show 2>/dev/null");
    const lines = stdout
      .split("\n")
      .map(l => l.trim())
      .filter(Boolean);

    // Look for the pi-ap connection line
    for (const line of lines) {
      // Lines are space-separated, with columns: NAME UUID TYPE DEVICE
      // When active, DEVICE will be "wlan0" (or similar), when inactive it's "--"
      if (line.toLowerCase().includes("pi-ap")) {
        // Check if the line has a device that's not "--"
        const parts = line.split(/\s+/);
        const deviceIndex = parts.length - 1; // DEVICE is the last column
        const device = parts[deviceIndex];

        const isActive = Boolean(device && device !== "--");
        return {
          operational: isActive,
          message: isActive
            ? `WiFi hotspot is active on ${device} (nmcli)`
            : "WiFi hotspot is configured but not active (nmcli)",
        };
      }
    }

    return {
      operational: false,
      message: "pi-ap connection not found (nmcli)",
    };
  } catch (err) {
    // nmcli might not be installed or command failed
    throw err;
  }
}

export async function GET(): Promise<NextResponse> {
  // If running on Linux (e.g., Raspberry Pi) prefer nmcli
  const platform = os.platform();
  try {
    if (platform === "linux") {
      try {
        const result = await checkWithNmcli();
        return NextResponse.json(result, { status: 200 });
      } catch (nmErr) {
        console.warn("nmcli check failed", nmErr);
        return NextResponse.json(
          {
            operational: false,
            message: "Unable to check WiFi status (fallback)",
          },
          { status: 500 },
        );
      }
    }

    return NextResponse.json(
      { operational: false, message: "Unable to check WiFi status (fallback)" },
      { status: 500 },
    );
  } catch (error) {
    console.error("Error checking WiFi status:", error);
    return NextResponse.json(
      { operational: false, message: "Unable to check WiFi status" },
      { status: 500 },
    );
  }
}
