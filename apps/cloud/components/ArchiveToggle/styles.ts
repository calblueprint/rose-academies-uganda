import styled from "styled-components";

export const ArchiveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;

  border-radius: 12px;
  border: 1px solid var(--gray-40, #d9d9d9);
  background-color: white;

  color: var(--gray-80, #4b4a49);
  font-family: "Google Sans", sans-serif;
  font-size: 14px;
  font-weight: 500;

  cursor: pointer;
  transition: all 0.2s ease;

  /* Hover */
  &:hover {
    background-color: #f5f5f5;
    border-color: #cfcfcf;
  }

  /* Active (click) */
  &:active {
    background-color: #eaeaea;
  }

  /* Toggle state */
  &.active {
    background-color: #4b4a49;
    color: white;
    border-color: #4b4a49;
  }

  /* SVG inside button */
  svg {
    width: 18px;
    height: 18px;
    stroke: currentColor;
  }
`;
