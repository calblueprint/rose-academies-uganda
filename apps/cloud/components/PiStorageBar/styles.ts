import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  width: 550px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  flex-shrink: 0;
`;

export const Title = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  overflow: hidden;
  color: var(--gray-100, #000);
  text-overflow: ellipsis;
  font-family: var(--font-gilroy);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: #d9d9d9;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ percent: number }>`
  height: 100%;
  width: ${props => props.percent}%;
  border-radius: 999px;
  background: #248f5d;
`;

export const StorageInfo = styled.div`
  display: flex;
  height: 18px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const StatusText = styled.div`
  color: var(--gray-60, #808582);

  font-family: var(--font-gilroy);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
