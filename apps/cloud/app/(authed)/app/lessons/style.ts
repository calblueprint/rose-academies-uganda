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
  color: ${COLORS.veryDarkBlue};
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

  gap: ${({ $variant = "dashboard" }) => {
    if ($variant === "archive") return "2rem";
    if ($variant === "dashboard") return "1.09rem";
    return "1.09rem";
  }};

  align-self: stretch;

  width: 100%;
  min-width: 0;

  max-width: ${({ $variant = "dashboard" }) =>
    $variant === "dashboard" || $variant === "archive" ? "67.5rem" : "none"};

  margin: ${({ $variant = "dashboard" }) =>
    $variant === "dashboard" || $variant === "archive" ? "0 auto" : "0"};

  min-height: ${({ $layout = "page" }) =>
    $layout === "page" ? "100vh" : "auto"};

  padding: ${({ $layout = "page" }) =>
    $layout === "page" ? "1.38rem 0 0 0" : "0"};

  background: transparent;
`;

export const Title = styled.h1<LayoutVariantProps>`
  margin: ${({ $layout = "page" }) =>
    $layout === "embedded" ? "1.25rem 0 0 0" : "0"};

  color: ${COLORS.gray100};

  font-size: ${({ $layout = "page" }) =>
    $layout === "embedded" ? "1.5rem" : "var(--font-h3)"};

  line-height: ${({ $layout = "page" }) =>
    $layout === "embedded" ? "normal" : "var(--lh-h3)"};

  font-weight: 400;
`;

export const Header = styled.div<VariantProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
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
  display: flex;
  gap: ${({ $variant = "dashboard" }) =>
    $variant === "dashboard" ? "0.9375rem" : "1.8125rem"};
  flex-wrap: wrap;
  width: 100%;
`;

export const LessonsList = styled.div<VariantProps>`
  display: flex;
  flex-direction: column;
  gap: 1.06rem;
  width: 100%;
`;

export const SearchBarRow = styled.div<VariantProps>`
  display: flex;
  gap: 1.14rem;
  padding: 0.75rem 0rem;
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
  margin: 0;
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
