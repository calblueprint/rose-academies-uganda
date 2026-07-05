"use client";

import { FormEvent, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/api/supabase/client";
import CreateButton from "@/components/CreateLessonButton";
import ConfirmationModal from "@/components/modals/ConfirmationModal/ConfirmationModal";
import {
  ModalCard,
  CloseButton as ModalCloseButton,
  ModalHeader,
  ModalTitle,
  Overlay,
} from "@/components/modals/CreateLessonModal/styles";
import SearchBar from "@/components/SearchBar";
import StatusPill from "@/components/StatusPill";
import { DataContext } from "@/context/DataContext";
import { ClassroomOverview, fetchClassroomOverviews } from "@/lib/classrooms";
import { useLanguage } from "@/lib/i18n";
import { IconSvgs } from "@/lib/icons";
import { deleteOwnedClassroom, removeLessonFromClassroom } from "./actions";
import {
  ActionButton,
  ClassroomCountText,
  ClassroomHeaderContent,
  ClassroomHeaderMain,
  ClassroomManageActions,
  ClassroomNameBlock,
  ClassroomNameInput,
  ClassroomNameTitle,
  CodeDisplay,
  CodeLabel,
  CodeText,
  CreateClassroomForm,
  CreateClassroomModalActions,
  CreateClassroomModalIntro,
  DangerIconButton,
  EditFieldError,
  EmptyState,
  ErrorText,
  Field,
  FieldHint,
  FieldLabel,
  GridToggle,
  Header,
  HeaderText,
  Input,
  JoinCodeFieldRow,
  JoinCodeInput,
  LessonCountPill,
  LessonMeta,
  LessonPreviewItem,
  LessonPreviewLink,
  LessonPreviewList,
  LessonPreviewMoreButton,
  LessonPreviewSectionHeader,
  LessonPreviewSectionTitle,
  LessonPreviewTitle,
  LessonRemoveButton,
  ListClassroomHeader,
  ListClassroomSection,
  MutedText,
  OverviewCard,
  OverviewGrid,
  OverviewHeader,
  OverviewList,
  OverviewSection,
  OverviewToolbar,
  PageContainer,
  PrimaryButton,
  Title,
  ToggleDivider,
  ToggleText,
  ViewToggleButton,
} from "./style";

type Classroom = ClassroomOverview;

type ClassroomsClientProps = {
  initialClassrooms: Classroom[];
  userId: string;
  deviceId: string | null;
};

type DeleteCandidate = {
  classroom: Classroom;
  affectedLessonIds: number[];
};

type RemoveLessonCandidate = {
  classroom: Classroom;
  lesson: Classroom["lessons"][number];
};

type JoinCodeChangeCandidate = {
  classroom: Classroom;
};

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

function EditIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 20H8.25L18.8 9.45C19.58 8.67 19.58 7.4 18.8 6.62L17.38 5.2C16.6 4.42 15.33 4.42 14.55 5.2L4 15.75V20Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 6.25L17.75 10.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 7H20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M9 7V5.5C9 4.67 9.67 4 10.5 4H13.5C14.33 4 15 4.67 15 5.5V7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M18 7L17.2 18.2C17.12 19.22 16.27 20 15.25 20H8.75C7.73 20 6.88 19.22 6.8 18.2L6 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M10 11V16M14 11V16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ClassroomsClient({
  initialClassrooms,
  userId,
  deviceId,
}: ClassroomsClientProps) {
  const router = useRouter();
  const data = useContext(DataContext);
  const { t } = useLanguage();
  const tr = (
    key: string,
    replacements: Record<string, string | number> = {},
  ) =>
    Object.entries(replacements).reduce(
      (value, [name, replacement]) =>
        value.replaceAll(`{${name}}`, String(replacement)),
      t(key),
    );
  const [classrooms, setClassrooms] = useState(initialClassrooms);
  const [name, setName] = useState("");
  const [joinCode, setJoinCode] = useState(generateJoinCode());
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draftNames, setDraftNames] = useState<Record<number, string>>(() =>
    Object.fromEntries(
      initialClassrooms.map(classroom => [classroom.id, classroom.name]),
    ),
  );
  const [draftCodes, setDraftCodes] = useState<Record<number, string>>(() =>
    Object.fromEntries(
      initialClassrooms.map(classroom => [
        classroom.id,
        classroom.join_code ?? "",
      ]),
    ),
  );
  const [editErrors, setEditErrors] = useState<Record<number, string>>({});
  const [deleteCandidate, setDeleteCandidate] =
    useState<DeleteCandidate | null>(null);
  const [removeLessonCandidate, setRemoveLessonCandidate] =
    useState<RemoveLessonCandidate | null>(null);
  const [joinCodeChangeCandidate, setJoinCodeChangeCandidate] =
    useState<JoinCodeChangeCandidate | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [removingLessonId, setRemovingLessonId] = useState<number | null>(null);
  const [preparingDeleteId, setPreparingDeleteId] = useState<number | null>(
    null,
  );
  const [overviewView, setOverviewView] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedClassroomIds, setExpandedClassroomIds] = useState<Set<number>>(
    new Set(),
  );
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState<number | "new" | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const sortedClassrooms = useMemo(
    () =>
      [...classrooms].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
      ),
    [classrooms],
  );

  const filteredClassrooms = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (!normalizedSearchTerm) return sortedClassrooms;

    return sortedClassrooms.filter(classroom => {
      const searchableText = [
        classroom.name,
        classroom.join_code ?? "",
        ...classroom.lessons.map(lesson => lesson.name),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedSearchTerm);
    });
  }, [searchTerm, sortedClassrooms]);

  const canCreateClassroom =
    name.trim().length > 0 &&
    JOIN_CODE_PATTERN.test(normalizeJoinCode(joinCode));

  const classroomCountText =
    filteredClassrooms.length === sortedClassrooms.length
      ? `${sortedClassrooms.length} ${
          sortedClassrooms.length === 1
            ? t("classrooms.classroomCountSingular")
            : t("classrooms.classroomCountPlural")
        }`
      : `${filteredClassrooms.length} ${t("lessons.of")} ${
          sortedClassrooms.length
        } ${t("classrooms.classroomCountPlural")}`;

  useEffect(() => {
    if (!isCreateOpen) return;
    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.documentElement.style.overflowY = "";
    };
  }, [isCreateOpen]);

  function closeCreateModal() {
    if (savingId === "new") return;

    setIsCreateOpen(false);
    setName("");
    setJoinCode(generateJoinCode());
    setError("");
  }

  function isDuplicateCode(code: string, currentClassroomId?: number) {
    return classrooms.some(
      classroom =>
        classroom.id !== currentClassroomId &&
        (classroom.join_code ?? "").toUpperCase() === code.toUpperCase(),
    );
  }

  async function isCodeUsedElsewhere(
    code: string,
    currentClassroomId?: number,
  ) {
    const { data: matchingClassrooms, error: matchingError } = await supabase
      .from("Groups")
      .select("id")
      .ilike("join_code", code);

    if (matchingError) throw matchingError;

    return ((matchingClassrooms ?? []) as { id: number }[]).some(
      classroom => classroom.id !== currentClassroomId,
    );
  }

  async function refreshClassrooms() {
    const nextClassrooms = await fetchClassroomOverviews(
      supabase,
      userId,
      deviceId,
    );
    setClassrooms(nextClassrooms);
    setDraftNames(
      Object.fromEntries(
        nextClassrooms.map(classroom => [classroom.id, classroom.name]),
      ),
    );
    setDraftCodes(
      Object.fromEntries(
        nextClassrooms.map(classroom => [
          classroom.id,
          classroom.join_code ?? "",
        ]),
      ),
    );
    await data.refresh();
    router.refresh();
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const normalizedCode = normalizeJoinCode(joinCode);

    if (!trimmedName) {
      setError(t("classrooms.nameRequired"));
      return;
    }

    if (!JOIN_CODE_PATTERN.test(normalizedCode)) {
      setError(t("classrooms.joinCodeExact"));
      return;
    }

    if (isDuplicateCode(normalizedCode)) {
      setError(t("classrooms.joinCodeUsedByAnother"));
      return;
    }

    setSavingId("new");
    setError("");

    try {
      if (await isCodeUsedElsewhere(normalizedCode)) {
        setError(t("classrooms.joinCodeUsedByAnother"));
        return;
      }

      const existingIds = new Set(classrooms.map(classroom => classroom.id));
      const { error: insertError } = await supabase.from("Groups").insert({
        id: createClassroomId(existingIds),
        name: trimmedName,
        join_code: normalizedCode,
        user_id: userId,
      });

      if (insertError) throw insertError;

      setName("");
      setJoinCode(generateJoinCode());
      setIsCreateOpen(false);
      await refreshClassrooms();
    } catch (createError) {
      console.error("Failed to create classroom:", createError);
      setError(t("classrooms.createFailed"));
    } finally {
      setSavingId(null);
    }
  }

  function startEditingClassroom(classroom: Classroom) {
    setDraftNames(prev => ({ ...prev, [classroom.id]: classroom.name }));
    setDraftCodes(prev => ({
      ...prev,
      [classroom.id]: classroom.join_code ?? "",
    }));
    setEditErrors(prev => {
      const next = { ...prev };
      delete next[classroom.id];
      return next;
    });
    setEditingId(classroom.id);
  }

  function cancelEditingClassroom(classroom: Classroom) {
    setEditingId(null);
    setDraftNames(prev => ({ ...prev, [classroom.id]: classroom.name }));
    setDraftCodes(prev => ({
      ...prev,
      [classroom.id]: classroom.join_code ?? "",
    }));
    setEditErrors(prev => {
      const next = { ...prev };
      delete next[classroom.id];
      return next;
    });
  }

  async function handleSaveClassroom(
    classroom: Classroom,
    options: { confirmedJoinCodeChange?: boolean } = {},
  ) {
    const trimmedName = (draftNames[classroom.id] ?? "").trim();
    const normalizedCode = normalizeJoinCode(draftCodes[classroom.id] ?? "");
    const currentCode = classroom.join_code ?? "";

    if (!trimmedName) {
      setError(t("classrooms.nameRequired"));
      return;
    }

    if (!JOIN_CODE_PATTERN.test(normalizedCode)) {
      setEditErrors(prev => ({
        ...prev,
        [classroom.id]: t("lessonModal.joinCodeLength"),
      }));
      return;
    }

    if (trimmedName === classroom.name && normalizedCode === currentCode) {
      setEditingId(null);
      setEditErrors(prev => {
        const next = { ...prev };
        delete next[classroom.id];
        return next;
      });
      return;
    }

    if (
      normalizedCode !== currentCode &&
      currentCode &&
      !options.confirmedJoinCodeChange
    ) {
      setJoinCodeChangeCandidate({ classroom });
      return;
    }

    if (isDuplicateCode(normalizedCode, classroom.id)) {
      setEditErrors(prev => ({
        ...prev,
        [classroom.id]: t("lessonModal.joinCodeUsed"),
      }));
      return;
    }

    setSavingId(classroom.id);
    setError("");
    setEditErrors(prev => {
      const next = { ...prev };
      delete next[classroom.id];
      return next;
    });

    try {
      if (await isCodeUsedElsewhere(normalizedCode, classroom.id)) {
        setEditErrors(prev => ({
          ...prev,
          [classroom.id]: t("lessonModal.joinCodeUsed"),
        }));
        return;
      }

      const { error: updateError } = await supabase
        .from("Groups")
        .update({ name: trimmedName, join_code: normalizedCode })
        .eq("id", classroom.id);

      if (updateError) throw updateError;

      setEditingId(null);
      setEditErrors(prev => {
        const next = { ...prev };
        delete next[classroom.id];
        return next;
      });
      await refreshClassrooms();
      setJoinCodeChangeCandidate(null);
    } catch (updateError) {
      console.error("Failed to update classroom:", updateError);
      setError(t("classrooms.updateFailed"));
    } finally {
      setSavingId(null);
    }
  }

  async function handleConfirmJoinCodeChange() {
    if (!joinCodeChangeCandidate) return;

    await handleSaveClassroom(joinCodeChangeCandidate.classroom, {
      confirmedJoinCodeChange: true,
    });
  }

  async function handleRemoveLessonFromClassroom(
    classroom: Classroom,
    lessonId: number,
  ) {
    setError("");

    try {
      const result = await removeLessonFromClassroom({
        classroomId: classroom.id,
        lessonId,
      });

      if (!result.success) {
        console.error("Failed to remove lesson from classroom:", result.error);
        setError(result.error);
        return false;
      }

      await refreshClassrooms();
      return true;
    } catch (removeError) {
      console.error("Failed to remove lesson from classroom:", removeError);
      setError(t("classrooms.removeLessonFailed"));
      return false;
    }
  }

  async function handleConfirmRemoveLesson() {
    if (!removeLessonCandidate) return;

    const { classroom, lesson } = removeLessonCandidate;

    setRemovingLessonId(lesson.id);

    const didRemove = await handleRemoveLessonFromClassroom(
      classroom,
      lesson.id,
    );

    if (didRemove) {
      setRemoveLessonCandidate(null);
    }

    setRemovingLessonId(null);
  }

  async function getClassroomLessonIds(classroomId: number) {
    const { data: directLessons, error: directLessonsError } = await supabase
      .from("Lessons")
      .select("id")
      .eq("user_id", userId)
      .eq("group_id", classroomId);

    if (directLessonsError) throw directLessonsError;

    const { data: lessonGroupRows, error: lessonGroupsReadError } =
      await supabase
        .from("LessonGroups")
        .select("lesson_id")
        .eq("group_id", classroomId);

    if (lessonGroupsReadError) throw lessonGroupsReadError;

    const lessonGroupLessonIds = [
      ...new Set(
        ((lessonGroupRows ?? []) as { lesson_id: number }[])
          .map(row => row.lesson_id)
          .filter((lessonId): lessonId is number => Number.isInteger(lessonId)),
      ),
    ];

    let joinedLessons: { id: number }[] = [];
    if (lessonGroupLessonIds.length > 0) {
      const { data: joinedLessonsData, error: joinedLessonsError } =
        await supabase
          .from("Lessons")
          .select("id")
          .eq("user_id", userId)
          .in("id", lessonGroupLessonIds);

      if (joinedLessonsError) throw joinedLessonsError;
      joinedLessons = (joinedLessonsData ?? []) as { id: number }[];
    }

    return [
      ...new Set([
        ...((directLessons ?? []) as { id: number }[]).map(lesson => lesson.id),
        ...joinedLessons.map(lesson => lesson.id),
      ]),
    ];
  }

  async function handleRequestDeleteClassroom(classroom: Classroom) {
    if (classroom.user_id !== userId) {
      setError(t("classrooms.deleteOwnOnly"));
      return;
    }

    setPreparingDeleteId(classroom.id);
    setError("");

    try {
      const affectedLessonIds = await getClassroomLessonIds(classroom.id);
      setDeleteCandidate({ classroom, affectedLessonIds });
    } catch (readError) {
      console.error("Failed to prepare classroom deletion:", readError);
      setError(t("classrooms.checkFailed"));
    } finally {
      setPreparingDeleteId(null);
    }
  }

  async function handleConfirmDeleteClassroom() {
    if (!deleteCandidate) return;

    const { classroom } = deleteCandidate;

    setDeletingId(classroom.id);
    setError("");

    try {
      const result = await deleteOwnedClassroom(classroom.id);

      if (!result.success) {
        console.error("Failed to delete classroom:", result.error);
        setError(t("classrooms.deleteFailed"));
        return;
      }

      setDeleteCandidate(null);
      setClassrooms(prev =>
        prev.filter(existingClassroom => existingClassroom.id !== classroom.id),
      );
      setDraftNames(prev => {
        const next = { ...prev };
        delete next[classroom.id];
        return next;
      });
      setDraftCodes(prev => {
        const next = { ...prev };
        delete next[classroom.id];
        return next;
      });
      setExpandedClassroomIds(prev => {
        const next = new Set(prev);
        next.delete(classroom.id);
        return next;
      });
      await data.refresh();
      router.refresh();
    } catch (deleteError) {
      console.error("Failed to delete classroom:", deleteError);
      setError(t("classrooms.deleteFailed"));
    } finally {
      setDeletingId(null);
    }
  }

  const deleteModalDescription = deleteCandidate
    ? deleteCandidate.affectedLessonIds.length > 0
      ? tr(
          deleteCandidate.affectedLessonIds.length === 1
            ? "classrooms.deleteDescriptionWithLesson"
            : "classrooms.deleteDescriptionWithLessons",
          { count: deleteCandidate.affectedLessonIds.length },
        )
      : t("classrooms.deleteDescriptionNoLessons")
    : "";

  function getVisibleLessons(classroom: Classroom) {
    if (editingId === classroom.id || expandedClassroomIds.has(classroom.id)) {
      return classroom.lessons;
    }

    return classroom.lessons.slice(0, 3);
  }

  function toggleExpandedClassroom(classroomId: number) {
    setExpandedClassroomIds(prev => {
      const next = new Set(prev);

      if (next.has(classroomId)) {
        next.delete(classroomId);
      } else {
        next.add(classroomId);
      }

      return next;
    });
  }

  function renderLessonRows(classroom: Classroom, variant?: "card" | "list") {
    const visibleLessons = getVisibleLessons(classroom);
    const hiddenCount = classroom.lessons.length - visibleLessons.length;
    const isExpanded = expandedClassroomIds.has(classroom.id);
    const isEditing = editingId === classroom.id;

    return (
      <LessonPreviewList>
        <LessonPreviewSectionHeader>
          <LessonPreviewSectionTitle>
            {t("classrooms.lessons")}
          </LessonPreviewSectionTitle>
          {renderLessonCount(classroom)}
        </LessonPreviewSectionHeader>

        {classroom.lessons.length === 0 && (
          <EmptyState>{t("classrooms.noLessonsAssigned")}</EmptyState>
        )}

        {visibleLessons.map(lesson => (
          <LessonPreviewItem key={lesson.id} $variant={variant}>
            <LessonPreviewLink href={`/app/lessons/${lesson.id}`}>
              <LessonPreviewTitle>{lesson.name}</LessonPreviewTitle>
            </LessonPreviewLink>
            <LessonMeta>
              <StatusPill status={lesson.syncStatus ?? "dashboard"} />
              {isEditing && (
                <LessonRemoveButton
                  type="button"
                  aria-label={`${t("classrooms.removeLesson")}: ${lesson.name}`}
                  title={t("classrooms.removeLesson")}
                  onClick={() =>
                    setRemoveLessonCandidate({ classroom, lesson })
                  }
                >
                  ×
                </LessonRemoveButton>
              )}
            </LessonMeta>
          </LessonPreviewItem>
        ))}

        {(hiddenCount > 0 || isExpanded) && !isEditing && (
          <LessonPreviewMoreButton
            type="button"
            onClick={() => toggleExpandedClassroom(classroom.id)}
          >
            {isExpanded
              ? t("common.showLess")
              : `${t("common.morePrefix")}${hiddenCount} ${t("common.moreSuffix")}`}
          </LessonPreviewMoreButton>
        )}
      </LessonPreviewList>
    );
  }

  function renderClassroomJoinCodeControls(classroom: Classroom) {
    const isEditing = editingId === classroom.id;
    const draftCode = draftCodes[classroom.id] ?? "";
    const editError = editErrors[classroom.id];

    if (isEditing) {
      const joinCodeInputId = `classroom-code-${classroom.id}`;

      return (
        <CodeDisplay>
          <CodeLabel htmlFor={joinCodeInputId} as="label">
            {t("classrooms.joinCode")}
          </CodeLabel>
          <JoinCodeFieldRow>
            <JoinCodeInput
              id={joinCodeInputId}
              value={draftCode}
              maxLength={JOIN_CODE_LENGTH}
              onChange={event => {
                setDraftCodes(prev => ({
                  ...prev,
                  [classroom.id]: normalizeJoinCode(event.target.value),
                }));
                if (editError) {
                  setEditErrors(prev => {
                    const next = { ...prev };
                    delete next[classroom.id];
                    return next;
                  });
                }
              }}
              aria-label={`${t("classrooms.joinCode")}: ${classroom.name}`}
            />
            <ActionButton
              type="button"
              onClick={() => {
                setDraftCodes(prev => ({
                  ...prev,
                  [classroom.id]: generateJoinCode(),
                }));
                setEditErrors(prev => {
                  const next = { ...prev };
                  delete next[classroom.id];
                  return next;
                });
              }}
              aria-label={t("classrooms.newCode")}
              title={t("classrooms.newCode")}
              $compact
            >
              {IconSvgs.refresh}
            </ActionButton>
          </JoinCodeFieldRow>
          {editError && <EditFieldError>{editError}</EditFieldError>}
        </CodeDisplay>
      );
    }

    return (
      <CodeDisplay>
        <CodeLabel>{t("classrooms.joinCode")}</CodeLabel>
        <CodeText>{classroom.join_code ?? t("classrooms.noCode")}</CodeText>
      </CodeDisplay>
    );
  }

  function renderClassroomManageActions(classroom: Classroom) {
    if (editingId === classroom.id) {
      return (
        <ClassroomManageActions>
          <PrimaryButton
            type="button"
            disabled={savingId === classroom.id}
            onClick={() => handleSaveClassroom(classroom)}
            $compact
          >
            {savingId === classroom.id ? t("common.saving") : t("common.save")}
          </PrimaryButton>
          <ActionButton
            type="button"
            onClick={() => cancelEditingClassroom(classroom)}
            $inline
          >
            {t("common.cancel")}
          </ActionButton>
        </ClassroomManageActions>
      );
    }

    return (
      <ClassroomManageActions>
        <ActionButton
          type="button"
          onClick={() => startEditingClassroom(classroom)}
          aria-label={`${t("classrooms.editClassroom")}: ${classroom.name}`}
          title={t("classrooms.editClassroom")}
          $compact
        >
          <EditIcon />
        </ActionButton>
        {classroom.user_id === userId && (
          <DangerIconButton
            type="button"
            onClick={() => void handleRequestDeleteClassroom(classroom)}
            disabled={
              deletingId === classroom.id || preparingDeleteId === classroom.id
            }
            aria-label={`${t("classrooms.delete")}: ${classroom.name}`}
            title={
              preparingDeleteId === classroom.id
                ? t("classrooms.checking")
                : t("classrooms.delete")
            }
            $compact
          >
            <TrashIcon />
          </DangerIconButton>
        )}
      </ClassroomManageActions>
    );
  }

  function renderLessonCount(classroom: Classroom) {
    return (
      <LessonCountPill>
        {classroom.lessons.length === 1
          ? t("classrooms.lessonSingular")
          : tr("classrooms.lessonPlural", {
              count: classroom.lessons.length,
            })}
      </LessonCountPill>
    );
  }

  function renderClassroomName(classroom: Classroom) {
    const isEditing = editingId === classroom.id;
    const nameInputId = `classroom-name-${classroom.id}`;

    return (
      <ClassroomNameBlock $editing={isEditing}>
        {isEditing ? (
          <ClassroomNameInput
            id={nameInputId}
            value={draftNames[classroom.id] ?? ""}
            onChange={event =>
              setDraftNames(prev => ({
                ...prev,
                [classroom.id]: event.target.value,
              }))
            }
            aria-label={`Classroom name for ${classroom.name}`}
          />
        ) : (
          <ClassroomNameTitle>{classroom.name}</ClassroomNameTitle>
        )}
      </ClassroomNameBlock>
    );
  }

  return (
    <PageContainer>
      <Header>
        <HeaderText>
          <Title>{t("classrooms.title")}</Title>
          <MutedText>{t("classrooms.description")}</MutedText>
        </HeaderText>
        <CreateButton
          onClick={() => {
            setError("");
            setName("");
            setJoinCode(generateJoinCode());
            setIsCreateOpen(true);
          }}
          label={t("classrooms.create")}
        />
      </Header>

      {error && !isCreateOpen && <ErrorText>{error}</ErrorText>}

      {sortedClassrooms.length === 0 && (
        <EmptyState>{t("classrooms.empty")}</EmptyState>
      )}

      {sortedClassrooms.length > 0 && (
        <OverviewSection>
          <OverviewToolbar>
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder={t("classrooms.searchPlaceholder")}
            />
            <ViewToggleButton>
              <GridToggle
                type="button"
                $active={overviewView === "grid"}
                onClick={() => setOverviewView("grid")}
              >
                {overviewView === "grid"
                  ? IconSvgs.gridActive
                  : IconSvgs.gridInactive}
                <ToggleText>{t("common.card")}</ToggleText>
              </GridToggle>

              <ToggleDivider />

              <GridToggle
                type="button"
                $active={overviewView === "list"}
                onClick={() => setOverviewView("list")}
              >
                {overviewView === "list"
                  ? IconSvgs.listActive
                  : IconSvgs.listInactive}
                <ToggleText>{t("common.list")}</ToggleText>
              </GridToggle>
            </ViewToggleButton>
          </OverviewToolbar>

          {filteredClassrooms.length > 0 && (
            <ClassroomCountText>{classroomCountText}</ClassroomCountText>
          )}

          {filteredClassrooms.length === 0 ? (
            <EmptyState>
              <strong>{t("classrooms.noMatches")}</strong>
              <span>{t("classrooms.tryDifferent")}</span>
            </EmptyState>
          ) : overviewView === "grid" ? (
            <OverviewGrid>
              {filteredClassrooms.map(classroom => (
                <OverviewCard key={classroom.id}>
                  <OverviewHeader>
                    <ClassroomHeaderContent>
                      {renderClassroomName(classroom)}
                      {renderClassroomJoinCodeControls(classroom)}
                    </ClassroomHeaderContent>
                    <ClassroomHeaderMain>
                      {renderClassroomManageActions(classroom)}
                    </ClassroomHeaderMain>
                  </OverviewHeader>

                  {renderLessonRows(classroom)}
                </OverviewCard>
              ))}
            </OverviewGrid>
          ) : (
            <OverviewList>
              {filteredClassrooms.map(classroom => (
                <ListClassroomSection key={classroom.id}>
                  <ListClassroomHeader>
                    <ClassroomHeaderContent>
                      {renderClassroomName(classroom)}
                      {renderClassroomJoinCodeControls(classroom)}
                    </ClassroomHeaderContent>
                    <ClassroomHeaderMain>
                      {renderClassroomManageActions(classroom)}
                    </ClassroomHeaderMain>
                  </ListClassroomHeader>

                  {renderLessonRows(classroom, "list")}
                </ListClassroomSection>
              ))}
            </OverviewList>
          )}
        </OverviewSection>
      )}

      <ConfirmationModal
        isOpen={deleteCandidate !== null}
        title={
          deleteCandidate
            ? tr("classrooms.deleteTitle", {
                classroom: deleteCandidate.classroom.name,
              })
            : `${t("classrooms.delete")}?`
        }
        description={deleteModalDescription}
        confirmText={t("classrooms.delete")}
        cancelText={t("classrooms.keep")}
        isLoading={deletingId !== null}
        variant="danger"
        onCancel={() => {
          if (deletingId === null) setDeleteCandidate(null);
        }}
        onConfirm={() => void handleConfirmDeleteClassroom()}
      />

      <ConfirmationModal
        isOpen={removeLessonCandidate !== null}
        title={t("classrooms.removeLessonTitle")}
        description={
          removeLessonCandidate
            ? tr("classrooms.removeLessonDescription", {
                lesson: removeLessonCandidate.lesson.name,
                classroom: removeLessonCandidate.classroom.name,
              })
            : ""
        }
        confirmText={t("classrooms.removeLessonConfirm")}
        isLoading={removingLessonId !== null}
        onCancel={() => {
          if (removingLessonId === null) setRemoveLessonCandidate(null);
        }}
        onConfirm={() => void handleConfirmRemoveLesson()}
      />

      <ConfirmationModal
        isOpen={joinCodeChangeCandidate !== null}
        title={t("classrooms.changeJoinCodeTitle")}
        description={t("classrooms.changeJoinCodeDescription")}
        confirmText={t("classrooms.changeJoinCodeConfirm")}
        isLoading={savingId === joinCodeChangeCandidate?.classroom.id}
        onCancel={() => {
          if (savingId === null) setJoinCodeChangeCandidate(null);
        }}
        onConfirm={() => void handleConfirmJoinCodeChange()}
      />

      {isCreateOpen && (
        <Overlay onClick={closeCreateModal}>
          <ModalCard onClick={event => event.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{t("classrooms.create")}</ModalTitle>
              <ModalCloseButton
                type="button"
                onClick={closeCreateModal}
                disabled={savingId === "new"}
                aria-label={t("common.closeModal")}
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
              </ModalCloseButton>
            </ModalHeader>

            <CreateClassroomModalIntro>
              {t("classrooms.createModalIntro")}
            </CreateClassroomModalIntro>

            <CreateClassroomForm onSubmit={handleCreate}>
              <Field>
                <FieldLabel htmlFor="classroom-name">
                  {t("classrooms.name")}
                </FieldLabel>
                <Input
                  id="classroom-name"
                  value={name}
                  onChange={event => {
                    setName(event.target.value);
                    if (error) setError("");
                  }}
                  placeholder={t("classrooms.namePlaceholder")}
                  disabled={savingId === "new"}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="classroom-code">
                  {t("classrooms.joinCode")}
                </FieldLabel>
                <JoinCodeFieldRow>
                  <JoinCodeInput
                    id="classroom-code"
                    value={joinCode}
                    maxLength={JOIN_CODE_LENGTH}
                    onChange={event => {
                      setJoinCode(normalizeJoinCode(event.target.value));
                      if (error) setError("");
                    }}
                    placeholder={t("classrooms.joinCodePlaceholder")}
                    disabled={savingId === "new"}
                  />
                  <ActionButton
                    type="button"
                    onClick={() => setJoinCode(generateJoinCode())}
                    disabled={savingId === "new"}
                    aria-label={t("classrooms.newCode")}
                    title={t("classrooms.newCode")}
                    $compact
                  >
                    {IconSvgs.refresh}
                  </ActionButton>
                </JoinCodeFieldRow>
                <FieldHint>{t("classrooms.hint")}</FieldHint>
              </Field>

              {error && <ErrorText>{error}</ErrorText>}

              <CreateClassroomModalActions>
                <ActionButton
                  type="button"
                  onClick={closeCreateModal}
                  disabled={savingId === "new"}
                >
                  {t("common.cancel")}
                </ActionButton>
                <PrimaryButton
                  type="submit"
                  disabled={savingId === "new" || !canCreateClassroom}
                >
                  {savingId === "new"
                    ? t("common.creating")
                    : t("classrooms.create")}
                </PrimaryButton>
              </CreateClassroomModalActions>
            </CreateClassroomForm>
          </ModalCard>
        </Overlay>
      )}
    </PageContainer>
  );
}
