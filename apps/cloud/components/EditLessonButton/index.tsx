"use client";

import { useState } from "react";
import EditLessonModal from "@/components/modals/EditLessonModal/EditLessonModal";
import { IconSvgs } from "@/lib/icons";
import { EditButton } from "./styles";

function EditLessonButton({
  lesson,
}: {
  lesson: {
    id: number;
    name: string;
    description: string | null;
    group_id: number | null;
  };
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <EditButton onClick={() => setIsOpen(true)}>
        {IconSvgs.pencil}Edit Details
      </EditButton>

      <EditLessonModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        lesson={lesson}
      />
    </>
  );
}

export default EditLessonButton;
