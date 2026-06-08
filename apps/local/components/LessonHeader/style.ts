import styled from "styled-components";
import COLORS from "@/styles/colors";

export const LessonHeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${COLORS.evergreen};
  width: 100%;
  height: 141px;
  padding: 12px clamp(16px, 3vw, 25px);
  border-radius: 10px;
  overflow: hidden;
`;

export const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

export const BackButton = styled.button`
  position: absolute;
  top: 15px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #ffffff;
  font-family: var(--font-gilroy);
  font-size: 0.875rem;
  font-weight: 400;
  white-space: nowrap;
`;
