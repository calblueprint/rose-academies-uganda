import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Wrapper = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 2.35rem;
  height: 2.35rem;
  padding: 0;
  border: 1px solid ${COLORS.green20};
  border-radius: 999px;
  background: ${COLORS.white};
  box-shadow: 0 8px 20px rgba(30, 66, 64, 0.06);
  color: ${COLORS.evergreen};
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.15s ease;

  &:hover {
    border-color: ${COLORS.mintGreenBorder};
    box-shadow: 0 10px 24px rgba(30, 66, 64, 0.1);
  }

  &:focus-within {
    border-color: ${COLORS.evergreen};
    box-shadow:
      0 10px 24px rgba(30, 66, 64, 0.1),
      0 0 0 3px rgba(30, 66, 64, 0.12);
  }
`;

export const Label = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const IconWrap = styled.span`
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: transparent;
  color: ${COLORS.evergreen};
  pointer-events: none;
`;

export const Select = styled.select`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  border: none;
  background: transparent;
  color: ${COLORS.evergreen};
  font-family: var(--font-primary);
  font-size: 0.875rem;
  line-height: 1;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  appearance: none;

  option {
    color: ${COLORS.gray100};
  }
`;
