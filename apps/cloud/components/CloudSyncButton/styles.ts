import styled, { css, keyframes } from "styled-components";
import COLORS from "@/styles/colors";
import { Subtitle1, Subtitle2 } from "@/styles/text";

export const SyncCard = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  border-radius: 16px;
  background: ${COLORS.white};
  box-shadow: 0 8px 24px rgb(0 0 0 / 12%);
`;

export const CardTitle = styled(Subtitle2).attrs({
  $color: COLORS.gray100,
  $fontWeight: 500,
})`
  font-size: 16px;
`;

export const LastSyncedInfo = styled.div`
  display: flex;
  height: 18px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const SyncProgressArea = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 12px;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
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
