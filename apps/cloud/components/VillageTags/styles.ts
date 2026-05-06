import styled from "styled-components";
import COLORS from "@/styles/colors";
import { Subtitle3 } from "@/styles/text";

export const VillageTag = styled(Subtitle3).attrs({
  as: "span",
  $color: COLORS.gray100,
  $fontWeight: 400,
})`
  display: inline-flex;
  width: fit-content;
  max-width: 7.3125rem;
  min-height: 1.4375rem;
  padding: 0.25rem 0.75rem;
  box-sizing: border-box;

  justify-content: center;
  align-items: center;

  border-radius: 0.25rem;
  background-color: ${COLORS.stem};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TagGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow: hidden;
`;
