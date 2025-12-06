import { useState } from "react";
import { IconSvgs } from "@/lib/icons";
import { LessonName, OpenedLesson, UnopenedLesson } from "./styles";

export default function LessonItem({ lessonName }: { lessonName: string }) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      {opened ? (
        <OpenedLesson onClick={() => setOpened(false)}>
          <LessonName>{lessonName}</LessonName>
          {IconSvgs.upArrow}
        </OpenedLesson>
      ) : (
        <UnopenedLesson onClick={() => setOpened(true)}>
          <LessonName>{lessonName}</LessonName>
          {IconSvgs.downArrow}
        </UnopenedLesson>
      )}
    </>
  );
}
