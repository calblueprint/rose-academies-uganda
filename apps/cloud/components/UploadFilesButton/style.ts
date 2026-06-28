"use client";

import styled from "styled-components";
import COLORS from "@/styles/colors";

export const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  min-height: 2.5rem;
  padding: 0.625rem 1rem;
  border-radius: 8px;

  border: 1px solid ${COLORS.surfaceBorder};
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};

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
  color: ${COLORS.gray80};

  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: 500;

  white-space: nowrap;
`;
