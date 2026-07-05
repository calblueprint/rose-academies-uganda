import styled from "styled-components";
import COLORS from "@/styles/colors";

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
  overscroll-behavior: contain;

  backdrop-filter: blur(6px);
  background: rgba(0, 0, 0, 0.32);
`;

export const ModalPanel = styled.div`
  background: ${COLORS.white};
  width: min(1048px, 100% - 32px);
  height: min(80vh, 100% - 32px);

  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  min-width: 0;
  min-height: 0;
  overscroll-behavior: contain;

  box-shadow: ${COLORS.surfaceShadow};

  @media (max-width: 720px) {
    width: 100%;
    height: 100dvh;
    border-radius: 0;
    border-left: 0;
    border-right: 0;
  }
`;

export const ModalContent = styled.div`
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  overflow: hidden;
  overscroll-behavior: contain;
`;
