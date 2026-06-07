import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Header = styled.header`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 13px 48px;
  background: ${COLORS.white};
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    padding: 13px 24px;
  }
`;

export const HeaderInner = styled.div`
  width: 100%;
  max-width: 80rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

  font-size: 1.25rem;
  font-weight: 600;
  color: ${COLORS.veryDarkBlue};

  img {
    height: 2.5rem;
    width: auto;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Content = styled.div`
  flex: 1;
  width: 100%;
  padding: 1.5rem 2rem;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  // made responsive to screen sizes
  margin: 0;
  color: ${COLORS.black};
  font-size: clamp(14px, 2vw, 20px);
  font-weight: 400;
  line-height: 1.25;

  @media (max-width: 768px) {
    white-space: nowrap;
  }
`;
