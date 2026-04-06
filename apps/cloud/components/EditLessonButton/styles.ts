import styled from "styled-components";
import COLORS from "@/styles/colors";

export const EditButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background-color: ${COLORS.evergreen};
  color: ${COLORS.white};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  border: none;
  border-radius: 8px;
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
`;
