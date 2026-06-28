import styled from "styled-components";
import COLORS from "@/styles/colors";
import { Subtitle2 } from "@/styles/text";

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  flex: 1;
  min-width: 0;
`;

export const SearchBarField = styled.div`
  display: flex;
  width: 100%;
  min-width: 0;
  height: 44px;
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
    box-shadow: 0 0 0 2px ${COLORS.green20};
  }
`;

export const SearchInput = styled(Subtitle2).attrs({
  as: "input",
  $color: COLORS.gray60,
  $fontWeight: 500,
})`
  width: 100%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  border: none;
  outline: none;
  background: transparent;
`;

export const ClearButton = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  aspect-ratio: 1 / 1;
  fill: ${COLORS.gray60};
  cursor: pointer;
`;
