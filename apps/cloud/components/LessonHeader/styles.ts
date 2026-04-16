import Link from "next/link";
import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
`;

export const ImageBanner = styled.div<{ $imagePath: string | null }>`
  width: 100%;
  height: 8.8125rem;
  border-radius: 0.625rem;
  background: ${({ $imagePath }) =>
    $imagePath
      ? `linear-gradient(rgba(30, 66, 64, 0.2), rgba(30, 66, 64, 0.2)), url(${$imagePath})`
      : "var(--evergreen-100, #1e4240)"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
  color: white;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const CustomizeButton = styled.button`
  display: inline-flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  background: rgba(244, 245, 247, 0.7);
  color: var(--evergreen-100, #1e4240);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
`;

export const LessonTitle = styled.h1`
  margin: 1.5rem 0 0 0;
  color: #191c1c;
  font-size: 3rem;
  font-weight: 400;
  line-height: normal;
`;

export const IconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
