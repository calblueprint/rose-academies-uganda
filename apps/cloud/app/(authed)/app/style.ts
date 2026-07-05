import Link from "next/link";
import styled, { keyframes } from "styled-components";
import COLORS from "@/styles/colors";

const enter = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

type DashboardState = "ready" | "needs" | "empty";

export const DashboardPage = styled.main`
  min-height: 100vh;
  display: grid;
  align-items: start;
  justify-items: center;
  padding: 1.38rem clamp(16px, 4vw, 24px) 3rem;
  background: ${COLORS.pageWash};
`;

export const DashboardHomeShell = styled.section`
  width: min(100%, 67.5rem);
  display: flex;
  flex-direction: column;
  gap: 1.05rem;
`;

export const DashboardHeader = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 680px) {
    flex-direction: column;
  }
`;

export const DashboardTitle = styled.h1`
  margin: 0 0 0.3rem;
  color: ${COLORS.veryDarkBlue};
  font-size: var(--font-h3);
  line-height: var(--lh-h3);
  font-weight: var(--font-weight-page-title);
`;

export const DashboardOverviewGrid = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(18rem, 0.65fr);
  gap: 1rem;
  align-items: stretch;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

export const DashboardHubSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const DashboardHubSectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 680px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const DashboardHubSectionTitle = styled.h2`
  margin: 0 0 0.25rem;
  color: ${COLORS.veryDarkBlue};
  font-size: 1.12rem;
  line-height: 1.25;
  font-weight: var(--font-weight-page-title);
`;

export const DashboardHubViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  color: ${COLORS.evergreen};
  font-size: 0.86rem;
  line-height: 1.3;
  font-weight: var(--font-weight-action);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const DashboardStatusCard = styled.section<{ $state: DashboardState }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.25rem;
  min-height: 13rem;
  padding: 1.25rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-left: 4px solid
    ${({ $state }) =>
      $state === "needs"
        ? COLORS.orange100
        : $state === "ready"
          ? COLORS.activeGreen
          : COLORS.gray60};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
`;

export const DashboardHubLessonsCard = styled.section`
  display: flex;
  min-height: 11.375rem;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1.25rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
`;

