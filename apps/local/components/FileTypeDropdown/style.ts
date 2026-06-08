import styled from "styled-components";

export const FileTypeDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 2.71556rem;
  padding: 12px 20px;
  border-radius: 17.38px;
  border-top: 0.434px solid var(--gray, #d9d9d9);
  border-right: 0.869px solid var(--gray, #d9d9d9);
  border-bottom: 1.303px solid var(--gray, #d9d9d9);
  border-left: 0.869px solid var(--gray, #d9d9d9);

  background: var(--white, #fff);
  flex-shrink: 0;
  cursor: pointer;
  user-select: none;
`;

export const FileTypeLabel = styled.span`
  color: #808582;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
  white-space: nowrap;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: #fff;
  border-radius: 0.75rem;
  border-top: 0.434px solid #d9d9d9;
  border-right: 0.869px solid #d9d9d9;
  border-bottom: 1.303px solid #d9d9d9;
  border-left: 0.869px solid #d9d9d9;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  z-index: 100;
  min-width: 100%;
`;

export const DropdownOption = styled.button<{ $selected: boolean }>`
  display: block;
  width: 100%;
  padding: 0.625rem 1.3rem;
  text-align: left;
  background: ${({ $selected }) => ($selected ? "#F9FAF3" : "#fff")};
  border: none;
  cursor: pointer;
  font-family: var(--font-gilroy);
  font-size: 1rem;
  color: ${({ $selected }) => ($selected ? "#1E4240" : "#808582")};
  font-weight: ${({ $selected }) => ($selected ? 500 : 300)};
  white-space: nowrap;

  &:hover {
    background: #f5f5f5;
  }
`;
