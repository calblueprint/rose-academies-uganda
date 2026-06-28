import styled from "styled-components";
import COLORS from "@/styles/colors";

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  min-width: 0;
`;

export const SearchBarField = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  min-width: 0;
  height: 2.75rem;
  padding: 0.25rem 1rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${COLORS.surfaceBorder};
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
  box-sizing: border-box;

  &:focus-within {
    border-color: ${COLORS.evergreen};
    box-shadow: 0 0 0 3px rgba(30, 66, 64, 0.18);
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  min-width: 0;
  overflow: hidden;
  color: ${COLORS.gray80};
  text-overflow: ellipsis;
  font-size: 0.875rem;
  font-family: var(--font-primary);
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
  border: none;
  outline: none;
`;

export const ClearButton = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  width: 0.75rem;
  height: 0.75rem;
  aspect-ratio: 1 / 1;
  fill: var(--Gray, #808582);
  color: ${COLORS.gray60};
`;
