import styled from "styled-components";

//Outer card /
export const Card = styled.article`
  width: 23.438rem;
  height: 16.375rem;
  flex-shrink: 0;
  background: #f3f3f6;
  border-radius: 0.625rem 0.625rem 0.938rem 0.938rem;
  box-shadow: 0 0.25rem 0.25rem 0.063rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
`;

// Placeholder for the image area /
export const ImageArea = styled.div`
  flex: 1; /* fills remaining height above the 6.5rem content */
`;

// Bottom white holder with title /
export const Titleholder = styled.div`
  display: flex;
  width: 23.438rem;
  height: 6.5rem;
  padding: 1.063rem 1.375rem;
  align-items: flex-start;
  gap: 0.625rem;
  flex-shrink: 0;
  background: #fff;
  border-radius: 0 0 0.938rem 0.938rem;
  box-sizing: border-box;
`;

// title style /
export const Title = styled.h3`
  color: #000;
  font-family: Manrope;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
