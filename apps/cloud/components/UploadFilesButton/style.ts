"use client";

import styled from "styled-components";

export const ButtonContainer = styled.button`
  display: flex;
  padding: 4.367px 20.96px;
  align-items: center;
  gap: 8px;
  border-radius: 1rem;
  border-top: 0.5px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  background: #ffffff;
  cursor: pointer;

  &:hover {
    background: #fafafa;
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
  color: #808582;
  text-align: center;
  font-family: "Google Sans", sans-serif;
  white-space: nowrap;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
