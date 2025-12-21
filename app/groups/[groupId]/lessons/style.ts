import styled from "styled-components";
import COLORS from "@/styles/colors";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.09rem;
  width: 100%;
  min-height: 100vh;
  padding: 1.44rem 7.25rem;
  background: ${COLORS.gray10};
`;

export const Title = styled.h1`
  font-family: var(--font-gilroy);
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const LessonsGrid = styled.div`
  display: flex;
  gap: 2.5rem 2.1725rem;
  flex-wrap: wrap;
`;

export const LessonsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.06rem;
`;

export const SearchBarRow = styled.div`
  display: flex;
  gap: 1.14rem;
`;

export const ViewToggleButton = styled.div`
  display: flex;
  height: 2.71556rem;
  padding: 0.6rem 1rem;
  align-items: center;
  gap: 0.44rem;
  border-radius: 1.08625rem;
  border-top: 0.434px solid var(--gray, #d9d9d9);
  border-right: 0.869px solid var(--gray, #d9d9d9);
  border-bottom: 1.303px solid var(--gray, #d9d9d9);
  border-left: 0.869px solid var(--gray, #d9d9d9);
  background: var(--white, #fff);
`;

export const ToggleDivider = styled.div`
  width: 0.07813rem;
  height: 1.5625rem;
  background: var(--gray, #d9d9d9);
  border-radius: 0.08rem;
`;

export const GridToggle = styled.div`
  height: 28px;
  cursor: pointer;
`;

export const ListToggle = styled.div`
  height: 28px;
  cursor: pointer;
`;
