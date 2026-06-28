// Styled-components for the Header. Each export corresponds to one structural
// piece of the nav bar: the outer shell, the centred content row, the logo
// block, the nav tabs, and the profile dropdown.

import Link from "next/link";
import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Header = styled.header`
  width: 100%;
  min-height: 4.75rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.surfaceBorder};
  box-shadow: ${COLORS.surfaceShadowSoft};
`;

export const HeaderInner = styled.div`
  width: 100%;
  max-width: 67.5rem;
  height: 100%;
  min-height: 4.75rem;
  padding: 0 1.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;

  @media (max-width: 920px) {
    min-height: auto;
    padding: 0.9rem 1rem;
    flex-wrap: wrap;
  }
`;

export const LogoAndTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4375rem;
  min-width: 0;
`;

// `all: unset` strips default button appearance so the logo renders as plain
// text + image while still being keyboard-focusable and semantically a button.
export const LogoContainer = styled(Link)`
  font-size: 1.25rem;
  font-weight: 600;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  text-decoration: none;

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
  text-decoration: none;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 920px) {
    margin-left: auto;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-width: 0;
`;

export const Title = styled.h1`
  font-family: var(--font-primary);
  color: ${COLORS.gray100};

  font-size: 1.25rem;
  font-weight: var(--font-weight-action);
  line-height: 1.15;

  @media (max-width: 520px) {
    font-size: 1.05rem;
  }
`;

export const Subtitle = styled.h3`
  color: ${COLORS.evergreen};

  font-family: var(--font-primary);
  font-size: 0.78rem;
  font-weight: var(--font-weight-section-title);
  line-height: 1.25;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 999px;
  background: ${COLORS.green10};

  @media (max-width: 920px) {
    order: 3;
    width: 100%;
    overflow-x: auto;
  }
`;

// $active uses the transient prop convention ($ prefix) so styled-components does
// not forward it to the DOM as an HTML attribute.
export const NavTab = styled(Link)<{ $active?: boolean }>`
  min-height: 2.35rem;
  display: flex;
  align-items: center;

  padding: 0 1rem;
  background: ${({ $active }) => ($active ? COLORS.white : "transparent")};
  border: none;
  border-radius: 999px;
  box-shadow: ${({ $active }) =>
    $active ? "0 6px 18px rgba(30, 66, 64, 0.1)" : "none"};

  color: ${({ $active }) => ($active ? COLORS.evergreen : COLORS.gray80)};
  font-family: var(--font-primary);
  font-size: 0.9375rem;
  font-weight: var(--font-weight-section-title);
  cursor: pointer;
  text-decoration: none;

  transition:
    background 0.15s,
    box-shadow 0.15s,
    color 0.15s,
    transform 0.15s;

  &:hover {
    color: ${COLORS.evergreen};
  }

  @media (max-width: 520px) {
    padding: 0 0.85rem;
  }
`;

export const UserImg = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;

  background-color: ${COLORS.green10};
  border: 1px solid ${COLORS.green20};

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.8rem;
  font-weight: 600;
  color: ${COLORS.evergreen};
`;

export const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.gray80};
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
  gap: 0.65rem;

  min-height: 2.5rem;
  padding: 0.25rem 0.5rem 0.25rem 0.25rem;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 999px;
  box-shadow: 0 8px 24px rgba(30, 66, 64, 0.06);
  cursor: pointer;

  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    background: ${COLORS.green10};
    border-color: ${COLORS.green20};
    box-shadow: 0 10px 28px rgba(30, 66, 64, 0.08);
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;

  min-width: 17rem;

  background: ${COLORS.white};
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;

  box-shadow: ${COLORS.surfaceShadowSoft};
  padding: 0.5rem;

  z-index: 100;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;

  background: rgba(0, 0, 0, 0.45);
`;

export const ReplaceHubModal = styled.form`
  width: 100%;
  max-width: 31.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;

  background: ${COLORS.white};
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 1rem;
  box-shadow: ${COLORS.surfaceShadow};
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: ${COLORS.gray100};
  font-family: var(--font-primary);
  font-size: 1.5rem;
  font-weight: var(--font-weight-section-title);
`;

export const ModalDescription = styled.p`
  margin: 0;
  color: ${COLORS.gray60};
  font-family: var(--font-primary);
  font-size: 1rem;
  line-height: 1.5;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.25rem;
