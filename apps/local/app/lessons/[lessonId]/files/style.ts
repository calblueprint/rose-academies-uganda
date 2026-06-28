import styled from "styled-components";
import COLORS from "@/styles/colors";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  min-width: 0;
  max-width: 80rem;
  margin: 0 auto;

  min-height: 100dvh;
  padding: 13px clamp(16px, 5vw, 116px);

  background: transparent;
`;

export const Title = styled.h2`
  color: ${COLORS.gray100};
  font-size: 36px;
  font-style: normal;
  font-weight: var(--font-weight-page-title);
  line-height: 1.15;
  padding-top: 23px;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  justify-content: space-between;
  margin-top: 23px;
`;

export const SearchBar = styled.div`
  display: flex;
  width: 100%;
`;

export const TableWrapper = styled.div`
  width: 100%;
  margin-top: 23px;
  flex: 0 0 auto;
`;

export const EmptyState = styled.div`
  margin-top: 23px;
  width: 100%;
  box-sizing: border-box;
  padding: 1.5rem;
  border: 1px dashed rgba(30, 66, 64, 0.18);
  border-radius: 8px;
  background: ${COLORS.white};
  color: ${COLORS.gray60};
  box-shadow: ${COLORS.surfaceShadowSoft};
  font-family: var(--font-primary);
  font-size: 0.95rem;
  line-height: 1.45;
`;

export const DescriptionText = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${COLORS.gray60};
  line-height: 1.45;
  margin-top: 12px;
  max-width: 100%;
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: pre-wrap;
`;
