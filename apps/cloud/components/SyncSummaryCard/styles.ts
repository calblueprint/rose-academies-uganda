import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Card = styled.div`
  display: flex;
  width: 100%;
  padding: 1.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.75rem;
  min-width: 0;
  border-radius: 1rem;
  background: ${COLORS.white};
  box-shadow:
    0 22px 6px 0 rgba(170, 171, 181, 0.01),
    0 14px 6px 0 rgba(170, 171, 181, 0.05),
    0 8px 5px 0 rgba(170, 171, 181, 0.18),
    0 4px 4px 0 rgba(170, 171, 181, 0.31),
    0 1px 2px 0 rgba(170, 171, 181, 0.36);
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

export const Title = styled.div`
  color: ${COLORS.black};
  font-family: "Google Sans", sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
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

export const Label = styled.div`
  color: ${COLORS.gray60};
  font-family: "Google Sans", sans-serif;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Value = styled.div`
  color: ${COLORS.gray60};
  font-family: Mulish, sans-serif;
  font-size: 0.8955rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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

export const LastSyncedValue = styled.div`
  color: ${COLORS.black};
  font-family: "Google Sans", sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
