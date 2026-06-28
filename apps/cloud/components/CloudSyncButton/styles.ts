import styled, { css, keyframes } from "styled-components";
import COLORS from "@/styles/colors";
import { Subtitle1, Subtitle2 } from "@/styles/text";

export const SyncCard = styled.div`
  display: flex;
  width: 100%;
  min-height: 11.375rem;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 1rem;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.surfaceBorder};
  box-shadow: ${COLORS.surfaceShadowSoft};
  box-sizing: border-box;
`;

export const CardHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 560px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const CardTitle = styled(Subtitle2).attrs({
  $color: COLORS.gray100,
  $fontWeight: 500,
})`
  font-size: 1rem;
`;

export const LastSyncedInfo = styled.div`
  display: flex;
  min-height: 4.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.35rem;
  align-self: stretch;
`;

export const SyncProgressArea = styled.div`
  display: flex;
  width: 100%;
  min-height: 4.25rem;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
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
  overflow-wrap: anywhere;
`;

export const StageValueText = styled(Subtitle1).attrs({
  $color: COLORS.gray100,
  $fontWeight: 500,
})`
  overflow-wrap: anywhere;
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
  width: auto;
  min-width: 7rem;
  height: 2.75rem;
  padding: 0 1.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  border-radius: 8px;
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
