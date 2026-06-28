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

export const Section = styled.section`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
`;

export const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(12rem, 1fr) minmax(12rem, 1fr) 17.75rem;
  gap: 1rem;
  align-items: start;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
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

export const ButtonRow = styled.div`
  width: 100%;
  max-width: 17.75rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  align-self: start;
  padding-top: 1.5rem;

  @media (max-width: 760px) {
    width: 100%;
    justify-content: flex-start;
    padding-top: 0;
  }
`;

export const PrimaryButton = styled.button<{ $compact?: boolean }>`
  min-width: ${({ $compact }) => ($compact ? "5rem" : "9.75rem")};
  min-height: 2.75rem;
  border: none;
  border-radius: 8px;
  padding: 0 1rem;
  color: ${COLORS.white};
  background: ${COLORS.evergreen};
  font-family: var(--font-primary);
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const ActionButton = styled.button<{ $compact?: boolean }>`
  min-width: ${({ $compact }) => ($compact ? "2.25rem" : "6.75rem")};
  width: ${({ $compact }) => ($compact ? "2.25rem" : "auto")};
  min-height: ${({ $compact }) => ($compact ? "2.25rem" : "2.75rem")};
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  padding: ${({ $compact }) => ($compact ? "0" : "0 1rem")};
  color: ${COLORS.gray80};
  background: ${COLORS.white};
  font-family: var(--font-primary);
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${COLORS.evergreen};
    color: ${COLORS.evergreen};
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

export const DeleteActionSlot = styled.span`
  width: 2.25rem;
  min-width: 2.25rem;
  height: 2.25rem;
  flex: 0 0 auto;
`;

export const ErrorText = styled.p`
  margin: 0.75rem 0 0;
  color: ${COLORS.rose100};
  font-size: 0.875rem;
`;

export const Table = styled.table`
  --join-code-column-width: 20.75rem;

  width: 100%;
  min-width: 44rem;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  overflow: hidden;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
`;

export const TableHeader = styled.th<{
  $align?: "left" | "right";
  $contentWidth?: string;
  $width?: string;
}>`
  width: ${({ $width }) => $width ?? "auto"};
  padding: 1rem 1.125rem;
  background: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.green20};
  color: ${COLORS.gray80};
  font-size: 0.78rem;
  font-weight: 600;
  text-align: ${({ $align }) => $align ?? "left"};
  text-transform: uppercase;

  ${({ $align, $contentWidth }) =>
    $align === "right" &&
    $contentWidth &&
    `
      & > span {
        display: inline-block;
        width: ${$contentWidth};
        text-align: left;
      }
    `}
`;

export const TableRow = styled.tr`
  transition: background 0.15s ease;

  &:hover {
    background: ${COLORS.whiteSmoke};
  }
`;

export const TableCell = styled.td<{ $align?: "left" | "right" }>`
  padding: 1rem 1.125rem;
  border-bottom: 1px solid ${COLORS.green20};
  color: ${COLORS.gray80};
  font-size: 0.95rem;
  text-align: ${({ $align }) => $align ?? "left"};
  vertical-align: middle;

  ${TableRow}:last-child & {
    border-bottom: none;
  }

  strong {
    color: ${COLORS.gray100};
    font-weight: 500;
  }
`;

export const CodeText = styled.span`
  display: inline-flex;
  width: min(6rem, 100%);
  max-width: 100%;
  min-height: 2.125rem;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 0.2rem 0.7rem;
  border: 1px solid ${COLORS.mintGreenBorder};
  background: ${COLORS.mintGreen};
  color: ${COLORS.evergreen};
  box-shadow: 0 8px 18px rgba(31, 90, 42, 0.08);
  font-weight: 700;
  letter-spacing: 0;
  box-sizing: border-box;
`;

export const CodeDisplay = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 6rem) auto;
  width: var(--join-code-column-width);
  max-width: 100%;
  margin-left: auto;
  align-items: center;
  gap: 1.5rem;
  justify-content: start;
  min-width: 0;
`;

export const CodeActions = styled.div`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.35rem;
`;

export const CopiedText = styled.span<{ $visible: boolean }>`
  width: 5rem;
  color: ${COLORS.evergreen};
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: none;
  text-align: left;
  transition: opacity 0.15s ease;
`;

export const CodeEditDisplay = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 7rem) auto;
  gap: 0.75rem;
  align-items: center;
  justify-content: end;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const RowActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const EmptyState = styled.div`
  padding: 1.5rem;
  border: 1px dashed rgba(30, 66, 64, 0.18);
  border-radius: 8px;
  background: ${COLORS.white};
  color: ${COLORS.gray60};
  text-align: center;
  box-shadow: ${COLORS.surfaceShadowSoft};
`;
