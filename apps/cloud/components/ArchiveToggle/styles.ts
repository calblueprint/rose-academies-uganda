import styled from "styled-components";
import COLORS from "@/styles/colors";
import { H3, Subtitle2 } from "@/styles/text";

export const ArchiveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;

  border-radius: 12px;
  border: 1px solid ${COLORS.gray40};
  background-color: ${COLORS.white};

  color: ${COLORS.gray80};

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${COLORS.gray10};
    border-color: ${COLORS.gray40};
  }

  &:active {
    background-color: ${COLORS.gray40};
  }

  &.active {
    background-color: ${COLORS.gray80};
    color: ${COLORS.white};
    border-color: ${COLORS.gray80};
  }

  svg {
    width: 18px;
    height: 18px;
    stroke: ${COLORS.gray80};
  }
`;

export const ArchiveButtonText = styled(Subtitle2)`
  font-weight: 500;
  color: ${COLORS.gray80};
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
`;

export const ModalContainer = styled.div`
  display: flex;
  width: 500px;
  padding: 32px 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;

  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${COLORS.white};
  box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(2px);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const ModalTitle = styled(H3)`
  color: ${COLORS.black};
  font-weight: 500;
`;

export const ModalText = styled(Subtitle2)`
  align-self: stretch;
  color: ${COLORS.gray60};
  margin: 0;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  align-self: flex-end;
`;

export const CancelButton = styled.button`
  display: flex;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 8px;
  border: 1px solid ${COLORS.gray40};
  background: ${COLORS.white};

  color: ${COLORS.gray80};

  cursor: pointer;
`;

export const CancelButtonText = styled(Subtitle2)`
  font-weight: 500;
  color: ${COLORS.gray80};
`;

export const ConfirmButton = styled.button`
  display: flex;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 8px;
  background: ${COLORS.evergreen};
  border: none;

  color: ${COLORS.white};

  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ConfirmButtonText = styled(Subtitle2)`
  font-weight: 500;
`;
