import type { FileRow } from "./index";

export function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** exponent;

  return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString();
}

export function haveSameIds(a: string[], b: string[]) {
  if (a.length !== b.length) return false;

  const sortedA = [...a].sort();
  const sortedB = [...b].sort();

  return sortedA.every((value, index) => value === sortedB[index]);
}

// Reassign order values after drag-and-drop. This prevents any gaps
// in our order values and keeps it sequential (1, 2, 3, ...).
export function reindexFiles(nextFiles: FileRow[]) {
  return nextFiles.map((file, index) => ({
    ...file,
    order: index,
  }));
}
