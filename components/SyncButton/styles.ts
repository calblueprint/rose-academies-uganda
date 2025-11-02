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

export const StyledSyncButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 2rem;
  border: none;
  background-color: ${COLORS.evergreen};
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

interface SyncIconProps {
  $isSyncing: boolean;
}

export const SyncIcon = styled.div<SyncIconProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  color: ${COLORS.white};

  ${({ $isSyncing }) =>
    $isSyncing &&
    css`
      animation: ${rotate} 1s linear infinite;
    `}
`;

export const SyncText = styled.span`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2;
`;
