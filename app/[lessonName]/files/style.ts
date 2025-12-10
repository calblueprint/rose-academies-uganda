import styled from "styled-components";
import COLORS from "@/styles/colors";

export const PageContainer = styled.div`
  padding: 7rem;
  background-color: #fafafa;
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

export const FileHeaders = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18.75rem;
  color: ${COLORS.gray60};
  font-family: var(--font-gilroy);
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const NameHeader = styled.p``;

export const OtherHeaders = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 7.75rem;
`;

export const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
