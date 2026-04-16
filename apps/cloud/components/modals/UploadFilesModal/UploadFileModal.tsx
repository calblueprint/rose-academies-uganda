"use client";

import React, { useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadFile } from "@/api/supabase/files";
import FileTypeBadge from "@/components/FileTypeBadge";
import { DataContext } from "@/context/DataContext";
import {
  ActionRow,
  BrowseButton,
  CancelButton,
  CloseButton,
  DeleteFileButton,
  DropZone,
  DropZoneSubtext,
  DropZoneText,
  ErrorText,
  FileInfo,
  FileNameText,
  FileQueueItemRow,
  FileQueueItemWrapper,
  FileQueueList,
  FileSubtext,
  ModalCard,
  ModalHeader,
  ModalTitle,
  Overlay,
  ProgressFill,
  ProgressTrack,
  SaveButton,
} from "./styles";

type FileStatus = "queued" | "uploading" | "done" | "error";

interface FileEntry {
  id: string;
  file: File;
  status: FileStatus;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lessonId: number;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadFilesModal({ isOpen, onClose, lessonId }: Props) {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const data = useContext(DataContext);
  const router = useRouter();

  if (!isOpen) return null;

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;

    const newEntries: FileEntry[] = Array.from(fileList).map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      status: "queued",
    }));

    setFiles(prev => [...prev, ...newEntries]);
    setError(null);
  }

  function removeFile(id: string) {
    setFiles(prev => prev.filter(entry => entry.id !== id));
  }

  function resetState() {
    setFiles([]);
    setIsDragging(false);
    setError(null);
    setIsSubmitting(false);
  }

  function handleClose() {
    if (isSubmitting) return;
    resetState();
    onClose();
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
    addFiles(e.dataTransfer.files);
  }

  async function handleSubmit() {
    if (files.length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const snapshot = [...files];

      for (let i = 0; i < snapshot.length; i++) {
        setFiles(prev =>
          prev.map((entry, idx) =>
            idx === i ? { ...entry, status: "uploading" } : entry,
          ),
        );

        await uploadFile(lessonId, snapshot[i].file);

        setFiles(prev =>
          prev.map((entry, idx) =>
            idx === i ? { ...entry, status: "done" } : entry,
          ),
        );
      }

      await data.refresh();
      router.refresh();

      await new Promise(resolve => setTimeout(resolve, 800));

      resetState();
      onClose();
    } catch (err) {
      console.error("Failed to upload files:", err);

      setFiles(prev =>
        prev.map(file =>
          file.status === "uploading" ? { ...file, status: "error" } : file,
        ),
      );

      setError("Failed to upload files. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <Overlay onClick={handleClose}>
      <ModalCard onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Upload Files</ModalTitle>
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

          <DropZoneText>Choose a file or drag &amp; drop it here</DropZoneText>
          <DropZoneSubtext>
            JPEG, PNG, PDF, and MP4 formats accepted
          </DropZoneSubtext>

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
            multiple
            accept=".jpg,.jpeg,.png,.pdf,.mp4"
            style={{ display: "none" }}
            onChange={e => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </DropZone>

        {files.length > 0 && (
          <FileQueueList>
            {files.map(entry => (
              <FileQueueItemWrapper key={entry.id}>
                <FileQueueItemRow>
                  <FileTypeBadge fileName={entry.file.name} />

                  <FileInfo>
                    <FileNameText>{entry.file.name}</FileNameText>
                    <FileSubtext>
                      <span>{formatBytes(entry.file.size)}</span>
                      {entry.status === "uploading" && (
                        <span>&nbsp;• Uploading...</span>
                      )}
                      {entry.status === "done" && (
                        <span>&nbsp;• Completed</span>
                      )}
                      {entry.status === "error" && <span>&nbsp;• Failed</span>}
                    </FileSubtext>
                  </FileInfo>

                  {entry.status !== "uploading" && (
                    <DeleteFileButton
                      type="button"
                      onClick={() => removeFile(entry.id)}
                      aria-label={`Remove ${entry.file.name}`}
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

                {entry.status === "uploading" && (
                  <ProgressTrack>
                    <ProgressFill />
                  </ProgressTrack>
                )}
              </FileQueueItemWrapper>
            ))}
          </FileQueueList>
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
            disabled={files.length === 0 || isSubmitting}
          >
            {isSubmitting ? "Uploading..." : "Upload"}
          </SaveButton>
        </ActionRow>
      </ModalCard>
    </Overlay>
  );
}
