import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: 2.75rem;
  padding: 0 1.25rem;
  gap: 0.5rem;

  border-radius: 0.75rem;
  background: ${COLORS.evergreen};

  border: none;
  cursor: pointer;
`;

export const Label = styled.span`
  color: ${COLORS.white};

  font-size: var(--font-h6);
  line-height: 1;
  font-weight: 400;
`;
