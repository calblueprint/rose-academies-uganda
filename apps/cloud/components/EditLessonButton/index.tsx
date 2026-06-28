"use client";

import { useState } from "react";
import EditLessonModal from "@/components/modals/EditLessonModal/EditLessonModal";
import { useLanguage } from "@/lib/i18n";
import { IconSvgs } from "@/lib/icons";
import { EditButton, EditButtonText } from "./styles";

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
  const { t } = useLanguage();

  return (
    <>
      <EditButton onClick={() => setIsOpen(true)}>
        {IconSvgs.pencil}
        <EditButtonText>{t("lessons.edit")}</EditButtonText>
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
