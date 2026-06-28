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

interface ActionButtonProps {
  $backgroundColor: string;
  $textColor: string;
  $iconColor?: string;
  $borderColor?: string;
}

export const StyledActionButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 2.75rem;
  padding: 0 1rem;
  border-radius: 999px;
  border: none;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $textColor }) => $textColor};
  border: ${({ $borderColor }) =>
    $borderColor ? `1px solid ${$borderColor}` : "1px solid transparent"};
  box-shadow: ${({ $backgroundColor }) =>
    $backgroundColor === COLORS.evergreen
      ? "none"
      : "0 8px 24px rgba(30, 66, 64, 0.06)"};
  font-family: var(--font-primary);
  font-size: 1rem;
  font-weight: var(--font-weight-action);
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

interface ActionIconProps {
  $iconColor: string;
  $iconSize: string;
  $isLoading?: boolean;
  $animationDuration?: string;
}

export const ActionIcon = styled.div<ActionIconProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $iconSize }) => $iconSize};
  height: ${({ $iconSize }) => $iconSize};
  color: ${({ $iconColor }) => $iconColor};

  ${({ $isLoading, $animationDuration }) =>
    $isLoading &&
    css`
      animation: ${rotate} ${$animationDuration || "1.5s"} linear infinite;
    `}
`;

export const ActionTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ActionText = styled.span`
  font-size: 0.9375rem;
  font-weight: var(--font-weight-section-title);
  line-height: 1;
`;
