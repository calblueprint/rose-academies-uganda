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
  font-family: var(--font-gilroy);
  font-size: 1.625rem;
  font-weight: 600;
  color: ${COLORS.veryDarkBlue};
  margin: 0;
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
  font-family: var(--font-gilroy);
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${COLORS.veryDarkBlue};
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 0.6875rem 1rem;
  border: 1px solid ${COLORS.gray40};
  border-radius: 8px;
  font-family: var(--font-gilroy);
  font-size: 0.9375rem;
  color: ${COLORS.veryDarkBlue};
  background: ${COLORS.white};
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s;

  &::placeholder {
    color: ${COLORS.gray40};
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
  font-family: var(--font-gilroy);
  font-size: 0.9375rem;
  color: ${COLORS.veryDarkBlue};
  background: ${COLORS.white};
  outline: none;
  resize: vertical;
  min-height: 100px;
  box-sizing: border-box;
  transition: border-color 0.15s;
  line-height: 1.5;

  &::placeholder {
    color: ${COLORS.gray40};
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
  font-family: var(--font-gilroy);
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${COLORS.veryDarkBlue};
  margin: 0;
`;

export const DropZoneSubtext = styled.p`
  font-family: var(--font-gilroy);
  font-size: 0.75rem;
  color: ${COLORS.lightGrey};
  margin: 0 0 0.375rem;
`;

export const BrowseButton = styled.button`
  padding: 0.5rem 1.25rem;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.gray40};
  border-radius: 8px;
  font-family: var(--font-gilroy);
  font-size: 0.875rem;
  color: ${COLORS.veryDarkBlue};
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

export const FileBadge = styled.div<{ $color: string }>`
  width: 42px;
  height: 42px;
  border-radius: 6px;
  background: ${({ $color }) => $color};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  gap: 1px;
`;

export const FileBadgeText = styled.span`
  font-family: var(--font-gilroy);
  font-size: 0.5rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.04em;
  line-height: 1;
`;

export const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const FileNameText = styled.p`
  font-family: var(--font-gilroy);
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.veryDarkBlue};
  margin: 0 0 0.125rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FileSubtext = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-family: var(--font-gilroy);
  font-size: 0.75rem;
  color: ${COLORS.lightGrey};
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
`;

export const OfflineLabel = styled.p`
  font-family: var(--font-gilroy);
  font-size: 0.9375rem;
  color: ${COLORS.veryDarkBlue};
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
  font-family: var(--font-gilroy);
  font-size: 0.875rem;
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
  font-family: var(--font-gilroy);
  font-size: 0.9375rem;
  color: ${COLORS.veryDarkBlue};
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
  font-family: var(--font-gilroy);
  font-size: 0.9375rem;
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
