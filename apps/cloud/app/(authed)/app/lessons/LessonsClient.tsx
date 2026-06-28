"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/api/supabase/client";
import ClassroomFilterDropdown from "@/components/ClassroomFilterDropdown";
import CreateButton from "@/components/CreateLessonButton";
import LessonCard from "@/components/LessonCard";
import LessonItem from "@/components/LessonItem";
import ConfirmationModal from "@/components/modals/ConfirmationModal/ConfirmationModal";
import CreateLessonModal from "@/components/modals/CreateLessonModal/CreateLessonModal";
import UploadLessonImageModal from "@/components/modals/UploadLessonImageModal/UploadLessonImageModal";
import SearchBar from "@/components/SearchBar";
import SortByDropdown, {
  SortOption,
  SortOptionValue,
} from "@/components/SortByDropdown";
import { useLanguage } from "@/lib/i18n";
import { IconSvgs } from "@/lib/icons";
import {
  CardWrapper,
  ControlsLeft,
  ControlsRight,
  Description,
  EmptyState,
  EmptyStateDescription,
  EmptyStateTitle,
  GridToggle,
  Header,
  HeaderText,
  LessonCountText,
  LessonsGrid,
  LessonsList,
  PageContainer,
  ResultsHeader,
  SearchBarRow,
  Title,
  ToggleDivider,
  ToggleText,
  ViewToggleButton,
} from "./style";

type LessonsClientLesson = {
  id: number;
  name: string;
  image_path: string | null;
  created_at?: string;
  updated_at?: string;
  classroomIds?: number[];
  villages?: string[];
};

type LessonsClientVariant = "dashboard" | "offline" | "archive";

type LessonsClientProps = {
  initialLessons: LessonsClientLesson[];
  lessonStatuses: Partial<Record<number, "available" | "pending">>;
  title?: string;
  description?: string;
  showCreateButton?: boolean;
  showSearchBar?: boolean;
  showViewToggle?: boolean;
  defaultView?: "grid" | "list";
  listAction?: "remove" | "restore";
  deviceId?: string;
  layout?: "page" | "embedded";
  variant?: LessonsClientVariant;
  showSortButton?: boolean;
  showClassroomFilter?: boolean;
  sortOptions?: SortOption[];
  sortStorageKey?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
};

