import styled from "styled-components";
import COLORS from "@/styles/colors";
import { Subtitle2 } from "@/styles/text";

export const SyncButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.gray40};
  border-radius: 12px;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background-color 0.15s ease,
    opacity 0.15s ease;

  &:hover {
    background-color: ${COLORS.gray10};
    border-color: ${COLORS.gray40};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    flex-shrink: 0;
    stroke: ${COLORS.gray60};
  }
`;

export const SyncButtonText = styled(Subtitle2).attrs({
  $fontWeight: 500,
  $color: COLORS.gray80,
})``;
