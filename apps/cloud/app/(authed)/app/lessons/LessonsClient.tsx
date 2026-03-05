"use client";

import type { Lesson } from "@/types/schema";
import { useMemo, useState } from "react";
import CreateButton from "@/components/CreateLessonButton";
import LessonCard from "@/components/LessonCard";
import LessonItem from "@/components/LessonItem";
import CreateLessonModal from "@/components/modals/CreateLessonModal/CreateLessonModal";
import SearchBar from "@/components/SearchBar";
import { IconSvgs } from "@/lib/icons";
import {
  GridToggle,
  Header,
  LessonsGrid,
  LessonsList,
  PageContainer,
  SearchBarRow,
  Title,
  ToggleDivider,
  ToggleText,
  ViewToggleButton,
} from "./style";

export default function LessonsClient({
  initialLessons,
}: {
  initialLessons: Lesson[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

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
        <Title>Lessons Dashboard</Title>
        <CreateButton onClick={() => setIsCreateOpen(true)} />
      </Header>

      <CreateLessonModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <SearchBarRow>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <ViewToggleButton>
          <GridToggle $active={view === "grid"} onClick={() => setView("grid")}>
            {view === "grid" ? IconSvgs.gridActive : IconSvgs.gridInactive}
            <ToggleText>Card</ToggleText>
          </GridToggle>

          <ToggleDivider />

          <GridToggle $active={view === "list"} onClick={() => setView("list")}>
            {view === "list" ? IconSvgs.listActive : IconSvgs.listInactive}
            <ToggleText>List</ToggleText>
          </GridToggle>
        </ViewToggleButton>
      </SearchBarRow>

      {view === "grid" ? (
        <LessonsGrid>
          {filteredLessons.length > 0 ? (
            filteredLessons.map(lesson => (
              <LessonCard
                key={lesson.id}
                lessonId={lesson.id}
                lessonName={lesson.name}
                lessonImage={lesson.image_path}
              />
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
