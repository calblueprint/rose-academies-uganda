import styled from "styled-components";
import COLORS from "@/styles/colors";
import { Body, H6, Subtitle2 } from "@/styles/text";

const FILE_TABLE_COLUMNS =
  "1rem 1rem minmax(0, 1.35fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 0.75fr)";

const TABLE_LINE_LEFT = "1.03131rem";
const TABLE_LINE_RIGHT = "1.80481rem";
const TABLE_LINE_COLOR = COLORS.gray40;

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
  background: ${COLORS.white};
  box-shadow:
    0 738.424px 207.295px 0 rgba(145, 145, 145, 0),
    0 472.344px 188.731px 0 rgba(145, 145, 145, 0.01),
    0 266.08px 159.854px 0 rgba(145, 145, 145, 0.05),
    0 118.602px 118.602px 0 rgba(145, 145, 145, 0.09),
    0 29.908px 64.973px 0 rgba(145, 145, 145, 0.1);
`;

export const StatusText = styled(Body).attrs({
  $color: COLORS.gray60,
})`
  padding: 0 1.125rem;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
`;

export const TableHead = styled.thead`
  tr {
    display: grid;
    grid-template-columns: ${FILE_TABLE_COLUMNS};
    align-items: center;
    padding: 1.125rem 1.80481rem 1.125rem 1.03131rem;
    position: relative;
    background: ${COLORS.white};
    column-gap: 1rem;
  }

  tr::after {
    content: "";
    position: absolute;
    left: ${TABLE_LINE_LEFT};
    right: ${TABLE_LINE_RIGHT};
    bottom: 0;
    height: 1px;
    background: ${TABLE_LINE_COLOR};
  }
`;

export const HeaderCell = styled.th<{ $align?: "left" | "right" | "center" }>`
  text-align: ${({ $align = "left" }) => $align};
  padding: 0;
`;

export const HeaderText = styled(H6).attrs({
  $color: COLORS.gray100,
})``;

export const SortButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
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
    grid-template-columns: ${FILE_TABLE_COLUMNS};
    align-items: center;
    min-height: 3.48338rem;
    padding: 1.03131rem 1.80481rem 1.03131rem 1.03131rem;
    position: relative;
    background: ${COLORS.white};
    transition: background-color 0.15s ease;
    column-gap: 1rem;
  }

  tr::before,
  tr::after {
    content: "";
    position: absolute;
    left: ${TABLE_LINE_LEFT};
    right: ${TABLE_LINE_RIGHT};
    height: 1px;
    background: ${TABLE_LINE_COLOR};
  }

  tr::before {
    top: 0;
  }

  tr::after {
    bottom: 0;
  }

  tr:hover {
    background: ${COLORS.whiteSmoke};
  }
`;

export const BodyCell = styled.td<{ $align?: "left" | "right" | "center" }>`
  padding: 0;
  text-align: ${({ $align = "left" }) => $align};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const BodyText = styled(Body).attrs({
  $color: COLORS.veryDarkBlue,
})`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FileNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

export const FileNameText = styled(Body).attrs({
  $color: COLORS.gray100,
})`
  display: block;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  accent-color: ${COLORS.gray60};
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
  display: grid;
  grid-template-columns: ${FILE_TABLE_COLUMNS};
  padding: 1.03131rem 1.80481rem 1.03131rem 1.03131rem;
  align-items: center;
  align-self: stretch;
  position: relative;
  background: ${COLORS.white};
  column-gap: 1rem;

  &::before {
    content: "";
    position: absolute;
    left: ${TABLE_LINE_LEFT};
    right: ${TABLE_LINE_RIGHT};
    top: 0;
    height: 1px;
    background: ${TABLE_LINE_COLOR};
  }
`;

export const FooterText = styled(Subtitle2).attrs({
  $color: COLORS.gray60,
})<{ $column?: "selection" | "size" }>`
  grid-column: ${({ $column = "selection" }) =>
    $column === "size" ? "6" : "1 / span 3"};
  justify-self: ${({ $column = "selection" }) =>
    $column === "size" ? "end" : "start"};
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

export const Title = styled(H6).attrs({
  $color: COLORS.veryDarkBlue,
})``;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ActionButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
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

export const EmptyText = styled(Body).attrs({
  $color: COLORS.gray60,
})``;
