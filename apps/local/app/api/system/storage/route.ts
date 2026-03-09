import { NextResponse } from "next/server";
import { execFile } from "child_process";
import os from "os";
import path from "path";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

type StorageResponse = {
  disk: {
    totalKb: number;
    usedKb: number;
    availableKb: number;
    usePercent: number;
  };
  directories: {
    roseFilesKb: number;
    repoKb: number;
    roseFilesPath: string;
    repoPath: string;
  };
};

async function getDiskInfo() {
  const { stdout } = await execFileAsync("df", ["-k", "/"]);
  const lines = stdout.trim().split("\n");

  if (lines.length < 2) {
    throw new Error("Could not read disk info");
  }

  const parts = lines[1].trim().split(/\s+/);

  return {
    totalKb: Number(parts[1]),
    usedKb: Number(parts[2]),
    availableKb: Number(parts[3]),
    usePercent: Number(parts[4].replace("%", "")),
  };
}

async function getDirectorySizeKb(targetPath: string) {
  const { stdout } = await execFileAsync("du", ["-sk", targetPath]);
  const parts = stdout.trim().split(/\s+/);

  if (parts.length < 1) {
    throw new Error(`Could not read directory size for ${targetPath}`);
  }

  return Number(parts[0]);
}

export async function GET() {
  try {
    const homeDir = os.homedir();
    const roseFilesPath = path.join(homeDir, "rose-files");
    const repoPath = path.join(homeDir, "rose-academies-uganda");

    const [disk, roseFilesKb, repoKb] = await Promise.all([
      getDiskInfo(),
      getDirectorySizeKb(roseFilesPath),
      getDirectorySizeKb(repoPath),
    ]);

    const response: StorageResponse = {
      disk,
      directories: {
        roseFilesKb,
        repoKb,
        roseFilesPath,
        repoPath,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error getting storage data:", error);

    return NextResponse.json(
      { error: "Failed to get storage data" },
      { status: 500 },
    );
  }
}
