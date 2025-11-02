"use client";

import React from "react";
import Image from "next/image";
import LessonCard from "@/components/LessonCard";
import OperationalButton from "@/components/OperationalButton";
import SyncButton from "@/components/SyncButton";
import {
  Content,
  Header,
  HeaderLeft,
  HeaderRight,
  LessonsGrid,
  Logo,
  PageContainer,
  Title,
} from "./style";

export default function LessonsPage() {
  return (
    <PageContainer>
      <Header>
        <HeaderLeft>
          <Logo>
            <Image
              src="/Logo.png"
              alt="Rose Academies Uganda"
              width={40}
              height={40}
            />
            <span>Rose Academies-Uganda</span>
          </Logo>
        </HeaderLeft>
        <HeaderRight>
          <OperationalButton />
          <SyncButton />
        </HeaderRight>
      </Header>
      <Content>
        <Title>My Lessons</Title>
        <LessonsGrid>
          <LessonCard title="Agriculture" />
          <LessonCard title="Gardening & Food Security" />
          <LessonCard title="Family Wellbeing" />
          <LessonCard title="Nutrition & Wellness" />
          <LessonCard title="Maternal & Child Health" />
        </LessonsGrid>
      </Content>
    </PageContainer>
  );
}
