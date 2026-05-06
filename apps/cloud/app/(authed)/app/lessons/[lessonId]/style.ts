import styled from "styled-components";
import COLORS from "@/styles/colors";

export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: ${COLORS.gray10};
`;

export const LessonInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 67.5rem;
  margin: 0 auto;
  padding-top: 1.44rem;
`;

export const LessonTitle = styled.h1`
  color: var(--gray-100, #000);
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

export const LessonDescription = styled.h1`
  color: var(--gray-60, #808582);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

export const SearchBarRow = styled.div`
  display: flex;
  gap: 1.14rem;
  padding: 0.75rem 0rem;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;
