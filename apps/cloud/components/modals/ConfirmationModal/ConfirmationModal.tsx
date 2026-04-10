"use client";

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
  if (!isOpen) return null;
  return (
    /*
    TODO #1:
    clicking the dark background should close the modal,
    but only if we are NOT loading.

    right now, this just logs to the console.
    replace it with the correct behavior.
    */
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
          <CancelButton
            /*
            TODO #2:
            clicking cancel should call onCancel.

            right now, it only logs to the console.
            */
            onClick={onCancel}
            disabled={isLoading}
            type="button"
          >
            {cancelText}
          </CancelButton>

          <ConfirmButton
            /*
            TODO #3:
            clicking confirm should call onConfirm.

            right now, it only logs to the console.
            */
            onClick={onConfirm}
            disabled={isLoading}
            type="button"
          >
            {/*
              TODO #4:
              when isLoading is true, this button should show "Loading..."
              otherwise it should show confirmText.

              right now, it always shows confirmText.


              */}
            {isLoading ? "Loading..." : confirmText}
          </ConfirmButton>
        </ActionRow>
      </ModalCard>
    </Overlay>
  );
}
