import styled from "styled-components";
import COLORS from "@/styles/colors";

export const PageWrapper = styled.main`
  min-height: 100dvh;
  background: transparent;
  padding: 1.38rem 0 0 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  gap: 1rem;

  width: 100%;
  max-width: 67.5rem;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 24px);
  box-sizing: border-box;
`;

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

export const PageTitle = styled.h1`
  color: ${COLORS.gray100};

  font-size: var(--font-h3);
  line-height: var(--lh-h3);
  font-weight: var(--font-weight-page-title);
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
`;

export const SyncCardsRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 1.25rem;
  align-items: stretch;
  justify-items: stretch;

  width: 100%;

  > :first-child {
    justify-self: start;
  }

  > :last-child {
    justify-self: end;
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;

    > :first-child,
    > :last-child {
      justify-self: stretch;
    }
  }
`;

export const EmptyHubCard = styled.section`
  width: 100%;
  max-width: 44rem;
  padding: 1.5rem;
  border: 1px solid ${COLORS.mintGreenBorder};
  border-radius: 1rem;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
`;

export const EmptyHubTitle = styled.h2`
  margin: 0 0 0.5rem;
  color: ${COLORS.gray100};
  font-size: 1.35rem;
  line-height: 1.2;
  font-weight: 700;
`;

export const EmptyHubText = styled.p`
  margin: 0;
  color: ${COLORS.gray60};
  font-size: 1rem;
  line-height: 1.5;
`;

export const EmptyHubSteps = styled.ol`
  margin: 1rem 0 0;
  padding-left: 1.25rem;
  color: ${COLORS.gray80};
  font-size: 0.95rem;
  line-height: 1.55;

  li + li {
    margin-top: 0.35rem;
  }
`;

export const SectionTitle = styled.h2`
  margin: 1.25rem 0 1rem;
  padding: 0;

  color: ${COLORS.gray100};

  font-size: 1.5rem;
  line-height: normal;
  font-weight: var(--font-weight-section-title);
`;

export const LessonsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

export const SyncButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 2.4rem 0;
`;
