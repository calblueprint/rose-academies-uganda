"use client";

import React from "react";
import { IconSvgs } from "@/lib/icons";
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
        {IconSvgs.dropdownChevronSmall}
      </FileTypeDropdownIcon>
    </FileTypeDropdownContainer>
  );
}
