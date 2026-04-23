"use client";

import { useEffect } from "react";
import {
  ActionRow,
  CancelButton,
  ConfirmButton,
  Description,
  ModalCard,
  Overlay,
  Title,
} from "./styles";

type ConfirmationModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  isLoading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmationModal({
  isOpen,
  title,
  description,
  confirmText,
  cancelText = "Cancel",
  isLoading = false,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.documentElement.style.overflowY = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <Overlay
      onClick={() => {
        if (!isLoading) onCancel();
      }}
    >
      <ModalCard
        onClick={event => {
          event.stopPropagation();
        }}
      >
        <Title>{title}</Title>

        <Description>{description}</Description>

        <ActionRow>
          <CancelButton onClick={onCancel} disabled={isLoading} type="button">
            {cancelText}
          </CancelButton>

          <ConfirmButton onClick={onConfirm} disabled={isLoading} type="button">
            {isLoading ? "Loading..." : confirmText}
          </ConfirmButton>
        </ActionRow>
      </ModalCard>
    </Overlay>
  );
}
