"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { IconSvgs } from "@/lib/icons";
import {
  ClearButton,
  SearchBarContainer,
  SearchBarField,
  SearchInput,
} from "./style";

type Props = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  view?: "grid" | "list";
  onChangeView?: (v: "grid" | "list") => void;
  placeholder?: string;
};

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  placeholder,
}: Props) {
  const { t } = useLanguage();
  const resolvedPlaceholder = placeholder ?? t("common.searchPlaceholder");

  return (
    <SearchBarField>
      <SearchBarContainer>
        {IconSvgs.search}
        <SearchInput
          type="text"
          placeholder={resolvedPlaceholder}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </SearchBarContainer>
      {searchTerm && (
        <ClearButton
          aria-label={t("common.clearSearch")}
          onClick={() => setSearchTerm("")}
        >
          {IconSvgs.delete}
        </ClearButton>
      )}
    </SearchBarField>
  );
}
