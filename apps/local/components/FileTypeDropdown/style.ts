import styled from "styled-components";
import COLORS from "@/styles/colors";

export const FileTypeDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 2.71556rem;
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid ${COLORS.surfaceBorder};

  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
  flex-shrink: 0;
  cursor: pointer;
  user-select: none;
`;

export const FileTypeLabel = styled.span`
  color: ${COLORS.gray80};
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
  white-space: nowrap;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: ${COLORS.white};
  border-radius: 8px;
  border: 1px solid ${COLORS.surfaceBorder};
  box-shadow: ${COLORS.surfaceShadowSoft};
  overflow: hidden;
  z-index: 100;
  min-width: 100%;
`;

export const DropdownOption = styled.button<{ $selected: boolean }>`
  display: block;
  width: 100%;
  padding: 0.625rem 1.3rem;
  text-align: left;
  background: ${({ $selected }) =>
    $selected ? COLORS.pageWash : COLORS.white};
  border: none;
  cursor: pointer;
  font-family: var(--font-primary);
  font-size: 1rem;
  color: ${({ $selected }) => ($selected ? COLORS.evergreen : COLORS.gray80)};
  font-weight: ${({ $selected }) => ($selected ? 650 : 500)};
  white-space: nowrap;

  &:hover {
    background: ${COLORS.pageWash};
  }
`;
