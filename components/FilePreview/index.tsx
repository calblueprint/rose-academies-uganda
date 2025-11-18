"use client";

import { LocalFile } from "@/types/schema";

/**
 * Component shows files with iframe.
 */
export default function FilePreview({ file }: { file: LocalFile }) {
  if (!file) return <p>No file selected.</p>;
  return (
    <iframe
      src={`/api/sqlite/files/${file.id}`}
      style={{ width: "100%", height: "100%" }} // TODO: doesn't work that well.
      title={file.name}
    />
  );
}