export const DashboardHubLessonsHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const DashboardHubLessonsList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  list-style: none;
`;

export const DashboardHubLessonItem = styled.li`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.7rem;
  min-height: 2.35rem;
  padding: 0.55rem 0;
  border-top: 1px solid ${COLORS.green20};

  &:first-child {
    border-top: none;
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

export const DashboardHubLessonLink = styled(Link)`
  min-width: 0;
  color: ${COLORS.veryDarkBlue};
  font-size: 0.9rem;
  line-height: 1.35;
  font-weight: var(--font-weight-action);
  text-decoration: none;
  overflow-wrap: anywhere;

  &:hover {
    color: ${COLORS.evergreen};
    text-decoration: underline;
  }
`;

export const DashboardHubEmptyText = styled.p`
  margin: 0;
  color: ${COLORS.gray60};
  font-size: 0.9rem;
  line-height: 1.45;
`;

export const DashboardStatusContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const DashboardStatusEyebrow = styled.div`
  color: ${COLORS.gray60};
  font-size: 0.78rem;
  line-height: 1.2;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0;
`;

export const DashboardStatusTitle = styled.h2`
  margin: 0;
  color: ${COLORS.veryDarkBlue};
  font-size: clamp(1.35rem, 2vw, 1.75rem);
  line-height: 1.15;
  font-weight: var(--font-weight-page-title);
`;

export const DashboardStatusDetail = styled.p`
  margin: 0;
  color: ${COLORS.gray60};
  font-size: 0.95rem;
  line-height: 1.45;
`;

export const DashboardStatusFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const DashboardStatusMeta = styled.span`
  color: ${COLORS.gray60};
  font-size: 0.82rem;
  line-height: 1.35;
  font-weight: var(--font-weight-action);
`;

export const DashboardMetricStrip = styled.div<{ $wide?: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.55rem;
  padding: 0.75rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};

  @media (max-width: 860px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const DashboardMetricItem = styled.article<{ $attention?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  min-height: 3.4rem;
  padding: 0.7rem 0.8rem;
  border: 1px solid
    ${({ $attention }) =>
      $attention ? COLORS.orange100 : COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${({ $attention }) =>
    $attention ? COLORS.orange20 : COLORS.pageWash};

  @media (max-width: 860px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.35rem;
  }
`;

export const DashboardMetricValue = styled.div`
  flex-shrink: 0;
  color: ${COLORS.evergreen};
  font-size: 1.35rem;
  line-height: 1;
  font-weight: var(--font-weight-page-title);
`;

export const DashboardMetricLabel = styled.div`
  color: ${COLORS.gray60};
  font-size: 0.78rem;
  line-height: 1.3;
  font-weight: var(--font-weight-action);
  text-align: right;

  @media (max-width: 860px) {
    text-align: left;
  }
`;

export const DashboardPanel = styled.section`
  padding: 1.05rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
`;

export const DashboardSectionTitle = styled.h2`
  margin: 0 0 0.75rem;
  color: ${COLORS.veryDarkBlue};
  font-size: 1rem;
  line-height: 1.3;
`;

export const DashboardActions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const DashboardActionLink = styled(Link)<{
  $hideArrow?: boolean;
}>`
  position: relative;
  min-height: 6rem;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  color: ${COLORS.evergreen};
  text-decoration: none;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;

  &::after {
    content: ${({ $hideArrow }) => ($hideArrow ? "none" : '"→"')};
    position: absolute;
    top: 0.85rem;
    right: 1rem;
    color: currentColor;
    font-size: 1.25rem;
    line-height: 1;
  }

  strong {
    display: block;
    max-width: calc(100% - 1.5rem);
    margin-bottom: 0.35rem;
    color: ${COLORS.veryDarkBlue};
    font-size: 1rem;
    line-height: 1.25;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: ${COLORS.evergreen};
    box-shadow: 0 18px 34px rgba(30, 66, 64, 0.13);
  }
`;

export const DashboardActionBadge = styled.span<{ $tone?: "green" | "orange" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  background: ${({ $tone }) =>
    $tone === "orange" ? COLORS.orange20 : COLORS.green10};
  color: ${({ $tone }) =>
    $tone === "orange" ? COLORS.orange100 : COLORS.evergreen};
  font-size: 0.85rem;
  font-weight: 800;
`;

export const DashboardActionContent = styled.div`
  min-width: 0;
`;

export const DashboardActionDescription = styled.span`
  color: ${COLORS.gray60};
  font-size: 0.86rem;
  line-height: 1.35;
`;

export const SetupProgressList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;

  li {
    padding: 0.45rem 0.65rem;
    border-radius: 999px;
    background: ${COLORS.orange20};
    color: ${COLORS.orange100};
    font-size: 0.85rem;
    font-weight: var(--font-weight-action);
  }
`;

export const DashboardHubStatusPanel = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 1.05rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};

  ${DashboardSectionTitle} {
    margin-bottom: 0.2rem;
  }

  > ${DashboardStatusDetail}:last-child {
    flex: 0 0 auto;
    text-align: right;
    font-size: 0.86rem;
  }

  @media (max-width: 680px) {
    align-items: flex-start;
    flex-direction: column;

    > ${DashboardStatusDetail}:last-child {
      text-align: left;
    }
  }
`;

export const DashboardHubStatusMain = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.85rem;

  @media (max-width: 480px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const DashboardHubStatusBadge = styled.span<{ $linked: boolean }>`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 5.75rem;
  min-height: 2rem;
  padding: 0 0.7rem;
  border: 1px solid
    ${({ $linked }) => ($linked ? COLORS.green20 : COLORS.orange100)};
  border-radius: 999px;
  background: ${({ $linked }) => ($linked ? COLORS.green10 : COLORS.orange20)};
  color: ${({ $linked }) => ($linked ? COLORS.evergreen : COLORS.orange100)};
  font-size: 0.82rem;
  line-height: 1.2;
  font-weight: var(--font-weight-action);
`;

export const DashboardHubStatusText = styled.div`
  min-width: 0;
`;

export const WizardCard = styled.section`
  width: min(100%, 45rem);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 20px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadow};

  @media (max-width: 680px) {
    padding: 1.25rem;
    border-radius: 16px;
  }
`;

export const BrandRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const BrandTitle = styled.div`
  color: ${COLORS.veryDarkBlue};
  font-size: 1.25rem;
  font-weight: var(--font-weight-action);
`;

export const StepCount = styled.span`
  flex: 0 0 auto;
  padding: 0.44rem 0.7rem;
  border-radius: 999px;
  background: #edf2ef;
  color: ${COLORS.evergreen};
  font-size: 0.8125rem;
  font-weight: var(--font-weight-action);
`;

export const WelcomePanel = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding-top: 0.5rem;
  text-align: center;

  > p {
    max-width: 38.75rem;
  }
`;

export const WelcomeChecklist = styled.div`
  width: min(100%, 34rem);
  margin-top: 0.3rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  border-radius: 12px;
  background: ${COLORS.pageWash};
  color: ${COLORS.evergreen};
  line-height: 1.4;
  text-align: left;

  span {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 0.5rem;
    color: inherit;
    font-size: 0.95rem;
  }

  span::before {
    content: "✓";
    font-weight: var(--font-weight-page-title);
  }
`;

export const SetupSystemMap = styled.div`
  width: min(100%, 38rem);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.65rem;
  text-align: left;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const SetupSystemItem = styled.div`
  min-height: 7.25rem;
  padding: 0.875rem;
  border: 1px solid rgba(30, 66, 64, 0.12);
  border-radius: 10px;
  background: ${COLORS.white};
  box-shadow: 0 8px 20px rgba(30, 66, 64, 0.05);

  strong {
    display: block;
    margin-bottom: 0.35rem;
    color: ${COLORS.evergreen};
    font-size: 0.92rem;
    line-height: 1.25;
  }

  span {
    display: block;
    color: ${COLORS.gray60};
    font-size: 0.83rem;
    line-height: 1.35;
  }
`;

export const HeroIcon = styled.div`
  width: 4rem;
  height: 4rem;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: ${COLORS.green10};
  color: ${COLORS.evergreen};
  font-size: 2.125rem;
  font-weight: 900;
`;

export const ProgressList = styled.ol<{ $count: number }>`
  position: relative;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(${({ $count }) => $count}, minmax(0, 1fr));
  list-style: none;

  &::before {
    position: absolute;
    top: 1rem;
    right: 10%;
    left: 10%;
    height: 2px;
    background: ${COLORS.green20};
    content: "";
  }

  @media (max-width: 720px) {
    grid-template-columns: repeat(
      ${({ $count }) => $count},
      minmax(4.6rem, 1fr)
    );
    overflow-x: auto;
    padding-bottom: 0.35rem;

    &::before {
      right: 2.3rem;
      left: 2.3rem;
    }
  }
`;

export const ProgressItem = styled.li<{
  $active?: boolean;
  $done?: boolean;
}>`
  position: relative;
  min-width: 0;
  color: ${({ $active, $done }) =>
    $active || $done ? COLORS.evergreen : COLORS.gray60};
  text-align: center;
  --circle-border: ${({ $active, $done }) =>
    $active || $done ? COLORS.evergreen : COLORS.green20};
  --circle-bg: ${({ $active, $done }) =>
    $active ? COLORS.white : $done ? COLORS.evergreen : COLORS.white};
  --circle-color: ${({ $active, $done }) =>
    $active ? "inherit" : $done ? COLORS.white : "inherit"};
  --circle-shadow: ${({ $active }) =>
    $active ? "0 0 0 4px rgba(30, 66, 64, 0.1)" : "none"};
`;

export const ProgressStepButton = styled.button`
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  text-align: center;

  span {
    width: 2rem;
    height: 2rem;
    display: grid;
    place-items: center;
    border: 2px solid var(--circle-border);
    border-radius: 50%;
    background: var(--circle-bg);
    color: var(--circle-color);
    font-size: 0.82rem;
    font-weight: var(--font-weight-page-title);
    box-shadow: var(--circle-shadow);
  }

  small {
    width: 100%;
    min-height: 2.4rem;
    color: inherit;
    font-size: 0.76rem;
    font-weight: var(--font-weight-section-title);
    line-height: 1.2;
    overflow-wrap: anywhere;
  }
`;

export const CurrentStepCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-top: 0.5rem;
  animation: ${enter} 180ms ease-out;
`;

export const StepBadge = styled.span`
  display: inline-flex;
  color: ${COLORS.evergreen};
  font-size: 0.8125rem;
  font-weight: var(--font-weight-action);
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const CurrentStepTitle = styled.h2`
  margin: 0;
  color: ${COLORS.veryDarkBlue};
  font-size: clamp(1.875rem, 6vw, 2.625rem);
  line-height: 1.08;
`;

export const CurrentStepText = styled.p`
  margin: 0;
  color: #606764;
  font-size: 1.125rem;
  line-height: 1.5;
`;

export const OrientationCard = styled.div`
  padding: 0.875rem 1rem;
  border: 1px solid rgba(30, 66, 64, 0.12);
  border-radius: 10px;
  background: #f7faf7;
  color: #4d5451;
  line-height: 1.45;

  strong {
    display: block;
    margin-bottom: 0.25rem;
    color: ${COLORS.evergreen};
    font-size: 0.95rem;
  }

  span {
    display: block;
    font-size: 0.92rem;
  }
`;

export const InstructionList = styled.ol`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  list-style: none;

  li {
    display: grid;
    grid-template-columns: 2rem minmax(0, 1fr);
    align-items: center;
    gap: 0.625rem 0.75rem;
    padding: 1.125rem;
    border-radius: 12px;
    background: ${COLORS.pageWash};
  }

  li > span {
    width: 1.875rem;
    height: 1.875rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: #dfe8df;
    color: ${COLORS.evergreen};
    font-size: 0.8125rem;
    font-weight: var(--font-weight-page-title);
  }
`;

export const InstructionText = styled.p`
  margin: 0;
  color: #4d5451;
  font-size: 1rem;
  line-height: 1.45;
`;

export const InlineCode = styled.code`
  display: inline-flex;
  align-items: center;
  min-height: 1.55rem;
  margin: 0 0.08rem;
  padding: 0.05rem 0.42rem;
  border: 1px solid rgba(30, 66, 64, 0.16);
  border-radius: 6px;
  background: ${COLORS.white};
  color: ${COLORS.evergreen};
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.9em;
  font-weight: 800;
  white-space: nowrap;
`;

export const HelperCard = styled.p`
  margin: 0;
  padding: 0.875rem 1rem;
  border-radius: 9px;
  background: #f4f5f7;
  color: #4d5451;
  font-size: 1rem;
  line-height: 1.45;
`;

export const SafetyCard = styled.p`
  margin: 0;
  padding: 0.875rem 1rem;
  border: 1px solid rgba(104, 115, 91, 0.18);
  border-radius: 9px;
  background: #fbfcf7;
  color: #4d5451;
  font-size: 0.95rem;
  line-height: 1.45;
`;

export const StepActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
`;

export const StepNavRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 0.25rem;
`;

export const PairingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 1.125rem;
  border: 1px solid rgba(30, 66, 64, 0.08);
  border-radius: 12px;
  background: ${COLORS.white};
  box-shadow: 0 10px 24px rgba(30, 66, 64, 0.06);
`;

export const ClassroomForm = styled(PairingForm)``;

export const PairingLabel = styled.label`
  color: ${COLORS.veryDarkBlue};
  font-size: 1rem;
  font-weight: var(--font-weight-section-title);
`;

export const PairingInput = styled.input`
  width: 100%;
  min-height: 3.25rem;
  padding: 0 0.875rem;
  border: 1px solid #cdd4d1;
  border-radius: 9px;
  background: ${COLORS.white};
  color: ${COLORS.veryDarkBlue};
  font: inherit;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-weight: 700;
  letter-spacing: 0.04em;

  &:focus {
    outline: 3px solid rgba(30, 66, 64, 0.18);
    border-color: ${COLORS.evergreen};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

export const InputActionRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.625rem;
  align-items: center;
`;

export const PairingHelp = styled.p`
  margin: 0;
  color: #606764;
  font-size: 0.875rem;
  line-height: 1.45;
`;

export const PairingError = styled.p`
  margin: 0;
  padding: 0.875rem 1rem;
  border-radius: 9px;
  background: ${COLORS.rose10};
  color: ${COLORS.rose100};
  font-size: 0.92rem;
  line-height: 1.45;
`;

export const ClassroomCode = styled.p`
  margin: 0;
  padding: 0.875rem 1rem;
  border-radius: 9px;
  background: #edf6ee;
  color: ${COLORS.activeGreen};
  font-size: 0.95rem;
  line-height: 1.45;
`;

export const SyncStepStatus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem;
  border: 1px solid rgba(30, 66, 64, 0.08);
  border-radius: 12px;
  background: ${COLORS.pageWash};
  color: #4d5451;
  font-size: 0.95rem;
  line-height: 1.45;

  strong {
    color: ${COLORS.evergreen};
    font-size: 1rem;
  }

  span {
    overflow-wrap: anywhere;
  }
`;

export const SyncInlineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 19rem), 1fr));
  gap: 1rem;
  align-items: stretch;

  > * {
    min-width: 0;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const PrimaryLink = styled(Link)`
  min-height: 3.25rem;
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 0 1.25rem;
  border-radius: 9px;
  background: ${COLORS.evergreen};
  color: ${COLORS.white};
  font-weight: var(--font-weight-action);
  text-decoration: none;
`;

export const PrimaryButton = styled.button`
  min-height: 3.25rem;
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 0 1.25rem;
  border: 0;
  border-radius: 9px;
  background: ${COLORS.evergreen};
  color: ${COLORS.white};
  font: inherit;
  font-weight: var(--font-weight-action);
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const SecondaryLink = styled(Link)`
  min-height: 3.25rem;
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 0 1.25rem;
  border: 1px solid rgba(30, 66, 64, 0.14);
  border-radius: 9px;
  background: #edf2ef;
  color: ${COLORS.evergreen};
  font-weight: var(--font-weight-action);
  text-decoration: none;
`;

export const SecondaryInlineButton = styled.button<{ $iconOnly?: boolean }>`
  width: ${({ $iconOnly }) => ($iconOnly ? "3.25rem" : "auto")};
  min-height: 3.25rem;
  display: grid;
  align-items: center;
  justify-content: center;
  padding: ${({ $iconOnly }) => ($iconOnly ? "0" : "0 1.25rem")};
  border: 1px solid rgba(30, 66, 64, 0.14);
  border-radius: 9px;
  background: #edf2ef;
  color: ${COLORS.evergreen};
  font: inherit;
  font-weight: var(--font-weight-action);
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const StepBackButton = styled.button`
  min-height: 2.75rem;
  display: grid;
  align-items: center;
  justify-content: start;
  justify-self: start;
  margin-right: auto;
  padding: 0;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #4d5451;
  font: inherit;
  font-weight: var(--font-weight-action);
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;

export const StepNextButton = styled.button`
  min-width: 8.5rem;
  min-height: 2.75rem;
  display: grid;
  align-items: center;
  justify-content: center;
  justify-self: end;
  padding: 0 1.125rem;
  border: 0;
  border-radius: 9px;
  background: ${COLORS.evergreen};
  color: ${COLORS.white};
  font: inherit;
  font-weight: var(--font-weight-action);
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
