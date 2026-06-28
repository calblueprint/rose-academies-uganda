import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Card = styled.div`
  border-radius: 12px;
  border: 1px solid ${COLORS.surfaceBorder};
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
  box-sizing: border-box;

  display: flex;
  height: 92px;
  padding: 16px 80px 16px 36px;
  justify-content: center;
  align-items: center;
  gap: 28px;
`;

export const IconWrapper = styled.div`
  display: flex;
  width: 52px;
  height: 52px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 148.571px;
  background: ${COLORS.green10};
`;

export const Content = styled.div`
  display: flex;
  gap: 7px;
  flex-direction: column;
`;

export const Title = styled.div`
  color: ${COLORS.gray100};

  /* Subtitle 1 */
  font-family: var(--font-primary);
  font-size: 18px;
  font-style: normal;
  font-weight: var(--font-weight-section-title);
  line-height: normal;
`;

export const StatusText = styled.div`
  color: ${COLORS.gray80};
  font-family: var(--font-primary);
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px; /* 125% */
`;
