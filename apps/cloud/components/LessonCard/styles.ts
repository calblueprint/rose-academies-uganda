import styled from "styled-components";
import COLORS from "@/styles/colors";
import { Body, H5 } from "@/styles/text";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  min-height: 15.625rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  box-shadow: ${COLORS.surfaceShadowSoft};
  overflow: hidden;
  cursor: pointer;
  min-width: 0;
  background: ${COLORS.white};
  box-sizing: border-box;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.15s ease;

  &:hover {
    border-color: rgba(30, 66, 64, 0.16);
    box-shadow: 0 16px 40px rgba(30, 66, 64, 0.13);
    transform: translateY(-1px);
  }
`;

export const ImageFrame = styled.div`
  position: relative;
  width: calc(100% + 2px);
  margin: -1px -1px 0;
  height: calc(15.625rem - 5.5rem);
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 8px 8px 4px 4px;
  background: ${COLORS.white};

  img {
    border-radius: 8px 8px 4px 4px;
  }
`;

export const Titleholder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 5.5rem;
  flex: 1 0 auto;
  padding: 0.85rem 1rem 0.95rem;
  align-items: flex-start;
  gap: 0.6rem;
  background: ${COLORS.white};
  box-sizing: border-box;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
`;

export const Title = styled(H5).attrs({
  $color: COLORS.gray100,
  $fontWeight: 700,
})`
  margin: 0;
  min-width: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.24;
`;

export const TagRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  flex-wrap: wrap;
  width: 100%;
`;

export const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-top: 0.15rem;
`;

export const ActionButton = styled.button<{
  $variant: "remove" | "restore";
  $presentation?: "button" | "icon";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: ${({ $presentation }) => ($presentation === "icon" ? "2rem" : "auto")};
  min-height: ${({ $presentation }) =>
    $presentation === "icon" ? "2rem" : "1.9rem"};
  padding: ${({ $presentation }) =>
    $presentation === "icon" ? "0" : "0.25rem 0.58rem"};
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: ${({ $presentation }) =>
    $presentation === "icon" ? "999px" : "8px"};
  background: ${({ $presentation }) =>
    $presentation === "icon" ? COLORS.gray10 : COLORS.white};
  color: ${COLORS.gray80};
  font-family: var(--font-primary);
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;

  svg {
    width: 0.75rem;
    height: 0.75rem;
    stroke: currentColor;
  }

  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
    border-color: ${({ $variant }) =>
      $variant === "remove" ? COLORS.rose11 : COLORS.evergreen};
    background: ${({ $variant }) =>
      $variant === "remove" ? "#fff4f8" : COLORS.gray10};
    color: ${({ $variant }) =>
      $variant === "remove" ? "#b84f73" : COLORS.evergreen};
    outline: none;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ActionLabel = styled(Body).attrs({
  $fontWeight: 500,
})`
  color: inherit;
  font-size: 0.78rem;
  line-height: 1;
`;
