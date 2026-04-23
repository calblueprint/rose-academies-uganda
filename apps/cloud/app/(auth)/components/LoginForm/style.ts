import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Main = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${COLORS.veryLightYellow};
  padding: 4rem 1rem;
`;

export const Card = styled.div`
  display: flex;
  padding: 3.25rem 2.25rem;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  border-radius: 0.9375rem;
  background: ${COLORS.white};
  box-shadow:
    0 112px 31px 0 rgba(0, 0, 0, 0),
    0 72px 29px 0 rgba(0, 0, 0, 0.01),
    0 40px 24px 0 rgba(0, 0, 0, 0.03),
    0 18px 18px 0 rgba(0, 0, 0, 0.04),
    0 4px 10px 0 rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h1`
  margin: 0;
  text-align: center;
  color: ${COLORS.veryDarkBlue};
  font-size: var(--font-h3);
  line-height: var(--lh-h3);
  font-weight: 400;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
`;

export const Input = styled.input`
  display: flex;
  width: 23.75rem;
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

export const Button = styled.button`
  display: flex;
  width: 23.75rem;
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
  font-weight: 400;

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

  color: ${COLORS.lightGrey};

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
  width: 23.75rem;
  margin: 0;

  color: ${COLORS.red};

  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: 400;
`;
