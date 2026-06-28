"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/api/supabase/browser";
import { getLessonFileSizeError, uploadFile } from "@/api/supabase/files";
import FileTypeBadge from "@/components/FileTypeBadge";
import { DataContext } from "@/context/DataContext";
import { getCurrentUserOrThrow } from "@/lib/getCurrentUser";
import { IconSvgs } from "@/lib/icons";
import { randomPresetImage } from "@/lib/lessonPresets";
import {
  ActionRow,
  AssignedVillageRow,
  BrowseButton,
  CancelButton,
  Checkmark,
  ClassroomCreateActions,
  ClassroomCreatePanel,
  ClassroomCreateRow,
  ClassroomDropdownAction,
  ClassroomDropdownEmpty,
  ClassroomManageButton,
  ClassroomSecondaryButton,
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
  InfoTooltip,
  JoinCodeActions,
  JoinCodeField,
  JoinCodeIconButton,
  JoinCodeInfoButton,
  JoinCodeInput,
  ModalCard,
  ModalHeader,
  ModalTitle,
  OfflineLabel,
  OfflineRow,
  OfflineSupportingText,
  OfflineTextColumn,
  Overlay,
  ProgressFill,
  ProgressTrack,
  RequiredAsterisk,
  SubmitStatus,
  SubmitStatusBar,
  SubmitStatusFill,
  SubmitStatusText,
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
  join_code?: string | null;
  user_id?: string | null;
}

const JOIN_CODE_LENGTH = 6;
const JOIN_CODE_PATTERN = /^[A-Z0-9]{6}$/;
const ACCEPTED_FILE_TYPES =
  ".jpg,.jpeg,.png,.pdf,.mp4,.ppt,.pptx,.pps,.ppsx,.ppx,.apk";

function generateJoinCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let value = "";

  for (let index = 0; index < JOIN_CODE_LENGTH; index++) {
    value += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return value;
}

function normalizeJoinCode(value: string) {
  return value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, JOIN_CODE_LENGTH);
}

