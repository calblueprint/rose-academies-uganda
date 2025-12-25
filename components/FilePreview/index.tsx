"use client";

import mime from "mime-types";
import { LocalFile } from "@/types/schema";
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

export default function FilePreview({ file }: { file: LocalFile }) {
  if (!file) return <p>No file selected.</p>;

  const src = file.storage_path;

  if (!src) {
    return <p>File unavailable.</p>;
  }

  const mimeType =
    file.mime_type || (mime.lookup(file.name || "") || "").toString() || "";

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
