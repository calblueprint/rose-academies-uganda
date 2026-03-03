import styled from "styled-components";

export const Card = styled.div`
  border-radius: 12px;
  border-right: 1px solid var(--gray, #d9d9d9);
  border-bottom: 1px solid var(--gray, #d9d9d9);
  border-left: 1px solid var(--gray, #d9d9d9);
  background: var(--white, #fff);

  display: flex;
  height: 92px;
  align-items: center;
  gap: 28px;
  width: 676px;
  padding: 16px 40px 16px 36px;
`;

export const IconWrapper = styled.div`
  display: flex;
  width: 52px;
  height: 52px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 148.571px;
  background: #fff6ea;
`;

export const Content = styled.div`
  display: flex;
  gap: 7px;
  flex-direction: column;
`;

export const StorageInfo = styled.div`
  display: flex;
  width: 520px;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  color: #000;

  /* Subtitle 1 */
  font-family: var(--font-gilroy);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StatusText = styled.div`
  color: #000;

  /* Subtitle 2 */
  font-family: var(--font-gilroy);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
