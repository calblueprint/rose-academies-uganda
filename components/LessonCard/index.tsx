"use client";

import React from "react";
import { Card, ImageArea, Title, Titleholder } from "./styles";

type LessonCardProps = {
  title: string;
};

export function LessonCard({ title }: LessonCardProps) {
  return (
    <Card>
      <ImageArea />
      <Titleholder>
        <Title>{title}</Title>
      </Titleholder>
    </Card>
  );
}

export default LessonCard;
