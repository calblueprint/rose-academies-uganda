import styled from "styled-components";
import COLORS from "@/styles/colors";

type Layout = "page" | "embedded";
type LessonsClientVariant = "dashboard" | "offline" | "archive";

type LayoutProps = {
  $layout?: Layout;
};

type VariantProps = {
  $variant?: LessonsClientVariant;
};

type LayoutVariantProps = LayoutProps & VariantProps;

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
  color: ${COLORS.gray80};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);

  &:hover {
    background: ${COLORS.white};
  }
`;

export const PageContainer = styled.div<LayoutVariantProps>`
  display: flex;
  flex-direction: column;

  align-items: ${({ $variant = "dashboard" }) =>
    $variant === "archive" ? "flex-start" : "stretch"};

  gap: ${({ $variant = "dashboard" }) =>
    $variant === "archive" ? "1.5rem" : "1rem"};

  align-self: stretch;

  width: 100%;
  min-width: 0;

  max-width: ${({ $variant = "dashboard" }) =>
    $variant === "dashboard" || $variant === "archive" ? "67.5rem" : "none"};
  box-sizing: border-box;

  margin: ${({ $variant = "dashboard" }) =>
    $variant === "dashboard" || $variant === "archive" ? "0 auto" : "0"};

  min-height: ${({ $layout = "page" }) =>
    $layout === "page" ? "100vh" : "auto"};

  padding: ${({ $layout = "page" }) =>
    $layout === "page" ? "1.38rem clamp(16px, 4vw, 24px) 0" : "0"};

  background: transparent;

  @media (max-width: 760px) {
    padding: ${({ $layout = "page" }) =>
      $layout === "page" ? "1rem 1rem 0" : "0"};
  }
`;

export const Title = styled.h1<LayoutVariantProps>`
  margin: ${({ $layout = "page" }) =>
    $layout === "embedded" ? "1.25rem 0 0 0" : "0"};

  color: ${COLORS.gray100};

  font-size: ${({ $layout = "page" }) =>
    $layout === "embedded" ? "1.5rem" : "var(--font-h3)"};

  line-height: ${({ $layout = "page" }) =>
    $layout === "embedded" ? "normal" : "var(--lh-h3)"};

  font-weight: var(--font-weight-page-title);
`;

export const Header = styled.div<VariantProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;

  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
  flex: 1;
`;

export const LessonsGrid = styled.div<VariantProps>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: ${({ $variant = "dashboard" }) =>
    $variant === "dashboard" ? "0.9375rem" : "1.8125rem"};
  width: 100%;
`;

export const LessonsList = styled.div<VariantProps>`
  display: flex;
  flex-direction: column;
  gap: 1.06rem;
  width: 100%;
`;

export const SetupChecklistCard = styled.section`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
  box-sizing: border-box;
`;

export const SetupChecklistHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.85rem;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const SetupChecklistMeta = styled.span`
  color: ${COLORS.gray60};
  font-family: var(--font-primary);
  font-size: 0.8125rem;
  font-weight: var(--font-weight-section-title);
  line-height: 1.25;
  text-transform: uppercase;
`;

export const SetupChecklistTitle = styled.h2`
  margin: 0.2rem 0 0;
  color: ${COLORS.gray100};
  font-family: var(--font-primary);
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.25;
`;

export const SetupChecklistList = styled.div`
  display: grid;
  gap: 0.6rem;
`;

export const SetupChecklistItem = styled.div<{ $done?: boolean }>`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.75rem;
  min-height: 3.75rem;
  padding: 0.75rem;
  border: 1px solid
    ${({ $done }) => ($done ? COLORS.green20 : COLORS.surfaceBorder)};
  border-radius: 8px;
  background: ${({ $done }) => ($done ? COLORS.green10 : COLORS.pageWash)};

  @media (max-width: 680px) {
    grid-template-columns: auto minmax(0, 1fr);
  }
