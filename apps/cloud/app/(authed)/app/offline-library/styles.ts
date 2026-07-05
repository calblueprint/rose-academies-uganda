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

  font-size: 0.95rem;
  line-height: 1.45;
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

export const HubUpdateNotice = styled.section<{
  $tone: "ready" | "needs" | "empty";
}>`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 0.85rem;
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-left: 4px solid
    ${({ $tone }) =>
      $tone === "needs"
        ? COLORS.orange100
        : $tone === "ready"
          ? COLORS.activeGreen
          : COLORS.gray60};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
  box-sizing: border-box;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const HubUpdateNoticeText = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const HubUpdateNoticeTitle = styled.h2`
  margin: 0;
  color: ${COLORS.gray100};
  font-size: 0.98rem;
  line-height: 1.35;
  font-weight: 700;
`;

export const HubUpdateNoticeBody = styled.p`
  margin: 0;
  color: ${COLORS.gray60};
  font-size: 0.9rem;
  line-height: 1.45;
`;

export const HubUpdateChangeDetails = styled.div`
  grid-column: 1 / -1;
  margin-top: 0.25rem;
  padding-top: 0.8rem;
  border-top: 1px solid ${COLORS.surfaceBorder};
`;

export const HubUpdateChangeList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const HubUpdateChangeItem = styled.li`
  display: flex;
  align-items: center;
  color: ${COLORS.gray60};
  font-size: 0.86rem;
  line-height: 1.45;
`;

export const HubUpdateMapHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-top: -0.35rem;
`;

export const HubUpdateMap = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
  width: 100%;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

export const HubUpdateMapColumn = styled.article<{
  $tone: "dashboard" | "pending" | "ready";
}>`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  min-height: 15rem;
  padding: 1rem;
  border: 1px solid
    ${({ $tone }) =>
      $tone === "ready"
        ? COLORS.mintGreenBorder
        : $tone === "pending"
          ? COLORS.orange100
          : COLORS.surfaceBorder};
  border-top: 4px solid
    ${({ $tone }) =>
      $tone === "ready"
        ? COLORS.activeGreen
        : $tone === "pending"
          ? COLORS.orange100
          : COLORS.gray60};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
`;

export const HubUpdateMapColumnHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: flex-start;
  gap: 0.8rem;
`;

export const HubUpdateMapColumnTitle = styled.h2`
  margin: 0;
  color: ${COLORS.gray100};
  font-size: 1rem;
  line-height: 1.3;
  font-weight: 800;
`;

export const HubUpdateMapColumnDescription = styled.p`
  margin: 0.3rem 0 0;
  color: ${COLORS.gray60};
  font-size: 0.84rem;
  line-height: 1.4;
`;

export const HubUpdateMapColumnCount = styled.span<{
  $tone: "dashboard" | "pending" | "ready";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.45rem;
  border-radius: 999px;
  background: ${({ $tone }) =>
    $tone === "ready"
      ? COLORS.green10
      : $tone === "pending"
        ? COLORS.orange20
        : COLORS.gray10};
  color: ${({ $tone }) =>
    $tone === "ready"
      ? COLORS.evergreen
      : $tone === "pending"
        ? COLORS.orange100
        : COLORS.gray80};
  font-size: 0.9rem;
  line-height: 1;
  font-weight: 800;
`;

export const HubUpdateMapList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const HubUpdateMapItem = styled.li`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.55rem;
  min-height: 2.35rem;
  padding: 0.55rem 0;
  border-top: 1px solid ${COLORS.green20};

  &:first-child {
    border-top: none;
    padding-top: 0;
  }
`;

export const HubUpdateMapItemLink = styled.a`
  min-width: 0;
  color: ${COLORS.gray100};
  font-size: 0.88rem;
  line-height: 1.35;
  font-weight: 700;
  text-decoration: none;
  overflow-wrap: anywhere;

  &:hover,
  &:focus-visible {
    color: ${COLORS.evergreen};
    text-decoration: underline;
    text-underline-offset: 0.16em;
    outline: none;
  }
`;

export const HubUpdateMapEmpty = styled.p`
  margin: auto 0;
  padding: 1rem;
  border-radius: 8px;
  background: ${COLORS.gray10};
  color: ${COLORS.gray60};
  font-size: 0.88rem;
  line-height: 1.4;
  text-align: center;
`;

export const HubUpdateLessonsSection = styled.section`
  width: 100%;
  min-width: 0;
  margin-top: -0.95rem;
  padding-bottom: 2.5rem;
`;

