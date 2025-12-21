import styled from "styled-components";

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
