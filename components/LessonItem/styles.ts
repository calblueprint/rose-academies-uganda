import styled from "styled-components";

export const UnopenedLesson = styled.div`
  display: flex;
  padding: 1rem 1.75rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
  border-right: 1px solid var(--gray, #d9d9d9);
  border-bottom: 1px solid var(--gray, #d9d9d9);
  border-left: 1px solid var(--gray, #d9d9d9);
  background: var(--white, #fff);
  cursor: pointer;
`;

export const OpenedLesson = styled.div`
  display: flex;
  padding: 1rem 1.75rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
  border-right: 1px solid var(--gray, #d9d9d9);
  border-bottom: 1px solid var(--gray, #d9d9d9);
  border-left: 1px solid var(--gray, #d9d9d9);
  background: var(--white, #fff);
  cursor: pointer;
`;

export const LessonName = styled.h2`
  font-family: var(--font-gilroy);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
`;
