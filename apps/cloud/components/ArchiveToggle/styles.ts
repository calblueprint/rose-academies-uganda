import styled from "styled-components";

export const ArchiveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;

  border-radius: 12px;
  border: 1px solid var(--gray-40, #d9d9d9);
  background-color: white;

  color: var(--gray-80, #4b4a49);
  font-family: "Google Sans", sans-serif;
  font-size: 14px;
  font-weight: 500;

  cursor: pointer;
  transition: all 0.2s ease;

  /* Hover */
  &:hover {
    background-color: #f5f5f5;
    border-color: #cfcfcf;
  }

  /* Active (click) */
  &:active {
    background-color: #eaeaea;
  }

  /* Toggle state */
  &.active {
    background-color: #4b4a49;
    color: white;
    border-color: #4b4a49;
  }

  /* SVG inside button */
  svg {
    width: 18px;
    height: 18px;
    stroke: currentColor;
  }
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
  background: #fff;
  box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(2px);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const ModalTitle = styled.h2`
  color: var(--gray-100, #000);
  font-family: "Google Sans", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const ModalText = styled.p`
  align-self: stretch;

  color: var(--gray-60, #808582);

  font-family: "Google Sans", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;

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
  border: 1px solid var(--gray-40, #d9d9d9);
  background: var(--white, #fff);

  color: var(--gray-80, #4b4a49);

  font-family: "Google Sans", sans-serif;
  font-size: 14px;
  font-weight: 500;

  cursor: pointer;
`;

export const ConfirmButton = styled.button`
  display: flex;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 8px;
  background: var(--evergreen-100, #1e4240);
  border: none;

  color: var(--white, #fff);

  font-family: "Google Sans", sans-serif;
  font-size: 14px;
  font-weight: 500;

  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
