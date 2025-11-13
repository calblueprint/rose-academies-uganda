"use client";

import { LocalFile } from "@/types/schema";

/**
 * Component shows files with iframe.
 */
export function FilePreview({ file }: { file: LocalFile }) {
  if (!file) return <p>No file selected.</p>;
  return (
    <iframe
      src={`/api/sqlite/files/${file.id}`}
      className="w-full h-[80vh] border"
      title={file.name}
    />
  );
}
