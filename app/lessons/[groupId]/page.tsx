"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import LessonCard from "@/components/LessonCard";
import SearchBar from "@/components/SearchBar";
import { DataContext } from "@/context/DataContext";
import { Lesson } from "@/types/schema";
import {
  LessonsGrid,
  PageContainer,
  PageMain,
  SearchBarRow,
  Title,
} from "./style";

export default function LessonsPage() {
  const groupId = useParams().groupId;
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const data = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState<string>("");

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
    <PageMain>
      <Header />
      <PageContainer>
        <Title>My Lessons</Title>
        <SearchBarRow>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </SearchBarRow>
        <LessonsGrid>
          {filteredLessons.length > 0 ? (
            filteredLessons.map(lesson => (
              <LessonCard key={lesson.id} lessonName={lesson.name} />
            ))
          ) : (
            <div>No lessons found.</div>
          )}
        </LessonsGrid>
      </PageContainer>
    </PageMain>
  );
}
