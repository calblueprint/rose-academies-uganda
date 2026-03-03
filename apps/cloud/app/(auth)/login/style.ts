import styled from "styled-components";

export const Main = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--Green-1, #f9faf3);
  padding: 4rem 1rem;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;

  padding: 3.25rem 2.25rem;
  border-radius: 0.9375rem;
  background: #ffffff;
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.05),
    0 18px 30px rgba(0, 0, 0, 0.06);

  width: 23.75rem;
`;

export const H1 = styled.h1`
  margin: 0;
  text-align: center;

  font-family: "Google Sans", system-ui;
  font-size: 2rem;
  font-weight: 400;
  line-height: 3rem;
  letter-spacing: 0.0125rem;

  color: #25282b;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  font-size: 0.875rem;
  color: #808582;
`;

export const Input = styled.input`
  height: 3.25rem;
  padding: 0.625rem 1rem;

  border-radius: 0.5rem;
  border: 1px solid #d9d9d9;
  background: #f4f5f7;

  &::placeholder {
    color: #6b7280;
    font-size: 1.125rem;
    gap: 1.25rem;
  }

  &:focus {
    outline: none;
    border-color: #1e4f49;
    box-shadow: 0 0 0 3px rgba(30, 79, 73, 0.18);
  }
`;

export const Button = styled.button`
  height: 3.25rem;
  border-radius: 0.5rem;
  border: none;
  background: #1e4f49;
  color: #fff;

  font-size: 1.125rem;
  font-family: "Google Sans", system-ui;
`;

export const Paragraph = styled.p`
  color: #747474;
  font-family: Mulish;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
`;

export const Logo = styled.img`
  width: 6.125rem;
  height: 6.125rem;
  object-fit: contain;
`;
export const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
`;
