import styled from "styled-components";

export const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.3125rem;
  align-self: stretch;
`;

export const SearchBarField = styled.div`
  display: flex;
  width: 56.6875rem;
  height: 3.125rem;
  padding: 0.3125rem 1.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.625rem;
  border-radius: 1.25rem;
  border-right: 0.0625rem solid #d9d9d9;
  border-bottom: 0.0625rem solid #d9d9d9;
  border-left: 0.0625rem solid #d9d9d9;
  background: #fafafa;
`;

export const SearchButton = styled.image`
  width: 1.25rem;
  height: 1.25rem;
  aspect-ratio: 1 / 1;
  fill: #808582;
`;

export const SearchInput = styled.input`
  all: unset;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: #808582;
  text-overflow: ellipsis;
  font-family: var(--font-gilroy);
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.125rem;
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
  margin-left: auto;
`;
