import styled from "styled-components";
import COLORS from "@/styles/colors";

export const ButtonContainer = styled.button<{ $active: boolean }>`
  display: flex;
  padding: 0.75rem 1.125rem;
  align-items: center;
  gap: 0.5rem;

  border-radius: 0.75rem;
  border: 1px solid ${({ $active }) => ($active ? COLORS.rose10 : "#d9d9d9")};

  background: ${({ $active }) => ($active ? COLORS.rose10 : "#ffffff")};

  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: ${({ $active }) => ($active ? COLORS.rose10 : "#fafafa")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const IconWrapper = styled.span<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${({ $active }) => ($active ? COLORS.rose100 : "#808582")};
  }
`;

export const ButtonText = styled.span<{ $active: boolean }>`
  font-family: "Google Sans", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;

  white-space: nowrap;

  color: ${({ $active }) => ($active ? COLORS.rose100 : "#808582")};
`;
