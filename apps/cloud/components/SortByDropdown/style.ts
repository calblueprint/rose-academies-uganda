import styled from "styled-components";
import COLORS from "@/styles/colors";

export const SortButtonWrapper = styled.div`
  position: relative;
`;

export const SortButton = styled.button<{ $active: boolean }>`
  height: 2.5rem;
  padding: 0 1rem;
  border-radius: 999px;
  background: ${COLORS.white};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  white-space: nowrap;

  border: 1px solid ${COLORS.gray40};

  ${({ $active }) =>
    $active &&
    `
      box-shadow: 0 0 0 1px ${COLORS.evergreen};
    `}
`;

export const SortButtonLabel = styled.span`
  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  color: ${COLORS.evergreen};
  font-weight: 500;
  white-space: nowrap;
`;

export const SortDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 14rem;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.gray40};
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.08);
  padding: 0.5rem;
  z-index: 10;
`;

export const SortOption = styled.button<{ $active: boolean }>`
  width: 100%;
  border: none;
  background: ${({ $active }) => ($active ? COLORS.gray10 : COLORS.white)};
  border-radius: 0.5rem;
  padding: 0.625rem 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  cursor: pointer;
  text-align: left;

  font-size: var(--font-subtitle-3);
  line-height: var(--lh-subtitle-3);
  color: ${COLORS.evergreen};
  font-weight: 400;

  &:hover {
    background: ${COLORS.gray10};
  }
`;
