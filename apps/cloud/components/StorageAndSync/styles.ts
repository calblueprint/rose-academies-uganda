import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px;
  align-items: stretch;
  gap: 14px;
  min-width: 0;

  border-radius: 16px;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.surfaceBorder};
  box-shadow: ${COLORS.surfaceShadowSoft};
`;

export const Card = styled.div`
  display: flex;
  width: 100%;
  padding: 24px;
  align-items: center;
  gap: 28px;
  flex-shrink: 0;

  border-radius: 16px;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.surfaceBorder};
  box-shadow: ${COLORS.surfaceShadowSoft};
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
