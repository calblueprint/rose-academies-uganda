import styled from "styled-components";

export const Outer = styled.main`
  display: flex;
  width: 90rem;
  padding: 12.8125rem 31.125rem 12.8125rem 31.1875rem;
  justify-content: center;
  align-items: center;
  border: 0.0625rem solid var(--primary-40, #a1a1a1);
  background: #f9faf3;
`;

export const Card = styled.section`
  display: flex;
  padding: 3.5rem 2rem 3.5rem 1.9375rem;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  border-radius: 0.9375rem;
  background: #fff;
  box-shadow:
    0 15.9375rem 4.4375rem 0 rgba(0, 0, 0, 0),
    0 10.1875rem 4.0625rem 0 rgba(0, 0, 0, 0.01),
    0 5.75rem 3.4375rem 0 rgba(0, 0, 0, 0.03),
    0 2.5625rem 2.5625rem 0 rgba(0, 0, 0, 0.04),
    0 0.625rem 1.375rem 0 rgba(0, 0, 0, 0.05);
`;

export const Logo = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 0.625rem;
  background: url("/Logo.png") center/contain no-repeat;
`;

export const Title = styled.h1`
  color: var(--Black-100, #25282b);
  text-align: center;
  font-family: Gilroy-Medium;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 3rem;
  letter-spacing: 0.0125rem;
`;

export const Helper = styled.p`
  color: #747474;
  text-align: center;
  font-family: Gilroy-Medium;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 19.9375rem;
`;

export const Input = styled.input`
  width: 23.75rem;
  height: 3.25rem;
  background: #fafafa;
  border-radius: 0.5rem;
  border: none;
  padding: 0 0.75rem;
  outline: none;

  &::placeholder {
    color: #747474;
    text-align: center;
    font-family: Gilroy-Regular;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: left;
  }

  &:focus {
    box-shadow: 0 0 0 0.1875rem rgba(30, 66, 64, 0.18);
  }
`;

export const PrimaryLink = styled.a`
  display: flex;
  width: 23.75rem;
  height: 3.25rem;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background: var(--cyan-12, #1e4240);
  color: var(--red-1, #fffdfc);
  text-align: center;
  font-family: Gilroy-Medium;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
