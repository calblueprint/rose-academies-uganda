import styled from "styled-components";

export const PageContainer = styled.div`
  padding-top: 1.25rem;
  padding-left: 6.875rem;
  padding-right: 6.875rem;
  background-color: #fafafa;
  min-height: 100dvh;
`;

export const Title = styled.h2`
  color: #000000;

  /* Heading 2 */
  font-family: var(--font-gilroy);
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1048px;
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SearchBar = styled.div`
  display: flex;
  width: 17.375rem;
`;
