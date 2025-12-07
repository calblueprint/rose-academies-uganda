import styled from "styled-components";

export type ModalVariant = "success" | "error";

/* Full-screen blurred background */
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(244, 245, 247, 0.8); /* light grey from Figma */
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

/* White card */
export const Card = styled.div<{ variant: ModalVariant }>`
  width: ${props => (props.variant === "success" ? "35.1rem" : "28.0625rem")};
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.75rem;

  background: #ffffff;
  border-radius: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.08);
  position: relative;
`;

/* X in top-right */
export const CloseButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
`;

/* Icon circle (green / red) */
export const IconCircle = styled.div<{ variant: ModalVariant }>`
  width: ${props => (props.variant === "success" ? "5.625rem" : "4.4375rem")};
  height: ${props => (props.variant === "success" ? "5.625rem" : "4.4375rem")};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${props => (props.variant === "success" ? "#F9FAF3" : "#FDF1F2")};
`;

/* Inner check / X icon – you’ll swap this for your real icon later */
export const IconGlyph = styled.span<{ variant: ModalVariant }>`
  font-size: 2rem;
  color: ${props => (props.variant === "success" ? "#1F5A2A" : "#EA6172")};
`;

/* Title text */
export const Title = styled.h3`
  margin: 0;
  text-align: center;
  font-family: Gilroy-Medium;
  font-size: 1.5rem;
  font-weight: 400;
  color: #000000;
  align-self: stretch;
`;

/* Explanation text */
export const Body = styled.p`
  margin: 0;
  text-align: center;
  font-family: Mulish;
  font-size: 1.25rem;
  font-weight: 400;
  color: #808582;
  align-self: stretch;
`;

/* Container for buttons */
export const ActionsRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.625rem;
`;

/* Buttons */
export const PrimaryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  padding: 0.875rem 3rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;

  font-family: Gilroy-Medium;
  font-size: 1rem;
  font-weight: 400;
  color: #f5f5f5;

  background: #1e4240; /* evergreen */
`;

export const SecondaryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  padding: 0.875rem 3rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;

  font-family: Gilroy-Medium;
  font-size: 1rem;
  font-weight: 400;

  background: #f4f5f7;
  color: #000000;
`;

/* Special pink primary for "Sync Again" in error modal */
export const DangerPrimaryButton = styled(PrimaryButton)`
  background: #ea6172;
`;

/* For the wifi-status helper text */
export const HelperText = styled.p`
  font-size: 0.75rem;
  color: #888888;
  margin-top: 0.5rem;
`;
