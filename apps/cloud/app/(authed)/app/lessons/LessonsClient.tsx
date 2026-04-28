"use client";

import { useMemo, useState } from "react";
import supabase from "@/api/supabase/client";
import CreateButton from "@/components/CreateLessonButton";
import LessonCard from "@/components/LessonCard";
import LessonItem from "@/components/LessonItem";
import ConfirmationModal from "@/components/modals/ConfirmationModal/ConfirmationModal";
import CreateLessonModal from "@/components/modals/CreateLessonModal/CreateLessonModal";
import UploadLessonImageModal from "@/components/modals/UploadLessonImageModal/UploadLessonImageModal";
import SearchBar from "@/components/SearchBar";
import SortByDropdown, { SortOptionValue } from "@/components/SortByDropdown";
import { IconSvgs } from "@/lib/icons";
import {
  CardWrapper,
  Description,
  GridToggle,
  Header,
  HeaderText,
  LessonsGrid,
  LessonsList,
  PageContainer,
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
};

export default function LessonsClient({
  initialLessons,
  lessonStatuses,
  title = "Lessons Dashboard",
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
}: LessonsClientProps) {
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
  const [sortBy, setSortBy] = useState<SortOptionValue>("updated_desc");

  const filteredLessons = useMemo(() => {
    const filtered = lessons.filter(lesson =>
      lesson.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

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

      return 0;
    });
  }, [lessons, searchTerm, sortBy]);

  async function handleListAction(lessonId: number) {
    if (!listAction) return;

    if (listAction === "restore") {
      setRestoreConfirmLessonId(lessonId);
      return;
    }

    if (listAction === "remove") {
      setRemoveConfirmLessonId(lessonId);
      return;
    }
  }

  async function handleRestoreConfirm() {
    if (restoreConfirmLessonId === null) return;

    setLoadingLessonId(restoreConfirmLessonId);

    try {
      const { error } = await supabase
        .from("Lessons")
        .update({ is_archived: false })
        .eq("id", restoreConfirmLessonId);

      if (error) throw error;

      setLessons(prev => prev.filter(l => l.id !== restoreConfirmLessonId));
      setRestoreConfirmLessonId(null);
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

    setLoadingLessonId(removeConfirmLessonId);

    try {
      const { error } = await supabase
        .from("DeviceLessons")
        .delete()
        .eq("lesson_id", removeConfirmLessonId)
        .eq("device_id", deviceId);

      if (error) throw error;

      setLessons(prev => prev.filter(l => l.id !== removeConfirmLessonId));
      setRemoveConfirmLessonId(null);
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
            {title}
          </Title>

          {description && <Description>{description}</Description>}
        </HeaderText>

        {showCreateButton && (
          <CreateButton onClick={() => setIsCreateOpen(true)} />
        )}
      </Header>

      {showCreateButton && (
        <CreateLessonModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
        />
      )}

      <UploadLessonImageModal
        isOpen={imageModalLessonId !== null}
        onClose={() => setImageModalLessonId(null)}
        lessonId={imageModalLessonId ?? 0}
      />

      <ConfirmationModal
        isOpen={restoreConfirmLessonId !== null}
        title="Restore Lesson"
        description="This lesson will be restored to the active lessons dashboard. To make it available on the Raspberry Pi, you’ll need to sync it from the Sync Lessons page."
        confirmText="Restore to Active"
        onCancel={() => setRestoreConfirmLessonId(null)}
        onConfirm={handleRestoreConfirm}
        isLoading={
          restoreConfirmLessonId !== null &&
          loadingLessonId === restoreConfirmLessonId
        }
      />

      <ConfirmationModal
        isOpen={removeConfirmLessonId !== null}
        title="Remove Lesson from Sync"
        description="The lesson will still be saved, but you’ll need to send it to the Sync Lessons page to use it on the Raspberry Pi."
        confirmText="Remove Lesson"
        onCancel={() => setRemoveConfirmLessonId(null)}
        onConfirm={handleRemoveConfirm}
        isLoading={
          removeConfirmLessonId !== null &&
          loadingLessonId === removeConfirmLessonId
        }
      />

      {(showSearchBar || showViewToggle || showSortButton) && (
        <SearchBarRow $variant={variant}>
          {showSearchBar && (
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          )}

          {showSortButton && (
            <SortByDropdown value={sortBy} onChange={setSortBy} />
          )}

          {showViewToggle && (
            <ViewToggleButton>
              <GridToggle
                $active={view === "grid"}
                onClick={() => setView("grid")}
              >
                {view === "grid" ? IconSvgs.gridActive : IconSvgs.gridInactive}
                <ToggleText>Card</ToggleText>
              </GridToggle>

              <ToggleDivider />

              <GridToggle
                $active={view === "list"}
                onClick={() => setView("list")}
              >
                {view === "list" ? IconSvgs.listActive : IconSvgs.listInactive}
                <ToggleText>List</ToggleText>
              </GridToggle>
            </ViewToggleButton>
          )}
        </SearchBarRow>
      )}

      {view === "grid" ? (
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
