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
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.12),
    0 4px 16px rgba(0, 0, 0, 0.08);
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
  font-weight: 500;
  line-height: normal;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.lightGrey};
  border-radius: 4px;
  transition: color 0.15s;

  &:hover:not(:disabled) {
    color: ${COLORS.veryDarkBlue};
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

export const RequiredAsterisk = styled.span`
  color: ${COLORS.rose100};
`;

export const AssignedVillageRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
`;

export const VillageDropdownWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const VillageSelectTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;

  height: 44px;
  padding: 10px 16px;

  border-radius: 8px;
  border: 1px solid ${COLORS.gray40};
  background: ${COLORS.white};

  cursor: pointer;
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
  width: 182px;
  padding: 16px 48px 18px 18px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 15px;
  box-sizing: border-box;

  border-radius: 8px;
  background: #fff;
  box-shadow:
    0 29px 8px 0 rgba(0, 0, 0, 0),
    0 19px 7px 0 rgba(0, 0, 0, 0.01),
    0 10px 6px 0 rgba(0, 0, 0, 0.05),
    0 5px 5px 0 rgba(0, 0, 0, 0.09),
    0 1px 3px 0 rgba(0, 0, 0, 0.1);
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

  border: 1px solid ${COLORS.lightGrey};
  background: ${({ $checked }) => ($checked ? "#808582" : "transparent")};

  transition: all 0.15s ease;
`;

export const Checkmark = styled.svg`
  width: 10px;
  height: 10px;
`;

export const VillageOptionText = styled.span`
  font-family: "Google Sans", sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: ${COLORS.lightGrey};
  line-height: normal;
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 0.6875rem 1rem;
  border: 1px solid ${COLORS.gray40};
  border-radius: 8px;

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
  }

  &:disabled {
    background: ${COLORS.gray10};
    cursor: not-allowed;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.6875rem 1rem;
  border: 1px solid ${COLORS.gray40};
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
  }

  &:disabled {
    background: ${COLORS.gray10};
    cursor: not-allowed;
  }
`;

export const DropZone = styled.div<{ $isDragging: boolean }>`
  border: 1.5px dashed
    ${({ $isDragging }) => ($isDragging ? COLORS.evergreen : COLORS.gray40)};
  border-radius: 8px;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  background: ${({ $isDragging }) =>
    $isDragging ? COLORS.lightGreen : "transparent"};
  transition:
    border-color 0.15s,
    background 0.15s;
  cursor: pointer;
`;

export const DropZoneText = styled.p`
  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: 500;
  color: ${COLORS.gray100};
  margin: 0;
`;

export const DropZoneSubtext = styled.p`
  font-size: var(--font-subtitle-3);
  line-height: var(--lh-subtitle-3);
  color: ${COLORS.gray60};
  margin: 0 0 0.375rem;
`;

export const BrowseButton = styled.button`
  padding: 0.5rem 1.25rem;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.gray40};
  border-radius: 8px;

  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  color: ${COLORS.gray100};

  cursor: pointer;
  transition: border-color 0.15s;

  &:hover:not(:disabled) {
    border-color: ${COLORS.veryDarkBlue};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const FileQueueList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FileQueueItemWrapper = styled.div`
  background: ${COLORS.gray10};
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FileQueueItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const DeleteFileButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.lightGrey};
  border-radius: 4px;
  flex-shrink: 0;
  margin-left: auto;
  transition: color 0.15s;

  &:hover {
    color: ${COLORS.red};
  }
`;

export const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const FileNameText = styled.p`
  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: 500;
  color: ${COLORS.gray100};
  margin: 0 0 0.125rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FileSubtext = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  font-size: var(--font-subtitle-3);
  line-height: var(--lh-subtitle-3);
  color: ${COLORS.gray60};
  margin: 0;
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 4px;
  background: ${COLORS.gray40};
  border-radius: 2px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  border-radius: 2px;
  background: ${COLORS.activeGreen};
  width: 85%;
  transition: width 2.5s ease-in-out;
`;

export const OfflineRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const OfflineTextColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const OfflineLabel = styled.p`
  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: 500;
  color: ${COLORS.gray100};
  margin: 0;
`;

export const OfflineSupportingText = styled.p`
  font-size: var(--font-subtitle-3);
  line-height: var(--lh-subtitle-3);
  color: ${COLORS.gray60};
  margin: 0;
`;

export const ToggleWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

export const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const ToggleTrack = styled.label<{ $checked: boolean }>`
  display: block;
  position: relative;
  width: 44px;
  height: 24px;
  background: ${({ $checked }) =>
    $checked ? COLORS.evergreen : COLORS.gray40};
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s;
`;

export const ToggleThumb = styled.div<{ $checked: boolean }>`
  position: absolute;
  top: 2px;
  left: ${({ $checked }) => ($checked ? "22px" : "2px")};
  width: 20px;
  height: 20px;
  background: ${COLORS.white};
  border-radius: 50%;
  transition: left 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

export const ErrorText = styled.p`
  font-size: 0.75rem;
  color: ${COLORS.red};
  margin: 0;
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding-top: 0.25rem;
`;

export const CancelButton = styled.button`
  padding: 0.625rem 1.5rem;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.gray40};
  border-radius: 8px;

  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  color: ${COLORS.gray80};

  cursor: pointer;
  transition: border-color 0.15s;

  &:hover:not(:disabled) {
    border-color: ${COLORS.veryDarkBlue};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CreateButton = styled.button`
  padding: 0.625rem 1.5rem;
  background: ${COLORS.evergreen};
  border: none;
  border-radius: 8px;

  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: 500;
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
