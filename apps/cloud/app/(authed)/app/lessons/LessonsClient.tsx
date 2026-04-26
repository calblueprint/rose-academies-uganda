"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  SortButton,
  SortButtonLabel,
  SortButtonWrapper,
  SortDropdown,
  SortOption,
  Title,
  ToggleDivider,
  ToggleText,
  ViewToggleButton,
} from "./style";

type SortKey = "updated_at" | "created_at";

type LessonsClientLesson = {
  id: number;
  name: string;
  image_path: string | null;
  created_at?: string;
  updated_at?: string;
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
  const [lessons, setLessons] = useState(initialLessons);
  const [loadingLessonId, setLoadingLessonId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortKey | null>(null);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sortDropdownOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sortDropdownOpen]);

  const filteredLessons = useMemo(() => {
    const filtered = lessons.filter(lesson =>
      lesson.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (!sortBy) return filtered;

    return [...filtered].sort((a, b) => {
      const aVal = sortBy === "updated_at" ? a.updated_at : a.created_at;
      const bVal = sortBy === "updated_at" ? b.updated_at : b.created_at;
      if (!aVal && !bVal) return 0;
      if (!aVal) return 1;
      if (!bVal) return -1;
      return new Date(bVal).getTime() - new Date(aVal).getTime();
    });
  }, [lessons, searchTerm, sortBy]);

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

      setLessons(prev => prev.filter(lesson => lesson.id !== lessonId));
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

      {(showSearchBar || showViewToggle || showSortButton) && (
        <SearchBarRow $variant={variant}>
          {showSearchBar && (
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          )}

          {showSortButton && (
            <SortButtonWrapper ref={sortRef}>
              <SortButton
                type="button"
                onClick={() => setSortDropdownOpen(prev => !prev)}
              >
                <SortButtonLabel $active={!!sortBy}>
                  {sortBy === "updated_at"
                    ? "Recently Updated"
                    : sortBy === "created_at"
                      ? "Recently Created"
                      : "Sort By"}
                </SortButtonLabel>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  style={{
                    transform: sortDropdownOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <path
                    d="M4.5 6.75L9 11.25L13.5 6.75"
                    stroke={sortBy ? "#1E4240" : "#808582"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </SortButton>

              {sortDropdownOpen && (
                <SortDropdown>
                  {(
                    [
                      { label: "Recently Updated", value: "updated_at" },
                      { label: "Recently Created", value: "created_at" },
                    ] as { label: string; value: SortKey }[]
                  ).map(option => (
                    <SortOption
                      key={option.value}
                      type="button"
                      $active={sortBy === option.value}
                      onClick={() => {
                        setSortBy(prev =>
                          prev === option.value ? null : option.value,
                        );
                        setSortDropdownOpen(false);
                      }}
                    >
                      {option.label}
                      {sortBy === option.value && (
                        <svg
                          width="14"
                          height="10"
                          viewBox="0 0 14 10"
                          fill="none"
                        >
                          <path
                            d="M1 5L5 9L13 1"
                            stroke="#1E4240"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </SortOption>
                  ))}
                </SortDropdown>
              )}
            </SortButtonWrapper>
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
            />
          ))}
        </LessonsList>
      )}
    </PageContainer>
  );
}
