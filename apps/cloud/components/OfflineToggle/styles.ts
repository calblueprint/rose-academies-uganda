import styled from "styled-components";
import COLORS from "@/styles/colors";

export const SyncButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: ${COLORS.white};
  color: var(--gray-80, #4b4a49);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  border: 1px solid var(--gray-40, #d9d9d9);
  border-radius: 12px;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background-color 0.15s ease,
    opacity 0.15s ease;

  &:hover {
    background-color: #f5f5f5;
    border-color: #cfcfcf;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    flex-shrink: 0;
  }
`;
