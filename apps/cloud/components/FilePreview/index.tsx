"use client";

import type { FileRow } from "@/components/FilesTable";
import {
  GenericActions,
  GenericBox,
  GenericLink,
  GenericMime,
  GenericTitle,
  PdfFrame,
  PreviewContainer,
  PreviewImage,
} from "./style";

function inferMimeTypeFromFileName(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!extension) return "";

  const mimeByExtension: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    pdf: "application/pdf",
  };

  return mimeByExtension[extension] ?? "";
}

export default function FilePreview({ file }: { file: FileRow }) {
  if (!file) return <p>No file selected.</p>;

  const src = file.storagePath ?? "";
  const mimeType = file.mimeType || inferMimeTypeFromFileName(file.name || "");

  if (!src) {
    return (
      <PreviewContainer>
        <GenericBox>
          <GenericTitle>{file.name}</GenericTitle>
          {mimeType && <GenericMime>{mimeType}</GenericMime>}
          <GenericMime>Preview URL not available yet.</GenericMime>
        </GenericBox>
      </PreviewContainer>
    );
  }

  if (mimeType.startsWith("image/")) {
    return <ImagePreview src={src} alt={file.name} />;
  }

  if (mimeType === "application/pdf") {
    return <PdfPreview src={src} fileName={file.name} />;
  }

  return <GenericPreview src={src} fileName={file.name} mimeType={mimeType} />;
}

function ImagePreview({ src, alt }: { src: string; alt: string }) {
  return (
    <PreviewContainer>
      <PreviewImage src={src} alt={alt} />
    </PreviewContainer>
  );
}

function PdfPreview({ src, fileName }: { src: string; fileName: string }) {
  return (
    <PreviewContainer>
      <PdfFrame src={src} title={fileName} />
    </PreviewContainer>
  );
}

function GenericPreview({
  src,
  fileName,
  mimeType,
}: {
  src: string;
  fileName: string;
  mimeType: string;
}) {
  return (
    <PreviewContainer>
      <GenericBox>
        <GenericTitle>{fileName}</GenericTitle>
        {mimeType && <GenericMime>{mimeType}</GenericMime>}
        <GenericActions>
          <GenericLink href={src} target="_blank" rel="noreferrer">
            Download
          </GenericLink>
        </GenericActions>
      </GenericBox>
    </PreviewContainer>
  );
}
