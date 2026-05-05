import styled, { css, keyframes } from "styled-components";
import COLORS from "@/styles/colors";
import { Subtitle1, Subtitle2 } from "@/styles/text";

export const SyncCard = styled.div`
  display: grid;
  width: 37.375rem;
  height: 11.375rem;
  grid-template-rows: auto 2.75rem 3.25rem;
  gap: 0.5rem;
  padding: 1.5rem;
  border-radius: 1rem;
  background: ${COLORS.white};
  box-shadow:
    0 22px 6px 0 rgba(170, 170, 170, 0),
    0 14px 6px 0 rgba(170, 170, 170, 0.01),
    0 8px 5px 0 rgba(170, 170, 170, 0.05),
    0 4px 4px 0 rgba(170, 170, 170, 0.09),
    0 1px 2px 0 rgba(170, 170, 170, 0.1);
`;

export const CardTitle = styled(Subtitle2).attrs({
  $color: COLORS.gray100,
  $fontWeight: 500,
})`
  font-size: 1rem;
`;

export const LastSyncedInfo = styled.div`
  display: flex;
  height: 2.75rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const SyncProgressArea = styled.div`
  display: flex;
  width: 100%;
  height: 2.75rem;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  border-radius: 999px;
  background: ${COLORS.gray40};
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ percent: number }>`
  height: 100%;
  width: ${props => props.percent}%;
  border-radius: 999px;
  background: ${COLORS.lightLightGreen};
`;

export const StageStatusText = styled(Subtitle2).attrs({
  $color: COLORS.gray60,
  $fontWeight: 500,
})`
  white-space: nowrap;
`;

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
  width: 100%;
  height: 3.25rem;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

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

export const ButtonText = styled(Subtitle1).attrs({
  $color: COLORS.white,
})`
  text-align: center;
`;
