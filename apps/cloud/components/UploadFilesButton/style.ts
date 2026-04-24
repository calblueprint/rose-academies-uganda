"use client";

import styled from "styled-components";
import COLORS from "@/styles/colors";

export const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  padding: 0.25rem 1.3125rem;
  border-radius: 1rem;

  border: 1px solid ${COLORS.gray40};
  background: ${COLORS.white};

  cursor: pointer;

  &:hover {
    background: ${COLORS.gray10};
  }
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
`;

export const ButtonText = styled.span`
  color: ${COLORS.gray60};

  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: 500;

  white-space: nowrap;
`;
