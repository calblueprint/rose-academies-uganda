"use client";

import { useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
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
  variant?: "default" | "danger";
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmationModal({
  isOpen,
  title,
  description,
  confirmText,
  cancelText,
  isLoading = false,
  variant = "default",
  onCancel,
  onConfirm,
}: ConfirmationModalProps) {
  const { t } = useLanguage();
  const resolvedCancelText = cancelText ?? t("common.cancel");

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
            {resolvedCancelText}
          </CancelButton>

          <ConfirmButton
            onClick={onConfirm}
            disabled={isLoading}
            type="button"
            $variant={variant}
          >
            {isLoading ? t("common.loading") : confirmText}
          </ConfirmButton>
        </ActionRow>
      </ModalCard>
    </Overlay>
  );
}
