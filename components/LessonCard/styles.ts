import styled from "styled-components";

//Outer card /
export const Card = styled.article`
  width: 375px;
  height: 262px;
  flex-shrink: 0;
  background: #f3f3f6;
  border-radius: 10px 10px 15px 15px;
  box-shadow: 0 4px 4px 1px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
`;

// Placeholder for the image area /
export const ImageArea = styled.div`
  flex: 1; /* fills remaining height above the 104px content */
`;

// Bottom white holder with title /
export const Titleholder = styled.div`
  display: flex;
  width: 375px;
  height: 104px;
  padding: 17px 22px;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  background: #fff;
  border-radius: 0 0 15px 15px;
  box-sizing: border-box;
`;

// title style /
export const Title = styled.h3`
  color: #000;
  font-family: Manrope;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
