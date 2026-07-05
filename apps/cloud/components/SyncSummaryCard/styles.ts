import styled from "styled-components";
import COLORS from "@/styles/colors";
import { Body, Subtitle2 } from "@/styles/text";

export const Card = styled.div`
  display: flex;
  width: 100%;
  min-height: 11.375rem;
  padding: 1.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.75rem;
  min-width: 0;
  border-radius: 1rem;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.surfaceBorder};
  box-shadow: ${COLORS.surfaceShadowSoft};
  box-sizing: border-box;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.25rem;
  min-width: 0;
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  gap: 0.95rem;
`;

/* Sync Summary */
export const Title = styled(Body).attrs({
  $color: COLORS.gray100,
  $fontWeight: 500,
})`
  font-size: 16px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  gap: 0.75rem;
  min-height: 2.3rem;
  padding: 0 0.65rem;
  border: 1px solid ${COLORS.green20};
  border-radius: 8px;
  background: ${COLORS.pageWash};
`;

export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
`;

export const Dot = styled.div<{ $color: string }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`;

/* Available Offline / Pending Sync */
export const Label = styled(Body).attrs({
  $color: COLORS.gray60,
})`
  min-width: 0;
  line-height: 1.35;
  overflow-wrap: anywhere;
`;

/* Values for those rows (same spec) */
export const Value = styled(Body).attrs({
  $color: COLORS.gray100,
  $fontWeight: 700,
})`
  flex: 0 0 auto;
  min-width: 1.65rem;
  height: 1.65rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.45rem;
  border-radius: 999px;
  background: ${COLORS.white};
  box-shadow: inset 0 0 0 1px ${COLORS.surfaceBorder};
`;

export const SummaryRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: 100%;
`;

export const Divider = styled.div`
  width: 100%;
  height: 0.0625rem;
  background: ${COLORS.green20};
`;

export const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

/* "Last synced" label */
export const LastSyncedLabel = styled(Subtitle2).attrs({
  $color: COLORS.gray60,
  $fontWeight: 500,
})``;

/* Date value */
export const LastSyncedValue = styled(Subtitle2).attrs({
  $fontWeight: 500,
  $color: COLORS.gray100,
})``;
