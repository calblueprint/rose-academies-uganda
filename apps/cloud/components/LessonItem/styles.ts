import styled from "styled-components";

export const LessonWrapper = styled.div`
  border-radius: 1rem;
  background: var(--white, #fff);
  overflow: hidden;
  box-shadow:
    0 22px 6px 0 rgba(170, 170, 170, 0),
    0 14px 6px 0 rgba(170, 170, 170, 0.01),
    0 8px 5px 0 rgba(170, 170, 170, 0.05),
    0 4px 4px 0 rgba(170, 170, 170, 0.09),
    0 1px 2px 0 rgba(170, 170, 170, 0.1);
`;

export const LessonHeader = styled.div`
  display: flex;
  padding: 1rem 1.75rem;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
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

export const LessonIcon = styled.div`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.375rem;
  background: #9adbe8;
  flex-shrink: 0;
`;

export const LessonName = styled.h2`
  font-family: var(--font-gilroy);
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.125rem;
`;

export const FilesContainer = styled.div`
  padding: 0.75rem 1.75rem 1.25rem;
  border-top: 1px solid var(--gray, #e5e5e5);
  background: #fff;
`;

export const FileRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: var(--gray-10, #fafafa);
  margin-top: 0.5rem;
  cursor: pointer;
`;

export const FileLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const FileName = styled.span`
  font-family: var(--font-gilroy);
  color: var(--gray-80, #4b4a49);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

export const FileMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ActionButton = styled.button<{ $variant: "remove" | "restore" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  font: inherit;
  color: var(--gray-80, #4b4a49);

  background: ${({ $variant }) =>
    $variant === "remove"
      ? "var(--gray-30, #DFE3E9)"
      : "var(--gray-20, #F4F5F7)"};

  padding: ${({ $variant }) =>
    $variant === "remove" ? "0.27469rem 0.824rem" : "0.5rem 0.75rem"};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ActionLabel = styled.span`
  font-family: var(--font-gilroy);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
`;
