import styled from "styled-components";

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1 0 0;
  width: 100%;
  border-radius: 0.5rem;
  background-color: #ffffff;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
  overflow: hidden;
  padding: 0 0.5rem;
  box-sizing: border-box;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-family: var(--font-gilroy);
  font-size: 0.875rem;
  color: #4b4a49;
`;

export const HeadRow = styled.tr`
  background-color: #ffffff;
  height: 3.375rem;
`;

export const HeadCell = styled.th<{ $isSortable?: boolean }>`
  padding: 1rem 0.75rem;
  text-align: left;
  color: #000;
  font-weight: 400;
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
  border-top: 1px solid #e5e7eb;
  cursor: pointer;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const BodyCell = styled.td`
  padding: 0.75rem 0.75rem;
  line-height: 150%;
  vertical-align: middle;

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
  background: #9eb0bd;
  flex-shrink: 0;
`;

export const DownloadIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.0125rem;
  height: 1.125rem;
`;
