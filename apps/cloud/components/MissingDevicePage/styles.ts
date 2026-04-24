import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Container = styled.main`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${COLORS.gray10};
`;

export const Card = styled.section`
  width: 100%;
  max-width: 40rem;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.gray40};
  border-radius: 1rem;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h1`
  margin: 0;
  color: ${COLORS.black};
  font-family: var(--font-gilroy);
  font-size: 2rem;
  font-weight: 500;
`;

export const Description = styled.p`
  margin: 0;
  color: ${COLORS.gray60};
  font-family: var(--font-gilroy);
  font-size: 1.125rem;
  line-height: 1.5;
`;

export const Steps = styled.ul`
  margin: 0;
  padding-left: 1.25rem;
  color: ${COLORS.veryDarkBlue};
  font-family: var(--font-gilroy);
  font-size: 1rem;
  line-height: 1.5;
`;
