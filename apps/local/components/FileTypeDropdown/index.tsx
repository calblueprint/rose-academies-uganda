"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { IconSvgs } from "@/lib/icons";
import {
  DropdownMenu,
  DropdownOption,
  FileTypeDropdown as FileTypeDropdownContainer,
  FileTypeLabel,
} from "./style";

export type FileTypeFilter = "all" | "images" | "pdf" | "other";

type Props = {
  selectedType: FileTypeFilter;
  onChange: (type: FileTypeFilter) => void;
};

export default function FileTypeDropdown({ selectedType, onChange }: Props) {
  const { t } = useLanguage();
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

  const options: { value: FileTypeFilter; label: string }[] = [
    { value: "all", label: t("files.type") },
    { value: "images", label: t("files.images") },
    { value: "pdf", label: t("files.pdf") },
    { value: "other", label: t("files.other") },
  ];

  const selectedLabel =
    options.find(o => o.value === selectedType)?.label ?? t("files.type");

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <FileTypeDropdownContainer onClick={() => setIsOpen(prev => !prev)}>
        <FileTypeLabel>{selectedLabel}</FileTypeLabel>
        {IconSvgs.dropdownChevronSmall}
      </FileTypeDropdownContainer>

      {isOpen && (
        <DropdownMenu>
          {options.map(option => (
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
