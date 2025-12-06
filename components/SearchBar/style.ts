import styled from "styled-components";

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
`;

export const SearchBarField = styled.div`
  display: flex;
  gap: 1rem;
  width: 49.26075rem;
  height: 2.71556rem;
  padding: 0.27156rem 1.3035rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 1.08625rem;
  border-top: 0.434px solid var(--gray, #d9d9d9);
  border-right: 0.869px solid var(--gray, #d9d9d9);
  border-bottom: 1.303px solid var(--gray, #d9d9d9);
  border-left: 0.869px solid var(--gray, #d9d9d9);
  background: var(--white, #fff);
`;

export const SearchInput = styled.input`
  width: 100%;
  overflow: hidden;
  color: #808582;
  text-overflow: ellipsis;
  font-family: var(--font-gilroy);
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 300;
  line-height: 1.125rem;
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
