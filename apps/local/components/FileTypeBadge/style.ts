import styled from "styled-components";

export const FileBadge = styled.div<{ $color: string }>`
  width: 42px;
  height: 42px;
  border-radius: 6px;
  background: ${({ $color }) => $color};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  gap: 1px;
`;

export const FileBadgeText = styled.span`
  font-family: var(--font-gilroy);
  font-size: 0.5rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.04em;
  line-height: 1;
`;
