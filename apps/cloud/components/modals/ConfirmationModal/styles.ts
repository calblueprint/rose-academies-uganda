import styled from "styled-components";
import COLORS from "@/styles/colors";

/* Overlay */
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;
`;

/* Modal */
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

/* Title (custom spec, not tokenized) */
export const Title = styled.h2`
  align-self: stretch;
  margin: 0;

  color: ${COLORS.gray100};

  font-size: 1.5rem;
  font-weight: 500;
  line-height: normal;
`;

/* Body → Body1 + gray60 */
export const Description = styled.p`
  align-self: stretch;
  margin: 0;

  color: ${COLORS.gray60};

  font-size: var(--font-body);
  line-height: var(--lh-body);
  font-weight: 400;
`;

/* Buttons row */
export const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 0.5rem;
  width: 100%;
`;

/* Cancel → Subtitle2 */
export const CancelButton = styled.button`
  display: flex;
  padding: 0.75rem 1.5rem;
  justify-content: center;
  align-items: center;

  border-radius: 0.5rem;
  border: 1px solid ${COLORS.gray40};
  background: ${COLORS.white};

  color: ${COLORS.black};

  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: 500;

  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${COLORS.veryDarkBlue};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* Confirm → Subtitle2 */
export const ConfirmButton = styled.button`
  display: flex;
  padding: 0.75rem 1.5rem;
  justify-content: center;
  align-items: center;

  border-radius: 0.5rem;
  border: none;
  background: ${COLORS.evergreen};

  color: ${COLORS.white};

  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: 500;

  cursor: pointer;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
