import styled from "styled-components";
import COLORS from "@/styles/colors";

export const VillageTag = styled.span`
  display: flex;
  padding: 0.25rem 0.75rem;

  background-color: #dee3d1;
  border-radius: 999px;
  padding: 6px 16px;
  font-size: 14px;
  color: ${COLORS.evergreen};
`;

export const TagGroup = styled.div`
  display: flex;
  gap: 12px;
`;
