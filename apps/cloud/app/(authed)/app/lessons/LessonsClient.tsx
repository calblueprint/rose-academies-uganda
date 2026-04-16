"use client";

import type { Lesson } from "@/types/schema";
import { useMemo, useState } from "react";
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
  EditImageButton,
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

type LessonsClientProps = {
  initialLessons: Lesson[];
  lessonStatuses: Partial<Record<number, "available" | "pending">>;
  title?: string;
  description?: string;
  showCreateButton?: boolean;
  showSearchBar?: boolean;
  showViewToggle?: boolean;
  defaultView?: "grid" | "list";
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
}: LessonsClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<"grid" | "list">(defaultView);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [imageModalLessonId, setImageModalLessonId] = useState<number | null>(
    null,
  );

  const filteredLessons = useMemo(
    () =>
      initialLessons.filter(lesson =>
        lesson.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [initialLessons, searchTerm],
  );

  return (
    <PageContainer>
      <Header>
        <HeaderText>
          <Title>{title}</Title>
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
          {filteredLessons.length > 0 ? (
            filteredLessons.map(lesson => (
              <div key={lesson.id}>
                <CardWrapper>
                  <LessonCard
                    lessonId={lesson.id}
                    lessonName={lesson.name}
                    lessonImage={lesson.image_path}
                    status={lessonStatuses[lesson.id]}
                  />
                  <EditImageButton
                    type="button"
                    aria-label="Edit lesson cover image"
                    onClick={e => {
                      e.stopPropagation();
                      setImageModalLessonId(lesson.id);
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 20H21M3 20H4.675C5.16 20 5.40 19.97 5.63 19.92C5.85 19.86 6.06 19.77 6.25 19.65C6.46 19.51 6.64 19.33 7.01 18.96L19.5 6.5C20.33 5.67 20.33 4.33 19.5 3.5C18.67 2.67 17.33 2.67 16.5 3.5L4 16C3.63 16.37 3.45 16.55 3.31 16.76C3.18 16.95 3.09 17.16 3.04 17.38C2.98 17.61 2.98 17.85 2.98 18.34L3 20Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </EditImageButton>
                </CardWrapper>
              </div>
            ))
          ) : (
            <div>No lessons found.</div>
          )}
        </LessonsGrid>
      ) : (
        <LessonsList>
          {filteredLessons.length > 0 ? (
            filteredLessons.map(lesson => (
              <LessonItem
                key={lesson.id}
                lessonId={lesson.id}
                lessonName={lesson.name}
                status={lessonStatuses[lesson.id]}
              />
            ))
          ) : (
            <div>No lessons found.</div>
          )}
        </LessonsList>
      )}
    </PageContainer>
  );
}
