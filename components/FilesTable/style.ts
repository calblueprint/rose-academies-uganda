import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  border-radius: 1rem;
  background-color: #ffffff;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
  overflow: hidden;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-gilroy);
  font-size: 0.95rem;
`;

export const HeadRow = styled.tr`
  background-color: #f9fafb;
`;

export const HeadCell = styled.th<{ $isSortable?: boolean }>`
  text-align: left;
  padding: 1rem 1.5rem;
  font-weight: 500;
  color: #6b7280;
  cursor: ${p => (p.$isSortable ? "pointer" : "default")};
  user-select: none;
`;

export const BodyRow = styled.tr`
  border-top: 1px solid #e5e7eb;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const BodyCell = styled.td`
  padding: 1rem 1.5rem;
  color: #111827;
  vertical-align: middle;
`;
