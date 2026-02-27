import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Outer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${COLORS.gray10};
`;

export const Cards = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  justify-content: center;
  gap: 28px;
`;

export const SyncCard = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 700px;
  padding: 3rem 2rem;
  border-radius: 1rem;
  background: ${COLORS.white};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
`;

export const Title = styled.h1`
  font-family: var(--font-gilroy);
  font-size: 2rem;
  font-weight: 400;
  color: ${COLORS.black};
`;

export const Subtitle = styled.p`
  font-family: var(--font-gilroy);
  font-size: 1.25rem;
  color: ${COLORS.lightGrey};
  max-width: 400px;
  line-height: 25px;
`;
