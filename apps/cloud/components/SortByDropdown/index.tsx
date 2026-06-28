"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import {
  SortButton,
  SortButtonLabel,
  SortButtonWrapper,
  SortDropdown,
  SortOption,
} from "./style";

export type SortOptionValue =
  | "updated_desc"
  | "updated_asc"
  | "created_desc"
  | "created_asc"
  | "name_asc"
  | "name_desc";

type SortByDropdownProps = {
  options?: SortOption[];
  value: SortOptionValue;
  onChange: (value: SortOptionValue) => void;
};

export type SortOption = { label: string; value: SortOptionValue };

const SORT_OPTIONS: SortOption[] = [
  { label: "Updated (Newest)", value: "updated_desc" },
  { label: "Updated (Oldest)", value: "updated_asc" },
  { label: "Created (Newest)", value: "created_desc" },
  { label: "Created (Oldest)", value: "created_asc" },
];

const SORT_LABEL_KEYS: Partial<Record<SortOptionValue, string>> = {
  updated_desc: "sort.updatedNewest",
  updated_asc: "sort.updatedOldest",
  created_desc: "sort.createdNewest",
  created_asc: "sort.createdOldest",
  name_asc: "sort.nameAsc",
};

function getSortLabelKey(option: SortOption) {
  if (option.label === "Recently archived") return "sort.recentlyArchived";
  if (option.label === "Oldest archived") return "sort.oldestArchived";

  return SORT_LABEL_KEYS[option.value];
}

export default function SortByDropdown({
  options = SORT_OPTIONS,
  value,
  onChange,
}: SortByDropdownProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const defaultValue = options[0]?.value ?? "updated_desc";
  const isActive = value !== defaultValue;

  return (
    <SortButtonWrapper ref={sortRef}>
      <SortButton
        type="button"
        $active={isActive}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <SortButtonLabel $active={isActive}>
          {t("common.sortBy")}
        </SortButtonLabel>

        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <path
            d="M4.5 6.75L9 11.25L13.5 6.75"
            stroke={isActive ? "#1E4240" : "#808582"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SortButton>

      {isOpen && (
        <SortDropdown>
          {options.map(option => (
            <SortOption
              key={option.value}
              type="button"
              $active={value === option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {getSortLabelKey(option)
                ? t(getSortLabelKey(option)!)
                : option.label}

              {value === option.value && (
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path
                    d="M1 5L5 9L13 1"
                    stroke="#1E4240"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </SortOption>
          ))}
        </SortDropdown>
      )}
    </SortButtonWrapper>
  );
}
