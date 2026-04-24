import styled from "styled-components";
import COLORS from "@/styles/colors";

export const PageWrapper = styled.main`
  padding: 1.44rem 7.25rem;
  background: ${COLORS.gray10};
  min-height: 100dvh;
`;

export const PageTitle = styled.h1`
  color: ${COLORS.gray100};

  font-size: var(--font-h3);
  line-height: var(--lh-h3);
  font-weight: 400;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

export const PageSubtitle = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  overflow: hidden;
  color: ${COLORS.gray60};
  text-overflow: ellipsis;

  font-size: var(--font-subtitle-1);
  line-height: var(--lh-subtitle-1);
  font-weight: 400;

  padding-top: 1rem;
  padding-bottom: 1.5rem;
`;

export const SectionTitle = styled.h2`
  margin: 1.25rem 0 1rem;
  padding: 0;

  color: ${COLORS.gray100};

  font-size: 1.5rem;
  line-height: normal;
  font-weight: 400;
`;

export const LessonsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

export const SyncCardsRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 2rem;
  align-items: stretch;
  width: 100%;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

export const SyncButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 2.4rem 0;
`;
