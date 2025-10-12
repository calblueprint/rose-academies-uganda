"use client";

import React from "react";
import { Card, ImageArea, Title, Titleholder } from "./styles";

interface LessonCardProps {
  title: string;
}

const LessonCard: React.FC<LessonCardProps> = ({ title }) => {
  return (
    <Card>
      <ImageArea />
      <Titleholder>
        <Title>{title}</Title>
      </Titleholder>
    </Card>
  );
};

export default LessonCard;
