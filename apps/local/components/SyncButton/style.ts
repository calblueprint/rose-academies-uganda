import styled, { css, keyframes } from "styled-components";
import COLORS from "@/styles/colors";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const ButtonWrapper = styled.button`
  display: flex;
  font-family: var(--font-primary);

  width: min(450px, 100%);
  min-height: 52px;
  padding: 12px 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-radius: 9px;
  background: ${COLORS.evergreen};
  border: none;
  cursor: pointer;
  color: ${COLORS.white};
  font-size: 16px;
  font-weight: var(--font-weight-action);

  transition: opacity 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const IconWrapper = styled.div<{ $isSpinning?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $isSpinning }) =>
    $isSpinning &&
    css`
      animation: ${spin} 0.8s linear infinite;
    `}
`;
