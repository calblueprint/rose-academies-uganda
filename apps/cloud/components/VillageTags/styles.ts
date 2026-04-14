import styled from "styled-components";
import COLORS from "@/styles/colors";

export const VillageTag = styled.span`
  display: flex;
  padding: 0.25rem 0.75rem;
  background: var(--green-20, #dee3d1);

  color: ${COLORS.evergreen};
  font-family: "Google Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const TagGroup = styled.div`
  display: flex;
  gap: 12px;
`;
