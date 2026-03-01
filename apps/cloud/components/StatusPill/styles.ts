import styled from "styled-components";

export const Pill = styled.span<{ $status: "available" | "pending" }>`
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.25rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 500;
  font-family: var(--font-gilroy);
  gap: 6px;

  background: ${({ $status }) =>
    $status === "available" ? "#E9F4E9" : "#FFF6EA"};
  color: ${({ $status }) =>
    $status === "available"
      ? "var(--evergreen-100, #1E4240)"
      : "var(--Orange-100, #D97708)"};

  border-radius: 17.38px;
`;

export const Dot = styled.div<{ $status: "available" | "pending" }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;

  background: ${({ $status }) =>
    $status === "available" ? "#1E4240" : "#D97706"};
`;
