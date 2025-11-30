import styled from "styled-components";
import COLORS from "@/styles/colors";

export const PageContainer = styled.div`
  padding: 7rem;
`;

export const Title = styled.h2`
  color: #000;
  font-family: var(--font-gilroy);
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const FileHeaders = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18.75rem;
  color: ${COLORS.gray60};
  font-family: var(--font-gilroy);
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const NameHeader = styled.p``;

export const OtherHeaders = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 7.75rem;
`;

export const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  backdrop-filter: blur(6px);
  background-color: rgba(0, 0, 0, 0.25);
`;

export const ModalPanel = styled.div`
  background: #ffffff;
  width: min(1048px, 100% - 32px);
  height: min(80vh, 100% - 32px);

  border-radius: 12px;
  overflow: hidden;
  display: flex;

  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);
`;

export const ModalContent = styled.div`
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
`;
