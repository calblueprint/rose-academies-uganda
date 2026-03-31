"use client";

import React, { useEffect, useRef, useState } from "react";
import { IconSvgs } from "@/lib/icons";
import {
  DropdownMenu,
  DropdownOption,
  FileTypeDropdown as FileTypeDropdownContainer,
  FileTypeDropdownIcon,
  FileTypeLabel,
} from "./style";

export type FileTypeFilter = "all" | "images" | "pdf" | "other";

const OPTIONS: { value: FileTypeFilter; label: string }[] = [
  { value: "all", label: "All Files" },
  { value: "images", label: "Images" },
  { value: "pdf", label: "PDF" },
  { value: "other", label: "Other" },
];

type Props = {
  selectedType: FileTypeFilter;
  onChange: (type: FileTypeFilter) => void;
};

export default function FileTypeDropdown({ selectedType, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedLabel =
    OPTIONS.find(o => o.value === selectedType)?.label ?? "All Files";

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <FileTypeDropdownContainer onClick={() => setIsOpen(prev => !prev)}>
        <FileTypeLabel>{selectedLabel}</FileTypeLabel>
        <FileTypeDropdownIcon>
          {IconSvgs.dropdownChevronSmall}
        </FileTypeDropdownIcon>
      </FileTypeDropdownContainer>

      {isOpen && (
        <DropdownMenu>
          {OPTIONS.map(option => (
            <DropdownOption
              key={option.value}
              type="button"
              $selected={option.value === selectedType}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </DropdownOption>
          ))}
        </DropdownMenu>
      )}
    </div>
  );
}
