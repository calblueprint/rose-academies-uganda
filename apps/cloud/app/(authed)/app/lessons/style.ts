import styled from "styled-components";
import COLORS from "@/styles/colors";

export const CardWrapper = styled.div`
  position: relative;

  &:hover button[aria-label="Edit lesson cover image"] {
    opacity: 1;
  }
`;

export const EditImageButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  opacity: 0;
  transition: opacity 0.15s;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 6px;
  padding: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.veryDarkBlue};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);

  &:hover {
    background: ${COLORS.white};
  }
`;

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
  margin: 0
  font-family: var(--font-gilroy);
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
  flex: 1;
`;

export const LessonsGrid = styled.div`
  display: flex;
  gap: 1.8125rem;
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
  padding: 0.75rem 0rem;
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

export const Description = styled.p`
  margin: 0
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: var(--gray-60, #808582);
  text-overflow: ellipsis;
  font-family: var(--font-gilroy);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
