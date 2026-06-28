import styled from "styled-components";
import COLORS from "@/styles/colors";

export const ButtonContainer = styled.button<{ $active: boolean }>`
  display: flex;
  min-height: 2.5rem;
  padding: 0.625rem 1rem;
  align-items: center;
  gap: 0.5rem;

  border-radius: 8px;
  border: 1px solid
    ${({ $active }) => ($active ? COLORS.rose80 : COLORS.gray40)};

  background: ${({ $active }) => ($active ? COLORS.rose10 : COLORS.white)};

  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: ${({ $active }) => ($active ? COLORS.rose10 : COLORS.gray10)};
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
    color: ${({ $active }) => ($active ? COLORS.rose100 : COLORS.gray60)};
  }
`;

export const ButtonText = styled.span<{ $active: boolean }>`
  font-family: var(--font-primary);
  font-size: 0.875rem;
  font-weight: 500;

  white-space: nowrap;

  color: ${({ $active }) => ($active ? COLORS.rose100 : COLORS.gray60)};
`;