`;

export const SecondaryButton = styled.button`
  min-height: 2.75rem;
  padding: 0 1.25rem;

  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 0.5rem;
  background: ${COLORS.white};

  color: ${COLORS.gray80};
  font-family: var(--font-primary);
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${COLORS.evergreen};
    color: ${COLORS.evergreen};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const PrimaryButton = styled.button`
  min-height: 2.75rem;
  padding: 0 1.25rem;

  border: none;
  border-radius: 0.5rem;
  background: ${COLORS.evergreen};

  color: ${COLORS.white};
  font-family: var(--font-primary);
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const DeviceSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.65rem 0.75rem;
`;

export const DeviceLabel = styled.span`
  color: ${COLORS.gray60};
  font-family: var(--font-primary);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`;

export const DeviceValue = styled.span<{ $empty?: boolean }>`
  align-self: flex-start;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  background: ${({ $empty }) => ($empty ? COLORS.orange20 : COLORS.mintGreen)};
  color: ${({ $empty }) => ($empty ? COLORS.orange100 : COLORS.evergreen)};
  font-family: var(--font-primary);
  font-size: 0.875rem;
  line-height: 1.35;
  font-weight: var(--font-weight-section-title);
  overflow-wrap: anywhere;
`;

export const PairingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: 0.65rem 0.75rem 0.75rem;
`;

export const PairingLabel = styled.label`
  color: ${COLORS.gray80};
  font-family: var(--font-primary);
  font-size: 0.8125rem;
  font-weight: 500;
`;

export const PairingInput = styled.input`
  width: 100%;
  height: 2.35rem;
  padding: 0 0.7rem;

  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};

  color: ${COLORS.gray100};
  font-family: var(--font-primary);
  font-size: 0.9375rem;
  letter-spacing: 0.04em;

  &:focus {
    outline: none;
    border-color: ${COLORS.evergreen};
    box-shadow: 0 0 0 3px rgba(28, 94, 67, 0.12);
  }
`;

export const PairingHelp = styled.p`
  margin: 0;
  color: ${COLORS.gray60};
  font-family: var(--font-primary);
  font-size: 0.8125rem;
  line-height: 1.35;
`;

export const PairingError = styled.p`
  margin: 0;
  color: ${COLORS.red};
  font-family: var(--font-primary);
  font-size: 0.8125rem;
  line-height: 1.35;
`;

export const PairingSuccess = styled.p`
  margin: 0;
  color: ${COLORS.evergreen};
  font-family: var(--font-primary);
  font-size: 0.8125rem;
  line-height: 1.35;
`;

export const SetupGuideSection = styled.section`
  padding: 0.85rem;
  border: 1px solid ${COLORS.green20};
  border-radius: 8px;
  background: ${COLORS.pageWash};

  h3 {
    margin: 0 0 0.5rem;
    color: ${COLORS.gray100};
    font-family: var(--font-primary);
    font-size: 0.98rem;
    font-weight: 700;
    line-height: 1.25;
  }
`;

export const SetupGuideList = styled.ul`
  margin: 0;
  padding-left: 1.15rem;
  color: ${COLORS.gray80};
  font-family: var(--font-primary);
  font-size: 0.92rem;
  line-height: 1.45;

  li + li {
    margin-top: 0.28rem;
  }
`;

export const AccountSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.65rem 0.75rem;
`;

export const AccountName = styled.span`
  color: ${COLORS.gray100};
  font-family: var(--font-primary);
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.25;
`;

export const AccountMeta = styled.span`
  color: ${COLORS.gray60};
  font-family: var(--font-primary);
  font-size: 0.8125rem;
  line-height: 1.3;
  overflow-wrap: anywhere;
`;

export const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;

  padding: 0.65rem 0.75rem;

  background: none;
  border: none;
  border-radius: 8px;

  font-family: var(--font-primary);
  font-size: 0.9375rem;
  color: ${COLORS.gray80};

  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${COLORS.green10};
  }
`;

export const DropdownLink = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;

  padding: 0.65rem 0.75rem;

  background: none;
  border: none;
  border-radius: 8px;

  font-family: var(--font-primary);
  font-size: 0.9375rem;
  color: ${COLORS.gray80};

  cursor: pointer;
  text-align: left;
  text-decoration: none;
  box-sizing: border-box;

  &:hover {
    background: ${COLORS.green10};
  }
`;

export const DropdownDivider = styled.hr`
  margin: 0.35rem 0.25rem;
  border: none;
  border-top: 1px solid ${COLORS.green20};
`;
