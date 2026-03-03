import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  padding: 12px 20px;
  gap: 8px;
  border-radius: 12px;
  background: var(--evergreen-100, #1e4240);

  border: none;
  cursor: pointer;
`;

export const Label = styled.h3`
  font-family: var(--font-gilroy);
  color: var(--white, #fff);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
