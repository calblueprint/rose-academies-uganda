import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export async function GET(): Promise<NextResponse> {
  try {
    // Check if the RoseAcademy WiFi network is being broadcast
    // This command lists active network interfaces and their SSIDs
    const { stdout } = await execPromise(
      "iwconfig 2>/dev/null | grep -i 'ESSID:\"RoseAcademy\"' || networksetup -listallhardwareports 2>/dev/null",
    );
    console.log(stdout);

    // If RoseAcademy is found in the output, the WiFi is operational
    const isOperational = stdout.includes("RoseAcademy");

    return NextResponse.json(
      {
        operational: isOperational,
        message: isOperational
          ? "WiFi network is broadcasting"
          : "WiFi network is not active",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error checking WiFi status:", error);
    // In case of error, assume not operational
    return NextResponse.json(
      {
        operational: false,
        message: "Unable to check WiFi status",
      },
      { status: 200 },
    );
  }
}
