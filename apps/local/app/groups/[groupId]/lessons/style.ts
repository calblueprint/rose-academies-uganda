import styled from "styled-components";
import COLORS from "@/styles/colors";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.09rem;
  align-self: stretch;

  width: 100%;
  min-width: 0;
  max-width: 80rem;
  margin: 0 auto;

  min-height: 100vh;
  padding: 13px clamp(16px, 5vw, 116px);
  background: transparent;
`;

export const Title = styled.h1`
  margin: 0;
  color: ${COLORS.black};
  font-size: 2.25rem;
  line-height: normal;
  font-weight: 400;
`;

export const LessonsGrid = styled.div`
  display: flex;
  gap: 0.9375rem;
  flex-wrap: wrap;
  width: 100%;
`;

export const LessonsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.06rem;
  width: 100%;
`;

export const SearchBarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
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
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

interface ToggleProps {
  $active?: boolean;
}

export const GridToggle = styled.div<ToggleProps>`
  display: flex;
  height: 22px;
  cursor: pointer;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  line-height: normal;

  ${ToggleText} {
    color: ${({ $active }) =>
      $active
        ? "var(--evergreen-100, #1E4240)"
        : "var(--gray-40, var(--gray, #D9D9D9))"};
  }
`;

export const ListToggle = styled.div<ToggleProps>`
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
