import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Header = styled.header`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.81rem 6.5rem;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.06);
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

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const Content = styled.div`
  flex: 1;
  width: 100%;
  padding: 1.5rem 2rem;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  font-family: var(--font-gilroy);
  color: var(--gray-100, #000);
  /* Heading 5 */
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px; /* 125% */
`;

export const Subtitle = styled.h3`
  color: var(--gray-100, #000);
  /* Subtitle 3 */
  font-family: var(--font-gilroy);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const NavTab = styled.button<{ $active?: boolean }>`
  height: 100%;
  padding: 0 1.25rem;
  background: none;
  border: none;
  border-bottom: 2px solid
    ${({ $active }) => ($active ? COLORS.evergreen : "transparent")};
  color: ${({ $active }) => ($active ? COLORS.black : COLORS.gray60)};
  font-family: var(--font-gilroy);
  font-size: 0.9375rem;
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  cursor: pointer;
  transition:
    color 0.15s,
    border-color 0.15s;
`;

export const UserImg = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${COLORS.gray10};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${COLORS.gray60};
  overflow: hidden; /* so an <img> inside gets clipped to the circle */
`;

export const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.black};
`;
