"use client";

import React from "react";
import {
  FileTypeDropdown as FileTypeDropdownContainer,
  FileTypeDropdownIcon,
  FileTypeLabel,
} from "./style";

type Props = {
  label?: string;
};

export default function FileTypeDropdown({ label = "File Type" }: Props) {
  return (
    <FileTypeDropdownContainer>
      <FileTypeLabel>{label}</FileTypeLabel>
      <FileTypeDropdownIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="7"
          viewBox="0 0 11 7"
          fill="none"
        >
          <path
            d="M5.22262 6.45224L10.4452 1.22962L9.21736 0L5.22262 3.99735L1.22875 0L0 1.22875L5.22262 6.45224Z"
            fill="#808582"
          />
        </svg>
      </FileTypeDropdownIcon>
    </FileTypeDropdownContainer>
  );
}
