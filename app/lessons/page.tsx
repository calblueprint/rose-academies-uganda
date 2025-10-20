"use client";

import React from "react";
import LessonCard from "@/components/LessonCard";
import { LessonsGrid, PageContainer, Title } from "./style";

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
