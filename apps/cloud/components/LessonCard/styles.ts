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
`;

export const ImageFrame = styled.div`
  position: relative;
  width: 100%;
  height: 9.205rem;
  flex-shrink: 0;
  overflow: hidden;
`;

// export const ImagePlaceholder = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: ${COLORS.evergreen};
// `;

export const Titleholder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  padding: 0.97rem 1.26rem;
  align-items: flex-start;
  gap: 0.57181rem;
  background: ${COLORS.white};
  border-radius: 0 0 0.938rem 0.938rem;
`;

export const Title = styled(Subtitle1).attrs({
  $color: COLORS.black,
  $fontWeight: 500,
})``;
