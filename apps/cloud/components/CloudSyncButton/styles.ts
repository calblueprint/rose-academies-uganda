import styled, { css, keyframes } from "styled-components";
import COLORS from "@/styles/colors";
import { Subtitle1, Subtitle2 } from "@/styles/text";

type SyncButtonVariant = "default" | "setup";

export const SyncCard = styled.div<{ $variant?: SyncButtonVariant }>`
  display: flex;
  width: 100%;
  min-height: ${({ $variant }) =>
    $variant === "setup" ? "12rem" : "11.375rem"};
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ $variant }) => ($variant === "setup" ? "1.25rem" : "1.5rem")};
  padding: 1.5rem;
  border-radius: 1rem;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.surfaceBorder};
  box-shadow: ${COLORS.surfaceShadowSoft};
  box-sizing: border-box;
`;

export const CardHeader = styled.div<{ $variant?: SyncButtonVariant }>`
  display: flex;
  width: 100%;
  align-items: ${({ $variant }) =>
    $variant === "setup" ? "stretch" : "center"};
  justify-content: ${({ $variant }) =>
    $variant === "setup" ? "flex-start" : "space-between"};
  flex-direction: ${({ $variant }) =>
    $variant === "setup" ? "column" : "row"};
  gap: ${({ $variant }) => ($variant === "setup" ? "0.85rem" : "1rem")};

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

export const SyncCardFooter = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 1rem;
  width: 100%;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const HubStatusRow = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  column-gap: 0.45rem;
  row-gap: 0.08rem;
  justify-self: end;
  min-width: 0;
  max-width: 14rem;

  @media (max-width: 560px) {
    justify-self: start;
    min-width: 0;
  }
`;

export const HubStatusDot = styled.span<{ $linked: boolean }>`
  width: 0.5rem;
  height: 0.5rem;
  flex: 0 0 auto;
  margin-top: 0.35rem;
  border-radius: 999px;
  background: ${({ $linked }) =>
    $linked ? COLORS.activeGreen : COLORS.orange100};
  box-shadow: 0 0 0 3px
    ${({ $linked }) => ($linked ? COLORS.green10 : COLORS.orange20)};
`;

export const HubStatusText = styled.span`
  color: ${COLORS.gray100};
  font-family: var(--font-primary);
  font-size: 0.86rem;
  line-height: 1.35;
  font-weight: 700;
  overflow-wrap: anywhere;
`;

export const HubStatusDetail = styled.span`
  grid-column: 2;
  color: ${COLORS.gray60};
  font-family: var(--font-primary);
  font-size: 0.8rem;
  line-height: 1.35;
  overflow-wrap: anywhere;
`;

export const LastSyncedInfo = styled.div`
  display: flex;
  min-height: 4.25rem;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 0.35rem;
  align-self: stretch;
`;

export const SyncProgressArea = styled.div`
  display: flex;
  width: 100%;
  min-height: 4.25rem;
  flex-direction: column;
  justify-content: flex-end;
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

export const ButtonWrapper = styled.button<{ $variant?: SyncButtonVariant }>`
  display: flex;
  width: ${({ $variant }) => ($variant === "setup" ? "100%" : "auto")};
  min-width: ${({ $variant }) => ($variant === "setup" ? "0" : "7rem")};
  min-height: ${({ $variant }) =>
    $variant === "setup" ? "3.25rem" : "2.75rem"};
  height: auto;
  padding: ${({ $variant }) =>
    $variant === "setup" ? "0.75rem 1.25rem" : "0 1.25rem"};
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
