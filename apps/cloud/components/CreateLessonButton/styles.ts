import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Button = styled.button`
  display: flex;
  padding: 12px 20px;
  gap: 8px;
  border-radius: 12px;

  background: ${COLORS.evergreen};

  border: none;
  cursor: pointer;
`;

export const Label = styled.h3`
  color: ${COLORS.white};

  font-size: var(--font-h6);
  line-height: var(--lh-h6);
  font-weight: 400;
`;
