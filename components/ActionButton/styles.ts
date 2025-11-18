import styled, { css, keyframes } from "styled-components";

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
}

export const StyledActionButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 20px;
  border-radius: 11.25px;
  border: none;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $textColor }) => $textColor};
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
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
`;
