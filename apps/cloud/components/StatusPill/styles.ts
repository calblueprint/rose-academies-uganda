import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Pill = styled.span<{
  $status: "available" | "pending" | "pending_removal" | "dashboard";
}>`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  gap: 0.25rem;
  white-space: nowrap;

  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  border: 1px solid
    ${({ $status }) =>
      $status === "available"
        ? COLORS.mintGreenBorder
        : $status === "pending" || $status === "pending_removal"
          ? COLORS.orange100
          : COLORS.surfaceBorder};

  font-size: 0.72rem;
  line-height: 1.2;
  font-weight: 700;

  background: ${({ $status }) =>
    $status === "available"
      ? COLORS.green10
      : $status === "pending" || $status === "pending_removal"
        ? COLORS.orange20
        : COLORS.gray10};

  color: ${({ $status }) =>
    $status === "available"
      ? COLORS.activeGreen
      : $status === "pending" || $status === "pending_removal"
        ? COLORS.orange100
        : COLORS.gray80};
`;

export const CheckMark = styled.span`
  color: ${COLORS.activeGreen};
  font-size: 0.82em;
  font-weight: 900;
  line-height: 1;
`;

export const Dot = styled.div<{
  $status: "available" | "pending" | "pending_removal" | "dashboard";
}>`
  width: 0.36rem;
  height: 0.36rem;
  border-radius: 50%;

  background: ${({ $status }) =>
    $status === "available"
      ? COLORS.evergreen
      : $status === "pending" || $status === "pending_removal"
        ? COLORS.orange100
        : COLORS.gray60};
`;
