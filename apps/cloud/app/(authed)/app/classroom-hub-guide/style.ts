import styled from "styled-components";
import COLORS from "@/styles/colors";

export const GuidePage = styled.main`
  width: 100%;
  max-width: 67.5rem;
  min-height: 100vh;
  margin: 0 auto;
  padding: 1.38rem 1.5rem 3rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 760px) {
    padding: 1rem 1rem 2rem;
  }
`;

export const GuideHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 1.2rem 0 0.35rem;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 1.8rem;
  padding: 0 0.75rem;
  border: 1px solid ${COLORS.mintGreenBorder};
  border-radius: 999px;
  background: ${COLORS.mintGreen};
  color: ${COLORS.evergreen};
  font-size: 0.8125rem;
  font-weight: var(--font-weight-page-title);
  line-height: 1;
`;

export const GuideTitle = styled.h1`
  margin: 0;
  color: ${COLORS.gray100};
  font-size: var(--font-h3);
  line-height: var(--lh-h3);
  font-weight: var(--font-weight-section-title);
`;

export const GuideSubtitle = styled.p`
  max-width: 42rem;
  margin: 0;
  color: ${COLORS.gray60};
  font-size: 1rem;
  line-height: 1.5;
`;

export const DiagramCard = styled.section`
  width: 100%;
  padding: 1.25rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
  box-sizing: border-box;
`;

export const SectionEyebrow = styled.span`
  color: ${COLORS.evergreen};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.2;
  text-transform: uppercase;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: ${COLORS.gray100};
  font-size: 1.1rem;
  font-weight: var(--font-weight-section-title);
  line-height: 1.25;
`;

export const SectionText = styled.p`
  margin: 0;
  color: ${COLORS.gray60};
  font-size: 0.95rem;
  line-height: 1.45;
`;

export const DiagramGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr);
  gap: 0.75rem;
  align-items: stretch;
  margin-top: 1rem;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

export const DiagramStep = styled.div`
  min-height: 9.25rem;
  padding: 1rem;
  border: 1px solid ${COLORS.green20};
  border-radius: 8px;
  background: ${COLORS.pageWash};

  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

export const DiagramLabel = styled.h3`
  margin: 0;
  color: ${COLORS.gray100};
  font-size: 1rem;
  font-weight: var(--font-weight-section-title);
  line-height: 1.25;
`;

export const DiagramConnector = styled.div`
  position: relative;
  width: 2.35rem;
  height: 2px;
  align-self: center;
  border-radius: 999px;
  background: ${COLORS.mintGreenBorder};

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -1px;
    width: 0.5rem;
    height: 0.5rem;
    border-top: 2px solid ${COLORS.mintGreenBorder};
    border-right: 2px solid ${COLORS.mintGreenBorder};
    transform: translateY(-50%) rotate(45deg);
    transform-origin: center;
  }

  @media (max-width: 820px) {
    width: 2px;
    height: 1.55rem;
    justify-self: center;

    &::after {
      top: auto;
      right: auto;
      bottom: -1px;
      left: 50%;
      transform: translateX(-50%) rotate(135deg);
    }
  }
`;

export const TermGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const TermCard = styled.article`
  display: grid;
  grid-template-columns: minmax(8.5rem, 11rem) minmax(0, 1fr);
  grid-template-areas:
    "device header"
    "device body";
  gap: 0.85rem 1rem;
  align-items: center;
  min-height: 10.5rem;
  padding: 1rem;
  border: 1px solid ${COLORS.green20};
  border-radius: 8px;
  background: ${COLORS.pageWash};

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "device"
      "body";
  }
`;

export const TermCardHeader = styled.div`
  grid-area: header;
  display: flex;
  align-items: center;
  gap: 0.55rem;
`;

export const TermDot = styled.span`
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 999px;
  background: ${COLORS.evergreen};
  box-shadow: 0 0 0 4px rgba(30, 66, 64, 0.08);
`;

export const TermTitle = styled.h3`
  margin: 0;
  color: ${COLORS.gray100};
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.25;
`;

export const TermUrl = styled.p`
  margin: 0.18rem 0 0;
  color: ${COLORS.evergreen};
  font-size: 0.82rem;
  font-weight: var(--font-weight-section-title);
  line-height: 1.25;
`;

export const TermCardBody = styled.p`
  grid-area: body;
  margin: 0;
  color: ${COLORS.gray60};
  font-size: 0.95rem;
  line-height: 1.45;
`;

export const TermDevice = styled.div<{ $variant: "dashboard" | "hub" }>`
  grid-area: device;
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $variant }) =>
    $variant === "dashboard" ? "4 / 3" : "4 / 3"};
  max-height: ${({ $variant }) => ($variant === "dashboard" ? "9rem" : "7rem")};
  align-self: center;
  justify-self: center;
  border: 2px solid ${COLORS.evergreen};
  border-radius: ${({ $variant }) =>
    $variant === "dashboard" ? "10px 10px 7px 7px" : "14px"};
  background: ${COLORS.white};
  box-shadow: 0 14px 30px rgba(30, 66, 64, 0.1);
  padding: ${({ $variant }) =>
    $variant === "dashboard" ? "0.55rem" : "0.45rem"};
  box-sizing: border-box;

  ${({ $variant }) =>
    $variant === "dashboard"
      ? `
        &::after {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          background: ${COLORS.evergreen};
          opacity: 0.9;
          bottom: -0.55rem;
          width: 3.5rem;
          height: 0.35rem;
          border-radius: 999px;
        }
      `
      : ""}
`;

