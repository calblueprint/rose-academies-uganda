"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LessonCard from "@/components/LessonCard";
import { DataContext } from "@/context/DataContext";
import { Lesson } from "@/types/schema";
import { LessonsGrid, PageContainer, Title } from "./style";

export default function LessonsPage() {
  const groupId = useParams().groupId;
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const data = useContext(DataContext);

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

  return (
    <PageContainer>
      <Title>My Lessons</Title>
      <LessonsGrid>
        {lessons.map(lesson => (
          <LessonCard key={lesson.id} lessonName={lesson.name} />
        ))}
      </LessonsGrid>
    </PageContainer>
  );
}
