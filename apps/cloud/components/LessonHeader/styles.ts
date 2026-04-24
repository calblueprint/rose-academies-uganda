import Link from "next/link";
import styled from "styled-components";
import COLORS from "@/styles/colors";

export const HeaderContainer = styled.div`
  width: 100%;
`;

export const ImageBanner = styled.div<{ $imagePath: string | null }>`
  position: relative;

  width: 100%;
  height: 8.8125rem;
  border-radius: 0.625rem;

  background: ${({ $imagePath }) =>
    $imagePath
      ? `linear-gradient(rgba(30, 66, 64, 0.2), rgba(30, 66, 64, 0.2)), url(${$imagePath})`
      : COLORS.evergreen};

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  padding: 1.5rem;

  display: flex;
  flex-direction: column;
`;

export const HeaderTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;

  padding: 0.5rem 0;

  color: ${COLORS.white};
  text-decoration: none;

  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: 500;
`;

export const CustomizeButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;

  background: rgba(244, 245, 247, 0.7);
  color: ${COLORS.evergreen};

  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: 500;

  cursor: pointer;
`;

export const LessonTitle = styled.h1`
  margin: 1.5rem 0 0 0;

  color: ${COLORS.evergreen};

  font-size: var(--font-h1);
  line-height: var(--lh-h1);
  font-weight: 400;
`;

export const IconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
