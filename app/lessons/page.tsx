"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import LessonCard from "@/components/LessonCard";
import SearchBar from "@/components/SearchBar";
import { LessonsGrid, PageContainer, Title } from "./style";

export default function LessonsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <main style={{ padding: "2rem 1.5rem" }}>
      <Header />

      <PageContainer>
        <Title>My Lessons</Title>
        <div style={{ marginTop: "1.25rem", marginBottom: "1.5rem" }}>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            view={view}
            onChangeView={setView}
          />
        </div>
        <LessonsGrid>
          <LessonCard title="Agriculture" />
          <LessonCard title="Gardening & Food Security" />
          <LessonCard title="Family Wellbeing" />
          <LessonCard title="Nutrition & Wellness" />
          <LessonCard title="Maternal & Child Health" />
        </LessonsGrid>
      </PageContainer>
    </main>
  );
}
