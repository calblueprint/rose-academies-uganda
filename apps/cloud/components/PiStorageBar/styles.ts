import styled from "styled-components";
import COLORS from "@/styles/colors";
import { Subtitle2 } from "@/styles/text";

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.75rem;
  flex-shrink: 0;
`;

export const Title = styled(Subtitle2).attrs({
  $color: COLORS.gray100,
  $fontWeight: 500,
})`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  overflow: hidden;
  text-overflow: ellipsis;

  font-size: 16px;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: ${COLORS.gray40};
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ percent: number }>`
  height: 100%;
  width: ${props => props.percent}%;
  border-radius: 999px;
  background: ${COLORS.lightLightGreen};
`;

export const StorageInfo = styled.div`
  display: flex;
  height: 18px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const StatusText = styled(Subtitle2).attrs({
  $color: COLORS.gray60,
  $fontWeight: 500,
})``;
