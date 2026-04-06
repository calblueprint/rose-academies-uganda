import styled from "styled-components";
import COLORS from "@/styles/colors";

/* Overlay stays the same pattern as your other modals */
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;
`;

/* Main modal card (matches Figma) */
export const ModalCard = styled.div`
  display: flex;
  width: 31.25rem;
  padding: 2rem 2.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  border-radius: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${COLORS.white};

  box-shadow: 20px 20px 20px 0 rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(2px);
`;

/* Title */
export const Title = styled.h2`
  align-self: stretch;

  margin: 0;

  font-family: "Google Sans", sans-serif;
  font-size: 1.5rem;
  font-weight: 500;

  color: ${COLORS.black ?? "#000"};
`;

/* Description */
export const Description = styled.p`
  align-self: stretch;

  margin: 0;

  font-family: "Google Sans", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;

  color: ${COLORS.gray60 ?? "#808582"};
`;

/* Button row */
export const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 0.5rem;
  width: 100%;
`;

/* Cancel button */
export const CancelButton = styled.button`
  display: flex;
  padding: 0.75rem 1.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 0.5rem;
  border: 1px solid ${COLORS.gray40};
  background: ${COLORS.white};

  font-family: "Google Sans", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.black ?? "#000"};

  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${COLORS.veryDarkBlue};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* Confirm button */
export const ConfirmButton = styled.button`
  display: flex;
  padding: 0.75rem 1.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 0.5rem;
  border: none;
  background: ${COLORS.evergreen};

  font-family: "Google Sans", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.white};

  cursor: pointer;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
