import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Container = styled.main`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background:
    radial-gradient(
      circle at top left,
      rgba(222, 227, 209, 0.78),
      transparent 34rem
    ),
    ${COLORS.pageWash};
`;

export const Card = styled.section`
  width: 100%;
  max-width: 40rem;
  background: ${COLORS.white};
  border: 1px solid rgba(30, 66, 64, 0.08);
  border-radius: 1rem;
  box-shadow: 0 20px 54px rgba(30, 66, 64, 0.12);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h1`
  margin: 0;
  color: ${COLORS.black};
  font-family: var(--font-primary);
  font-size: 2rem;
  font-weight: 500;
`;

export const Description = styled.p`
  margin: 0;
  color: ${COLORS.gray60};
  font-family: var(--font-primary);
  font-size: 1.125rem;
  line-height: 1.5;
`;

export const Steps = styled.ul`
  margin: 0;
  padding-left: 1.25rem;
  color: ${COLORS.veryDarkBlue};
  font-family: var(--font-primary);
  font-size: 1rem;
  line-height: 1.5;
`;

export const HelpText = styled.p`
  margin: 0;
  padding: 0.875rem 1rem;
  border: 1px solid ${COLORS.mintGreenBorder};
  border-radius: 0.75rem;
  background: ${COLORS.mintGreen};
  color: ${COLORS.evergreen};
  font-family: var(--font-primary);
  font-size: 0.95rem;
  line-height: 1.45;
  font-weight: 600;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.5rem;
`;

export const Label = styled.label`
  color: ${COLORS.veryDarkBlue};
  font-family: var(--font-primary);
  font-size: 1rem;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  min-height: 3.25rem;
  padding: 0 1rem;
  border: 1px solid ${COLORS.gray40};
  border-radius: 0.5rem;
  color: ${COLORS.evergreen};
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: clamp(1.2rem, 4vw, 1.6rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  &:focus {
    outline: 3px solid rgba(30, 66, 64, 0.18);
    border-color: ${COLORS.evergreen};
  }
`;

export const Button = styled.button`
  min-height: 3.25rem;
  border: 0;
  border-radius: 0.5rem;
  background: ${COLORS.evergreen};
  color: ${COLORS.white};
  font-family: var(--font-primary);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const GuideButton = styled.button`
  align-self: flex-start;
  min-height: 2.5rem;
  padding: 0 1rem;
  border: 1px solid ${COLORS.mintGreenBorder};
  border-radius: 0.5rem;
  background: ${COLORS.mintGreen};
  color: ${COLORS.evergreen};
  font-family: var(--font-primary);
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    border-color: ${COLORS.evergreen};
  }
`;

export const ErrorMessage = styled.p`
  margin: 0;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: ${COLORS.rose10};
  color: ${COLORS.rose100};
  font-family: var(--font-primary);
`;

export const SuccessMessage = styled.p`
  margin: 0;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: ${COLORS.green10};
  color: ${COLORS.activeGreen};
  font-family: var(--font-primary);
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  background: rgba(15, 23, 20, 0.48);
`;

export const ModalCard = styled.section`
  width: min(100%, 42rem);
  max-height: min(90vh, 48rem);
  overflow-y: auto;
  padding: 1.5rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: 0 24px 70px rgba(30, 66, 64, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ModalEyebrow = styled.span`
  align-self: flex-start;
  min-height: 1.75rem;
  display: inline-flex;
  align-items: center;
  padding: 0 0.75rem;
  border-radius: 999px;
  background: ${COLORS.orange20};
  color: ${COLORS.orange100};
  font-family: var(--font-primary);
  font-size: 0.78rem;
  font-weight: 800;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: ${COLORS.gray100};
  font-family: var(--font-primary);
  font-size: 1.55rem;
  line-height: 1.2;
  font-weight: 700;
`;

export const ModalBody = styled.p`
  margin: 0;
  color: ${COLORS.gray60};
  font-family: var(--font-primary);
  font-size: 1rem;
  line-height: 1.5;
`;

export const ModalSection = styled.section`
  padding: 1rem;
  border: 1px solid ${COLORS.green20};
  border-radius: 8px;
  background: ${COLORS.pageWash};

  h3 {
    margin: 0 0 0.6rem;
    color: ${COLORS.gray100};
    font-family: var(--font-primary);
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.25;
  }
`;

export const ModalStepList = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
  color: ${COLORS.gray80};
  font-family: var(--font-primary);
  font-size: 0.95rem;
  line-height: 1.45;

  li + li {
    margin-top: 0.28rem;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ModalCloseButton = styled.button`
  min-height: 2.75rem;
  padding: 0 1.25rem;
  border: 0;
  border-radius: 0.5rem;
  background: ${COLORS.evergreen};
  color: ${COLORS.white};
  font-family: var(--font-primary);
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
`;
