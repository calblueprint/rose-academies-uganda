"use client";

import { useState } from "react";
import CreateButton from "@/components/CreateLessonButton";
import LessonCard from "@/components/LessonCard";
import LessonItem from "@/components/LessonItem";
import SearchBar from "@/components/SearchBar";
import { IconSvgs } from "@/lib/icons";
import { Lesson } from "@/types/schema";
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
  {
    id: 4,
    name: "Safety & Sanitation",
    image_path:
      "https://tyckvrwfblheqxuliscl.supabase.co/storage/v1/object/public/lesson-images/default-figma.png",
    group_id: 2,
  },
  {
    id: 5,
    name: "Sustainable Living",
    image_path:
      "https://tyckvrwfblheqxuliscl.supabase.co/storage/v1/object/public/lesson-images/default-figma.png",
    group_id: 2,
  },
  {
    id: 6,
    name: "Nutrition 101",
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
      <Header>
        <Title>Lessons Dashboard</Title>
        <CreateButton />
      </Header>
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
