import styled from "styled-components";

export const PageContainer = styled.div`
  align-self: stretch;
  width: 100%;
  padding: 1.5rem;
  display: block;
  margin: 0 auto
  box_sizing:broader-box;
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
