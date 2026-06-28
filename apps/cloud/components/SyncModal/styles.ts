import styled from "styled-components";
import COLORS from "@/styles/colors";

export type ModalVariant = "success" | "error";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(244, 245, 247, 0.8);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

export const Card = styled.div`
  width: min(100%, 28.06rem);
  min-height: 21.8rem;
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.75rem;

  background: ${COLORS.white};
  border-radius: 1rem;
  border: 1px solid ${COLORS.surfaceBorder};
  box-shadow: ${COLORS.surfaceShadow};
  position: relative;
  box-sizing: border-box;

  @media (max-width: 520px) {
    padding: 2rem 1.25rem 1.5rem;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 0.625rem;
  top: 0.625rem;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 1.5rem;
  height: 1.5rem;
  padding: 0.25rem;

  border-radius: 1.8125rem;
  border: none;
  background: #f4f5f7;
  cursor: pointer;

  font-size: 0.75rem;
  line-height: 1;
  color: #000000;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h3`
  margin: 0;
  text-align: center;
  font-family: var(--font-primary);
  font-size: 1.5rem;
  font-weight: var(--font-weight-section-title);
  color: ${COLORS.gray100};
  align-self: stretch;
`;

export const Body = styled.p`
  margin: 0;
  text-align: center;
  font-family: var(--font-primary);
  font-size: 1.25rem;
  font-weight: 500;
  color: ${COLORS.gray60};
  align-self: stretch;
`;

export const ActionsRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.625rem;

  @media (max-width: 520px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const ContinueButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 3.25rem;
  padding: 0 1.5rem;
  border-radius: 9px;
  border: none;
  cursor: pointer;

  font-family: var(--font-primary);
  font-size: 1rem;
  font-weight: var(--font-weight-action);
  background: ${COLORS.evergreen};
`;

export const ContinueText = styled.span`
  color: ${COLORS.white};
`;

export const TryLaterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 3.25rem;
  padding: 0 1.5rem;
  border-radius: 9px;
  border: 1px solid ${COLORS.surfaceBorder};
  cursor: pointer;

  font-family: var(--font-primary);
  font-size: 1rem;
  font-weight: var(--font-weight-section-title);

  background: ${COLORS.white};
  color: ${COLORS.gray80};
`;

export const SyncAgainButton = styled(TryLaterButton)`
  background: ${COLORS.rose80};
  color: ${COLORS.white};
`;
