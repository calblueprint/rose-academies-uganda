"use client";

import { useMemo, useState } from "react";
import supabase from "@/api/supabase/client";
import CreateButton from "@/components/CreateLessonButton";
import LessonCard from "@/components/LessonCard";
import LessonItem from "@/components/LessonItem";
import CreateLessonModal from "@/components/modals/CreateLessonModal/CreateLessonModal";
import UploadLessonImageModal from "@/components/modals/UploadLessonImageModal/UploadLessonImageModal";
import SearchBar from "@/components/SearchBar";
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
};

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
}: LessonsClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<"grid" | "list">(defaultView);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [imageModalLessonId, setImageModalLessonId] = useState<number | null>(
    null,
  );
  const [lessons, setLessons] = useState(initialLessons);
  const [loadingLessonId, setLoadingLessonId] = useState<number | null>(null);

  const filteredLessons = useMemo(
    () =>
      lessons.filter(lesson =>
        lesson.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [lessons, searchTerm],
  );

  async function handleListAction(lessonId: number) {
    if (!listAction) return;

    setLoadingLessonId(lessonId);

    try {
      if (listAction === "remove") {
        if (!deviceId) {
          throw new Error("Missing deviceId");
        }

        const { error } = await supabase
          .from("DeviceLessons")
          .delete()
          .eq("lesson_id", lessonId)
          .eq("device_id", deviceId);

        if (error) throw error;
      }

      if (listAction === "restore") {
        const { error } = await supabase
          .from("Lessons")
          .update({ is_archived: false })
          .eq("id", lessonId);

        if (error) throw error;
      }

      setLessons(prev => prev.filter(l => l.id !== lessonId));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLessonId(null);
    }
  }

  return (
    <PageContainer $layout={layout}>
      <Header>
        <HeaderText>
          <Title $layout={layout}>{title}</Title>
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

      {(showSearchBar || showViewToggle) && (
        <SearchBarRow>
          {showSearchBar && (
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
        <LessonsGrid>
          {filteredLessons.map(lesson => (
            <div key={lesson.id}>
              <CardWrapper>
                <LessonCard
                  lessonId={lesson.id}
                  lessonName={lesson.name}
                  lessonImage={lesson.image_path}
                  status={lessonStatuses[lesson.id]}
                />
              </CardWrapper>
            </div>
          ))}
        </LessonsGrid>
      ) : (
        <LessonsList>
          {filteredLessons.map(lesson => (
            <LessonItem
              key={lesson.id}
              lessonId={lesson.id}
              lessonName={lesson.name}
              status={lessonStatuses[lesson.id]}
              action={listAction}
              onAction={handleListAction}
              isActionLoading={loadingLessonId === lesson.id}
            />
          ))}
        </LessonsList>
      )}
    </PageContainer>
  );
}
