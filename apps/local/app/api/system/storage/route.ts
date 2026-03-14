import { NextResponse } from "next/server";
import { execFile } from "child_process";
import os from "os";
import { promisify } from "util";

// Turns execFile into a promise
const execFileAsync = promisify(execFile);

async function getDiskInfo() {
  // Check disk usage of whole filesystem
  const { stdout } = await execFileAsync("df", ["-k", "/"]);
  const lines = stdout.split("\n");

  // First line is header, second line is data
  // Parse second line
  const dataLine = lines[1];
  const parts = dataLine.trim().split(/\s+/);
  // Example Output:
  // Filesystem     1K-blocks     Used Available Use% Mounted on
  // /dev/root       59568308  9416504  47655432  17% /

  // Parsa data into variables
  const totalKb = parseInt(parts[1]);
  const usedKb = parseInt(parts[2]);
  const availableKb = parseInt(parts[3]);
  const usePercent = parseInt(parts[4].replace("%", "")); // remove percentage sign

  return {
    totalKb,
    usedKb,
    availableKb,
    usePercent,
  };
}

async function getDirectorySizeKb(directory: string) {
  // Check directory size of passed in directory
  const { stdout } = await execFileAsync("df", ["-sk", directory]);

  // Parse line
  const parts = stdout.trim().split(/\s+/);
  // Example Output:
  // 22820   /home/nathantam/rose-files

  // Parsa data into variables, size is in kb
  const sizeKb = parseInt(parts[0]);

  return sizeKb;
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