export default function LessonsClient({
  initialLessons,
  lessonStatuses,
  title = "Lessons",
  description,
  showCreateButton = true,
  showSearchBar = true,
  showViewToggle = true,
  defaultView = "grid",
  listAction,
  deviceId,
  layout = "page",
  variant = "dashboard",
  showSortButton = false,
  showClassroomFilter = true,
  sortOptions,
  sortStorageKey = "lessonsSortBy",
  emptyStateTitle = "No lessons yet.",
  emptyStateDescription = "Lessons will appear here when they are available.",
}: LessonsClientProps) {
  const router = useRouter();
  const { t } = useLanguage();

  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<"grid" | "list">(defaultView);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [imageModalLessonId, setImageModalLessonId] = useState<number | null>(
    null,
  );
  const [restoreConfirmLessonId, setRestoreConfirmLessonId] = useState<
    number | null
  >(null);
  const [removeConfirmLessonId, setRemoveConfirmLessonId] = useState<
    number | null
  >(null);
  const [lessons, setLessons] = useState(initialLessons);
  const [loadingLessonId, setLoadingLessonId] = useState<number | null>(null);

  const defaultSortBy = sortOptions?.[0]?.value ?? "updated_desc";
  const [sortBy, setSortBy] = useState<SortOptionValue>(defaultSortBy);
  const [selectedClassroomIds, setSelectedClassroomIds] = useState<number[]>(
    [],
  );

  useEffect(() => {
    setLessons(initialLessons);
  }, [initialLessons]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem(
      sortStorageKey,
    ) as SortOptionValue | null;

    const validValues = new Set(
      (sortOptions ?? []).map(option => option.value),
    );
    const isValidSavedValue = saved
      ? !sortOptions || validValues.has(saved)
      : false;

    if (saved && isValidSavedValue) {
      setSortBy(saved);
    }
  }, [sortOptions, sortStorageKey]);

  function handleSortChange(value: SortOptionValue) {
    setSortBy(value);

    if (typeof window !== "undefined") {
      localStorage.setItem(sortStorageKey, value);
    }
  }

  const availableClassrooms = useMemo(() => {
    const classroomMap = new Map<number, string>();

    lessons.forEach(lesson => {
      lesson.classroomIds?.forEach((classroomId, index) => {
        classroomMap.set(
          classroomId,
          lesson.villages?.[index] ?? `Classroom ${classroomId}`,
        );
      });
    });

    return [...classroomMap.entries()]
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [lessons]);

  const filteredLessons = useMemo(() => {
    const filtered = lessons.filter(lesson => {
      const matchesSearch = lesson.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesClassroom =
        selectedClassroomIds.length === 0 ||
        lesson.classroomIds?.some(classroomId =>
          selectedClassroomIds.includes(classroomId),
        );

      return matchesSearch && matchesClassroom;
    });

    if (!sortBy) return filtered;

    return [...filtered].sort((a, b) => {
      const getDateValue = (date?: string) =>
        date ? new Date(date).getTime() : null;

      if (sortBy === "updated_desc") {
        const aVal = getDateValue(a.updated_at);
        const bVal = getDateValue(b.updated_at);

        if (aVal === null && bVal === null) return 0;
        if (aVal === null) return 1;
        if (bVal === null) return -1;

        return bVal - aVal;
      }

      if (sortBy === "updated_asc") {
        const aVal = getDateValue(a.updated_at);
        const bVal = getDateValue(b.updated_at);

        if (aVal === null && bVal === null) return 0;
        if (aVal === null) return 1;
        if (bVal === null) return -1;

        return aVal - bVal;
      }

      if (sortBy === "created_desc") {
        const aVal = getDateValue(a.created_at);
        const bVal = getDateValue(b.created_at);

        if (aVal === null && bVal === null) return 0;
        if (aVal === null) return 1;
        if (bVal === null) return -1;

        return bVal - aVal;
      }

      if (sortBy === "created_asc") {
        const aVal = getDateValue(a.created_at);
        const bVal = getDateValue(b.created_at);

        if (aVal === null && bVal === null) return 0;
        if (aVal === null) return 1;
        if (bVal === null) return -1;

        return aVal - bVal;
      }

      if (sortBy === "name_asc") {
        return a.name.localeCompare(b.name, undefined, {
          sensitivity: "base",
        });
      }

      if (sortBy === "name_desc") {
        return b.name.localeCompare(a.name, undefined, {
          sensitivity: "base",
        });
      }

      return 0;
    });
  }, [lessons, searchTerm, sortBy, selectedClassroomIds]);

  const lessonCountText =
    filteredLessons.length === lessons.length
      ? `${lessons.length} ${
          lessons.length === 1
            ? t("lessons.lessonCountSingular")
            : t("lessons.lessonCountPlural")
        }`
      : `${filteredLessons.length} ${t("lessons.of")} ${
          lessons.length
        } ${t("lessons.lessonCountPlural")}`;

  const displayTitle =
    variant === "archive"
      ? t("archive.title")
      : variant === "offline"
        ? t("sync.lessonsToSync")
        : title === "Lessons"
          ? t("lessons.title")
          : title;
  const displayDescription =
    variant === "archive"
      ? t("archive.description")
      : description ===
          "Create lessons, assign classrooms, and choose what to sync for offline use."
        ? t("lessons.description")
        : description;
  const displayEmptyStateTitle =
    variant === "archive"
      ? t("archive.emptyTitle")
      : emptyStateTitle === "No lessons yet."
        ? t("lessons.noLessons")
        : emptyStateTitle;
  const displayEmptyStateDescription =
    variant === "archive"
      ? t("archive.emptyDescription")
      : emptyStateDescription ===
          "Create your first lesson to add files and assign a classroom."
        ? t("lessons.empty")
        : emptyStateDescription;

  async function handleListAction(lessonId: number) {
    if (!listAction) return;

    if (listAction === "restore") {
      setRestoreConfirmLessonId(lessonId);
      return;
    }

    if (listAction === "remove") {
      setRemoveConfirmLessonId(lessonId);
    }
  }

  async function handleRestoreConfirm() {
    if (restoreConfirmLessonId === null) return;

    const lessonIdToRestore = restoreConfirmLessonId;

    setLoadingLessonId(lessonIdToRestore);

    try {
      const { error } = await supabase
        .from("Lessons")
        .update({
          is_archived: false,
          updated_at: new Date().toISOString(),
        })
        .eq("id", lessonIdToRestore);

      if (error) throw error;

      setLessons(prev => prev.filter(l => l.id !== lessonIdToRestore));
      setRestoreConfirmLessonId(null);

      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLessonId(null);
    }
  }

  async function handleRemoveConfirm() {
    if (removeConfirmLessonId === null) return;

    if (!deviceId) {
      console.error(new Error("Missing deviceId"));
      return;
    }

    const lessonIdToRemove = removeConfirmLessonId;

    setLoadingLessonId(lessonIdToRemove);

    try {
      const { error } = await supabase
        .from("DeviceLessons")
        .delete()
        .eq("lesson_id", lessonIdToRemove)
        .eq("device_id", deviceId);

      if (error) throw error;

      setLessons(prev => prev.filter(l => l.id !== lessonIdToRemove));
      setRemoveConfirmLessonId(null);

      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLessonId(null);
    }
  }

  return (
    <PageContainer $layout={layout} $variant={variant}>
      <Header $variant={variant}>
        <HeaderText>
          <Title $layout={layout} $variant={variant}>
            {displayTitle}
          </Title>

          {displayDescription && (
            <Description>{displayDescription}</Description>
          )}
        </HeaderText>

        {showCreateButton && (
          <CreateButton onClick={() => setIsCreateOpen(true)} />
        )}
      </Header>

      {showCreateButton && (
        <CreateLessonModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          deviceId={deviceId ?? null}
        />
      )}

      <UploadLessonImageModal
        isOpen={imageModalLessonId !== null}
        onClose={() => setImageModalLessonId(null)}
        lessonId={imageModalLessonId ?? 0}
        onImageUpdated={(lessonId, imagePath) => {
          setLessons(prev =>
            prev.map(lesson =>
              lesson.id === lessonId
                ? { ...lesson, image_path: imagePath }
                : lesson,
            ),
          );
        }}
      />

      <ConfirmationModal
        isOpen={restoreConfirmLessonId !== null}
        title={t("lessons.restoreTitle")}
        description={t("lessons.restoreDescription")}
        confirmText={t("lessons.restoreConfirm")}
        onCancel={() => setRestoreConfirmLessonId(null)}
        onConfirm={handleRestoreConfirm}
        isLoading={
          restoreConfirmLessonId !== null &&
          loadingLessonId === restoreConfirmLessonId
        }
      />

      <ConfirmationModal
        isOpen={removeConfirmLessonId !== null}
        title={t("lessons.removeSyncTitle")}
        description={t("lessons.removeSyncDescription")}
        confirmText={t("lessons.removeConfirm")}
        onCancel={() => setRemoveConfirmLessonId(null)}
        onConfirm={handleRemoveConfirm}
        isLoading={
          removeConfirmLessonId !== null &&
          loadingLessonId === removeConfirmLessonId
        }
      />

      {(showSearchBar || showViewToggle || showSortButton) && (
        <SearchBarRow $variant={variant}>
          <ControlsLeft>
            {showSearchBar && (
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            )}
          </ControlsLeft>

          <ControlsRight>
            {showSortButton &&
              showClassroomFilter &&
              availableClassrooms.length > 0 && (
                <ClassroomFilterDropdown
                  classrooms={availableClassrooms}
                  selectedClassroomIds={selectedClassroomIds}
                  onChange={setSelectedClassroomIds}
                />
              )}

            {showSortButton && (
              <SortByDropdown
                options={sortOptions}
                value={sortBy}
                onChange={handleSortChange}
              />
            )}

            {showViewToggle && (
              <ViewToggleButton>
                <GridToggle
                  $active={view === "grid"}
                  onClick={() => setView("grid")}
                >
                  {view === "grid"
                    ? IconSvgs.gridActive
                    : IconSvgs.gridInactive}
                  <ToggleText>{t("common.card")}</ToggleText>
                </GridToggle>

                <ToggleDivider />

                <GridToggle
                  $active={view === "list"}
                  onClick={() => setView("list")}
                >
                  {view === "list"
                    ? IconSvgs.listActive
                    : IconSvgs.listInactive}
                  <ToggleText>{t("common.list")}</ToggleText>
                </GridToggle>
              </ViewToggleButton>
            )}
          </ControlsRight>
        </SearchBarRow>
      )}

      {variant === "dashboard" && filteredLessons.length > 0 && (
        <ResultsHeader>
          <LessonCountText>{lessonCountText}</LessonCountText>
        </ResultsHeader>
      )}

      {filteredLessons.length === 0 ? (
        <EmptyState>
          <EmptyStateTitle>
            {lessons.length === 0
              ? displayEmptyStateTitle
              : t("lessons.noMatches")}
          </EmptyStateTitle>
          <EmptyStateDescription>
            {lessons.length === 0
              ? displayEmptyStateDescription
              : t("lessons.tryDifferent")}
          </EmptyStateDescription>
        </EmptyState>
      ) : view === "grid" ? (
        <LessonsGrid $variant={variant}>
          {filteredLessons.map(lesson => (
            <div key={lesson.id}>
              <CardWrapper>
                <LessonCard
                  lessonId={lesson.id}
                  lessonName={lesson.name}
                  lessonImage={lesson.image_path}
                  status={lessonStatuses[lesson.id]}
                  villages={lesson.villages}
                />
              </CardWrapper>
            </div>
          ))}
        </LessonsGrid>
      ) : (
        <LessonsList $variant={variant}>
          {filteredLessons.map(lesson => (
            <LessonItem
              key={lesson.id}
              lessonId={lesson.id}
              lessonName={lesson.name}
              status={lessonStatuses[lesson.id]}
              action={listAction}
              onAction={handleListAction}
              isActionLoading={loadingLessonId === lesson.id}
              showIcon={variant !== "offline"}
            />
          ))}
        </LessonsList>
      )}
    </PageContainer>
  );
}