export const HubUpdateLessonLink = styled.a`
  min-width: 0;
  color: ${COLORS.evergreen};
  font-weight: 700;
  text-decoration: none;
  overflow-wrap: anywhere;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
    text-underline-offset: 0.16em;
    outline: none;
  }
`;

export const HubUpdateFlowCard = styled.details`
  position: relative;
  flex: 0 0 auto;
  width: fit-content;
  box-sizing: border-box;
  z-index: 3;
`;

export const HubUpdateFlowSummary = styled.summary`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0;
  border: 1px solid ${COLORS.green20};
  border-radius: 999px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
  color: ${COLORS.evergreen};
  cursor: pointer;
  list-style: none;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;

  &::-webkit-details-marker {
    display: none;
  }

  &:hover {
    border-color: ${COLORS.mintGreenBorder};
    background: ${COLORS.green10};
    box-shadow: 0 10px 24px rgba(30, 66, 64, 0.1);
  }

  &:focus-visible {
    outline: 3px solid rgba(30, 66, 64, 0.16);
    outline-offset: 3px;
  }
`;

export const HubUpdateFlowSummaryText = styled.div`
  min-width: 0;
`;

export const HubUpdateFlowPopover = styled.div`
  position: absolute;
  top: calc(100% + 0.7rem);
  right: 0;
  width: min(44rem, calc(100vw - 2rem));
  padding: 1.15rem;
  border: 1px solid ${COLORS.mintGreenBorder};
  border-radius: 12px;
  background: ${COLORS.white};
  box-shadow: 0 18px 48px rgba(30, 66, 64, 0.16);
  box-sizing: border-box;

  @media (max-width: 680px) {
    right: -0.2rem;
    width: min(22rem, calc(100vw - 2rem));
  }
`;

export const HubUpdateFlowTitle = styled.h2`
  margin: 0;
  color: ${COLORS.gray100};
  font-size: 1.1rem;
  line-height: 1.3;
  font-weight: 700;
`;

export const HubUpdateFlowToggle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  font-weight: 800;
`;

export const HubUpdateFlowIntro = styled.p`
  margin: 0.4rem 0 0;
  color: ${COLORS.gray60};
  font-size: 0.95rem;
  line-height: 1.5;
`;

export const HubUpdateSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
  margin: 1rem 0 0;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const HubUpdateStep = styled.div`
  display: grid;
  grid-template-columns: 2rem minmax(0, 1fr);
  align-items: flex-start;
  gap: 0.9rem;
  padding: 1.05rem;
  border: 1px solid ${COLORS.mintGreenBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: 0 8px 22px rgba(30, 66, 64, 0.05);
`;

export const HubUpdateStepNumber = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  background: ${COLORS.evergreen};
  color: ${COLORS.white};
  font-size: 0.95rem;
  font-weight: 700;
`;

export const HubUpdateStepTitle = styled.h3`
  margin: 0;
  color: ${COLORS.gray100};
  font-size: 1rem;
  line-height: 1.35;
  font-weight: 700;
`;

export const HubUpdateStepText = styled.p`
  margin: 0.35rem 0 0;
  color: ${COLORS.gray80};
  font-size: 0.94rem;
  line-height: 1.55;
`;

export const HubUpdateActionChip = styled.strong`
  display: inline-flex;
  align-items: center;
  min-height: 1.45rem;
  margin: 0 0.18rem;
  padding: 0 0.45rem;
  border-radius: 999px;
  border: 1px solid ${COLORS.green20};
  background: ${COLORS.green10};
  color: ${COLORS.evergreen};
  font-size: 0.82rem;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
`;

export const HubUpdateStatusPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.7rem;
`;

export const HubUpdateStatusPill = styled.span<{ $tone: "ready" | "needs" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 1.7rem;
  margin: 0 0.18rem;
  padding: 0 0.65rem;
  border-radius: 999px;
  border: 1px solid
    ${({ $tone }) => ($tone === "ready" ? COLORS.green20 : COLORS.orange100)};
  background: ${({ $tone }) =>
    $tone === "ready" ? COLORS.green10 : COLORS.orange20};
  color: ${({ $tone }) =>
    $tone === "ready" ? COLORS.evergreen : COLORS.orange100};
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
`;

export const HubUpdateStatusCheck = styled.span`
  color: ${COLORS.activeGreen};
  font-size: 0.9em;
  font-weight: 900;
  line-height: 1;
`;

export const HubUpdateNote = styled.p`
  margin: 1rem 0 0;
  padding-top: 0.9rem;
  border-top: 1px solid ${COLORS.surfaceBorder};
  color: ${COLORS.gray80};
  font-size: 0.92rem;
  line-height: 1.5;
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
