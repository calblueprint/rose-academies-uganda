"use client";

import type { FileRow } from "@/components/FilesTable";
import { useLanguage } from "@/lib/i18n";
import {
  GenericActions,
  GenericBox,
  GenericLink,
  GenericMime,
  GenericTitle,
  PdfFrame,
  PreviewContainer,
  PreviewImage,
  PreviewVideo,
  VideoActionLink,
  VideoActions,
  VideoStage,
} from "./style";

function inferMimeTypeFromFileName(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!extension) return "";

  const mimeByExtension: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    mp4: "video/mp4",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    pdf: "application/pdf",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    pps: "application/vnd.ms-powerpoint",
    ppsx: "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
    ppx: "application/vnd.ms-powerpoint",
    apk: "application/vnd.android.package-archive",
  };

  return mimeByExtension[extension] ?? "";
}

export default function FilePreview({ file }: { file: FileRow }) {
  const { t } = useLanguage();

  if (!file) return <p>{t("files.noFileSelected")}</p>;

  const src = file.storagePath ?? "";
  const mimeType = file.mimeType || inferMimeTypeFromFileName(file.name || "");

  if (!src) {
    return (
      <PreviewContainer>
        <GenericBox>
          <GenericTitle>{file.name}</GenericTitle>
          {mimeType && <GenericMime>{mimeType}</GenericMime>}
          <GenericMime>{t("files.previewUnavailable")}</GenericMime>
        </GenericBox>
      </PreviewContainer>
    );
  }

  if (mimeType.startsWith("image/")) {
    return <ImagePreview src={src} alt={file.name} />;
  }

  if (mimeType.startsWith("video/")) {
    return (
      <VideoPreview
        src={src}
        fileName={file.name}
        mimeType={mimeType}
        downloadLabel={t("files.download")}
        openLabel={t("files.openFullScreen")}
      />
    );
  }

  if (mimeType === "application/pdf") {
    return <PdfPreview src={src} fileName={file.name} />;
  }

  return (
    <GenericPreview
      src={src}
      fileName={file.name}
      mimeType={mimeType}
      downloadLabel={t("files.download")}
    />
  );
}

function ImagePreview({ src, alt }: { src: string; alt: string }) {
  return (
    <PreviewContainer>
      <PreviewImage src={src} alt={alt} />
    </PreviewContainer>
  );
}

function VideoPreview({
  src,
  fileName,
  mimeType,
  downloadLabel,
  openLabel,
}: {
  src: string;
  fileName: string;
  mimeType: string;
  downloadLabel: string;
  openLabel: string;
}) {
  return (
    <PreviewContainer $stacked>
      <VideoStage>
        <PreviewVideo
          controls
          playsInline
          preload="metadata"
          aria-label={fileName}
        >
          <source src={src} type={mimeType} />
        </PreviewVideo>
      </VideoStage>
      <VideoActions>
        <VideoActionLink href={src} target="_blank" rel="noreferrer">
          {openLabel}
        </VideoActionLink>
        <VideoActionLink href={src} download={fileName}>
          {downloadLabel}
        </VideoActionLink>
      </VideoActions>
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
  downloadLabel,
}: {
  src: string;
  fileName: string;
  mimeType: string;
  downloadLabel: string;
}) {
  return (
    <PreviewContainer>
      <GenericBox>
        <GenericTitle>{fileName}</GenericTitle>
        {mimeType && <GenericMime>{mimeType}</GenericMime>}
        <GenericActions>
          <GenericLink href={src} target="_blank" rel="noreferrer">
            {downloadLabel}
          </GenericLink>
        </GenericActions>
      </GenericBox>
    </PreviewContainer>
  );
}
