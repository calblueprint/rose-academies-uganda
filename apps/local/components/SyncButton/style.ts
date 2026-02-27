import styled from "styled-components";
import COLORS from "@/styles/colors";

export const ButtonWrapper = styled.button`
  display: flex;
  font-family: var(--font-gilroy);

  width: 450px;
  height: 50px;
  padding: 12px 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 22.474px;

  border-radius: 20px;
  background: ${COLORS.evergreen};
  border: none;
  cursor: pointer;
  color: ${COLORS.white};
  font-size: 16px;
  font-weight: 500;

  transition: opacity 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
