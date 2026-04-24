import styled from "styled-components";
import COLORS from "@/styles/colors";
import { Subtitle2 } from "@/styles/text";

export const EditButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: ${COLORS.evergreen};
  color: ${COLORS.white};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background-color 0.15s ease,
    opacity 0.15s ease;

  &:hover {
    background-color: #14312d;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    flex-shrink: 0;
    stroke: ${COLORS.white};
  }
`;

export const EditButtonText = styled(Subtitle2).attrs({
  $fontWeight: 500,
  $color: COLORS.white,
})``;
