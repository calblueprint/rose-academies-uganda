import Link from "next/link";
import styled from "styled-components";
import COLORS from "@/styles/colors";
import { Body, H4 } from "@/styles/text";

export const LessonWrapper = styled.div`
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  overflow: hidden;
  box-shadow: ${COLORS.surfaceShadowSoft};
`;

export const LessonHeader = styled.div`
  display: flex;
  padding: 1rem 1.75rem;
  justify-content: space-between;
  align-items: center;
  transition: background 0.15s ease;

  &:hover {
    background: ${COLORS.gray10};
  }
`;

export const LessonLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
`;

export const LessonRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
`;

export const LessonName = styled(H4).attrs({
  $fontWeight: 400,
})`
  color: ${COLORS.gray100};
  font-size: 22px;
  line-height: 125%;
`;

export const LessonLink = styled(Link)`
  min-width: 0;
  color: inherit;
  text-decoration: none;

  &:hover ${LessonName}, &:focus-visible ${LessonName} {
    color: ${COLORS.evergreen};
    text-decoration: underline;
    text-underline-offset: 0.18em;
  }

  &:focus-visible {
    outline: 3px solid rgba(30, 66, 64, 0.18);
    border-radius: 4px;
  }
`;

export const FilesContainer = styled.div`
  padding: 0.75rem 1.75rem 1.25rem;
  border-top: 1px solid ${COLORS.surfaceBorder};
  background: ${COLORS.white};
`;

export const FileRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: ${COLORS.gray10};
  margin-top: 0.5rem;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${COLORS.whiteSmoke};
  }
`;

export const DownloadLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 999px;
  color: ${COLORS.gray80};
  text-decoration: none;

  &:hover,
  &:focus-visible {
    background: ${COLORS.white};
    color: ${COLORS.evergreen};
    outline: none;
  }
`;

export const PreviewButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  border: 0;
  border-radius: 999px;
  color: ${COLORS.gray80};
  background: transparent;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: ${COLORS.white};
    color: ${COLORS.evergreen};
    outline: none;
  }
`;

export const FileLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

export const FileName = styled(Body).attrs({
  $color: COLORS.gray80,
})`
  line-height: 150%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const NoFilesMessage = styled(Body).attrs({
  $color: COLORS.gray60,
})`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: ${COLORS.gray10};
  line-height: 150%;
`;

export const FileMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
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
  min-height: 2rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: ${({ $presentation }) =>
    $presentation === "icon" ? "999px" : "8px"};
  cursor: pointer;

  font-family: var(--font-primary);
  color: ${COLORS.gray80};
  background: ${({ $presentation }) =>
    $presentation === "icon" ? COLORS.gray10 : COLORS.white};
  padding: ${({ $presentation }) =>
    $presentation === "icon" ? "0" : "0.25rem 0.58rem"};

  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;

  &:hover:not(:disabled),
  &:focus-visible:not(:disabled),
  &:active:not(:disabled) {
    border-color: ${({ $variant }) =>
      $variant === "remove" ? COLORS.rose11 : COLORS.evergreen};
    color: ${({ $variant }) =>
      $variant === "remove" ? "#b84f73" : COLORS.evergreen};
    background: ${({ $variant }) =>
      $variant === "remove" ? "#fff4f8" : COLORS.gray10};
    outline: none;
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    width: 0.75rem;
    height: 0.75rem;
    flex-shrink: 0;
  }
`;

export const ExpandButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: ${COLORS.gray80};
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: ${COLORS.gray10};
    color: ${COLORS.evergreen};
    outline: none;
  }
`;

export const ActionLabel = styled(Body).attrs({
  $fontWeight: 500,
})`
  color: inherit;
  font-size: 0.78rem;
  line-height: 1;
`;
