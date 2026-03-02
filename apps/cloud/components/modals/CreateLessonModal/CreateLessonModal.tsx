"use client";

import { useRef, useState } from "react";
import { getSupabaseBrowserClient } from "@/api/supabase/browser";
import { uploadFile } from "@/api/supabase/files";
import {
  ActionRow,
  BrowseButton,
  CancelButton,
  CloseButton,
  CreateButton,
  DeleteFileButton,
  DropZone,
  DropZoneSubtext,
  DropZoneText,
  ErrorText,
  FieldLabel,
  FieldSection,
  FileBadge,
  FileBadgeText,
  FileInfo,
  FileNameText,
  FileQueueItemRow,
  FileQueueItemWrapper,
  FileQueueList,
  FileSubtext,
  HiddenCheckbox,
  ModalCard,
  ModalHeader,
  ModalTitle,
  OfflineLabel,
  OfflineRow,
  Overlay,
  ProgressFill,
  ProgressTrack,
  TextArea,
  TextInput,
  ToggleThumb,
  ToggleTrack,
  ToggleWrapper,
} from "./styles";

// ─── Types ───────────────────────────────────────────────────────────────────

type FileStatus = "queued" | "uploading" | "done" | "error";

interface FileEntry {
  id: string;
  file: File;
  status: FileStatus;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getFileBadgeColor(file: File): string {
  const { type } = file;
  if (type === "application/pdf") return "#C0392B";
  if (type.startsWith("image/")) return "#2980B9";
  if (type.startsWith("video/")) return "#7D3C98";
  return "#808582";
}

function getFileExtension(file: File): string {
  return file.name.split(".").pop()?.toUpperCase() ?? "FILE";
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CreateLessonModal({ isOpen, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendToOffline, setSendToOffline] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // ─── File queue ─────────────────────────────────────────────────────────

  function removeFile(id: string) {
    setFiles(prev => prev.filter(entry => entry.id !== id));
  }

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const newEntries: FileEntry[] = Array.from(fileList).map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      status: "queued",
    }));
    setFiles(prev => [...prev, ...newEntries]);
  }

  // ─── Drag & drop ────────────────────────────────────────────────────────

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

  // ─── Close ──────────────────────────────────────────────────────────────

  function handleClose() {
    if (isSubmitting) return;
    setTitle("");
    setDescription("");
    setFiles([]);
    setSendToOffline(false);
    setError(null);
    onClose();
  }

  // ─── Submit ─────────────────────────────────────────────────────────────

  async function handleSubmit() {
    if (!title.trim() || isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const supabase = getSupabaseBrowserClient();

      // 1. Create the lesson row
      const { data: lesson, error: lessonError } = await supabase
        .from("Lessons")
        .insert({
          name: title.trim(),
          description: description.trim() || null,
          group_id: 1,
          image_path: null,
        })
        .select()
        .single();

      if (lessonError) throw lessonError;

      // 2. Upload files sequentially, updating per-file status as we go
      const snapshot = files;
      for (let i = 0; i < snapshot.length; i++) {
        setFiles(prev =>
          prev.map((entry, idx) =>
            idx === i ? { ...entry, status: "uploading" } : entry,
          ),
        );

        try {
          await uploadFile(lesson.id, snapshot[i].file);
          setFiles(prev =>
            prev.map((entry, idx) =>
              idx === i ? { ...entry, status: "done" } : entry,
            ),
          );
        } catch (uploadErr) {
          console.error(
            `Failed to upload file "${snapshot[i].file.name}":`,
            uploadErr,
          );
          setFiles(prev =>
            prev.map((entry, idx) =>
              idx === i ? { ...entry, status: "error" } : entry,
            ),
          );
        }
      }

      // 3. Brief pause so the user sees final upload statuses before closing
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 4. Reset and hand back to parent (parent calls router.refresh())
      setTitle("");
      setDescription("");
      setFiles([]);
      setSendToOffline(false);
      setIsSubmitting(false);
      onClose();
    } catch (err) {
      console.error("Failed to create lesson:", err);
      setError("Failed to create lesson. Please try again.");
      setIsSubmitting(false);
    }
  }

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <Overlay onClick={handleClose}>
      <ModalCard onClick={e => e.stopPropagation()}>
        {/* Header */}
        <ModalHeader>
          <ModalTitle>Create New Lesson</ModalTitle>
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

        {/* Title */}
        <FieldSection>
          <FieldLabel htmlFor="lesson-title">Title</FieldLabel>
          <TextInput
            id="lesson-title"
            placeholder="Lesson title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={isSubmitting}
          />
        </FieldSection>

        {/* Description */}
        <FieldSection>
          <FieldLabel htmlFor="lesson-description">Description</FieldLabel>
          <TextArea
            id="lesson-description"
            placeholder="Brief description of the lesson"
            value={description}
            onChange={e => setDescription(e.target.value)}
            disabled={isSubmitting}
            rows={4}
          />
        </FieldSection>

        {/* Upload files */}
        <FieldSection>
          <FieldLabel>Upload Files</FieldLabel>

          <DropZone
            $isDragging={isDragging}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isSubmitting && fileInputRef.current?.click()}
          >
            {/* Cloud upload icon */}
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

          {/* File queue */}
          {files.length > 0 && (
            <FileQueueList>
              {files.map(entry => (
                <FileQueueItemWrapper key={entry.id}>
                  <FileQueueItemRow>
                    <FileBadge $color={getFileBadgeColor(entry.file)}>
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
                      <FileBadgeText>
                        {getFileExtension(entry.file)}
                      </FileBadgeText>
                    </FileBadge>

                    <FileInfo>
                      <FileNameText>{entry.file.name}</FileNameText>
                      <FileSubtext>
                        <span>{formatBytes(entry.file.size)}</span>
                        {entry.status === "uploading" && (
                          <span>&nbsp;• Uploading...</span>
                        )}
                        {entry.status === "done" && (
                          <>
                            <span>&nbsp;•</span>
                            {/* Green filled checkmark */}
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="6" cy="6" r="6" fill="#1F5A2A" />
                              <path
                                d="M3.5 6L5.2 7.7L8.5 4.5"
                                stroke="white"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span>Completed</span>
                          </>
                        )}
                        {entry.status === "error" && (
                          <>
                            <span>&nbsp;•</span>
                            {/* Red filled X */}
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="6" cy="6" r="6" fill="#AF2028" />
                              <path
                                d="M4 4L8 8M8 4L4 8"
                                stroke="white"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                              />
                            </svg>
                            <span>Failed</span>
                          </>
                        )}
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
        </FieldSection>

        {/* Offline toggle (visual only) */}
        <OfflineRow>
          <OfflineLabel>Send Lesson to Offline Library?</OfflineLabel>
          <ToggleWrapper>
            <HiddenCheckbox
              type="checkbox"
              id="offline-toggle"
              checked={sendToOffline}
              onChange={e => setSendToOffline(e.target.checked)}
            />
            <ToggleTrack htmlFor="offline-toggle" $checked={sendToOffline}>
              <ToggleThumb $checked={sendToOffline} />
            </ToggleTrack>
          </ToggleWrapper>
        </OfflineRow>

        {error && <ErrorText>{error}</ErrorText>}

        {/* Actions */}
        <ActionRow>
          <CancelButton
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </CancelButton>
          <CreateButton
            type="button"
            onClick={handleSubmit}
            disabled={!title.trim() || isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Lesson"}
          </CreateButton>
        </ActionRow>
      </ModalCard>
    </Overlay>
  );
}
