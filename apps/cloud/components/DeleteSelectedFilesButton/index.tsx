"use client";

import { ButtonContainer, ButtonText, IconWrapper } from "./styles";

type DeleteSelectedFilesButtonProps = {
  selectedCount: number;
  onClick: () => void;
  disabled: boolean;
};

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5.25 6V13.5C5.25 14.3284 5.92157 15 6.75 15H11.25C12.0784 15 12.75 14.3284 12.75 13.5V6M4.5 4.5H13.5M7.125 4.5V3.75C7.125 3.33579 7.46079 3 7.875 3H10.125C10.5392 3 10.875 3.33579 10.875 3.75V4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DeleteSelectedFilesButton({
  selectedCount,
  onClick,
  disabled,
}: DeleteSelectedFilesButtonProps) {
  // We hide this destructive action until files are selected so the toolbar
  // only shows bulk deletion when it can actually run.
  if (selectedCount === 0) {
    return null;
  }
  const isActive = selectedCount > 0;

  const label =
    selectedCount === 1
      ? `Delete ${selectedCount} file`
      : `Delete ${selectedCount} files`;

  return (
    <ButtonContainer
      type="button"
      onClick={onClick}
      disabled={disabled}
      $active={isActive}
    >
      <IconWrapper $active={isActive}>
        <TrashIcon />
      </IconWrapper>

      <ButtonText $active={isActive}>{label}</ButtonText>
    </ButtonContainer>
  );
}
