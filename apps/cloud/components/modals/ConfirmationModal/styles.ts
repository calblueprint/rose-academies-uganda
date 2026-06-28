import styled from "styled-components";
import COLORS from "@/styles/colors";

/* Overlay */
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(30, 66, 64, 0.36);
  z-index: 1000;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

/* Modal */
export const ModalCard = styled.div`
  display: flex;
  width: min(100%, 31.25rem);
  padding: 2rem 2.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  box-sizing: border-box;

  border-radius: 1rem;
  border: 1px solid ${COLORS.surfaceBorder};
  background: ${COLORS.white};

  box-shadow: ${COLORS.surfaceShadow};
  backdrop-filter: blur(2px);

  @media (max-width: 520px) {
    padding: 1.5rem 1.25rem;
  }
`;

/* Title (custom spec, not tokenized) */
export const Title = styled.h2`
  align-self: stretch;
  margin: 0;

  color: ${COLORS.gray100};

  font-size: 1.5rem;
  font-weight: var(--font-weight-section-title);
  line-height: 1.2;
`;

/* Body → Body1 + gray60 */
export const Description = styled.p`
  align-self: stretch;
  margin: 0;

  color: ${COLORS.gray60};

  font-size: var(--font-body);
  line-height: var(--lh-body);
  font-weight: 400;
  white-space: pre-line;
`;

/* Buttons row */
export const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 0.5rem;
  width: 100%;

  @media (max-width: 520px) {
    align-items: stretch;
    flex-direction: column-reverse;
  }
`;

/* Cancel → Subtitle2 */
export const CancelButton = styled.button`
  display: flex;
  min-height: 3.25rem;
  padding: 0 1.5rem;
  justify-content: center;
  align-items: center;

  border-radius: 9px;
  border: 1px solid ${COLORS.surfaceBorder};
  background: ${COLORS.white};

  color: ${COLORS.gray80};

  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: 500;

  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${COLORS.evergreen};
    color: ${COLORS.evergreen};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* Confirm → Subtitle2 */
export const ConfirmButton = styled.button<{
  $variant?: "default" | "danger";
}>`
  display: flex;
  min-height: 3.25rem;
  padding: 0 1.5rem;
  justify-content: center;
  align-items: center;

  border-radius: 9px;
  border: none;
  background: ${({ $variant }) =>
    $variant === "danger" ? COLORS.rose100 : COLORS.evergreen};

  color: ${COLORS.white};

  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: var(--font-weight-action);

  cursor: pointer;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
