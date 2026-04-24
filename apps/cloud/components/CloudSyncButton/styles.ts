import styled, { css, keyframes } from "styled-components";
import COLORS from "@/styles/colors";
import { Subtitle1 } from "@/styles/text";

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
  height: 3.25rem;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  gap: 8px;

  border-radius: 0.75rem;
  background: ${COLORS.evergreen};
  border: none;
  cursor: pointer;

  color: ${COLORS.white};

  transition: opacity 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ButtonText = styled(Subtitle1).attrs({
  $color: COLORS.white,
})`
  text-align: center;
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
