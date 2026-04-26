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
  padding: 4.367px 20.96px;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
  border-top: 0.437px solid ${COLORS.gray40};
  border-right: 0.873px solid ${COLORS.gray40};
  border-bottom: 1.31px solid ${COLORS.gray40};
  border-left: 0.873px solid ${COLORS.gray40};
  background: ${COLORS.white};
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
