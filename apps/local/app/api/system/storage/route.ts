import { NextResponse } from "next/server";
import { execFile } from "child_process";
import os from "os";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

async function getDiskInfo() {
  const { stdout } = await execFileAsync("df", ["-k", "/"]);
  const lines = stdout.split("\n");
  const dataLine = lines[1];
  const parts = dataLine.trim().split(/\s+/);

  return {
    totalKb: parseInt(parts[1]),
    usedKb: parseInt(parts[2]),
    availableKb: parseInt(parts[3]),
    usePercent: parseInt(parts[4].replace("%", "")),
  };
}

async function getDirectorySizeKb(directory: string) {
  const { stdout } = await execFileAsync("du", ["-sk", directory]);
  const parts = stdout.trim().split(/\s+/);
  return parseInt(parts[0]);
}

export async function GET() {
  try {
    const homeDir = os.homedir();
    const roseFilesPath = `${homeDir}/rose-files`;
    const repoPath = `${homeDir}/rose-academies-uganda`;

    const [disk, roseFilesKb, repoKb] = await Promise.all([
      getDiskInfo(),
      getDirectorySizeKb(roseFilesPath),
      getDirectorySizeKb(repoPath),
    ]);

    return NextResponse.json({
      disk,
      directories: {
        roseFilesKb,
        repoKb,
        roseFilesPath,
        repoPath,
      },
    });
  } catch (error) {
    console.error("Storage route error:", error);

    return NextResponse.json(
      { error: "Failed to fetch storage information" },
      { status: 500 },
    );
  }
}
