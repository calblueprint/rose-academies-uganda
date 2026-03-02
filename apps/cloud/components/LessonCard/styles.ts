import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 20.625rem;
  min-height: 15rem;
  border-radius: 0.85769rem;
  box-shadow:
    0 63.494px 17.41px 0 rgba(170, 170, 170, 0),
    0 40.964px 16.386px 0 rgba(170, 170, 170, 0.01),
    0 22.53px 13.313px 0 rgba(170, 170, 170, 0.05),
    0 10.241px 10.241px 0 rgba(170, 170, 170, 0.09),
    0 2.048px 5.12px 0 rgba(170, 170, 170, 0.1);
  overflow: hidden;
  cursor: pointer;
`;

export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 147.29px;
  background-color: ${COLORS.evergreen};
`;

export const Titleholder = styled.div`
  display: flex;
  width: 100%;
  height: 5.94656rem;
  padding: 0.97rem 1.26rem;
  align-items: flex-start;
  gap: 0.57181rem;
  flex-shrink: 0;
  background: ${COLORS.white};
  border-radius: 0 0 0.938rem 0.938rem;
`;

export const Title = styled.h3`
  color: ${COLORS.black};
  font-family: var(--font-gilroy);
  font-size: 1.14356rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
