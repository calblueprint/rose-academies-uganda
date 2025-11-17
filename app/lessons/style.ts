import styled from "styled-components";

export const PageContainer = styled.div`
  align-self: stretch;
  width: 100%;
  padding: 1.5rem;
  display: block;
  box_sizing: broader-box;
`;

export const Title = styled.h1`
  margin-bottom: 1rem;
`;

export const LessonsGrid = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(23.438rem, 1fr));
  gap: 1.25rem;
  justify-items: start;
`;

export const PageMain = styled.main`
  padding: 0 1.5rem;
`;

export const SearchBarRow = styled.div`
  margin-top: 1.25rem;
  margin-bottom: 1.5rem;
`;
