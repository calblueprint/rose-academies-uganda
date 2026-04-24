import styled from "styled-components";

export const PageWrapper = styled.main`
  padding: 1.44rem 7.25rem;
  background: var(--gray-10, #fafafa);
  min-height: 100dvh;
`;

export const PageTitle = styled.h1`
  color: #000;

  /* Heading 2 */
  font-family: var(--font-gilroy);
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
  color: var(--gray-60, #808582);
  text-overflow: ellipsis;

  /* Heading 5 */
  font-family: var(--font-gilroy);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px; /* 125% */
  padding-top: 1rem;
  padding-bottom: 1.5rem;
`;

export const SectionTitle = styled.h2`
  margin: 1.25rem 0 1rem;
  font-family: var(--font-gilroy);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  padding: 0;
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
