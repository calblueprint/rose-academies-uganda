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
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(30, 66, 64, 0.1);
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
  color: ${COLORS.white};
  font-family: var(--font-primary);
  font-size: 0.875rem;
  font-weight: var(--font-weight-section-title);
  white-space: nowrap;
`;
