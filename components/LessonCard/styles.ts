import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Card = styled.article`
  width: 23.438rem;
  height: 16.375rem;
  background: ${COLORS.evergreen};
  border-radius: 0.625rem 0.625rem 0.938rem 0.938rem;
  box-shadow: 0 0.25rem 0.25rem 0.063rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
`;

export const ImageArea = styled.div`
  flex: 1; /* fills remaining height above the 6.5rem content */
`;

export const Titleholder = styled.div`
  display: flex;
  width: 23.438rem;
  height: 6.5rem;
  padding: 1.063rem 1.375rem;
  align-items: flex-start;
  flex-shrink: 0;
  background: ${COLORS.white};
  border-radius: 0 0 0.938rem 0.938rem;
`;

export const Title = styled.h3`
  color: ${COLORS.black};
  font-family: var(--font-gilroy);
  font-size: 1.08625rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
