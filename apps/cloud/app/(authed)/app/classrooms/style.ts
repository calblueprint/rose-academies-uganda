import Link from "next/link";
import styled from "styled-components";
import COLORS from "@/styles/colors";

export const PageContainer = styled.main`
  width: 100%;
  max-width: 67.5rem;
  margin: 0 auto;
  padding: 1.38rem clamp(16px, 4vw, 24px) 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Title = styled.h1`
  margin: 0;
  color: ${COLORS.gray100};
  font-size: var(--font-h3);
  line-height: var(--lh-h3);
  font-weight: var(--font-weight-page-title);
`;

export const MutedText = styled.p`
  margin: 0;
  color: ${COLORS.gray60};
  font-size: 0.95rem;
  line-height: 1.45;
`;

export const Field = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const FieldLabel = styled.label`
  color: ${COLORS.gray80};
  font-size: 0.875rem;
  font-weight: 600;
`;

export const FieldHint = styled.span`
  color: ${COLORS.gray60};
  font-size: 0.78rem;
  line-height: 1.35;
`;

export const CreateClassroomModalIntro = styled.p`
  margin: -0.25rem 0 0;
  color: ${COLORS.gray60};
  font-size: 0.92rem;
  line-height: 1.45;
`;

export const CreateClassroomForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CreateClassroomModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding-top: 0.25rem;

  @media (max-width: 520px) {
    justify-content: flex-start;
  }
`;

export const Input = styled.input`
  width: 100%;
  min-width: 0;
  height: 2.75rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  padding: 0 0.75rem;
  color: ${COLORS.gray100};
  background: ${COLORS.white};
  font-family: var(--font-primary);
  font-size: 0.95rem;

  &:focus {
    outline: 2px solid ${COLORS.green20};
    border-color: ${COLORS.evergreen};
  }
`;

export const JoinCodeFieldRow = styled.div`
  display: inline-grid;
  grid-template-columns: minmax(0, 7rem) auto;
  align-items: center;
  gap: 0.45rem;
  max-width: 100%;
`;

export const JoinCodeInput = styled(Input)`
  width: 7rem;
  max-width: 100%;
  text-align: center;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
`;

export const PrimaryButton = styled.button<{ $compact?: boolean }>`
  min-width: ${({ $compact }) => ($compact ? "4.25rem" : "9.75rem")};
  min-height: ${({ $compact }) => ($compact ? "2rem" : "2.75rem")};
  border: none;
  border-radius: 8px;
  padding: ${({ $compact }) => ($compact ? "0 0.7rem" : "0 1rem")};
  color: ${COLORS.white};
  background: ${COLORS.evergreen};
  font-family: var(--font-primary);
  font-size: ${({ $compact }) => ($compact ? "0.82rem" : "0.9rem")};
  cursor: pointer;
  white-space: nowrap;

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const ActionButton = styled.button<{
  $compact?: boolean;
  $inline?: boolean;
}>`
  min-width: ${({ $compact, $inline }) =>
    $compact ? "2rem" : $inline ? "4.25rem" : "6.75rem"};
  width: ${({ $compact }) => ($compact ? "2rem" : "auto")};
  min-height: ${({ $compact, $inline }) =>
    $compact || $inline ? "2rem" : "2.75rem"};
  border: 1px solid
    ${({ $compact }) => ($compact ? "transparent" : COLORS.surfaceBorder)};
  border-radius: 8px;
  padding: ${({ $compact, $inline }) =>
    $compact ? "0" : $inline ? "0 0.7rem" : "0 1rem"};
  color: ${({ $compact }) => ($compact ? COLORS.gray60 : COLORS.gray80)};
  background: ${({ $compact }) => ($compact ? "transparent" : COLORS.white)};
  font-family: var(--font-primary);
  font-size: ${({ $inline }) => ($inline ? "0.82rem" : "0.9rem")};
  cursor: pointer;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${COLORS.evergreen};
    color: ${COLORS.evergreen};
    background: ${COLORS.white};
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const DangerIconButton = styled(ActionButton)`
  &:hover:not(:disabled) {
    border-color: ${COLORS.rose100};
    color: ${COLORS.rose100};
  }
`;

