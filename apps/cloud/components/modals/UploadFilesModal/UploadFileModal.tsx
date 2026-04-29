"use client";

import type { LocalFile } from "@/types/schema";
import React, { useContext, useEffect, useRef, useState } from "react";
import { getSupabaseBrowserClient } from "@/api/supabase/browser";
import { hashFile, uploadFile } from "@/api/supabase/files";
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
  onFilesUploaded?: (files: LocalFile[]) => void; // optional
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadFilesModal({
  isOpen,
  onClose,
  lessonId,
  onFilesUploaded,
}: Props) {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const data = useContext(DataContext);

  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.documentElement.style.overflowY = "";
    };
  }, [isOpen]);

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
      const existingHashesInLesson = new Set(
        data.files.filter(f => f.lesson_id === lessonId).map(f => f.hash),
      );

      const hashes = await Promise.all(
        files.map(entry => hashFile(entry.file)),
      );

      const duplicateNames = files
        .filter((_, i) => existingHashesInLesson.has(hashes[i]))
        .map(entry => entry.file.name);

      if (duplicateNames.length > 0) {
        const names = duplicateNames.join(", ");
        setError(
          duplicateNames.length === 1
            ? `"${names}" is already in this lesson.`
            : `These files are already in this lesson: ${names}`,
        );
        setIsSubmitting(false);
        return;
      }

      const snapshot = [...files];
      const uploaded: LocalFile[] = [];

      for (let i = 0; i < snapshot.length; i++) {
        setFiles(prev =>
          prev.map((entry, idx) =>
            idx === i ? { ...entry, status: "uploading" } : entry,
          ),
        );

        const result = await uploadFile(lessonId, snapshot[i].file, i);
        uploaded.push(result);

        setFiles(prev =>
          prev.map((entry, idx) =>
            idx === i ? { ...entry, status: "done" } : entry,
          ),
        );
      }

      // ✅ Merge result: keep BOTH behaviors
      onFilesUploaded?.(uploaded);

      const supabase = getSupabaseBrowserClient();
      await supabase
        .from("Lessons")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", lessonId);

      await data.refresh();

      await new Promise(resolve => setTimeout(resolve, 800));

      resetState();
      onClose();
    } catch (err) {
      console.error("Failed to upload files:", err);
      console.error("Stringified error:", JSON.stringify(err, null, 2));

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
            ✕
          </CloseButton>
        </ModalHeader>

        <DropZone
          $isDragging={isDragging}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isSubmitting && fileInputRef.current?.click()}
        >
          <DropZoneText>Choose a file or drag & drop it here</DropZoneText>
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
                      {formatBytes(entry.file.size)}
                      {entry.status === "uploading" && " • Uploading..."}
                      {entry.status === "done" && " • Completed"}
                      {entry.status === "error" && " • Failed"}
                    </FileSubtext>
                  </FileInfo>

                  {entry.status !== "uploading" && (
                    <DeleteFileButton
                      type="button"
                      onClick={() => removeFile(entry.id)}
                    >
                      ✕
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
          <CancelButton onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </CancelButton>

          <SaveButton
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
