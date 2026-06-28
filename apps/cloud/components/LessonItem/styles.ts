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

export const ActionButton = styled.button<{ $variant: "remove" | "restore" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  border: none;
  min-height: 2.25rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  cursor: pointer;

  font: inherit;
  color: ${COLORS.gray80};

  background: ${({ $variant }) =>
    $variant === "remove" ? COLORS.white : COLORS.gray10};

  padding: ${({ $variant }) =>
    $variant === "remove" ? "0.27469rem 0.824rem" : "0.5rem 0.75rem"};
  &:hover:not(:disabled),
  &:focus-visible:not(:disabled),
  &:active:not(:disabled) {
    border-color: ${({ $variant }) =>
      $variant === "remove" ? COLORS.rose80 : COLORS.evergreen};
    color: ${({ $variant }) =>
      $variant === "remove" ? COLORS.rose100 : COLORS.evergreen};
    background: ${({ $variant }) =>
      $variant === "remove" ? COLORS.rose10 : COLORS.white};
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
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
  $color: COLORS.gray80,
})`
  line-height: 1;
`;
