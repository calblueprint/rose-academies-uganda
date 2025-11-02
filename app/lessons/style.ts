import styled from "styled-components";
import COLORS from "@/styles/colors";

export const PageContainer = styled.div`
  align-self: stretch;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background-color: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.veryLightGrey};
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${COLORS.veryDarkBlue};

  img {
    height: 2.5rem;
    width: auto;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Content = styled.div`
  flex: 1;
  width: 100%;
  padding: 1.5rem 2rem;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 600;
  color: ${COLORS.veryDarkBlue};
`;

export const LessonsGrid = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(23.438rem, 1fr));
  gap: 1.25rem;
  justify-items: start;
`;
