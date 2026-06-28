import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const ModalCard = styled.div`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: ${COLORS.surfaceShadow};
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ModalTitle = styled.h2`
  color: ${COLORS.gray100};
  margin: 0;

  font-size: 1.5rem;
  font-weight: var(--font-weight-section-title);
  line-height: 1.2;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.gray60};
  border-radius: 4px;
  transition: color 0.15s;

  &:hover:not(:disabled) {
    color: ${COLORS.gray100};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

export const FieldSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FieldLabel = styled.label`
  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: 500;
  color: ${COLORS.gray100};
`;

export const AssignedVillageRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;

  @media (max-width: 520px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const VillageDropdownWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: min(240px, 100%);
`;

export const VillageSelectTrigger = styled.button`
  display: flex;
  height: 44px;
  width: 100%;
  padding: 10px 16px;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;

  border-radius: 8px;
  border: 1px solid ${COLORS.surfaceBorder};
  background: ${COLORS.white};
  color: ${COLORS.gray60};

  cursor: pointer;

  &:focus-visible {
    outline: 3px solid rgba(30, 66, 64, 0.18);
    border-color: ${COLORS.evergreen};
  }
`;

export const VillageSelectTriggerText = styled.span`
  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: 400;
  color: ${COLORS.gray100};
  white-space: nowrap;
`;

export const VillageDropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 20;

  display: flex;
  width: 100%;
  padding: 0.75rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.625rem;
  box-sizing: border-box;

  border-radius: 8px;
  border: 1px solid ${COLORS.surfaceBorder};
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
`;

export const VillageOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  width: 100%;
`;

export const VillageBox = styled.div<{ $checked: boolean }>`
  width: 14px;
  height: 14px;
  border-radius: 3px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid ${COLORS.gray60};
  background: ${({ $checked }) => ($checked ? COLORS.gray60 : "transparent")};

  transition: all 0.15s ease;
`;

export const Checkmark = styled.svg`
  width: 10px;
  height: 10px;
`;

export const VillageOptionText = styled.span`
  font-family: var(--font-primary);
  font-size: 13px;
  line-height: normal;
  font-weight: 400;
  color: ${COLORS.gray80};
  min-width: 0;
  overflow-wrap: anywhere;
`;

export const ClassroomDropdownEmpty = styled.div`
  color: ${COLORS.gray60};
  font-size: 0.8125rem;
  line-height: 1.35;
`;

export const ClassroomDropdownAction = styled.button`
  width: 100%;
  min-height: 2.25rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  color: ${COLORS.evergreen};
  cursor: pointer;
  font-family: var(--font-primary);
  font-size: 0.875rem;

  &:hover:not(:disabled) {
    border-color: ${COLORS.evergreen};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ClassroomManageButton = styled.button`
  border: none;
  background: transparent;
  color: ${COLORS.gray60};
  cursor: pointer;
  padding: 0.25rem 0;
  font-family: var(--font-primary);
  font-size: 0.8125rem;
  text-align: left;

  &:hover {
    color: ${COLORS.evergreen};
  }
`;

export const ClassroomCreatePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 0.875rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.pageWash};
`;

export const ClassroomCreateRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.8fr);
  gap: 0.625rem;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const ClassroomCreateActions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const ClassroomSecondaryButton = styled.button`
  padding: 0.625rem 0.875rem;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  color: ${COLORS.gray80};
  cursor: pointer;
  font-family: var(--font-primary);
  font-size: 0.875rem;

  &:hover:not(:disabled) {
    border-color: ${COLORS.evergreen};
    color: ${COLORS.evergreen};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 0.6875rem 1rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;

  font-family: inherit;
  font-size: var(--font-subtitle-3);
  line-height: var(--lh-subtitle-3);
  color: ${COLORS.gray100};

  background: ${COLORS.white};
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s;

  &::placeholder {
    color: ${COLORS.gray60};
  }

  &:focus {
    border-color: ${COLORS.evergreen};
    box-shadow: 0 0 0 3px rgba(30, 66, 64, 0.18);
  }

  &:disabled {
    background: ${COLORS.gray10};
    cursor: not-allowed;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.6875rem 1rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;

  font-family: inherit;
  font-size: var(--font-subtitle-3);
  line-height: var(--lh-subtitle-3);
  color: ${COLORS.gray100};

  background: ${COLORS.white};
  outline: none;
  resize: vertical;
  min-height: 100px;
  box-sizing: border-box;
  transition: border-color 0.15s;

  &::placeholder {
    color: ${COLORS.gray60};
  }

  &:focus {
    border-color: ${COLORS.evergreen};
    box-shadow: 0 0 0 3px rgba(30, 66, 64, 0.18);
  }

  &:disabled {
    background: ${COLORS.gray10};
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  font-size: var(--font-subtitle-3);
  line-height: var(--lh-subtitle-3);
  color: ${COLORS.rose100};
  margin: 0;
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding-top: 0.25rem;
`;

export const CancelButton = styled.button`
  min-height: 3.25rem;
  padding: 0 1.5rem;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 9px;

  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: var(--font-weight-section-title);
  color: ${COLORS.gray80};

  cursor: pointer;
  transition: border-color 0.15s;

  &:hover:not(:disabled) {
    border-color: ${COLORS.evergreen};
    color: ${COLORS.evergreen};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CreateButton = styled.button`
  min-height: 3.25rem;
  padding: 0 1.5rem;
  background: ${COLORS.evergreen};
  border: none;
  border-radius: 9px;

  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: var(--font-weight-action);
  color: ${COLORS.white};

  cursor: pointer;
  transition: opacity 0.15s;

  &:hover:not(:disabled) {
    opacity: 0.88;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;
