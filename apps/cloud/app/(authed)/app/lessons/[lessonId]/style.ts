import styled from "styled-components";
import COLORS from "@/styles/colors";

export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;

  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 12px;
  flex-shrink: 0;

  @media (max-width: 760px) {
    justify-content: flex-start;
  }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: transparent;
`;

export const LessonInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 67.5rem;
  margin: 0 auto;
  padding: 1.44rem clamp(16px, 4vw, 24px) 0;
  box-sizing: border-box;
`;

export const LessonTitle = styled.h1`
  color: var(--gray-100, #000);
  font-size: 36px;
  font-style: normal;
  font-weight: var(--font-weight-page-title);
  line-height: 1.15;
  margin: 0;
`;

export const LessonDescription = styled.p`
  color: ${COLORS.gray60};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.45;
  margin: 0;
  max-width: 44rem;
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: pre-wrap;
`;

export const SearchBarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  padding: 0.5rem 0 0.25rem;

  @media (max-width: 760px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  min-width: 0;
`;

export const LessonMetadata = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-width: 0;
  padding: 0.1rem 0 0.35rem;
`;

export const ClassroomSection = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const FilesTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex-shrink: 0;
  min-width: 8rem;
`;

export const FilesTitle = styled.h2`
  margin: 0;
  color: ${COLORS.gray100};
  font-size: 1.35rem;
  line-height: 1.25;
  font-weight: 500;
`;

export const FilesCount = styled.span`
  color: ${COLORS.gray60};
  font-family: var(--font-primary);
  font-size: 0.9rem;
  line-height: 1.4;
`;

export const FileControlsLeft = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 1rem;
  flex: 1;

  @media (max-width: 760px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const FileControlsRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
  gap: 0.75rem;

  @media (max-width: 760px) {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
`;

export const ErrorMessage = styled.p`
  margin: 0;
  color: ${COLORS.rose100};
  font-family: var(--font-primary);
  font-size: 0.9rem;
  line-height: 1.4;
`;

export const EmptyMetadataText = styled.span`
  color: ${COLORS.gray60};
  font-family: var(--font-primary);
  font-size: 0.95rem;
  line-height: 1.4;
`;
