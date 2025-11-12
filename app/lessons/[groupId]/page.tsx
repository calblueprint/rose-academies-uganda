"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchLocalDatabase } from "@/api/sqlite/queries/query";
import LessonCard from "@/components/LessonCard";
import { Lesson } from "@/types/schema";
import { LessonsGrid, PageContainer, Title } from "./style";

export default function LessonsPage() {
  const groupId = useParams().groupId;
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    async function fetchLessons() {
      // Fetch lessons for the given groupId from local database
      const localData = await fetchLocalDatabase();
      const lessons = localData.lessons.filter(
        lesson => lesson.group_id.toString() === groupId,
      );
      setLessons(lessons);
    }
    fetchLessons();
  }, []);

  return (
    <PageContainer>
      <Title>My Lessons</Title>
      <LessonsGrid>
        {lessons.map(lesson => (
          <LessonCard key={lesson.id} title={lesson.name} />
        ))}
      </LessonsGrid>
    </PageContainer>
  );
}
