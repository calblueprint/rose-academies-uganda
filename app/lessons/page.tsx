"use client";

import React from "react";
import Image from "next/image";
import LogoImage from "@/assets/images/rose-academies-logo.png";
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
              src={LogoImage}
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
          <LessonCard lessonName="Agriculture" />
          <LessonCard lessonName="Gardening & Food Security" />
          <LessonCard lessonName="Family Wellbeing" />
          <LessonCard lessonName="Nutrition & Wellness" />
          <LessonCard lessonName="Maternal & Child Health" />
        </LessonsGrid>
      </Content>
    </PageContainer>
  );
}
