import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px;
  align-items: stretch;
  gap: 14px;
  min-width: 0;

  border-radius: 16px;
  background: var(--white, #fff);
  box-shadow:
    0 22px 6px 0 rgba(170, 170, 170, 0),
    0 14px 6px 0 rgba(170, 170, 170, 0.01),
    0 8px 5px 0 rgba(170, 170, 170, 0.05),
    0 4px 4px 0 rgba(170, 170, 170, 0.09),
    0 1px 2px 0 rgba(170, 170, 170, 0.1);
`;

export const Card = styled.div`
  display: flex;
  width: 100%;
  padding: 24px;
  align-items: center;
  gap: 28px;
  flex-shrink: 0;

  border-radius: 16px;
  background: var(--white, #fff);
  box-shadow:
    0 22px 6px 0 rgba(170, 170, 170, 0),
    0 14px 6px 0 rgba(170, 170, 170, 0.01),
    0 8px 5px 0 rgba(170, 170, 170, 0.05),
    0 4px 4px 0 rgba(170, 170, 170, 0.09),
    0 1px 2px 0 rgba(170, 170, 170, 0.1);
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