export const TermScreen = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 7px;
  background: ${COLORS.green10};
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0.55rem;
  box-sizing: border-box;
`;

export const TermScreenBar = styled.div`
  width: 100%;
  height: 0.55rem;
  border-radius: 999px;
  background: ${COLORS.evergreen};
`;

export const TermScreenRow = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const TermScreenPill = styled.span`
  flex: 1;
  height: 1.15rem;
  border-radius: 6px;
  background: ${COLORS.mintGreen};
  border: 1px solid ${COLORS.mintGreenBorder};
`;

export const TermScreenLine = styled.span<{ $wide?: boolean }>`
  width: ${({ $wide }) => ($wide ? "90%" : "68%")};
  height: 0.4rem;
  border-radius: 999px;
  background: ${COLORS.green20};
`;

export const TermHubVisual = styled.div`
  grid-area: device;
  position: relative;
  width: 100%;
  max-width: 12rem;
  min-height: 10rem;
  justify-self: center;
  align-self: center;
  display: grid;
  grid-template-rows: 1fr auto;
  align-items: end;
  justify-content: center;
  padding: 0.2rem 0 0.35rem;
`;

export const TermTablet = styled.div`
  position: relative;
  z-index: 2;
  width: 10.5rem;
  aspect-ratio: 4 / 3;
  padding: 0.65rem;
  border: 3px solid #202525;
  border-radius: 18px;
  background: #202525;
  box-shadow: 0 16px 28px rgba(30, 66, 64, 0.14);
  box-sizing: border-box;
`;

export const TermTabletCamera = styled.span`
  position: absolute;
  top: 0.28rem;
  left: 50%;
  width: 0.35rem;
  height: 0.35rem;
  transform: translateX(-50%);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.42);
`;

export const TermTabletScreen = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: ${COLORS.green10};
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0.55rem;
  box-sizing: border-box;
  overflow: hidden;
`;

export const TermHubBase = styled.div`
  position: relative;
  z-index: 1;
  width: 7.4rem;
  height: 2.65rem;
  justify-self: center;
  margin-top: 0.45rem;
  perspective: 10rem;
`;

export const TermHubBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(180deg, #343a3a 0%, #171b1b 100%);
  border: 1px solid rgba(0, 0, 0, 0.55);
  box-shadow: 0 14px 24px rgba(30, 66, 64, 0.18);
  transform: rotateX(9deg);
  overflow: hidden;

  > span:first-child {
    position: absolute;
    left: 61%;
    bottom: 0.92rem;
    transform: translateX(-50%);
    color: rgba(255, 255, 255, 0.82);
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    line-height: 1;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0.25rem;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    pointer-events: none;
  }
`;

export const TermHubPort = styled.span`
  position: relative;
  top: 0.65rem;
  left: 0.7rem;
  display: inline-flex;
  width: 0.95rem;
  height: 0.42rem;
  margin-right: 0.35rem;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25);
`;

export const TermHubLight = styled.span`
  position: absolute;
  right: 0.75rem;
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 999px;
  background: ${COLORS.mintGreenBorder};
  box-shadow: 0 0 8px rgba(185, 223, 175, 0.85);

  &:nth-last-of-type(2) {
    top: 1.04rem;
  }

  &:last-of-type {
    top: 1.28rem;
    background: ${COLORS.orange100};
    box-shadow: 0 0 8px rgba(217, 119, 8, 0.5);
  }
`;

export const WorkflowGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;

  @media (max-width: 920px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const WorkflowCard = styled.article`
  position: relative;
  min-height: 15.5rem;
  padding: 1.1rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};

  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

export const StepNumber = styled.span`
  width: 2rem;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: ${COLORS.orange20};
  color: ${COLORS.orange100};
  font-size: 0.95rem;
  font-weight: 700;
`;

export const GuideList = styled.ul`
  margin: auto 0 0;
  padding-left: 1.1rem;
  color: ${COLORS.gray80};
  font-size: 0.9rem;
  line-height: 1.45;

  li + li {
    margin-top: 0.3rem;
  }
`;

export const FieldGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const FieldIcon = styled.span`
  grid-area: icon;
  min-width: 3.15rem;
  min-height: 2.2rem;
  padding: 0 0.65rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${COLORS.green10};
  border: 1px solid ${COLORS.green20};
  color: ${COLORS.evergreen};
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1;
`;

export const FieldCard = styled.article<{ $tone: "wifi" | "offline" }>`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-areas:
    "icon title"
    "icon text"
    "list list";
  gap: 0.65rem 0.85rem;
  align-items: start;
  padding: 1.15rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};

  ${SectionText} {
    grid-area: text;
  }

  ${FieldIcon} {
    background: ${({ $tone }) =>
      $tone === "wifi" ? COLORS.orange20 : COLORS.green10};
    border-color: ${({ $tone }) =>
      $tone === "wifi" ? "rgba(217, 119, 8, 0.28)" : COLORS.green20};
    color: ${({ $tone }) =>
      $tone === "wifi" ? COLORS.orange100 : COLORS.evergreen};
  }
`;

export const FieldTitle = styled.h2`
  grid-area: title;
  margin: 0;
  color: ${COLORS.gray100};
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.25;
`;

export const FieldList = styled.ul`
  grid-area: list;
  margin: 0.2rem 0 0;
  padding-left: 1.1rem;
  color: ${COLORS.gray80};
  font-size: 0.9rem;
  line-height: 1.45;

  li + li {
    margin-top: 0.32rem;
  }
`;
