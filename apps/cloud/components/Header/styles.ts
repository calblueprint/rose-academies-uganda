// Styled-components for the Header. Each export corresponds to one structural
// piece of the nav bar: the outer shell, the centred content row, the logo
// block, the nav tabs, and the profile dropdown.

import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Header = styled.header`
  width: 100%;
  height: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${COLORS.white};
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.06);
`;

export const HeaderInner = styled.div`
  width: 100%;
  max-width: 67.5rem;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoAndTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4375rem;
`;

// `all: unset` strips default button appearance so the logo renders as plain
// text + image while still being keyboard-focusable and semantically a button.
export const LogoContainer = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  font-size: 1.25rem;
  font-weight: 600;
  padding: 0;
  background: none;
  order: none;
  cursor: pointer;
  text-align: left;
  img {
    height: 2.5rem;
    width: auto;
  }
  all: unset;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  text-align: left;
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

export const Title = styled.h1`
  font-family: var(--font-gilroy);
  color: var(--gray-100, #000);

  font-size: 20px;
  font-weight: 400;
  line-height: 25px;
`;

export const Subtitle = styled.h3`
  color: var(--gray-100, #000);

  font-family: var(--font-gilroy);
  font-size: 12px;
  font-weight: 400;
`;

// height: 100% lets the active tab's bottom border sit flush with the header edge.
export const Nav = styled.nav`
  display: flex;
  align-items: stretch;
  height: 100%;
`;

// $active uses the transient prop convention ($ prefix) so styled-components does
// not forward it to the DOM as an HTML attribute.
export const NavTab = styled.button<{ $active?: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;

  padding: 0 1.25rem;
  background: none;
  border: none;
  border-bottom: 2px solid
    ${({ $active }) => ($active ? COLORS.evergreen : "transparent")};

  color: ${({ $active }) => ($active ? COLORS.evergreen : COLORS.gray60)};
  font-family: var(--font-gilroy);
  font-size: 0.9375rem;
  font-weight: 400;
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
`;

export const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.black};
`;

// position: relative anchors the absolutely-positioned DropdownMenu to this
// wrapper rather than a distant ancestor in the page layout.
export const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
`;

export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;

  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;

  min-width: 11rem;

  background: #fff;
  border-radius: 12px;

  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;

  z-index: 100;
`;

export const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;

  padding: 0.65rem 1.25rem;

  background: none;
  border: none;

  font-family: var(--font-gilroy);
  font-size: 0.9375rem;
  color: ${COLORS.black};

  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${COLORS.gray10};
  }
`;

export const DropdownDivider = styled.hr`
  margin: 0.35rem 0;
  border: none;
  border-top: 1px solid ${COLORS.gray40};
`;
