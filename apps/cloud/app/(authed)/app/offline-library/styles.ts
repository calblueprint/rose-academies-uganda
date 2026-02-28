import styled from "styled-components";

export const PageWrapper = styled.main`
  padding: 2rem 2.25rem;
  background: var(--gray-10, #fafafa);
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
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
`;

export const SectionTitle = styled.h2`
  margin: 0.8rem 0 0.75rem;
  font-family: var(--font-gilroy);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
`;

export const LessonsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;
