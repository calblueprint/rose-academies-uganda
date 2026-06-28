"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LessonCard from "@/components/LessonCard";
import LessonItem from "@/components/LessonItem";
import SearchBar from "@/components/SearchBar";
import { DataContext } from "@/context/DataContext";
import { useLanguage } from "@/lib/i18n";
import { IconSvgs } from "@/lib/icons";
import { Lesson } from "@/types/schema";
import {
  EmptyState,
  GridToggle,
  LessonsGrid,
  LessonsList,
  PageContainer,
  SearchBarRow,
  Title,
  ToggleDivider,
  ToggleText,
  ViewToggleButton,
} from "./style";

export default function LessonsPage() {
  const groupId = useParams().groupId;
  const router = useRouter();
  const { t } = useLanguage();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const data = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    function fetchLessons() {
      if (data) {
        const authorizedGroupId = data.groups[0]?.id;

        if (authorizedGroupId && authorizedGroupId !== Number(groupId)) {
          router.replace(`/groups/${authorizedGroupId}/lessons`);
          return;
        }

        setLessons(data.lessons);
      }
    }
    fetchLessons();
  }, [data, groupId, router]);

  const filteredLessons = lessons.filter(lesson =>
    lesson.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (!data) {
    return (
      <PageContainer>
        <EmptyState>{t("lessons.loading")}</EmptyState>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Title>{t("lessons.title")}</Title>
      <SearchBarRow>
        {/* Search bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Toggle between grid and list view */}
        <ViewToggleButton>
          <GridToggle $active={view === "grid"} onClick={() => setView("grid")}>
            {view === "grid" ? IconSvgs.gridActive : IconSvgs.gridInactive}
            <ToggleText>{t("lessons.card")}</ToggleText>
          </GridToggle>

          <ToggleDivider />

          <GridToggle $active={view === "list"} onClick={() => setView("list")}>
            {view === "list" ? IconSvgs.listActive : IconSvgs.listInactive}
            <ToggleText>{t("lessons.list")}</ToggleText>
          </GridToggle>
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
                lessonImage={lesson.image_path}
                lessonDescription={lesson.description}
              />
            ))
          ) : (
            <EmptyState>{t("lessons.empty")}</EmptyState>
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
            <EmptyState>{t("lessons.empty")}</EmptyState>
          )}
        </LessonsList>
      )}
    </PageContainer>
  );
}
