import styled from "styled-components";
import COLORS from "@/styles/colors";
import { Subtitle1 } from "@/styles/text";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 21.875rem;
  height: 15.625rem;
  border-radius: 0.85769rem;
  box-shadow:
    0 63.494px 17.41px 0 rgba(170, 170, 170, 0),
    0 40.964px 16.386px 0 rgba(170, 170, 170, 0.01),
    0 22.53px 13.313px 0 rgba(170, 170, 170, 0.05),
    0 10.241px 10.241px 0 rgba(170, 170, 170, 0.09),
    0 2.048px 5.12px 0 rgba(170, 170, 170, 0.1);
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  background: ${COLORS.white};
`;

export const ImageFrame = styled.div`
  position: relative;
  width: 100%;
  height: calc(15.625rem - 5.5rem);
  flex-shrink: 0;
  overflow: hidden;
  background: ${COLORS.gray10};
`;

export const Titleholder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 5.5rem;
  flex-shrink: 0;
  padding: 1.25rem;
  align-items: flex-start;
  gap: 0.57181rem;
  background: ${COLORS.white};
  border-radius: 0 0 0.938rem 0.938rem;
  box-sizing: border-box;
`;

export const Title = styled(Subtitle1).attrs({
  $color: COLORS.black,
  $fontWeight: 500,
})`
  margin: 0;
`;

export const TagRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: nowrap;
  width: 100%;
  overflow: hidden;
`;
