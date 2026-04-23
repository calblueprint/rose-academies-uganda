import styled from "styled-components";
import COLORS from "@/styles/colors";
import { Body, Subtitle2 } from "@/styles/text";

export const Card = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.75rem;
  min-width: 0;
  border-radius: 1rem;
  background: ${COLORS.white};
  box-shadow:
    0 22px 6px 0 rgba(170, 170, 170, 0),
    0 14px 6px 0 rgba(170, 170, 170, 0.01),
    0 8px 5px 0 rgba(170, 170, 170, 0.05),
    0 4px 4px 0 rgba(170, 170, 170, 0.09),
    0 1px 2px 0 rgba(170, 170, 170, 0.1);
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
  gap: 1rem;
`;

/* Sync Summary */
export const Title = styled(Body)`
  color: ${COLORS.gray100};
  font-size: 16px; /* custom override */
  font-weight: 500;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Dot = styled.div<{ $color: string }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`;

/* Available Offline / Pending Sync */
export const Label = styled(Body)`
  color: ${COLORS.gray60};
`;

/* Values for those rows (same spec) */
export const Value = styled(Body)`
  color: ${COLORS.gray60};
`;

export const Divider = styled.div`
  width: 100%;
  height: 0.0625rem;
  background: ${COLORS.gray40};
`;

export const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

/* "Last synced" label */
export const LastSyncedLabel = styled(Subtitle2)`
  color: ${COLORS.gray60};
  font-weight: 500;
`;

/* Date value */
export const LastSyncedValue = styled(Subtitle2)`
  color: ${COLORS.gray100};
  font-weight: 500;
`;
