import styled from "styled-components";

export const FileTypeDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 2.71556rem;
  padding: 0.27156rem 1.3035rem;
  border-radius: 1.08625rem;
  border-top: 0.434px solid var(--gray, #d9d9d9);
  border-right: 0.869px solid var(--gray, #d9d9d9);
  border-bottom: 1.303px solid var(--gray, #d9d9d9);
  border-left: 0.869px solid var(--gray, #d9d9d9);

  background: var(--white, #fff);
  flex-shrink: 0;
`;

export const FileTypeLabel = styled.span`
  color: #808582;
  font-family: var(--font-gilroy);
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 300;
  line-height: 1.125rem;
`;

export const FileTypeDropdownIcon = styled.div`
  width: 10.445px;
  height: 6.452px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
