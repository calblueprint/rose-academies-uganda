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

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  gap: 38.75rem;
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
  height: 44px;
  padding: 10px 14px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 16px;
  border-top: 0.437px solid var(--gray, #d9d9d9);
  border-right: 0.873px solid var(--gray, #d9d9d9);
  border-bottom: 1.31px solid var(--gray, #d9d9d9);
  border-left: 0.873px solid var(--gray, #d9d9d9);
  background: var(--white, #fff);
`;

export const ToggleDivider = styled.div`
  width: 0.07813rem;
  height: 1.5625rem;
  background: var(--gray, #d9d9d9);
  border-radius: 0.08rem;
`;

export const ToggleText = styled.div`
  font-family: var(--font-gilroy);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`;

interface ToggleProps {
  $active?: boolean;
}

export const GridToggle = styled.div<ToggleProps>`
  display: flex;
  height: 22px;
  cursor: pointer;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  line-height: normal;

  ${ToggleText} {
    color: ${({ $active }) =>
      $active
        ? "var(--evergreen-100, #1E4240)"
        : "var(--gray-40, var(--gray, #D9D9D9))"};
  }
`;
