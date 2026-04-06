"use client";

import { useState } from "react";
import { IconSvgs } from "@/lib/icons";
import UploadFilesModal from "../modals/UploadFilesModal/UploadFileModal";
import { ButtonContainer, ButtonText, IconWrapper } from "./style";

type UploadFilesButtonProps = {
  lessonId: number;
};
export default function UploadFilesButton({
  lessonId,
}: UploadFilesButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <ButtonContainer type="button" onClick={() => setIsModalOpen(true)}>
        <IconWrapper>{IconSvgs.upload}</IconWrapper>
        <ButtonText>Upload File</ButtonText>
      </ButtonContainer>
      <UploadFilesModal
        lessonId={lessonId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
