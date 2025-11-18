"use client";

import React from "react";
import { DeleteIcon, SearchBarIcon } from "@/assets/icons/SearchBarIcon/icon";
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
};

export default function SearchBar({ searchTerm, setSearchTerm }: Props) {
  return (
    <SearchBarField>
      <SearchBarContainer>
        <SearchBarIcon />
        <SearchInput
          type="text"
          placeholder="Search for lesson"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        {searchTerm && (
          <ClearButton
            aria-label="Clear search"
            onClick={() => setSearchTerm("")}
          >
            <DeleteIcon />
          </ClearButton>
        )}
      </SearchBarContainer>
    </SearchBarField>
  );
}
