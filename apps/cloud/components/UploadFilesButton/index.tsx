"use client";

import type { LocalFile } from "@/types/schema";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { IconSvgs } from "@/lib/icons";
import UploadFilesModal from "../modals/UploadFilesModal/UploadFileModal";
import { ButtonContainer, ButtonText, IconWrapper } from "./style";

type UploadFilesButtonProps = {
  lessonId: number;
  onFilesUploadedAction: (files: LocalFile[]) => void;
};
export default function UploadFilesButton({
  lessonId,
  onFilesUploadedAction,
}: UploadFilesButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <ButtonContainer type="button" onClick={() => setIsModalOpen(true)}>
        <IconWrapper>{IconSvgs.upload}</IconWrapper>
        <ButtonText>{t("files.upload")}</ButtonText>
      </ButtonContainer>
      <UploadFilesModal
        lessonId={lessonId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFilesUploaded={onFilesUploadedAction}
      />
    </>
  );
}
