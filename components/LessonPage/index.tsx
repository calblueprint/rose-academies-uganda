"use client";

import React from "react";
import LessonCard from "../LessonCard";
import { LessonsGrid, PageContainer, Title } from "./styles";

export default function LessonsPage() {
  return (
    <PageContainer>
      <Title>My Lessons</Title>
      <LessonsGrid>
        <LessonCard title="Agriculture" />
        <LessonCard title="Gardening & Food Security" />
        <LessonCard title="Family Wellbeing" />
        <LessonCard title="Nutrition & Wellness" />
        <LessonCard title="Maternal & Child Health" />
      </LessonsGrid>
    </PageContainer>
  );
}
