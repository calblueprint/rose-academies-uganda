import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Header = styled.header`
  width: 100%;
  min-height: 4.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 clamp(16px, 4vw, 48px);
  background: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.surfaceBorder};
  box-shadow: ${COLORS.surfaceShadowSoft};
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 13px 24px;
  }
`;

export const HeaderInner = styled.div`
  width: 100%;
  max-width: 80rem;
  height: 100%;
  min-height: 4.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-width: 0;

  @media (max-width: 760px) {
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    padding: 0.85rem 0;
  }
`;

export const PageShell = styled.div`
  --gutter: 7.25rem;
`;

export const LogoAndTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4375rem;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;

  font-size: 1.25rem;
  font-weight: 600;
  color: ${COLORS.gray100};

  img {
    height: 2.5rem;
    width: auto;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  min-width: 0;

  @media (max-width: 768px) {
    width: 100%;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 0.5rem;
  }
`;

export const Content = styled.div`
  flex: 1;
  width: 100%;
  padding: 1.5rem 2rem;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  margin: 0;
  color: ${COLORS.gray100};
  font-size: clamp(14px, 2vw, 20px);
  font-weight: var(--font-weight-action);
  line-height: 1.15;
  overflow-wrap: anywhere;
`;

export const Subtitle = styled.p`
  margin: 0.15rem 0 0;
  color: ${COLORS.evergreen};
  font-family: var(--font-primary);
  font-size: 0.78rem;
  font-weight: var(--font-weight-section-title);
  line-height: 1.25;

  @media (max-width: 520px) {
    display: none;
  }
`;