export const ErrorText = styled.p`
  margin: 0.75rem 0 0;
  color: ${COLORS.rose100};
  font-size: 0.875rem;
`;

export const CodeText = styled.span`
  display: inline-flex;
  width: auto;
  max-width: 100%;
  min-height: 1.45rem;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 0.05rem 0.35rem;
  border: 1px solid rgba(30, 66, 64, 0.12);
  background: ${COLORS.white};
  color: ${COLORS.evergreen};
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0;
  box-sizing: border-box;
`;

export const CodeLabel = styled.span`
  color: ${COLORS.gray60};
  font-size: 0.76rem;
  font-weight: var(--font-weight-action);
  line-height: 1.2;
`;

export const CodeDisplay = styled.div`
  width: auto;
  display: inline-flex;
  justify-content: flex-start;
  gap: 0.45rem;
  align-items: center;
  flex-wrap: wrap;
  min-width: 0;
  padding: 0;
  box-sizing: border-box;
`;

export const EditFieldError = styled.span`
  flex-basis: 100%;
  color: ${COLORS.rose100};
  font-size: 0.76rem;
  line-height: 1.35;
`;

export const ClassroomHeaderContent = styled.div`
  min-width: 0;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
`;

export const ClassroomNameBlock = styled.div<{ $editing?: boolean }>`
  min-width: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: ${({ $editing }) => ($editing ? "0" : "0.55rem")};
  border-left: ${({ $editing }) =>
    $editing ? "0" : `3px solid ${COLORS.evergreen}`};
`;

export const ClassroomNameTitle = styled.h2`
  margin: 0;
  color: ${COLORS.gray100};
  font-size: 1.18rem;
  line-height: 1.25;
  font-weight: 800;
  overflow-wrap: anywhere;
`;

export const ClassroomNameInput = styled(Input)`
  height: 2.45rem;
  padding: 0 0.65rem;
  color: ${COLORS.gray100};
  font-size: 1.05rem;
  font-weight: 800;
  line-height: 1.25;
`;

export const ClassroomHeaderMain = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 0.35rem;
  flex-wrap: wrap;
`;

export const ClassroomManageActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export const ClassroomEditPanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.65rem;
  padding: 0.85rem;
  border: 1px solid ${COLORS.mintGreenBorder};
  border-radius: 8px;
  background: ${COLORS.green10};
  box-sizing: border-box;

  ${Field} {
    width: 100%;
  }

  ${JoinCodeFieldRow} {
    width: auto;
  }
`;

export const EditModeLabel = styled.span`
  color: ${COLORS.evergreen};
  font-size: 0.76rem;
  line-height: 1.2;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
  border: 1px dashed rgba(30, 66, 64, 0.18);
  border-radius: 8px;
  background: ${COLORS.white};
  color: ${COLORS.gray60};
  text-align: center;
  box-shadow: none;

  strong {
    color: ${COLORS.gray100};
    font-size: 0.98rem;
    line-height: 1.35;
  }

  span {
    color: ${COLORS.gray60};
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

export const OverviewSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

export const OverviewToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex: 0 0 auto;

  > :first-child {
    max-width: 28rem;
  }

  @media (max-width: 680px) {
    align-items: stretch;
    flex-direction: column;

    > :first-child {
      max-width: none;
    }
  }
`;

export const ClassroomCountText = styled.span`
  margin-top: -0.25rem;
  color: ${COLORS.gray60};
  font-family: var(--font-primary);
  font-size: 0.9rem;
  line-height: 1.4;
  white-space: nowrap;
`;

export const ViewToggleButton = styled.div`
  min-height: 2.75rem;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 0.75rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
`;

