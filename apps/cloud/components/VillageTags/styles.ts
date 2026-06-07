import styled from "styled-components";
import COLORS from "@/styles/colors";

type VillageTagVariant = "card" | "lessonPage";

export const VillageTag = styled.span<{
  $variant: VillageTagVariant;
}>`
  display: inline-flex;
  width: fit-content;
  max-width: ${({ $variant }) => ($variant === "card" ? "7.3125rem" : "none")};
  min-height: ${({ $variant }) =>
    $variant === "card" ? "1.4375rem" : "1.625rem"};
  padding: 0.25rem 0.75rem;
  box-sizing: border-box;

  justify-content: center;
  align-items: center;

  flex-shrink: 0;

  border-radius: ${({ $variant }) =>
    $variant === "card" ? "0.25rem" : "1.25rem"};
  background-color: ${({ $variant }) =>
    $variant === "card" ? COLORS.stem : COLORS.green20};

  color: ${({ $variant }) =>
    $variant === "card" ? COLORS.gray100 : COLORS.black};

  font-size: ${({ $variant }) =>
    $variant === "card" ? "var(--font-subtitle-3)" : "var(--font-body)"};
  line-height: ${({ $variant }) =>
    $variant === "card" ? "var(--lh-subtitle-3)" : "var(--lh-body)"};
  font-weight: 400;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TagGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: nowrap;
  overflow: hidden;
`;
