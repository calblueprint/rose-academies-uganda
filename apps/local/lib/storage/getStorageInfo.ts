import { execFile } from "child_process";
import os from "os";
import { promisify } from "util";

// This file has same logic as apps\local\app\api\system\storage\route.ts, however, it is no longer a GET() Function meaning
// that there is no network requirement to call this anymore, allowing it to be called in runSync() without waiting.
const execFileAsync = promisify(execFile);

async function getDiskInfo() {
  const { stdout } = await execFileAsync("df", ["-k", "/"]);
  const lines = stdout.split("\n");
  const parts = lines[1].trim().split(/\s+/);

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

export async function getStorageInfo() {
  const homeDir = os.homedir();

  const roseFilesPath = `${homeDir}/rose-files`;
  const repoDir = process.env.LOCAL_REPO_DIR ?? process.cwd();

  const [disk, roseFilesKb, repoKb] = await Promise.all([
    getDiskInfo(),
    getDirectorySizeKb(roseFilesPath),
    getDirectorySizeKb(repoDir),
  ]);

  return {
    disk,
    directories: {
      roseFilesKb,
      repoKb,
      roseFilesPath,
      repoDir,
    },
  };
}
