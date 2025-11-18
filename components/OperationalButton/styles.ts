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
  gap: 10px;
  padding: 13px 20px;
  border-radius: 11.25px;
  border: none;
  background-color: ${({ $isOperational }) =>
    $isOperational === null
      ? COLORS.lightGrey
      : $isOperational
        ? COLORS.lightGreen
        : COLORS.rose10};
  color: ${({ $isOperational }) =>
    $isOperational === false ? COLORS.rose80 : COLORS.activeGreen};
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
  width: ${({ $isOperational }) =>
    $isOperational === false ? "1.5rem" : "1.25rem"};
  height: ${({ $isOperational }) =>
    $isOperational === false ? "1.5rem" : "1.25rem"};
  color: ${({ $isOperational }) =>
    $isOperational === false ? COLORS.rose80 : COLORS.activeGreen};

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

export const StatusText = styled.span<StatusButtonProps>`
  color: ${({ $isOperational }) =>
    $isOperational === false ? COLORS.rose80 : COLORS.activeGreen};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
