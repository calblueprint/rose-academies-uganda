import styled from "styled-components";
import COLORS from "@/styles/colors";
import { Subtitle2 } from "@/styles/text";

export const EditButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: 2rem;
  padding: 0 0.7rem;
  background-color: transparent;
  color: ${COLORS.gray60};
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background-color 0.15s ease,
    opacity 0.15s ease;

  &:hover {
    background-color: ${COLORS.white};
    border-color: ${COLORS.surfaceBorder};
    color: ${COLORS.evergreen};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    flex-shrink: 0;
    width: 0.9rem;
    height: 0.9rem;
    stroke: currentColor;
  }
`;

export const EditButtonText = styled(Subtitle2).attrs({
  $fontWeight: 500,
})`
  color: inherit;
  font-size: 0.84rem;
`;
