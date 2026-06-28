"use client";

import { FileBadge, FileBadgeText } from "./style";

function getFileExtension(fileName: string): string {
  return fileName.split(".").pop()?.toUpperCase() ?? "FILE";
}

function getFileBadgeColor(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";

  if (ext === "pdf") return "#AF2028";
  if (["jpg", "jpeg", "png"].includes(ext)) return "#1E5B78";
  if (["mp4"].includes(ext)) return "#5A4B78";
  if (["ppt", "pptx", "pps", "ppsx", "ppx"].includes(ext)) return "#A85400";
  if (ext === "apk") return "#1F5A2A";

  return "#4B4A49";
}

export default function FileTypeBadge({ fileName }: { fileName: string }) {
  const color = getFileBadgeColor(fileName);
  const ext = getFileExtension(fileName);

  return (
    <FileBadge $color={color}>
      <svg
        width="14"
        height="16"
        viewBox="0 0 14 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.5 1H2.5C1.67 1 1 1.67 1 2.5V13.5C1 14.33 1.67 15 2.5 15H11.5C12.33 15 13 14.33 13 13.5V5.5L8.5 1Z"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 1V5.5H13"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <FileBadgeText>{ext}</FileBadgeText>
    </FileBadge>
  );
}
