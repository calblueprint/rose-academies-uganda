import styled from "styled-components";
import COLORS from "@/styles/colors";

export const LessonHeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${COLORS.evergreen};
  width: 100%;
  height: 141px;
  padding: 12px 931px 96px 25px;
  border-radius: 10px;
  overflow: hidden;
`;

export const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

export const BackButton = styled.button`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #ffffff;
  font-family: var(--font-gilroy);
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
`;

export const BackButtonIconSlot = styled.div`
  width: 0.6875rem;
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
