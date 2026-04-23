"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/api/supabase/browser";
import { uploadFile } from "@/api/supabase/files";
import FileTypeBadge from "@/components/FileTypeBadge";
import { DataContext } from "@/context/DataContext";
import { getCurrentUserOrThrow } from "@/lib/getCurrentUser";
import {
  ActionRow,
  AssignedVillageRow,
  BrowseButton,
  CancelButton,
  Checkmark,
  CloseButton,
  CreateButton,
  DeleteFileButton,
  DropZone,
  DropZoneSubtext,
  DropZoneText,
  ErrorText,
  FieldLabel,
  FieldSection,
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
  VillageBox,
  VillageDropdownMenu,
  VillageDropdownWrapper,
  VillageOption,
  VillageOptionText,
  VillageSelectTrigger,
  VillageSelectTriggerText,
} from "./styles";

type FileStatus = "queued" | "uploading" | "done" | "error";

interface FileEntry {
  id: string;
  file: File;
  status: FileStatus;
}

interface Group {
  id: number;
  name: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function CreateLessonModal({ isOpen, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendToOffline, setSendToOffline] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupIds, setSelectedGroupIds] = useState<number[]>([]);
  const [isVillageDropdownOpen, setIsVillageDropdownOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const data = useContext(DataContext);
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const hasFiles = files.length > 0;

  useEffect(() => {
    if (!hasFiles && sendToOffline) {
      setSendToOffline(false);
    }
  }, [hasFiles, sendToOffline]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchGroups = async () => {
      const { data: groupsData, error: groupsError } = await supabase
        .from("Groups")
        .select("id, name")
        .order("name", { ascending: true });

      if (groupsError) {
        console.error("Failed to fetch groups:", groupsError);
        return;
      }

      setGroups((groupsData as Group[]) || []);
    };

    fetchGroups();
  }, [isOpen, supabase]);

  if (!isOpen) return null;

  function handleToggleGroup(groupId: number) {
    setSelectedGroupIds(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId],
    );
  }

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

  function resetForm() {
    setTitle("");
    setDescription("");
    setFiles([]);
    setSendToOffline(false);
    setError(null);
    setSelectedGroupIds([]);
    setIsVillageDropdownOpen(false);
  }

  function handleClose() {
    if (isSubmitting) return;
    resetForm();
    onClose();
  }

  async function handleSubmit() {
    const trimmedTitle = title.trim();

    if (!trimmedTitle || isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    try {
      // duplicate check
      const { data: existingLesson, error: existingError } = await supabase
        .from("Lessons")
        .select("id")
        .ilike("name", trimmedTitle)
        .limit(1)
        .maybeSingle();

      if (existingError) throw existingError;

      if (existingLesson) {
        setError("A lesson with this name already exists.");
        setIsSubmitting(false);
        return;
      }
      const user = await getCurrentUserOrThrow();
      const { data: device, error: deviceError } = await supabase
        .from("devices")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (deviceError || !device?.id) {
        throw deviceError ?? new Error("Unable to find device for user.");
      }

      const deviceId = device.id as string;
      const fallbackGroupId = selectedGroupIds[0] ?? 1;

      const { data: lesson, error: lessonError } = await supabase
        .from("Lessons")
        .insert({
          name: trimmedTitle,
          description: description.trim() || null,
          group_id: fallbackGroupId,
          image_path: null,
          user_id: user.id,
        })
        .select()
        .single();

      if (lessonError) throw lessonError;

      if (selectedGroupIds.length > 0) {
        const lessonGroupRows = selectedGroupIds.map(groupId => ({
          lesson_id: lesson.id,
          group_id: groupId,
        }));

        const { error: lessonGroupsError } = await supabase
          .from("LessonGroups")
          .insert(lessonGroupRows);

        if (lessonGroupsError) throw lessonGroupsError;
      }

      const snapshot = files;

      for (let i = 0; i < snapshot.length; i++) {
        setFiles(prev =>
          prev.map((entry, idx) =>
            idx === i ? { ...entry, status: "uploading" } : entry,
          ),
        );

        await uploadFile(lesson.id, snapshot[i].file, i);

        setFiles(prev =>
          prev.map((entry, idx) =>
            idx === i ? { ...entry, status: "done" } : entry,
          ),
        );
      }

      if (sendToOffline) {
        if (snapshot.length === 0) {
          throw new Error(
            "Cannot send lesson to offline library without files.",
          );
        }
        const { error: deviceLessonError } = await supabase
          .from("DeviceLessons")
          .upsert(
            {
              device_id: deviceId,
              lesson_id: lesson.id,
              status: "pending",
            },
            { onConflict: "device_id,lesson_id" },
          );

        if (deviceLessonError) throw deviceLessonError;
      }

      await data.refresh();

      await new Promise(resolve => setTimeout(resolve, 1000));

      resetForm();
      setIsSubmitting(false);
      onClose();
      router.refresh();
    } catch (err) {
      console.error("Failed to create lesson:", err);
      console.error("Stringified error:", JSON.stringify(err, null, 2));

      setFiles(prev =>
        prev.map(f =>
          f.status === "uploading" ? { ...f, status: "error" } : f,
        ),
      );

      setError("Failed to create lesson. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <Overlay onClick={handleClose}>
      <ModalCard onClick={e => e.stopPropagation()}>
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

        <FieldSection>
          <AssignedVillageRow>
            <FieldLabel style={{ marginBottom: 0 }}>
              Assigned Village
            </FieldLabel>

            <VillageDropdownWrapper>
              <VillageSelectTrigger
                type="button"
                onClick={() => setIsVillageDropdownOpen(prev => !prev)}
                disabled={isSubmitting}
              >
                <VillageSelectTriggerText>Select</VillageSelectTriggerText>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  style={{
                    transform: isVillageDropdownOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="#808582"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </VillageSelectTrigger>

              {isVillageDropdownOpen && (
                <VillageDropdownMenu>
                  {groups.map(group => {
                    const isChecked = selectedGroupIds.includes(group.id);

                    return (
                      <VillageOption key={group.id}>
                        <HiddenCheckbox
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleGroup(group.id)}
                          disabled={isSubmitting}
                        />

                        <VillageBox $checked={isChecked}>
                          {isChecked && (
                            <Checkmark viewBox="0 0 12 10" fill="none">
                              <path
                                d="M1 5L4.5 8.5L11 1"
                                stroke="#FFF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </Checkmark>
                          )}
                        </VillageBox>

                        <VillageOptionText>{group.name}</VillageOptionText>
                      </VillageOption>
                    );
                  })}
                </VillageDropdownMenu>
              )}
            </VillageDropdownWrapper>
          </AssignedVillageRow>
        </FieldSection>

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

        <FieldSection>
          <FieldLabel>Upload Files</FieldLabel>

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
                        {entry.status === "error" && (
                          <span>&nbsp;• Failed</span>
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

        <OfflineRow>
          <OfflineLabel>Send Lesson to Offline Library?</OfflineLabel>
          <ToggleWrapper>
            <HiddenCheckbox
              type="checkbox"
              id="offline-toggle"
              checked={sendToOffline}
              onChange={e => setSendToOffline(e.target.checked)}
              disabled={!hasFiles}
            />
            <ToggleTrack
              htmlFor="offline-toggle"
              $checked={sendToOffline}
              style={{
                pointerEvents: hasFiles ? "auto" : "none",
              }}
            >
              <ToggleThumb $checked={sendToOffline} />
            </ToggleTrack>
          </ToggleWrapper>
        </OfflineRow>

        {error && <ErrorText>{error}</ErrorText>}

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
