import styled from "styled-components";
import COLORS from "@/styles/colors";

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1 0 0;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid ${COLORS.surfaceBorder};
  background-color: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
  overflow-x: auto;
  padding: 0 0.5rem;
  box-sizing: border-box;
`;

export const StyledTable = styled.table`
  width: 100%;
  min-width: 44rem;
  border-collapse: collapse;
  table-layout: fixed;
  font-family: var(--font-primary);
  font-size: 0.875rem;
  color: ${COLORS.gray80};
`;

export const HeadRow = styled.tr`
  background-color: ${COLORS.white};
  height: 3.375rem;
`;

export const HeadCell = styled.th<{ $isSortable?: boolean }>`
  padding: 1rem 0.75rem;
  text-align: left;
  color: ${COLORS.gray100};
  font-weight: var(--font-weight-section-title);
  line-height: 110%;
  text-transform: capitalize;

  cursor: ${p => (p.$isSortable ? "pointer" : "default")};
  user-select: none;
  white-space: nowrap;

  &:first-child {
    padding-left: 1.5rem;
  }

  &:last-child {
    padding-right: 1rem;
    text-align: right;
  }
`;

export const BodyRow = styled.tr`
  border-top: 1px solid ${COLORS.green20};
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.pageWash};
  }
`;

export const BodyCell = styled.td`
  padding: 0.75rem 0.75rem;
  line-height: 150%;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;

  &:first-child {
    padding-left: 1rem;
    /* smaller vertical padding to compensate for taller icon */
    padding-top: 0.4375rem;
    padding-bottom: 0.4375rem;
  }

  &:last-child {
    padding-right: 1.5rem;
    text-align: right;
  }
`;

export const FileNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

export const FileName = styled.span`
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const FileIconFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.3125rem;
  background: ${COLORS.evergreen};
  flex-shrink: 0;
`;

export const DownloadIcon = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  color: ${COLORS.gray80};
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  svg {
    width: 1.0125rem;
    height: 1.125rem;
  }

  &:hover {
    background-color: ${COLORS.green20};
    color: ${COLORS.evergreen};
  }
`;
