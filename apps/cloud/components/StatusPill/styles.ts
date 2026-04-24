import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Pill = styled.span<{ $status: "available" | "pending" }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;

  padding: 0.25rem 0.6rem;
  border-radius: 17.38px;

  font-size: var(--font-h6);
  line-height: var(--lh-h6);
  font-weight: 400;

  background: ${({ $status }) =>
    $status === "available" ? COLORS.green20 : COLORS.orange20};

  color: ${({ $status }) =>
    $status === "available" ? COLORS.evergreen : COLORS.orange100};
`;

export const Dot = styled.div<{ $status: "available" | "pending" }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;

  background: ${({ $status }) =>
    $status === "available" ? COLORS.evergreen : COLORS.orange100};
`;
