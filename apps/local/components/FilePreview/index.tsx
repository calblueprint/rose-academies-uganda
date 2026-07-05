"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import mime from "mime-types";
import { useLanguage } from "@/lib/i18n";
import { LocalFile } from "@/types/schema";
import {
  GenericActions,
  GenericBox,
  GenericLink,
  GenericMime,
  GenericTitle,
  PdfActionLink,
  PdfActions,
  PdfCanvas,
  PdfCanvasPage,
  PdfCanvasStack,
  PdfFrame,
  PdfHint,
  PdfStatus,
  PreviewContainer,
  PreviewImage,
  PreviewVideo,
  VideoStage,
} from "./style";

type PdfDocumentProxy = {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PdfPageProxy>;
};

type PdfLoadingTask = {
  promise: Promise<PdfDocumentProxy>;
  destroy: () => Promise<void>;
};

type PdfJsModule = {
  getDocument: (options: { data: ArrayBuffer }) => PdfLoadingTask;
};

type PdfPageProxy = {
  getViewport: (options: { scale: number }) => {
    width: number;
    height: number;
  };
  render: (options: {
    canvasContext: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    viewport: { width: number; height: number };
  }) => { promise: Promise<void>; cancel: () => void };
};

function isGenericMimeType(mimeType?: string | null) {
  return !mimeType || mimeType === "application/octet-stream";
}

function resolveMimeType(file: LocalFile) {
  const inferredMimeType = (mime.lookup(file.name || "") || "").toString();

  return isGenericMimeType(file.mime_type)
    ? inferredMimeType
    : (file.mime_type ?? inferredMimeType);
}

export default function FilePreview({ file }: { file: LocalFile }) {
  const { t } = useLanguage();

  if (!file) return <p>{t("files.noFileSelected")}</p>;

  const src = `/api/sqlite/files/${file.id}`;

  const mimeType = resolveMimeType(file);

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
    return (
      <PdfPreview
        src={src}
        fileName={file.name}
        downloadLabel={t("files.download")}
        openLabel={t("files.openFullScreen")}
        hint={t("files.pdfPreviewHint")}
      />
    );
  }

  // If file is not image or pdf. Includes APKs.
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
    <PreviewContainer>
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
      <PdfActions>
        <PdfActionLink href={src}>{openLabel}</PdfActionLink>
        <PdfActionLink href={`${src}?download=1`} download={fileName}>
          {downloadLabel}
        </PdfActionLink>
      </PdfActions>
    </PreviewContainer>
  );
}

function PdfPreview({
  src,
  fileName,
  downloadLabel,
  openLabel,
  hint,
}: {
  src: string;
  fileName: string;
  downloadLabel: string;
  openLabel: string;
  hint: string;
}) {
  const [canUseCanvasPreview, setCanUseCanvasPreview] = useState(true);
  const handleCanvasError = useCallback(() => {
    setCanUseCanvasPreview(false);
  }, []);

  return (
    <PreviewContainer $scrollable>
      {canUseCanvasPreview ? (
        <PdfCanvasPreview
          src={src}
          fileName={fileName}
          onError={handleCanvasError}
        />
      ) : (
        <PdfFrame
          src={`${src}#toolbar=1&navpanes=0`}
          title={fileName}
          scrolling="yes"
        />
      )}
      <PdfActions>
        <PdfHint>{hint}</PdfHint>
        <PdfActionLink href={src}>{openLabel}</PdfActionLink>
        <PdfActionLink href={`${src}?download=1`} download={fileName}>
          {downloadLabel}
        </PdfActionLink>
      </PdfActions>
    </PreviewContainer>
  );
}

function PdfCanvasPreview({
  src,
  fileName,
  onError,
}: {
  src: string;
  fileName: string;
  onError: () => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [status, setStatus] = useState("Loading PDF...");

  useEffect(() => {
    let isCancelled = false;
    let loadingTask: PdfLoadingTask | null = null;
    const renderTasks: { cancel: () => void }[] = [];

    async function renderPdf() {
      try {
        const [pdfjsModule, response] = await Promise.all([
          import("pdfjs-dist/legacy/webpack.mjs") as Promise<unknown>,
          fetch(src, { cache: "no-store" }),
        ]);

        if (!response.ok) {
          throw new Error(`Unable to load PDF (${response.status})`);
        }

        const data = await response.arrayBuffer();
        const { getDocument } = pdfjsModule as PdfJsModule;

        loadingTask = getDocument({
          data,
        });
        const pdf = await loadingTask.promise;

        if (isCancelled) {
          await loadingTask.destroy();
          return;
        }

        setPageCount(pdf.numPages);
        setStatus(
          `Loading ${pdf.numPages} page${pdf.numPages === 1 ? "" : "s"}...`,
        );

        await new Promise<void>(resolve =>
          window.requestAnimationFrame(() => resolve()),
        );

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          if (isCancelled) return;

          const page = await pdf.getPage(pageNumber);
          const canvas = canvasRefs.current[pageNumber - 1];
          const containerWidth =
            containerRef.current?.clientWidth ?? window.innerWidth;

          if (!canvas) continue;

          const unscaledViewport = page.getViewport({ scale: 1 });
          const displayScale = Math.min(
            2,
            Math.max(0.6, (containerWidth - 24) / unscaledViewport.width),
          );
          const viewport = page.getViewport({ scale: displayScale });
          const pixelRatio = window.devicePixelRatio || 1;
          const context = canvas.getContext("2d");

          if (!context) continue;

          canvas.width = Math.floor(viewport.width * pixelRatio);
          canvas.height = Math.floor(viewport.height * pixelRatio);
          canvas.style.width = `${Math.floor(viewport.width)}px`;
          canvas.style.height = `${Math.floor(viewport.height)}px`;

          context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

          const renderTask = page.render({
            canvas,
            canvasContext: context,
            viewport,
          });
          renderTasks.push(renderTask);
          await renderTask.promise;
        }

        if (!isCancelled) {
          setStatus("");
        }
      } catch (error) {
        console.error("[PDF] Unable to render PDF preview:", error);
        if (!isCancelled) {
          onError();
        }
      }
    }

    void renderPdf();

    return () => {
      isCancelled = true;
      renderTasks.forEach(task => task.cancel());
      void loadingTask?.destroy();
    };
  }, [fileName, onError, src]);

  return (
    <PdfCanvasStack ref={containerRef} aria-label={fileName}>
      {status && <PdfStatus>{status}</PdfStatus>}
      {Array.from({ length: pageCount }, (_, index) => (
        <PdfCanvasPage key={index}>
          <PdfCanvas
            ref={node => {
              canvasRefs.current[index] = node;
            }}
          />
        </PdfCanvasPage>
      ))}
    </PdfCanvasStack>
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
          <GenericLink href={`${src}?download=1`} download={fileName}>
            {downloadLabel}
          </GenericLink>
        </GenericActions>
      </GenericBox>
    </PreviewContainer>
  );
}
