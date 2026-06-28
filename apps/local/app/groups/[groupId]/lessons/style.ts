import styled from "styled-components";
import COLORS from "@/styles/colors";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-self: stretch;

  width: 100%;
  min-width: 0;
  max-width: 80rem;
  margin: 0 auto;

  min-height: 100vh;
  padding: 1.38rem clamp(16px, 5vw, 116px) 0;
  background: transparent;
`;

export const Title = styled.h1`
  margin: 0;
  color: ${COLORS.gray100};
  font-size: 2.25rem;
  line-height: 1.15;
  font-weight: var(--font-weight-page-title);
`;

export const LessonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: 0.9375rem;
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
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0;
  width: 100%;

  @media (max-width: 760px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const ViewToggleButton = styled.div`
  display: flex;
  height: 44px;
  padding: 10px 12px;
  align-items: center;
  gap: 10px;

  border-radius: 8px;
  border: 1px solid ${COLORS.surfaceBorder};

  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
`;

export const ToggleDivider = styled.div`
  width: 1px;
  height: 1.5625rem;

  background: ${COLORS.green20};
  border-radius: 1px;
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
    color: ${({ $active }) => ($active ? COLORS.evergreen : COLORS.gray60)};
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
    color: ${({ $active }) => ($active ? COLORS.evergreen : COLORS.gray60)};
  }
`;

export const EmptyState = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 1.5rem;
  border: 1px dashed rgba(30, 66, 64, 0.18);
  border-radius: 8px;
  background: ${COLORS.white};
  color: ${COLORS.gray60};
  box-shadow: ${COLORS.surfaceShadowSoft};
  font-family: var(--font-primary);
  font-size: 0.95rem;
  line-height: 1.45;
`;