function createClassroomId(existingIds: Set<number>) {
  let id = 0;

  do {
    id = Math.floor(1_000_000_000 + Math.random() * 1_000_000_000);
  } while (existingIds.has(id));

  return id;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  deviceId?: string | null;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function CreateLessonModal({
  isOpen,
  onClose,
  deviceId = null,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendToOffline, setSendToOffline] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupIds, setSelectedGroupIds] = useState<number[]>([]);
  const [isVillageDropdownOpen, setIsVillageDropdownOpen] = useState(false);
  const [isCreatingClassroom, setIsCreatingClassroom] = useState(false);
  const [newClassroomName, setNewClassroomName] = useState("");
  const [newClassroomCode, setNewClassroomCode] = useState(generateJoinCode());
  const [classroomError, setClassroomError] = useState<string | null>(null);
  const [isClassroomSaving, setIsClassroomSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const data = useContext(DataContext);
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const hasFiles = files.length > 0;
  const hasClassroom = selectedGroupIds.length > 0;
  const hasLinkedHub = Boolean(deviceId);
  const completedUploadCount = files.filter(
    entry => entry.status === "done",
  ).length;
  const isUploadingFile = files.some(entry => entry.status === "uploading");
  const uploadProgressPercent =
    files.length > 0
      ? Math.round(
          ((completedUploadCount + (isUploadingFile ? 0.5 : 0)) /
            files.length) *
            100,
        )
      : 0;
  const submitStatusText =
    files.length === 0
      ? "Creating lesson..."
      : completedUploadCount >= files.length
        ? "Finishing lesson..."
        : `Uploading file ${Math.min(completedUploadCount + 1, files.length)} of ${files.length}...`;
  const createButtonText = isSubmitting
    ? files.length > 0
      ? `Uploading ${Math.min(completedUploadCount + 1, files.length)} of ${files.length}...`
      : "Creating..."
    : "Create lesson";
  // Lessons need both files and a classroom before they can be sent to sync;
  // otherwise the Pi would receive content that cannot be shown usefully.
  const canSendToSync = hasLinkedHub && hasFiles && hasClassroom;
  const villageDropdownRef = useRef<HTMLDivElement>(null);
  const classroomCreatePanelRef = useRef<HTMLDivElement>(null);

  const [shouldFlashSyncRequirements, setShouldFlashSyncRequirements] =
    useState(false);

  useEffect(() => {
    if ((!canSendToSync || !hasLinkedHub) && sendToOffline) {
      setSendToOffline(false);
    }
  }, [canSendToSync, hasLinkedHub, sendToOffline]);

  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.documentElement.style.overflowY = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    setGroups(data.groups);
  }, [data.groups, isOpen]);

  useEffect(() => {
    if (!isOpen || !isVillageDropdownOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        villageDropdownRef.current &&
        !villageDropdownRef.current.contains(event.target as Node)
      ) {
        setIsVillageDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isVillageDropdownOpen]);

  useEffect(() => {
    if (!isCreatingClassroom) return;

    classroomCreatePanelRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [isCreatingClassroom]);

  if (!isOpen) return null;

  function flashSyncRequirements() {
    setShouldFlashSyncRequirements(true);

    window.setTimeout(() => {
      setShouldFlashSyncRequirements(false);
    }, 1000);
  }

  function handleToggleGroup(groupId: number) {
    setSelectedGroupIds(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId],
    );
  }

  function resetClassroomCreateForm() {
    setNewClassroomName("");
    setNewClassroomCode(generateJoinCode());
    setClassroomError(null);
    setIsCreatingClassroom(false);
  }

  async function isCodeUsedElsewhere(code: string) {
    const { data: matchingClassrooms, error: matchingError } = await supabase
      .from("Groups")
      .select("id")
      .ilike("join_code", code);

    if (matchingError) throw matchingError;

    return ((matchingClassrooms ?? []) as { id: number }[]).length > 0;
  }

  async function handleCreateClassroom() {
    if (isClassroomSaving) return;

    const trimmedName = newClassroomName.trim();
    const normalizedCode = normalizeJoinCode(newClassroomCode);

    if (!trimmedName) {
      setClassroomError("Classroom name is required.");
      return;
    }

    if (!JOIN_CODE_PATTERN.test(normalizedCode)) {
      setClassroomError("Use exactly 6 letters or numbers.");
      return;
    }

    setIsClassroomSaving(true);
    setClassroomError(null);

    try {
      if (await isCodeUsedElsewhere(normalizedCode)) {
        setClassroomError("That join code is already used.");
        return;
      }

      const existingIds = new Set(groups.map(group => group.id));
      const newClassroom: Group = {
        id: createClassroomId(existingIds),
        name: trimmedName,
        join_code: normalizedCode,
        user_id: data.userId,
      };

      const { error: insertError } = await supabase.from("Groups").insert({
        id: newClassroom.id,
        name: newClassroom.name,
        join_code: newClassroom.join_code,
        user_id: data.userId,
      });

      if (insertError) throw insertError;

      setGroups(prev =>
        [...prev, newClassroom].sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
        ),
      );
      setSelectedGroupIds(prev =>
        prev.includes(newClassroom.id) ? prev : [...prev, newClassroom.id],
      );
      await data.refresh();
      resetClassroomCreateForm();
    } catch (err) {
      console.error("Failed to create classroom:", err);
      setClassroomError("Unable to create classroom. Please try again.");
    } finally {
      setIsClassroomSaving(false);
    }
  }

  function removeFile(id: string) {
    setFiles(prev => prev.filter(entry => entry.id !== id));
  }

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const selectedFiles = Array.from(fileList);
    const fileSizeError = getLessonFileSizeError(selectedFiles);

    if (fileSizeError) {
      setError(fileSizeError);
      return;
    }

    const newEntries: FileEntry[] = selectedFiles.map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      status: "queued",
    }));
    setFiles(prev => [...prev, ...newEntries]);
    setError(null);
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
    setTitleError(null);
    resetClassroomCreateForm();
  }

  function handleClose() {
    if (isSubmitting) return;
    resetForm();
    onClose();
  }

  async function handleSubmit() {
    const trimmedTitle = title.trim();

    if (!trimmedTitle || isSubmitting) return;

    const fileSizeError = getLessonFileSizeError(
      files.map(entry => entry.file),
    );

    if (fileSizeError) {
      setError(fileSizeError);
      return;
    }

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
        setTitleError(
          `You already have a lesson called '${trimmedTitle}'. Try a different name.`,
        );
        setIsSubmitting(false);
        return;
      }
      const user = await getCurrentUserOrThrow();
      let offlineDeviceId: string | null = null;

      if (sendToOffline) {
        const { data: device, error: deviceError } = await supabase
          .from("devices")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();

        if (deviceError) throw deviceError;

        if (!device?.id) {
          setError(
            "Link a Classroom Hub before sending lessons to sync, or turn off sync for now.",
          );
          setIsSubmitting(false);
          return;
        }

        offlineDeviceId = device.id as string;
      }

      // Lessons still keep one group_id for older queries, while LessonGroups
      // stores the full multi-classroom assignment set.
      const fallbackGroupId = selectedGroupIds[0] ?? 1;

      const { data: lesson, error: lessonError } = await supabase
        .from("Lessons")
        .insert({
          name: trimmedTitle,
          description: description.trim() || null,
          group_id: fallbackGroupId,
          image_path: randomPresetImage(),
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
        // DeviceLessons is the assignment queue consumed by the Pi sync process.
        // A pending row means the lesson should be downloaded on the next sync.
        const { error: deviceLessonError } = await supabase
          .from("DeviceLessons")
          .upsert(
            {
              device_id: offlineDeviceId,
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
          <ModalTitle>Create new lesson</ModalTitle>
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
          <FieldLabel htmlFor="lesson-title">
            Name <RequiredAsterisk>*</RequiredAsterisk>
          </FieldLabel>
          <TextInput
            id="lesson-title"
            placeholder="Lesson title"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              if (titleError) setTitleError(null);
            }}
            disabled={isSubmitting}
          />
          {titleError && <ErrorText>{titleError}</ErrorText>}
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
          <AssignedVillageRow>
            <FieldLabel style={{ marginBottom: 0 }}>Classroom</FieldLabel>

            <VillageDropdownWrapper ref={villageDropdownRef}>
              <VillageSelectTrigger
                type="button"
                $flashError={shouldFlashSyncRequirements && !hasClassroom}
                onClick={() => setIsVillageDropdownOpen(prev => !prev)}
                disabled={isSubmitting}
              >
                <VillageSelectTriggerText>
                  {selectedGroupIds.length > 0
                    ? `${selectedGroupIds.length} selected`
                    : "Select"}
                </VillageSelectTriggerText>

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
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </VillageSelectTrigger>

              {isVillageDropdownOpen && (
                <VillageDropdownMenu>
                  {groups.length > 0 ? (
                    groups.map(group => {
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
                    })
                  ) : (
                    <ClassroomDropdownEmpty>
                      No classrooms yet.
                    </ClassroomDropdownEmpty>
                  )}

                  <ClassroomDropdownAction
                    type="button"
                    onClick={() => {
                      setIsVillageDropdownOpen(false);
                      setIsCreatingClassroom(true);
                      setClassroomError(null);
                    }}
                    disabled={isSubmitting || isClassroomSaving}
                  >
                    New classroom
                  </ClassroomDropdownAction>

                  <ClassroomManageButton
                    type="button"
                    onClick={() => {
                      handleClose();
                      router.push("/app/classrooms");
                    }}
                  >
                    Manage classrooms
                  </ClassroomManageButton>
                </VillageDropdownMenu>
              )}
            </VillageDropdownWrapper>
          </AssignedVillageRow>

          {isCreatingClassroom && (
            <ClassroomCreatePanel ref={classroomCreatePanelRef}>
              <ClassroomCreateRow>
                <TextInput
                  placeholder="Classroom name"
                  value={newClassroomName}
                  onChange={e => setNewClassroomName(e.target.value)}
                  disabled={isSubmitting || isClassroomSaving}
                />
                <JoinCodeField>
                  <JoinCodeInput
                    aria-label="Student join code"
                    placeholder="Student join code"
                    maxLength={JOIN_CODE_LENGTH}
                    value={newClassroomCode}
                    onChange={e =>
                      setNewClassroomCode(normalizeJoinCode(e.target.value))
                    }
                    disabled={isSubmitting || isClassroomSaving}
                  />
                  <JoinCodeActions>
                    <JoinCodeIconButton
                      type="button"
                      aria-label="Generate new student join code"
                      onClick={() => setNewClassroomCode(generateJoinCode())}
                      disabled={isSubmitting || isClassroomSaving}
                    >
                      {IconSvgs.refresh}
                    </JoinCodeIconButton>
                    <JoinCodeInfoButton
                      type="button"
                      aria-label="What is a student join code?"
                    >
                      <svg
                        aria-hidden="true"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                        <path
                          d="M12 11V16"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 8H12.01"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                      </svg>
                      <InfoTooltip role="tooltip">
                        Students enter this code on the Classroom Hub join page
                        to see this classroom&apos;s lessons.
                      </InfoTooltip>
                    </JoinCodeInfoButton>
                  </JoinCodeActions>
                </JoinCodeField>
              </ClassroomCreateRow>

              <ClassroomCreateActions>
                <ClassroomSecondaryButton
                  type="button"
                  onClick={resetClassroomCreateForm}
                  disabled={isSubmitting || isClassroomSaving}
                >
                  Cancel
                </ClassroomSecondaryButton>
                <CreateButton
                  type="button"
                  onClick={handleCreateClassroom}
                  disabled={isSubmitting || isClassroomSaving}
                >
                  {isClassroomSaving ? "Creating..." : "Create classroom"}
                </CreateButton>
              </ClassroomCreateActions>

              {classroomError && <ErrorText>{classroomError}</ErrorText>}
            </ClassroomCreatePanel>
          )}
        </FieldSection>

        <FieldSection>
          <FieldLabel>Upload Files</FieldLabel>

          <DropZone
            $isDragging={isDragging}
            $flashError={shouldFlashSyncRequirements && !hasFiles}
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

            <DropZoneText>Choose files or drag files here</DropZoneText>
            <DropZoneSubtext>
              JPEG, PNG, PDF, MP4, PowerPoint, and APK formats accepted
            </DropZoneSubtext>

            <BrowseButton
              type="button"
              disabled={isSubmitting}
              onClick={e => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Browse files
            </BrowseButton>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={ACCEPTED_FILE_TYPES}
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
          <OfflineTextColumn>
            <OfflineLabel>Save to Classroom Hub</OfflineLabel>
            <OfflineSupportingText $flashError={shouldFlashSyncRequirements}>
              {hasLinkedHub
                ? "Make this lesson available offline after the next hub sync"
                : "Link a Classroom Hub before saving lessons offline"}
            </OfflineSupportingText>
          </OfflineTextColumn>

          <ToggleWrapper>
            <HiddenCheckbox
              type="checkbox"
              id="offline-toggle"
              checked={sendToOffline}
              disabled={!hasLinkedHub}
              onChange={e => {
                if (!hasLinkedHub) return;

                if (e.target.checked && !canSendToSync) {
                  flashSyncRequirements();
                  return;
                }

                setSendToOffline(e.target.checked);
              }}
            />
            <ToggleTrack
              htmlFor="offline-toggle"
              $checked={sendToOffline}
              $disabled={!hasLinkedHub}
            >
              <ToggleThumb $checked={sendToOffline} $disabled={!hasLinkedHub} />
            </ToggleTrack>
          </ToggleWrapper>
        </OfflineRow>

        {error && <ErrorText>{error}</ErrorText>}

        {isSubmitting && (
          <SubmitStatus role="status" aria-live="polite">
            <SubmitStatusText>{submitStatusText}</SubmitStatusText>
            {files.length > 0 && (
              <SubmitStatusBar>
                <SubmitStatusFill $progress={uploadProgressPercent} />
              </SubmitStatusBar>
            )}
          </SubmitStatus>
        )}

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
            {createButtonText}
          </CreateButton>
        </ActionRow>
      </ModalCard>
    </Overlay>
  );
}
