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
`;

export const Card = styled.div`
  width: 28.06rem;
  height: 21.8rem;
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.75rem;

  background: ${COLORS.white};
  border-radius: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.08);
  position: relative;
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
  font-family: var(--font-gilroy);
  font-size: 1.5rem;
  font-weight: 400;
  color: ${COLORS.black};
  align-self: stretch;
`;

export const Body = styled.p`
  margin: 0;
  text-align: center;
  font-family: var(--font-gilroy);
  font-size: 1.25rem;
  font-weight: 400;
  color: ${COLORS.gray60};
  align-self: stretch;
`;

export const ActionsRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.625rem;
`;

export const ContinueButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 3rem;
  padding: 0.875rem 3rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;

  font-family: var(--font-gilroy);
  font-size: 1rem;
  font-weight: 400;
  background: ${COLORS.evergreen};
`;

export const ContinueText = styled.span`
  color: ${COLORS.white};
`;

export const TryLaterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 3rem;
  padding: 0.875rem 3rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;

  font-family: var(--font-gilroy);
  font-size: 1rem;
  font-weight: 400;

  background: ${COLORS.whiteSmoke};
  color: ${COLORS.black};
`;

export const SyncAgainButton = styled(TryLaterButton)`
  background: ${COLORS.rose80};
  color: ${COLORS.white};
`;
