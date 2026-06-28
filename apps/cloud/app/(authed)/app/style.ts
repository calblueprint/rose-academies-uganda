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

type DashboardTone = "green" | "sage" | "rose";

const toneColor = (tone: DashboardTone) => {
  if (tone === "sage") return "#68735B";
  if (tone === "rose") return COLORS.rose100;
  return COLORS.evergreen;
};

export const DashboardPage = styled.main`
  min-height: 100vh;
  display: grid;
  align-items: start;
  justify-items: center;
  padding: 1.5rem;
  background:
    radial-gradient(
      circle at top left,
      rgba(222, 227, 209, 0.8),
      transparent 38%
    ),
    ${COLORS.pageWash};
`;

export const DashboardHomeShell = styled.section`
  width: min(100%, 67.5rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

export const DashboardStatusCard = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};

  @media (max-width: 680px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const DashboardStatusTitle = styled.h2`
  margin: 0 0 0.3rem;
  color: ${COLORS.evergreen};
  font-size: 1.05rem;
  line-height: 1.3;
`;

export const DashboardStatusDetail = styled.p`
  margin: 0;
  color: ${COLORS.gray60};
  font-size: 0.95rem;
  line-height: 1.45;
`;

export const DashboardHomeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.75rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const DashboardStatCard = styled.article<{ $tone: DashboardTone }>`
  position: relative;
  min-height: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid rgba(30, 66, 64, 0.1);
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0 0 auto 0;
    height: 0.25rem;
    background: ${({ $tone }) => toneColor($tone)};
  }
`;

export const DashboardStatValue = styled.div<{ $tone?: DashboardTone }>`
  color: ${({ $tone }) => ($tone ? toneColor($tone) : COLORS.veryDarkBlue)};
  font-size: 2rem;
  line-height: 1;
  font-weight: var(--font-weight-page-title);
`;

export const DashboardStatLabel = styled.div`
  color: ${COLORS.gray60};
  font-size: 0.85rem;
  line-height: 1.3;
  font-weight: var(--font-weight-action);
`;

export const DashboardPanel = styled.section`
  padding: 1rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: 0 14px 34px rgba(30, 66, 64, 0.09);
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
  gap: 0.75rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const DashboardActionLink = styled(Link)<{
  $hideArrow?: boolean;
}>`
  position: relative;
  min-height: 6.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1.1rem;
  border: 1px solid ${COLORS.green20};
  border-radius: 8px;
  background: ${COLORS.white};
  color: ${COLORS.evergreen};
  text-decoration: none;
  box-shadow: 0 14px 28px rgba(30, 66, 64, 0.08);
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
    max-width: calc(100% - 1.5rem);
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
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.875rem;

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
