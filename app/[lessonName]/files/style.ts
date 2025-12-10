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

export const LessonHeader = styled.div`
  display: flex;
  width: 100%;
  max-width: 1048px;
  height: 141px;
  padding: 12px 931px 96px 25px;
  align-items: center;
  flex-shrink: 0;
  border-radius: 10px;
  background-color: ${COLORS.evergreen};
`;

export const BackButton = styled.button`
  display: flex;
  padding: 8px 0;
  align-items: center;
  gap: 12px;
  border-radius: 12px;

  background: transparent;
  border: none;
  cursor: pointer;

  color: #ffffff;
  font-family: var(--font-gilroy);
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  white-space: nowrap;
`;

export const BackButtonIconSlot = styled.div`
  width: 0.6875rem;
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
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
