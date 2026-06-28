"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/api/supabase/browser";
import { DataContext } from "@/context/DataContext";
import { fetchVisibleClassrooms } from "@/lib/classrooms";
import {
  ActionRow,
  AssignedVillageRow,
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
  ErrorText,
  FieldLabel,
  FieldSection,
  HiddenCheckbox,
  ModalCard,
  ModalHeader,
  ModalTitle,
  Overlay,
  TextArea,
  TextInput,
  VillageBox,
  VillageDropdownMenu,
  VillageDropdownWrapper,
  VillageOption,
  VillageOptionText,
  VillageSelectTrigger,
  VillageSelectTriggerText,
} from "./styles";

interface Group {
  id: number;
  name: string;
  join_code?: string | null;
  user_id?: string | null;
}

interface LessonGroupRow {
  group_id: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lesson: {
    id: number;
    name: string;
    description: string | null;
    group_id: number | null;
  };
}

const JOIN_CODE_LENGTH = 6;
const JOIN_CODE_PATTERN = /^[A-Z0-9]{6}$/;

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

export default function EditLessonModal({ isOpen, onClose, lesson }: Props) {
  const supabase = getSupabaseBrowserClient();
  const data = useContext(DataContext);
  const router = useRouter();
  const villageDropdownRef = useRef<HTMLDivElement>(null);
  const classroomCreatePanelRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState(lesson.name);
  const [description, setDescription] = useState(lesson.description ?? "");
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupIds, setSelectedGroupIds] = useState<number[]>([]);
  const [isVillageDropdownOpen, setIsVillageDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVillageError, setShowVillageError] = useState(false);
  const [isCreatingClassroom, setIsCreatingClassroom] = useState(false);
  const [newClassroomName, setNewClassroomName] = useState("");
  const [newClassroomCode, setNewClassroomCode] = useState(generateJoinCode());
  const [classroomError, setClassroomError] = useState<string | null>(null);
  const [isClassroomSaving, setIsClassroomSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.documentElement.style.overflowY = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const loadModalData = async () => {
      if (!data.userId) {
        console.error("Missing current user id.");
        return;
      }

      const [{ data: lessonGroupsData, error: lessonGroupsError }, groupsData] =
        await Promise.all([
          supabase
            .from("LessonGroups")
            .select("group_id")
            .eq("lesson_id", lesson.id),
          fetchVisibleClassrooms(supabase, data.userId),
        ]);

      const lessonGroupIds = (
        (lessonGroupsData as LessonGroupRow[] | null) ?? []
      ).map(row => row.group_id);

      const missingSelectedGroupIds =
        lessonGroupIds.length > 0
          ? lessonGroupIds.filter(
              groupId => !groupsData.some(group => group.id === groupId),
            )
          : [];

      if (
        lesson.group_id &&
        !groupsData.some(group => group.id === lesson.group_id)
      ) {
        missingSelectedGroupIds.push(lesson.group_id);
      }

      let fallbackGroups: Group[] = [];
      if (missingSelectedGroupIds.length > 0) {
        const { data: fallbackGroupsData, error: fallbackGroupsError } =
          await supabase
            .from("Groups")
            .select("id, name")
            .in("id", missingSelectedGroupIds);

        if (fallbackGroupsError) {
          console.error(
            "Failed to fetch assigned classroom fallback:",
            fallbackGroupsError.message,
          );
        } else {
          fallbackGroups = (fallbackGroupsData as Group[] | null) ?? [];
        }
      }

      const groupsById = new Map<number, Group>();

      for (const group of [...groupsData, ...fallbackGroups]) {
        groupsById.set(group.id, group);
      }

      if (lessonGroupsError) {
        console.error(
          "Failed to fetch lesson groups:",
          lessonGroupsError.message,
        );
        return;
      }

      setGroups([...groupsById.values()]);
      setSelectedGroupIds(
        lessonGroupIds.length > 0
          ? lessonGroupIds
          : lesson.group_id
            ? [lesson.group_id]
            : [],
      );
      setShowVillageError(false);
    };

    void loadModalData();
  }, [data.userId, isOpen, lesson.group_id, lesson.id, supabase]);
  useEffect(() => {
    if (!isOpen || !isVillageDropdownOpen) {
      return;
    }

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

  if (!isOpen) {
    return null;
  }

  function handleToggleGroup(groupId: number) {
    setSelectedGroupIds(prev => {
      const next = prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId];

      if (next.length > 0) {
        setShowVillageError(false);
      }

      return next;
    });
  }

  function resetForm() {
    setTitle(lesson.name);
    setDescription(lesson.description ?? "");
    setSelectedGroupIds([]);
    setIsVillageDropdownOpen(false);
    setShowVillageError(false);
    resetClassroomCreateForm();
  }

  function handleClose() {
    if (isSubmitting) {
      return;
    }

    resetForm();
    onClose();
  }

  async function handleSave() {
    if (!title.trim() || isSubmitting) {
      return;
    }

    if (selectedGroupIds.length === 0) {
      setShowVillageError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const fallbackGroupId = selectedGroupIds[0];

      const { error: lessonError } = await supabase
        .from("Lessons")
        .update({
          name: title.trim(),
          description: description.trim() || null,
          group_id: fallbackGroupId,
          updated_at: new Date().toISOString(),
        })
        .eq("id", lesson.id);

      if (lessonError) {
        throw lessonError;
      }

      const { error: deleteError } = await supabase
        .from("LessonGroups")
        .delete()
        .eq("lesson_id", lesson.id);

      if (deleteError) {
        throw deleteError;
      }

      const lessonGroupRows = selectedGroupIds.map(groupId => ({
        lesson_id: lesson.id,
        group_id: groupId,
      }));

      const { error: insertError } = await supabase
        .from("LessonGroups")
        .insert(lessonGroupRows);

      if (insertError) {
        throw insertError;
      }

      if (data.userId) {
        const { data: devices, error: devicesError } = await supabase
          .from("devices")
          .select("id")
          .eq("user_id", data.userId);

        if (devicesError) {
          throw devicesError;
        }

        const deviceIds = ((devices ?? []) as { id: string }[])
          .map(device => device.id)
          .filter(Boolean);

        if (deviceIds.length > 0) {
          const { error: deviceLessonsError } = await supabase
            .from("DeviceLessons")
            .update({ status: "pending" })
            .eq("lesson_id", lesson.id)
            .in("device_id", deviceIds);

          if (deviceLessonsError) {
            throw deviceLessonsError;
          }
        }
      }

      onClose();
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to update lesson:", error.message);
      } else {
        console.error(
          "Failed to update lesson:",
          JSON.stringify(error, null, 2),
        );
      }

      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
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
      setShowVillageError(false);
      await data.refresh();
      resetClassroomCreateForm();
    } catch (err) {
      console.error("Failed to create classroom:", err);
      setClassroomError("Unable to create classroom. Please try again.");
    } finally {
      setIsClassroomSaving(false);
    }
  }

  return (
    <Overlay onClick={handleClose}>
      <ModalCard onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Edit lesson</ModalTitle>
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
          <FieldLabel htmlFor="lesson-title">Name</FieldLabel>
          <TextInput
            id="lesson-title"
            placeholder="Lesson title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={isSubmitting}
          />
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
                onClick={() => setIsVillageDropdownOpen(prev => !prev)}
                disabled={isSubmitting}
              >
                <VillageSelectTriggerText>
                  {selectedGroupIds.length === 0
                    ? "Select"
                    : `${selectedGroupIds.length} selected`}
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
                <TextInput
                  placeholder="Student join code"
                  maxLength={JOIN_CODE_LENGTH}
                  value={newClassroomCode}
                  onChange={e =>
                    setNewClassroomCode(normalizeJoinCode(e.target.value))
                  }
                  disabled={isSubmitting || isClassroomSaving}
                />
              </ClassroomCreateRow>

              <ClassroomCreateActions>
                <ClassroomSecondaryButton
                  type="button"
                  onClick={() => setNewClassroomCode(generateJoinCode())}
                  disabled={isSubmitting || isClassroomSaving}
                >
                  New code
                </ClassroomSecondaryButton>
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

        {showVillageError && selectedGroupIds.length === 0 && (
          <ErrorText>At least one classroom is required.</ErrorText>
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
            onClick={handleSave}
            disabled={
              !title.trim() || selectedGroupIds.length === 0 || isSubmitting
            }
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </CreateButton>
        </ActionRow>
      </ModalCard>
    </Overlay>
  );
}
