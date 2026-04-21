import styled from "styled-components";
import COLORS from "@/styles/colors";

export const TableSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-self: stretch;
`;

export const TableCard = styled.div`
  display: flex;
  padding: 0.5rem 0;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 0.75rem;
  background: var(--white, #fff);
  box-shadow:
    0 738.424px 207.295px 0 rgba(145, 145, 145, 0),
    0 472.344px 188.731px 0 rgba(145, 145, 145, 0.01),
    0 266.08px 159.854px 0 rgba(145, 145, 145, 0.05),
    0 118.602px 118.602px 0 rgba(145, 145, 145, 0.09),
    0 29.908px 64.973px 0 rgba(145, 145, 145, 0.1);
`;

export const StatusText = styled.p`
  margin: 0;
  padding: 0 1.125rem;
  font-size: 0.875rem;
  color: ${COLORS.gray60};
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  table-layout: fixed;
`;

export const TableHead = styled.thead`
  tr {
    display: grid;
    grid-template-columns:
      3rem 3rem minmax(0, 2.2fr) minmax(0, 1.2fr) minmax(0, 1.2fr)
      minmax(0, 1fr);
    align-items: center;
    padding: 1.125rem;
    background: var(--white, #fff);
  }
`;

export const HeaderCell = styled.th<{ $align?: "left" | "right" | "center" }>`
  text-align: ${({ $align = "left" }) => $align};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${COLORS.gray60};
  padding: 0;
`;

export const SortButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  font: inherit;
  font-weight: 600;
  color: ${COLORS.gray60};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const TableBody = styled.tbody`
  tr {
    display: grid;
    grid-template-columns:
      3rem 3rem minmax(0, 2.2fr) minmax(0, 1.2fr) minmax(0, 1.2fr)
      minmax(0, 1fr);
    align-items: center;
    min-height: 3.48338rem;
    padding: 1.03131rem 1.80481rem 1.03131rem 1.03131rem;
    background: var(--white, #fff);
    border-radius: 0.75rem;
  }
`;

export const BodyCell = styled.td<{ $align?: "left" | "right" | "center" }>`
  padding: 0;
  text-align: ${({ $align = "left" }) => $align};
  font-size: 0.9375rem;
  color: ${COLORS.veryDarkBlue};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FileNameText = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
`;

export const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;

export const DragHandle = styled.button`
  width: 1.375rem;
  height: 1.375rem;
  flex-shrink: 0;
  aspect-ratio: 1 / 1;
  border: none;
  background: transparent;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
  cursor: grab;

  svg {
    width: 1.375rem;
    height: 1.375rem;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  &:active {
    cursor: grabbing;
  }
`;

export const FooterRow = styled.div`
  display: flex;
  padding: 1.03131rem;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  background: var(--white, #fff);
`;

export const FooterText = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  color: ${COLORS.gray60};
`;

export const FooterStrong = styled.span`
  color: ${COLORS.veryDarkBlue};
  font-weight: 600;
`;

export const TopControls = styled.div`
  display: flex;
  padding: 0 1.125rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  align-self: stretch;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: ${COLORS.veryDarkBlue};
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ActionButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${COLORS.gray60};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const EmptyState = styled.div`
  padding: 1.25rem 1.125rem;
  align-self: stretch;
`;

export const EmptyText = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  color: ${COLORS.gray60};
`;
