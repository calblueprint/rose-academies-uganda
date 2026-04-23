import styled from "styled-components";

export const VillageTag = styled.span`
  display: flex;
  padding: 4px 12px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  border-radius: 20px;
  background: #e9f4e9;
  color: var(--evergreen-100, #1e4240);
  font-family: var(--font-gilroy);
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const TagGroup = styled.div`
  display: flex;
  gap: 8px;
`;
