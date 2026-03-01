import styled from "styled-components";

export const LessonWrapper = styled.div`
  border-radius: 0.75rem;
  border: 1px solid var(--gray, #d9d9d9);
  background: var(--white, #fff);
  overflow: hidden;
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
`;

export const LessonRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const LessonIcon = styled.div`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.375rem;
  background: #9adbe8;
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

export const FileIcon = styled.div`
  border-radius: 5px;
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 10px;
  background: #60bbfb;
`;

export const FileName = styled.span`
  font-family: var(--font-gilroy);
  color: var(--gray-80, #4b4a49);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`;

export const FileMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
