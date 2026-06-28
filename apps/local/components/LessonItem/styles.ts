import styled from "styled-components";
import COLORS from "@/styles/colors";

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
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${COLORS.pageWash};
  }
`;

export const LessonLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const LessonRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const LessonName = styled.h2`
  font-family: var(--font-primary);
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.125rem;
  color: ${COLORS.gray100};
`;

export const FilesContainer = styled.div`
  padding: 0.75rem 1.75rem 1.25rem;
  border-top: 1px solid ${COLORS.green20};
  background: ${COLORS.white};
`;

export const FileRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: ${COLORS.pageWash};
  margin-top: 0.5rem;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${COLORS.green10};
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

export const FileIcon = styled.div`
  border-radius: 5px;
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 10px;
  background: ${COLORS.evergreen};
`;

export const FileName = styled.span`
  font-family: var(--font-primary);
  color: ${COLORS.gray100};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EmptyFilesMessage = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: ${COLORS.pageWash};
  color: ${COLORS.gray60};
  font-family: var(--font-primary);
  font-size: 14px;
  line-height: 150%;
`;
