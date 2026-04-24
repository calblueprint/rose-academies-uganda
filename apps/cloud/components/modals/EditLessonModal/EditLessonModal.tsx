"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/api/supabase/browser";
import {
  ActionRow,
  AssignedVillageRow,
  CancelButton,
  Checkmark,
  CloseButton,
  CreateButton,
  EditTextArea,
  EditTextInput,
  ErrorText,
  FieldLabel,
  FieldSection,
  HiddenCheckbox,
  ModalCard,
  ModalHeader,
  ModalTitle,
  Overlay,
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

export default function EditLessonModal({ isOpen, onClose, lesson }: Props) {
  const supabase = getSupabaseBrowserClient();

  const [title, setTitle] = useState(lesson.name);
  const [description, setDescription] = useState(lesson.description ?? "");
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupIds, setSelectedGroupIds] = useState<number[]>([]);
  const [isVillageDropdownOpen, setIsVillageDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVillageError, setShowVillageError] = useState(false);

  const isTitleEdited = title !== lesson.name;
  const isDescriptionEdited = description !== (lesson.description ?? "");

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
      const [
        { data: groupsData, error: groupsError },
        { data: lessonGroupsData, error: lessonGroupsError },
      ] = await Promise.all([
        supabase
          .from("Groups")
          .select("id, name")
          .order("name", { ascending: true }),
        supabase
          .from("LessonGroups")
          .select("group_id")
          .eq("lesson_id", lesson.id),
      ]);

      if (groupsError) {
        console.error("Failed to fetch groups:", groupsError.message);
        return;
      }

      if (lessonGroupsError) {
        console.error(
          "Failed to fetch lesson groups:",
          lessonGroupsError.message,
        );
        return;
      }

      setGroups((groupsData as Group[]) ?? []);
      setSelectedGroupIds(
        ((lessonGroupsData as LessonGroupRow[] | null) ?? []).map(
          row => row.group_id,
        ),
      );
      setShowVillageError(false);
    };

    void loadModalData();
  }, [isOpen, lesson.id, supabase]);

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

  return (
    <Overlay onClick={handleClose}>
      <ModalCard onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Edit Details</ModalTitle>
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
          <EditTextInput
            id="lesson-title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={isSubmitting}
            $isEdited={isTitleEdited}
          />
        </FieldSection>

        <FieldSection>
          <FieldLabel htmlFor="lesson-description">Description</FieldLabel>
          <EditTextArea
            id="lesson-description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            disabled={isSubmitting}
            rows={4}
            $isEdited={isDescriptionEdited}
          />
        </FieldSection>

        <FieldSection>
          <AssignedVillageRow>
            <FieldLabel style={{ marginBottom: 0 }}>
              Assigned Classrooms
            </FieldLabel>

            <VillageDropdownWrapper>
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
