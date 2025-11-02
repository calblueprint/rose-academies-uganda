import styled, { css, keyframes } from "styled-components";
import COLORS from "@/styles/colors";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

interface StatusButtonProps {
  $isOperational: boolean | null;
}

export const StatusButton = styled.button<StatusButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 1.25rem;
  border-radius: 2rem;
  border: none;
  background-color: ${({ $isOperational }) =>
    $isOperational === null
      ? COLORS.lightGrey
      : $isOperational
        ? COLORS.successGreen
        : COLORS.errorRed};
  color: ${COLORS.white};
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const StatusIcon = styled.div<StatusButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  color: ${COLORS.white};

  ${StatusButton}:disabled & {
    ${css`
      animation: ${rotate} 1.5s linear infinite;
    `}
  }
`;

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StatusText = styled.span`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2;
`;
