import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Outer = styled.main`
  display: flex;
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  background: ${COLORS.veryLightYellow};
`;

export const Card = styled.section`
  display: flex;
  padding: 3.5rem 2rem 3.5rem 2rem;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  border-radius: 0.9375rem;
  background: ${COLORS.white};
  box-shadow:
    0 15.9375rem 4.4375rem 0 rgba(0, 0, 0, 0),
    0 10.1875rem 4.0625rem 0 rgba(0, 0, 0, 0.01),
    0 5.75rem 3.4375rem 0 rgba(0, 0, 0, 0.03),
    0 2.5625rem 2.5625rem 0 rgba(0, 0, 0, 0.04),
    0 0.625rem 1.375rem 0 rgba(0, 0, 0, 0.05);
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
  color: ${COLORS.veryDarkBlue};
  text-align: center;
  font-family: var(--font-gilroy);
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 3rem;
  letter-spacing: 0.0125rem;
`;

export const Helper = styled.p`
  color: ${COLORS.lightGrey};
  text-align: center;
  font-family: var(--font-gilroy);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 19.9375rem;
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
  width: 23.75rem;
  height: 3.25rem;
  background: ${COLORS.veryLightGrey};
  border-radius: 0.5rem;
  border: none;
  padding: 0 0.75rem;
  outline: none;

  &::placeholder {
    color: ${COLORS.lightGrey};
    text-align: center;
    font-family: var(--font-gilroy);
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: left;
  }

  &:focus {
    border-radius: 8px;
    border: 1.5px solid
      ${props => (props.$error ? COLORS.red : COLORS.evergreen)};
  }
`;

export const JoinButton = styled.button`
  display: flex;
  width: 23.75rem;
  height: 3.25rem;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background: var(--cyan-12, #1e4240); // TODO: fix stacked components
  color: ${COLORS.white};
  text-align: center;
  font-family: var(--font-gilroy);
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration: none;
`;

export const ErrorMessage = styled.p`
  width: 100%;
  color: ${COLORS.red};
  font-family: var(--font-gilroy);
  font-size: 1rem;
`;
