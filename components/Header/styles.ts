import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Header = styled.header`
  width: 110%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background-color: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.veryLightGrey};
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.06);
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  font-family: var(--font-gilroy);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 23.343px;
`;
export const PageShell = styled.div`
  --gutter: 7.25rem;
`;
export const LogoAndTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4375rem;
`;

export const Logo = styled.div`
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
