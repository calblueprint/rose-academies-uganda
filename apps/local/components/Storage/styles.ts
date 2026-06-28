import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Card = styled.div`
  border-radius: 12px;
  border: 1px solid ${COLORS.surfaceBorder};
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
  box-sizing: border-box;

  display: flex;
  min-height: 92px;
  align-items: center;
  gap: 28px;
  width: 100%;
  max-width: 676px;
  padding: 16px 40px 16px 36px;

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
  }
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
  min-width: 0;
  width: 100%;
`;

export const StorageInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media (max-width: 520px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.25rem;
  }
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

  /* Subtitle 2 */
  font-family: var(--font-primary);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
