import styled from "styled-components";
import COLORS from "@/styles/colors";

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
`;

export const SearchBarField = styled.div`
  display: flex;
  width: 876px;
  height: 44px;
  padding: 4.367px 20.96px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-radius: 16px;
  border-top: 0.437px solid var(--gray, #d9d9d9);
  border-right: 0.873px solid var(--gray, #d9d9d9);
  border-bottom: 1.31px solid var(--gray, #d9d9d9);
  border-left: 0.873px solid var(--gray, #d9d9d9);
  background: var(--white, #fff);
`;

export const SearchInput = styled.input`
  width: 100%;
  overflow: hidden;
  color: ${COLORS.gray60};
  text-overflow: ellipsis;
  // font-family: var(--font-gilroy);
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2rem;
  border: none;
  outline: none;
`;

export const ClearButton = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  width: 0.75rem;
  height: 0.75rem;
  aspect-ratio: 1 / 1;
  fill: var(--Gray, #808582);
`;
