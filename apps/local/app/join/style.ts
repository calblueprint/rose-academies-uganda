import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Outer = styled.main`
  display: flex;
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  background: transparent;
`;

export const Card = styled.section`
  display: flex;
  width: min(100%, 32rem);
  padding: 3rem 2rem;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 20px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadow};
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

export const LogoContainer = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 0.625rem;
`;

export const Title = styled.h1`
  color: ${COLORS.gray100};
  text-align: center;
  font-size: clamp(1.9rem, 6vw, 2.625rem);
  font-style: normal;
  font-weight: var(--font-weight-action);
  line-height: 1.08;
`;

export const Helper = styled.p`
  color: ${COLORS.gray60};
  text-align: center;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  width: min(100%, 22rem);
`;

export const CodeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;

export const CodeInputSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const CodeInput = styled.input<{ $error?: boolean }>`
  width: min(23.75rem, calc(100vw - 4rem));
  height: 3.25rem;
  background: ${COLORS.white};
  border-radius: 9px;
  border: 1px solid
    ${props => (props.$error ? COLORS.red : COLORS.surfaceBorder)};
  padding: 0 0.75rem;
  outline: none;
  font-family: var(--font-primary);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;

  &::placeholder {
    color: ${COLORS.gray60};
    font-family: var(--font-primary);
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: left;
  }

  &:focus {
    border-color: ${props => (props.$error ? COLORS.red : COLORS.evergreen)};
    box-shadow: 0 0 0 3px rgba(30, 66, 64, 0.18);
  }
`;

export const JoinButton = styled.button`
  display: flex;
  width: min(23.75rem, calc(100vw - 4rem));
  height: 3.25rem;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  border-radius: 9px;
  background: ${COLORS.evergreen};
  color: ${COLORS.white};
  text-align: center;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: var(--font-weight-action);
  line-height: normal;
  text-decoration: none;
  border: none;
  cursor: pointer;
`;

export const SetupLink = styled.a`
  color: ${COLORS.evergreen};
  font-size: 1rem;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.2rem;
`;

export const ErrorMessage = styled.p`
  width: 100%;
  color: ${COLORS.red};
  font-size: 1rem;
  line-height: 1.4;
`;
