import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  min-width: 0;
  max-width: 80rem;
  margin: 0 auto;

  min-height: 100dvh;
  padding: 13px clamp(16px, 5vw, 116px);

  background-color: #fafafa;
`;

export const Title = styled.h2`
  color: #000000;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-top: 23px;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  justify-content: space-between;
  margin-top: 23px;
`;

export const SearchBar = styled.div`
  display: flex;
  width: 100%;
`;

export const TableWrapper = styled.div`
  width: 100%;
  margin-top: 23px;
  flex: 0 0 auto;
`;

export const EmptyState = styled.div`
  margin-top: 23px;
`;

export const DescriptionText = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
  color: #808582;
  line-height: normal;
  margin-top: 12px;
`;
