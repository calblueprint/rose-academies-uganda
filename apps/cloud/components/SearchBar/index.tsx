"use client";

import React from "react";
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
  placeholder = "Search for lesson or file",
}: Props) {
  return (
    <SearchBarField>
      <SearchBarContainer>
        {IconSvgs.search}
        <SearchInput
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </SearchBarContainer>
      {searchTerm && (
        <ClearButton
          aria-label="Clear search"
          onClick={() => setSearchTerm("")}
        >
          {IconSvgs.delete}
        </ClearButton>
      )}
    </SearchBarField>
  );
}
