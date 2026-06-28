"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import {
  ClassroomCheckbox,
  SortButton,
  SortButtonLabel,
  SortButtonWrapper,
  SortDropdown,
  SortOption,
} from "./style";

type ClassroomFilterDropdownProps = {
  classrooms: { id: number; name: string }[];
  selectedClassroomIds: number[];
  onChange: (classroomIds: number[]) => void;
};

export default function ClassroomFilterDropdown({
  classrooms,
  selectedClassroomIds,
  onChange,
}: ClassroomFilterDropdownProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = selectedClassroomIds.length > 0;

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

  function toggleClassroom(classroomId: number) {
    if (selectedClassroomIds.includes(classroomId)) {
      onChange(selectedClassroomIds.filter(item => item !== classroomId));
      return;
    }

    onChange([...selectedClassroomIds, classroomId]);
  }

  return (
    <SortButtonWrapper ref={dropdownRef}>
      <SortButton
        type="button"
        $active={isActive}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <SortButtonLabel $active={isActive}>
          {selectedClassroomIds.length === 0
            ? t("common.classroom")
            : `${selectedClassroomIds.length} ${t("common.selected")}`}
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
              key={classroom.id}
              type="button"
              $active={selectedClassroomIds.includes(classroom.id)}
              onClick={() => toggleClassroom(classroom.id)}
            >
              <span>{classroom.name}</span>

              <ClassroomCheckbox
                type="checkbox"
                checked={selectedClassroomIds.includes(classroom.id)}
                readOnly
              />
            </SortOption>
          ))}
        </SortDropdown>
      )}
    </SortButtonWrapper>
  );
}
