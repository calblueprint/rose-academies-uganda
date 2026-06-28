"use client";

import { FormEvent, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/api/supabase/client";
import ConfirmationModal from "@/components/modals/ConfirmationModal/ConfirmationModal";
import { DataContext } from "@/context/DataContext";
import { fetchVisibleClassrooms } from "@/lib/classrooms";
import { useLanguage } from "@/lib/i18n";
import { IconSvgs } from "@/lib/icons";
import { deleteOwnedClassroom } from "./actions";
import {
  ActionButton,
  ButtonRow,
  CodeActions,
  CodeDisplay,
  CodeEditDisplay,
  CodeText,
  CopiedText,
  DangerIconButton,
  DeleteActionSlot,
  EmptyState,
  ErrorText,
  Field,
  FieldHint,
  FieldLabel,
  Form,
  Header,
  HeaderText,
  Input,
  JoinCodeFieldRow,
  JoinCodeInput,
  MutedText,
  PageContainer,
  PrimaryButton,
  RowActions,
  Section,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableWrapper,
  Title,
} from "./style";

type Classroom = {
  id: number;
  name: string;
  join_code: string | null;
  user_id?: string | null;
};

type ClassroomsClientProps = {
  initialClassrooms: Classroom[];
  userId: string;
};

type DeleteCandidate = {
  classroom: Classroom;
  affectedLessonIds: number[];
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

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="8"
        y="8"
        width="11"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5 15V7C5 5.9 5.9 5 7 5H15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
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
}: ClassroomsClientProps) {
  const router = useRouter();
  const data = useContext(DataContext);
  const { t } = useLanguage();
  const [classrooms, setClassrooms] = useState(initialClassrooms);
  const [name, setName] = useState("");
  const [joinCode, setJoinCode] = useState(generateJoinCode());
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draftCodes, setDraftCodes] = useState<Record<number, string>>(() =>
    Object.fromEntries(
      initialClassrooms.map(classroom => [
        classroom.id,
        classroom.join_code ?? "",
      ]),
    ),
  );
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [deleteCandidate, setDeleteCandidate] =
    useState<DeleteCandidate | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [preparingDeleteId, setPreparingDeleteId] = useState<number | null>(
    null,
  );
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState<number | "new" | null>(null);

  const sortedClassrooms = useMemo(
    () =>
      [...classrooms].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
      ),
    [classrooms],
  );

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
    const nextClassrooms = await fetchVisibleClassrooms(supabase, userId);
    setClassrooms(nextClassrooms);
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
      setError("Classroom name is required.");
      return;
    }

    if (!JOIN_CODE_PATTERN.test(normalizedCode)) {
      setError("Use exactly 6 letters or numbers for the join code.");
      return;
    }

    if (isDuplicateCode(normalizedCode)) {
      setError("That join code is already used by another classroom.");
      return;
    }

    setSavingId("new");
    setError("");

    try {
      if (await isCodeUsedElsewhere(normalizedCode)) {
        setError("That join code is already used by another classroom.");
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
      await refreshClassrooms();
    } catch (createError) {
      console.error("Failed to create classroom:", createError);
      setError("Unable to create classroom. Please try again.");
    } finally {
      setSavingId(null);
    }
  }

  async function handleSaveCode(classroom: Classroom) {
    const normalizedCode = normalizeJoinCode(draftCodes[classroom.id] ?? "");
    const currentCode = classroom.join_code ?? "";

    if (!JOIN_CODE_PATTERN.test(normalizedCode)) {
      setError("Use exactly 6 letters or numbers for the join code.");
      return;
    }

    if (normalizedCode === currentCode) {
      setEditingId(null);
      return;
    }

    if (
      currentCode &&
      !window.confirm(
        "Change this classroom's join code? Students will need the new code the next time they join.",
      )
    ) {
      return;
    }

    if (isDuplicateCode(normalizedCode, classroom.id)) {
      setError("That join code is already used by another classroom.");
      return;
    }

    setSavingId(classroom.id);
    setError("");

    try {
      if (await isCodeUsedElsewhere(normalizedCode, classroom.id)) {
        setError("That join code is already used by another classroom.");
        return;
      }

      const { error: updateError } = await supabase
        .from("Groups")
        .update({ join_code: normalizedCode })
        .eq("id", classroom.id);

      if (updateError) throw updateError;

      setEditingId(null);
      await refreshClassrooms();
    } catch (updateError) {
      console.error("Failed to update classroom join code:", updateError);
      setError("Unable to update join code. Please try again.");
    } finally {
      setSavingId(null);
    }
  }

  async function handleCopy(classroom: Classroom) {
    if (!classroom.join_code) return;

    await navigator.clipboard.writeText(classroom.join_code);
    setCopiedId(classroom.id);
    window.setTimeout(() => setCopiedId(null), 1500);
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
      setError("Only classrooms created by this account can be deleted.");
      return;
    }

    setPreparingDeleteId(classroom.id);
    setError("");

    try {
      const affectedLessonIds = await getClassroomLessonIds(classroom.id);
      setDeleteCandidate({ classroom, affectedLessonIds });
    } catch (readError) {
      console.error("Failed to prepare classroom deletion:", readError);
      setError("Unable to check this classroom. Please try again.");
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
        setError("Unable to delete classroom. Please try again.");
        return;
      }

      setDeleteCandidate(null);
      await refreshClassrooms();
    } catch (deleteError) {
      console.error("Failed to delete classroom:", deleteError);
      setError("Unable to delete classroom. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  const deleteModalDescription = deleteCandidate
    ? deleteCandidate.affectedLessonIds.length > 0
      ? `${
          deleteCandidate.affectedLessonIds.length === 1
            ? "1 lesson uses"
            : `${deleteCandidate.affectedLessonIds.length} lessons use`
        } this classroom. ${
          deleteCandidate.affectedLessonIds.length === 1 ? "It" : "They"
        } will be removed from sync until assigned to another classroom.\n\nSync afterwards to remove ${
          deleteCandidate.affectedLessonIds.length === 1
            ? "that lesson"
            : "those lessons"
        } from the classroom device.`
      : "This classroom will be removed. Lessons already assigned to other classrooms will not change."
    : "";

  return (
    <PageContainer>
      <Header>
        <HeaderText>
          <Title>{t("classrooms.title")}</Title>
          <MutedText>{t("classrooms.description")}</MutedText>
        </HeaderText>
      </Header>

      <Section>
        <Form onSubmit={handleCreate}>
          <Field>
            <FieldLabel htmlFor="classroom-name">
              {t("classrooms.name")}
            </FieldLabel>
            <Input
              id="classroom-name"
              value={name}
              onChange={event => setName(event.target.value)}
              placeholder={t("classrooms.namePlaceholder")}
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
                onChange={event =>
                  setJoinCode(normalizeJoinCode(event.target.value))
                }
                placeholder={t("classrooms.joinCodePlaceholder")}
              />
              <ActionButton
                type="button"
                onClick={() => setJoinCode(generateJoinCode())}
                aria-label={t("classrooms.newCode")}
                title={t("classrooms.newCode")}
                $compact
              >
                {IconSvgs.refresh}
              </ActionButton>
            </JoinCodeFieldRow>
            <FieldHint>{t("classrooms.hint")}</FieldHint>
          </Field>

          <ButtonRow>
            <PrimaryButton type="submit" disabled={savingId === "new"}>
              {savingId === "new"
                ? t("common.creating")
                : t("classrooms.create")}
            </PrimaryButton>
          </ButtonRow>
        </Form>

        {error && <ErrorText>{error}</ErrorText>}
      </Section>

      <TableWrapper>
        <Table aria-label={t("classrooms.tableLabel")}>
          <thead>
            <tr>
              <TableHeader $width="45%">{t("common.classroom")}</TableHeader>
              <TableHeader
                $align="right"
                $contentWidth="var(--join-code-column-width)"
              >
                <span>{t("classrooms.joinCode")}</span>
              </TableHeader>
            </tr>
          </thead>
          <tbody>
            {sortedClassrooms.map(classroom => {
              const isEditing = editingId === classroom.id;
              const draftCode = draftCodes[classroom.id] ?? "";

              return (
                <TableRow key={classroom.id}>
                  <TableCell>
                    <strong>{classroom.name}</strong>
                  </TableCell>
                  <TableCell $align="right">
                    {isEditing ? (
                      <CodeEditDisplay>
                        <JoinCodeInput
                          value={draftCode}
                          maxLength={JOIN_CODE_LENGTH}
                          onChange={event =>
                            setDraftCodes(prev => ({
                              ...prev,
                              [classroom.id]: normalizeJoinCode(
                                event.target.value,
                              ),
                            }))
                          }
                          aria-label={`Join code for ${classroom.name}`}
                        />
                        <RowActions>
                          <ActionButton
                            type="button"
                            onClick={() =>
                              setDraftCodes(prev => ({
                                ...prev,
                                [classroom.id]: generateJoinCode(),
                              }))
                            }
                            aria-label={t("classrooms.newCode")}
                            title={t("classrooms.newCode")}
                            $compact
                          >
                            {IconSvgs.refresh}
                          </ActionButton>
                          <PrimaryButton
                            type="button"
                            disabled={savingId === classroom.id}
                            onClick={() => handleSaveCode(classroom)}
                            $compact
                          >
                            {savingId === classroom.id
                              ? t("common.saving")
                              : t("common.save")}
                          </PrimaryButton>
                          <ActionButton
                            type="button"
                            onClick={() => {
                              setEditingId(null);
                              setDraftCodes(prev => ({
                                ...prev,
                                [classroom.id]: classroom.join_code ?? "",
                              }));
                            }}
                          >
                            {t("common.cancel")}
                          </ActionButton>
                        </RowActions>
                      </CodeEditDisplay>
                    ) : (
                      <CodeDisplay>
                        <CodeText>
                          {classroom.join_code ?? t("classrooms.noCode")}
                        </CodeText>
                        <CodeActions>
                          <ActionButton
                            type="button"
                            onClick={() => handleCopy(classroom)}
                            disabled={!classroom.join_code}
                            aria-label={`Copy join code for ${classroom.name}`}
                            title={
                              copiedId === classroom.id
                                ? t("common.copied")
                                : t("classrooms.copyCode")
                            }
                            $compact
                          >
                            <CopyIcon />
                          </ActionButton>
                          <CopiedText
                            $visible={copiedId === classroom.id}
                            aria-live="polite"
                          >
                            {t("common.copied")}
                          </CopiedText>
                          <ActionButton
                            type="button"
                            onClick={() => setEditingId(classroom.id)}
                            aria-label={`Edit join code for ${classroom.name}`}
                            title={t("classrooms.editCode")}
                            $compact
                          >
                            <EditIcon />
                          </ActionButton>
                          {classroom.user_id === userId ? (
                            <DangerIconButton
                              type="button"
                              onClick={() =>
                                void handleRequestDeleteClassroom(classroom)
                              }
                              disabled={
                                deletingId === classroom.id ||
                                preparingDeleteId === classroom.id
                              }
                              aria-label={`Delete classroom ${classroom.name}`}
                              title={
                                preparingDeleteId === classroom.id
                                  ? t("classrooms.checking")
                                  : t("classrooms.delete")
                              }
                              $compact
                            >
                              <TrashIcon />
                            </DangerIconButton>
                          ) : (
                            <DeleteActionSlot aria-hidden="true" />
                          )}
                        </CodeActions>
                      </CodeDisplay>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      </TableWrapper>

      {sortedClassrooms.length === 0 && (
        <EmptyState>{t("classrooms.empty")}</EmptyState>
      )}

      <ConfirmationModal
        isOpen={deleteCandidate !== null}
        title={
          deleteCandidate
            ? `Delete ${deleteCandidate.classroom.name}?`
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
    </PageContainer>
  );
}
