"use client";

import { useState } from "react";
import LessonCard from "@/components/LessonCard";
import LessonItem from "@/components/LessonItem";
import SearchBar from "@/components/SearchBar";
import { IconSvgs } from "@/lib/icons";
import { Lesson } from "@/types/schema";
import {
  GridToggle,
  LessonsGrid,
  LessonsList,
  ListToggle,
  PageContainer,
  SearchBarRow,
  Title,
  ToggleDivider,
  ViewToggleButton,
} from "./style";

const DUMMY_LESSONS: Lesson[] = [
  // change image_path to change the image shown for each lesson
  {
    id: 1,
    name: "Healthcare Basics",
    image_path:
      "https://tyckvrwfblheqxuliscl.supabase.co/storage/v1/object/public/lesson-images/health-figma.png",
    group_id: 1,
  },
  {
    id: 2,
    name: "Postnatal Care",
    image_path:
      "https://tyckvrwfblheqxuliscl.supabase.co/storage/v1/object/public/lesson-images/default2-figma.png",
    group_id: 1,
  },
  {
    id: 3,
    name: "Vocational Training",
    image_path:
      "https://tyckvrwfblheqxuliscl.supabase.co/storage/v1/object/public/lesson-images/default-figma.png",
    group_id: 2,
  },
];

export default function LessonsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const lessons = DUMMY_LESSONS;

  const filteredLessons = lessons.filter(lesson =>
    lesson.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <PageContainer>
      <Title>My Lessons</Title>

      <SearchBarRow>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <ViewToggleButton>
          <GridToggle onClick={() => setView("grid")}>
            {view === "grid" ? IconSvgs.gridActive : IconSvgs.gridInactive}
          </GridToggle>

          <ToggleDivider />

          <ListToggle onClick={() => setView("list")}>
            {view === "list" ? IconSvgs.listActive : IconSvgs.listInactive}
          </ListToggle>
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
