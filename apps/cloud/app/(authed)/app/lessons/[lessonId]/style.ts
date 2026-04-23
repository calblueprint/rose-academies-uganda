import styled from "styled-components";
import COLORS from "@/styles/colors";

export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LessonInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TitleWithEditIcon = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

export const DescriptionWithEditIcon = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

export const InlineEditIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 4px 2px;
  gap: 10px;
  border-radius: 20px;
  background: #e6e8ea;
  flex-shrink: 0;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: 1.44rem 7.25rem;
  background: ${COLORS.gray10};
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
