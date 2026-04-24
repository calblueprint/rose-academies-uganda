import styled from "styled-components";
import COLORS from "@/styles/colors";

export const VillageTag = styled.span`
  display: inline-flex;
  align-items: center;

  padding: 0.25rem 0.75rem;
  border-radius: 999px;

  font-size: var(--font-body);
  line-height: var(--lh-body);
  font-weight: 400;

  background-color: ${COLORS.green20};
  color: ${COLORS.evergreen};
`;

export const TagGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;
