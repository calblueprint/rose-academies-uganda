"use client";

import React, { useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadLessonImage } from "@/api/supabase/images";
import { DataContext } from "@/context/DataContext";
import {
  ActionRow,
  BrowseButton,
  CancelButton,
  CloseButton,
  ComingSoonText,
  DeleteFileButton,
  DropZone,
  DropZoneSubtext,
  DropZoneText,
  ErrorText,
  FileInfo,
  FileNameText,
  FileQueueItemRow,
  FileQueueItemWrapper,
  FileSubtext,
  ModalCard,
  ModalHeader,
  ModalTitle,
  Overlay,
  ProgressFill,
  ProgressTrack,
  SaveButton,
  Tab,
  TabRow,
} from "./styles";

// ─── Types ───────────────────────────────────────────────────────────────────

type ActiveTab = "select" | "upload";
type UploadStatus = "queued" | "uploading" | "done" | "error";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lessonId: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg"];
const ACCEPTED_EXT = ".png, .jpg";

// ─── Component ───────────────────────────────────────────────────────────────

export default function UploadLessonImageModal({
  isOpen,
  onClose,
  lessonId,
}: Props) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("queued");
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const data = useContext(DataContext);
  const router = useRouter();

  if (!isOpen) return null;

  function validateAndSetFile(f: File) {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError("Only .png and .jpg files are accepted.");
      return;
    }
    setError(null);
    setFile(f);
    setStatus("queued");
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) validateAndSetFile(dropped);
  }

  function handleClose() {
    if (isSubmitting) return;
    setFile(null);
    setStatus("queued");
    setError(null);
    setActiveTab("upload");
    onClose();
  }

  async function handleSubmit() {
    if (!file || isSubmitting) return;
    setIsSubmitting(true);
    setError(null);
    setStatus("uploading");

    try {
      await uploadLessonImage(lessonId, file);
      setStatus("done");
      await data.refresh();
      router.refresh();
      await new Promise(resolve => setTimeout(resolve, 800));
      setFile(null);
      setStatus("queued");
      setIsSubmitting(false);
      onClose();
    } catch (err) {
      console.error("Failed to upload image:", err);
      setStatus("error");
      setError("Failed to upload image. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <Overlay onClick={handleClose}>
      <ModalCard onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Upload Lesson Cover</ModalTitle>
          <CloseButton
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close modal"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </CloseButton>
        </ModalHeader>

        <TabRow>
          <Tab
            $active={activeTab === "select"}
            onClick={() => setActiveTab("select")}
            disabled={isSubmitting}
          >
            Select Image
          </Tab>
          <Tab
            $active={activeTab === "upload"}
            onClick={() => setActiveTab("upload")}
            disabled={isSubmitting}
          >
            Upload Image
          </Tab>
        </TabRow>

        {activeTab === "select" ? (
          <ComingSoonText>Preset images coming soon.</ComingSoonText>
        ) : (
          <>
            <DropZone
              $isDragging={isDragging}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !isSubmitting && fileInputRef.current?.click()}
            >
              <svg
                width="36"
                height="30"
                viewBox="0 0 36 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.5 12.33C27.46 7.8 23.42 4.5 18.6 4.5C14.73 4.5 11.34 6.66 9.66 9.81C5.94 10.23 3 13.35 3 17.25C3 21.39 6.36 24.75 10.5 24.75H28.2C31.68 24.75 34.5 21.93 34.5 18.45C34.5 15.12 31.98 12.42 28.5 12.33Z"
                  stroke="#4B4A49"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22.5 20.25L18 15.75L13.5 20.25"
                  stroke="#4B4A49"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 15.75V28.5"
                  stroke="#4B4A49"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <DropZoneText>
                Choose a file or drag &amp; drop it here
              </DropZoneText>
              <DropZoneSubtext>{ACCEPTED_EXT} formats accepted</DropZoneSubtext>

              <BrowseButton
                type="button"
                disabled={isSubmitting}
                onClick={e => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                Browse File
              </BrowseButton>

              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                style={{ display: "none" }}
                onChange={e => {
                  const f = e.target.files?.[0];
                  if (f) validateAndSetFile(f);
                  e.target.value = "";
                }}
              />
            </DropZone>

            {file && (
              <FileQueueItemWrapper>
                <FileQueueItemRow>
                  <FileInfo>
                    <FileNameText>{file.name}</FileNameText>
                    <FileSubtext>
                      <span>{formatBytes(file.size)}</span>
                      {status === "uploading" && (
                        <span>&nbsp;• Uploading...</span>
                      )}
                      {status === "done" && <span>&nbsp;• Completed</span>}
                      {status === "error" && <span>&nbsp;• Failed</span>}
                    </FileSubtext>
                  </FileInfo>

                  {status !== "uploading" && (
                    <DeleteFileButton
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setStatus("queued");
                        setError(null);
                      }}
                      aria-label="Remove file"
                    >
                      <svg
                        width="14"
                        height="16"
                        viewBox="0 0 14 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 4H13M5 4V2.5C5 2.22386 5.22386 2 5.5 2H8.5C8.77614 2 9 2.22386 9 2.5V4M5.5 7V12.5M8.5 7V12.5M2.5 4L3 13.5C3 13.7761 3.22386 14 3.5 14H10.5C10.7761 14 11 13.7761 11 13.5L11.5 4"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </DeleteFileButton>
                  )}
                </FileQueueItemRow>

                {status === "uploading" && (
                  <ProgressTrack>
                    <ProgressFill />
                  </ProgressTrack>
                )}
              </FileQueueItemWrapper>
            )}
          </>
        )}

        {error && <ErrorText>{error}</ErrorText>}

        <ActionRow>
          <CancelButton
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </CancelButton>
          <SaveButton
            type="button"
            onClick={handleSubmit}
            disabled={!file || isSubmitting || activeTab === "select"}
          >
            {isSubmitting ? "Uploading..." : "Save Image"}
          </SaveButton>
        </ActionRow>
      </ModalCard>
    </Overlay>
  );
}
