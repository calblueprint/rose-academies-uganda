import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Main = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background:
    radial-gradient(
      circle at top left,
      rgba(222, 227, 209, 0.72),
      transparent 32rem
    ),
    ${COLORS.pageWash};
  padding: 4rem 1rem;
`;

export const Card = styled.div`
  display: flex;
  width: min(100%, 30rem);
  padding: 3rem 2.25rem;
  flex-direction: column;
  align-items: center;
  gap: 1.35rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 1rem;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadow};
`;

export const TopRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const Title = styled.h1`
  margin: 0;
  text-align: center;
  color: ${COLORS.gray100};
  font-size: var(--font-h3);
  line-height: var(--lh-h3);
  font-weight: 700;
`;

export const Subtitle = styled.p`
  width: min(100%, 23.75rem);
  margin: -0.65rem 0 0;
  text-align: center;
  color: ${COLORS.gray60};
  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: 400;
`;

export const ModeSwitch = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: min(100%, 23.75rem);
  padding: 0.25rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 0.75rem;
  background: ${COLORS.pageWash};
`;

export const ModeButton = styled.button<{ $active: boolean }>`
  display: flex;
  min-height: 2.5rem;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 0.55rem;
  background: ${({ $active }) => ($active ? COLORS.white : "transparent")};
  color: ${({ $active }) => ($active ? COLORS.evergreen : COLORS.gray60)};
  box-shadow: ${({ $active }) =>
    $active ? "0 8px 18px rgba(30, 66, 64, 0.08)" : "none"};
  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: 600;
  cursor: pointer;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
`;

export const Input = styled.input`
  display: flex;
  width: min(100%, 23.75rem);
  height: 3.25rem;
  padding: 0.625rem 1rem;
  align-items: center;
  flex-shrink: 0;
  border-radius: 0.5rem;

  border-top: 1px solid ${COLORS.gray40};
  border-right: 1px solid ${COLORS.gray40};
  border-bottom: 1px solid ${COLORS.gray40};
  border-left: 1px solid ${COLORS.gray40};

  background: ${COLORS.whiteSmoke};
  color: ${COLORS.veryDarkBlue};

  font-size: var(--font-subtitle-1);
  line-height: var(--lh-subtitle-1);
  font-weight: 400;

  &::placeholder {
    color: ${COLORS.gray60};
    font-size: var(--font-subtitle-1);
    line-height: var(--lh-subtitle-1);
  }

  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${COLORS.gray40};
  }
`;

export const PasswordField = styled.div`
  position: relative;
  width: min(100%, 23.75rem);
`;

export const PasswordInput = styled(Input)`
  width: 100%;
  padding-right: 3.25rem;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  top: 50%;
  right: 0.75rem;
  display: inline-flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: ${COLORS.gray60};
  cursor: pointer;
  transform: translateY(-50%);

  &:hover {
    background: ${COLORS.whiteSmoke};
    color: ${COLORS.evergreen};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${COLORS.gray40};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const Button = styled.button`
  display: flex;
  width: min(100%, 23.75rem);
  height: 3.25rem;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  border: none;

  background: ${COLORS.evergreen};
  color: ${COLORS.white};

  font-size: var(--font-subtitle-1);
  line-height: var(--lh-subtitle-1);
  font-weight: 700;

  cursor: pointer;
  transition: opacity 0.15s ease;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const HelperText = styled.p`
  margin: 0;
  max-width: 23.75rem;
  text-align: center;

  color: ${COLORS.gray60};

  font-size: var(--font-h5);
  line-height: var(--lh-h5);
  font-weight: 400;
`;

export const Logo = styled.img`
  width: 6.125rem;
  height: 6.125rem;
  object-fit: contain;
`;

export const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const Error = styled.p`
  width: min(100%, 23.75rem);
  margin: 0;

  color: ${COLORS.red};

  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: 400;
`;

export const Success = styled.p`
  width: min(100%, 23.75rem);
  margin: 0;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  background: ${COLORS.green10};
  color: ${COLORS.activeGreen};
  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: 600;
`;

export const SuccessPanel = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
