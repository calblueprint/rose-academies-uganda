import styled from "styled-components";
import COLORS from "@/styles/colors";

export const SyncButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 148px;
  height: 42px;
  padding: 12px 18px;
  background-color: ${COLORS.evergreen};
  color: ${COLORS.white};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
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
  }
`;