export const ToggleDivider = styled.div`
  width: 1px;
  height: 1.5625rem;
  border-radius: 1px;
  background: ${COLORS.gray40};
`;

export const ToggleText = styled.span`
  color: inherit;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const GridToggle = styled.button<{ $active?: boolean }>`
  min-height: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ $active }) => ($active ? COLORS.evergreen : COLORS.gray60)};
  font: inherit;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${COLORS.green20};
    outline-offset: 3px;
    border-radius: 4px;
  }
`;

export const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

export const OverviewCard = styled.article`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 0.95rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
`;

export const OverviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.65rem;
  align-items: flex-start;

  @media (max-width: 560px) {
    flex-direction: column;
  }
`;

export const LessonCountPill = styled.span`
  flex: 0 0 auto;
  min-height: 1.35rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.45rem;
  border-radius: 999px;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.surfaceBorder};
  color: ${COLORS.evergreen};
  font-size: 0.74rem;
  font-weight: var(--font-weight-action);
`;

export const LessonPreviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${COLORS.green20};
`;

export const LessonPreviewSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: 1.5rem;
  margin-bottom: 0.15rem;
`;

export const LessonPreviewSectionTitle = styled.span`
  color: ${COLORS.evergreen};
  font-size: 0.82rem;
  font-weight: var(--font-weight-section-title);
  line-height: 1.25;
`;

export const OverviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ListClassroomSection = styled.article`
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(17rem, 19rem) minmax(0, 1fr);
  gap: 0.8rem;
  padding: 0.9rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ListClassroomHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.55rem;
  padding-right: 0.8rem;
  border-right: 1px solid ${COLORS.green20};

  ${ClassroomHeaderContent} {
    width: 100%;
    min-width: 0;
  }

  @media (max-width: 900px) {
    padding-right: 0;
    padding-bottom: 0.85rem;
    border-right: 0;
    border-bottom: 1px solid ${COLORS.green20};
  }
`;

export const LessonPreviewItem = styled.div<{ $variant?: "card" | "list" }>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.6rem;
  align-items: center;
  min-height: 2.5rem;
  padding: ${({ $variant }) =>
    $variant === "list" ? "0.55rem 0.65rem" : "0.6rem 0.7rem"};
  border: 1px solid rgba(30, 66, 64, 0.08);
  border-radius: 8px;
  background: ${COLORS.gray10};
  color: inherit;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background: ${COLORS.white};
    border-color: ${COLORS.green20};

    a {
      color: ${COLORS.evergreen};
    }
  }

  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr);
    align-items: flex-start;
  }
`;

export const LessonPreviewLink = styled(Link)`
  min-width: 0;
  color: inherit;
  text-decoration: none;
`;

export const LessonPreviewTitle = styled.strong`
  display: block;
  color: ${COLORS.gray100};
  font-size: 0.9rem;
  line-height: 1.3;
`;

export const LessonMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;
  color: ${COLORS.gray60};
  font-size: 0.78rem;
  white-space: nowrap;

  @media (max-width: 560px) {
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const LessonRemoveButton = styled.button`
  width: 1.65rem;
  height: 1.65rem;
  min-height: 1.65rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border: 1px solid rgba(30, 66, 64, 0.14);
  border-radius: 999px;
  padding: 0;
  background: ${COLORS.white};
  color: ${COLORS.gray60};
  font-family: var(--font-primary);
  font-size: 1rem;
  line-height: 1;
  font-weight: 800;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    border-color: ${COLORS.rose100};
    color: ${COLORS.rose100};
    outline: none;
  }
`;

export const LessonPreviewMoreButton = styled.button`
  min-height: 2.25rem;
  border: 0;
  padding: 0.45rem 0.65rem;
  background: transparent;
  color: ${COLORS.evergreen};
  font-family: var(--font-primary);
  font-size: 0.84rem;
  font-weight: var(--font-weight-action);
  text-align: left;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
    text-underline-offset: 0.16em;
    outline: none;
  }
`;
