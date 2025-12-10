import styled from "styled-components";
import COLORS from "@/styles/colors";

export const LessonHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1048px;
  height: 141px;
  padding: 12px 931px 96px 25px;
  align-items: center;
  flex-shrink: 0;
  border-radius: 10px;
  background-color: ${COLORS.evergreen};
`;

export const BackButton = styled.button`
  display: flex;
  padding: 8px 0;
  align-items: center;
  gap: 12px;
  border-radius: 12px;

  background: transparent;
  border: none;
  cursor: pointer;

  color: #ffffff;
  font-family: var(--font-gilroy);
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  white-space: nowrap;
`;

export const BackButtonIconSlot = styled.div`
  width: 0.6875rem;
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
