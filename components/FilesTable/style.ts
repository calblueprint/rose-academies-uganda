import styled from "styled-components";

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1 0 0;
  width: 100%;
  border-radius: 1rem;
  background-color: #ffffff;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
  overflow: hidden;
  padding: 0 0.625rem;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-family: var(--font-gilroy);
  font-size: 0.875rem;
`;

export const HeadRow = styled.tr`
  /* Figma header is white, card-like */
  background-color: #ffffff;
`;

export const HeadCell = styled.th<{ $isSortable?: boolean }>`
  height: 3.375rem; 
  padding: 0 0.5625rem;
  text-align: left;
  color: #000;
  font-family: var(--font-gilroy);
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;
  text-transform: capitalize;

  cursor: ${p => (p.$isSortable ? "pointer" : "default")};
  user-select: none;
  white-space: nowrap;

  /* TODO: this is used for column widths but very rough */
  &:nth-child(1) {
    width: 40%; 
    padding-left: 1rem;
    padding-right: 0.75rem;
  }

  &:nth-child(2) {
    width: 18%;

  &:nth-child(3) {
    width: 18%;
  }

  &:nth-child(4) {
    width: 14%;
  }

  &:nth-child(5) {
    width: 10%; 
    text-align: right;
    padding-right: 1rem;
  }
`;

export const BodyRow = styled.tr`
  height: 3.375rem; /* Figma row height */
  border-top: 1px solid #e5e7eb;
  cursor: pointer;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const BodyCell = styled.td`
  padding: 0.75rem 1.75rem 0.75rem 1rem;
  color: #4b4a49;
  font-family: var(--font-gilroy);
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  vertical-align: middle;

  &:first-child {
    padding-left: 1rem;
  }

  &:last-child {
    padding-right: 1rem;
    text-align: right;
  }
`;

export const FileNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  padding: 0.5rem;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.3125rem;
  background: #9eb0bd;
  flex-shrink: 0;
  width: 1.5625rem;
  height: 1.5625rem;
  box-sizing: content-box;
`;

export const DownloadIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.0125rem;
  height: 1.125rem;
`;
