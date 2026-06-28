import styled from "styled-components";
import COLORS from "@/styles/colors";
import { H5 } from "@/styles/text";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  min-height: 15.625rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  box-shadow: ${COLORS.surfaceShadowSoft};
  overflow: hidden;
  cursor: pointer;
  min-width: 0;
  background: ${COLORS.white};
  box-sizing: border-box;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.15s ease;

  &:hover {
    border-color: rgba(30, 66, 64, 0.16);
    box-shadow: ${COLORS.surfaceShadow};
    transform: translateY(-1px);
  }
`;

export const ImageFrame = styled.div`
  position: relative;
  width: calc(100% + 2px);
  margin: -1px -1px 0;
  height: calc(15.625rem - 5.5rem);
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 8px 8px 4px 4px;
  background: ${COLORS.white};

  img {
    border-radius: 8px 8px 4px 4px;
  }
`;

export const Titleholder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 5.5rem;
  flex: 1 0 auto;
  padding: 0.75rem 1.25rem;
  align-items: flex-start;
  gap: 0.5rem;
  background: ${COLORS.white};
  box-sizing: border-box;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
`;

export const Title = styled(H5).attrs({
  $color: COLORS.gray100,
  $fontWeight: 400,
})`
  margin: 0;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const StatusIconCircle = styled.div<{
  $status: "available" | "pending";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 50%;

  background: ${({ $status }) =>
    $status === "available" ? COLORS.green10 : COLORS.orange20};
`;

export const TagRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  flex-wrap: wrap;
  width: 100%;
`;