`;

export const SetupChecklistStatus = styled.span<{ $done?: boolean }>`
  width: 1.65rem;
  height: 1.65rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid ${({ $done }) => ($done ? COLORS.evergreen : COLORS.gray40)};
  background: ${({ $done }) => ($done ? COLORS.evergreen : COLORS.white)};
  color: ${COLORS.white};
  font-size: 0.9rem;
  font-weight: 700;
`;

export const SetupChecklistText = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.18rem;

  strong {
    color: ${COLORS.gray100};
    font-family: var(--font-primary);
    font-size: 0.95rem;
    line-height: 1.25;
  }

  span {
    color: ${COLORS.gray60};
    font-family: var(--font-primary);
    font-size: 0.875rem;
    line-height: 1.35;
  }
`;

export const SetupChecklistAction = styled.button`
  min-height: 2.3rem;
  padding: 0 0.9rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  color: ${COLORS.evergreen};
  font-family: var(--font-primary);
  font-size: 0.85rem;
  font-weight: var(--font-weight-section-title);
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${COLORS.evergreen};
  }

  &:disabled {
    cursor: default;
    opacity: 0.65;
  }

  @media (max-width: 680px) {
    grid-column: 2;
    justify-self: start;
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
`;

export const EmptyStateTitle = styled.h2`
  margin: 0;
  color: ${COLORS.gray100};
  font-size: 1.1rem;
  line-height: 1.3;
  font-weight: 500;
`;

export const EmptyStateDescription = styled.p`
  margin: 0.35rem 0 0;
  color: ${COLORS.gray60};
  font-size: 0.95rem;
  line-height: 1.45;
`;

export const SearchBarRow = styled.div<VariantProps>`
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

export const ControlsLeft = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.75rem;
  flex: 1;

  @media (max-width: 760px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const ControlsRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;

  @media (max-width: 760px) {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
`;

export const LessonCountText = styled.span`
  color: ${COLORS.gray60};
  font-family: var(--font-primary);
  font-size: 0.9rem;
  line-height: 1.4;
  white-space: nowrap;
`;

export const ResultsHeader = styled.div`
  width: 100%;
  margin-top: -0.25rem;
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
  flex-shrink: 0;
`;

export const ToggleDivider = styled.div`
  width: 1px;
  height: 1.5625rem;
  background: ${COLORS.gray40};
  border-radius: 1px;
`;

export const ToggleText = styled.div`
  font-family: var(--font-primary);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`;

interface ToggleProps {
  $active?: boolean;
}

export const GridToggle = styled.div<ToggleProps>`
  display: flex;
  min-height: 22px;
  cursor: pointer;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  line-height: normal;

  ${ToggleText} {
    color: ${({ $active }) => ($active ? COLORS.evergreen : COLORS.gray60)};
  }
`;

export const SortButtonWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  height: 44px;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid ${COLORS.surfaceBorder};
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    border-color: ${COLORS.evergreen};
  }
`;

export const SortButtonLabel = styled.span<{ $active: boolean }>`
  font-family: var(--font-primary);
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  color: ${({ $active }) => ($active ? COLORS.evergreen : COLORS.gray60)};
`;

export const SortDropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 100;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  padding: 4px;
  min-width: 11rem;
  box-shadow: ${COLORS.surfaceShadowSoft};
`;

export const SortOption = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: none;
  background: ${({ $active }) => ($active ? COLORS.gray10 : "transparent")};
  border-radius: 8px;
  cursor: pointer;
  font-family: var(--font-primary);
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? "500" : "400")};
  color: ${({ $active }) => ($active ? COLORS.evergreen : COLORS.gray80)};
  text-align: left;

  &:hover {
    background: ${COLORS.gray10};
  }
`;

export const Description = styled.p`
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: ${COLORS.gray60};
  text-overflow: ellipsis;
  font-family: var(--font-primary);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
