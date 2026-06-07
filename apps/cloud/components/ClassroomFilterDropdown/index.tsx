"use client";

import { useEffect, useRef, useState } from "react";
import {
  ClassroomCheckbox,
  SortButton,
  SortButtonLabel,
  SortButtonWrapper,
  SortDropdown,
  SortOption,
} from "./style";

type ClassroomFilterDropdownProps = {
  classrooms: string[];
  selectedClassrooms: string[];
  onChange: (classrooms: string[]) => void;
};

export default function ClassroomFilterDropdown({
  classrooms,
  selectedClassrooms,
  onChange,
}: ClassroomFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = selectedClassrooms.length > 0;

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  function toggleClassroom(classroom: string) {
    if (selectedClassrooms.includes(classroom)) {
      onChange(selectedClassrooms.filter(item => item !== classroom));
      return;
    }

    onChange([...selectedClassrooms, classroom]);
  }

  return (
    <SortButtonWrapper ref={dropdownRef}>
      <SortButton
        type="button"
        $active={isActive}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <SortButtonLabel $active={isActive}>
          {selectedClassrooms.length === 0
            ? "Classroom"
            : `${selectedClassrooms.length} selected`}
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
          {classrooms.map(classroom => (
            <SortOption
              key={classroom}
              type="button"
              $active={selectedClassrooms.includes(classroom)}
              onClick={() => toggleClassroom(classroom)}
            >
              <span>{classroom}</span>

              <ClassroomCheckbox
                type="checkbox"
                checked={selectedClassrooms.includes(classroom)}
                readOnly
              />
            </SortOption>
          ))}
        </SortDropdown>
      )}
    </SortButtonWrapper>
  );
}
