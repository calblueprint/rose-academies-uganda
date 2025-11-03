import styled from "styled-components";

export const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 21px;
  align-self: stretch;
`;

export const SearchBarField = styled.div`
  display: flex;
  width: 907px;
  height: 50px;
  padding: 5px 24px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  border-radius: 20px;
  border-right: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  background: #fafafa;
`;

export const SearchButton = styled.image`
  width: 20px;
  height: 20px;
  aspect-ratio: 1/1;
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
  font-family: Gilroy-Regular;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 100% */
`;

export const ClearButton = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  width: 12px;
  height: 12px;
  aspect-ratio: 1/1;
  fill: var(--Gray, #808582);
  margin-left: auto;
`;
