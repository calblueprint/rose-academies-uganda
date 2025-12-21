"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LessonCard from "@/components/LessonCard";
import LessonItem from "@/components/LessonItem";
import SearchBar from "@/components/SearchBar";
import { DataContext } from "@/context/DataContext";
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

export default function LessonsPage() {
  const groupId = useParams().groupId;
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const data = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    function fetchLessons() {
      if (data) {
        const filteredLessons = data.lessons.filter(
          lesson => lesson.group_id === Number(groupId),
        );
        setLessons(filteredLessons);
      }
    }
    fetchLessons();
  }, [data, groupId]);

  const filteredLessons = lessons.filter(lesson =>
    lesson.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <Title>My Lessons</Title>
      <SearchBarRow>
        {/* Search bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Toggle between grid and list view */}
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

      {/* Render lessons based on selected view */}
      {view === "grid" ? (
        <LessonsGrid>
          {filteredLessons.length > 0 ? (
            filteredLessons.map(lesson => (
              <LessonCard
                key={lesson.id}
                lessonId={lesson.id}
                lessonName={lesson.name}
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
              <LessonItem key={lesson.id} lessonName={lesson.name} />
            ))
          ) : (
            <div>No lessons found.</div>
          )}
        </LessonsList>
      )}
    </PageContainer>
  );
}
