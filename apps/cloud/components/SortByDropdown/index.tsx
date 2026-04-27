"use client";

import { useEffect, useRef, useState } from "react";
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
  | "created_asc";

type SortByDropdownProps = {
  value: SortOptionValue;
  onChange: (value: SortOptionValue) => void;
};

const SORT_OPTIONS: { label: string; value: SortOptionValue }[] = [
  { label: "Updated (Newest)", value: "updated_desc" },
  { label: "Updated (Oldest)", value: "updated_asc" },
  { label: "Created (Newest)", value: "created_desc" },
  { label: "Created (Oldest)", value: "created_asc" },
];

export default function SortByDropdown({
  value,
  onChange,
}: SortByDropdownProps) {
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

  return (
    <SortButtonWrapper ref={sortRef}>
      <SortButton
        type="button"
        $active={value !== "updated_desc"}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <SortButtonLabel>Sort By</SortButtonLabel>

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
            stroke={value !== "updated_desc" ? "#1E4240" : "#808582"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SortButton>

      {isOpen && (
        <SortDropdown>
          {SORT_OPTIONS.map(option => (
            <SortOption
              key={option.value}
              type="button"
              $active={value === option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}

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
