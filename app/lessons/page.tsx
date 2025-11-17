"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import LessonCard from "@/components/LessonCard";
import SearchBar from "@/components/SearchBar";
import {
  LessonsGrid,
  PageContainer,
  PageMain,
  SearchBarRow,
  Title,
} from "./style";

export default function LessonsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <PageMain>
      <Header />
      <PageContainer>
        <Title>My Lessons</Title>
        <SearchBarRow>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </SearchBarRow>
        <LessonsGrid>
          <LessonCard title="Agriculture" />
          <LessonCard title="Gardening & Food Security" />
          <LessonCard title="Family Wellbeing" />
          <LessonCard title="Nutrition & Wellness" />
          <LessonCard title="Maternal & Child Health" />
        </LessonsGrid>
      </PageContainer>
    </PageMain>
  );
}
