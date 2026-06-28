import styled from "styled-components";
import COLORS from "@/styles/colors";

export const SortButtonWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const SortButton = styled.button<{ $active: boolean }>`
  display: flex;
  height: 2.75rem;
  padding: 0.625rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 8px;

  border: 1px solid
    ${({ $active }) => ($active ? COLORS.evergreen : COLORS.surfaceBorder)};

  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
  cursor: pointer;
  white-space: nowrap;
`;

export const SortButtonLabel = styled.span<{ $active: boolean }>`
  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  color: ${({ $active }) => ($active ? COLORS.evergreen : COLORS.gray60)};
  font-weight: 500;
  white-space: nowrap;
`;

export const SortDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;

  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;

  background: ${COLORS.white};

  border-radius: 8px;
  border: 1px solid ${COLORS.surfaceBorder};

  box-shadow: ${COLORS.surfaceShadowSoft};
  padding: 0.5rem;
  z-index: 10;
`;

export const SortOption = styled.button<{ $active: boolean }>`
  width: 100%;
  border: none;
  background: ${({ $active }) => ($active ? COLORS.pageWash : COLORS.white)};
  border-radius: 0.5rem;
  padding: 0.625rem 0.75rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  cursor: pointer;
  text-align: left;
  white-space: nowrap;

  font-size: var(--font-subtitle-3);
  line-height: var(--lh-subtitle-3);
  color: ${COLORS.evergreen};
  font-weight: 500;

  &:hover {
    background: ${COLORS.pageWash};
  }
`;

export const ClassroomCheckbox = styled.input`
  cursor: pointer;
`;
