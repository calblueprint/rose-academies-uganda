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

export const RequiredAsterisk = styled.span`
  color: ${COLORS.rose100};
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

export const VillageSelectTrigger = styled.button<{ $flashError?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;

  height: 44px;
  width: 100%;
  padding: 10px 16px;

  border-radius: 8px;
  border: 1px solid
    ${({ $flashError }) =>
      $flashError ? COLORS.rose100 : COLORS.surfaceBorder};

  background: ${COLORS.white};
  color: ${COLORS.gray60};
  cursor: pointer;

  transition: border-color 0.15s ease;

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
  font-weight: 400;
  color: ${COLORS.gray80};
  line-height: normal;
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

export const JoinCodeField = styled.div`
  position: relative;
  min-width: 0;
`;

export const JoinCodeInput = styled(TextInput)`
  padding-right: 5.25rem;
`;

export const JoinCodeActions = styled.div`
  position: absolute;
  top: 50%;
  right: 0.45rem;
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  transform: translateY(-50%);
`;

export const JoinCodeIconButton = styled.button`
  display: inline-flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: ${COLORS.gray60};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${COLORS.whiteSmoke};
    color: ${COLORS.evergreen};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(30, 66, 64, 0.18);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const InfoTooltip = styled.span`
  position: absolute;
  right: 0;
  bottom: calc(100% + 0.5rem);
  z-index: 30;
  width: min(14rem, 70vw);
  padding: 0.625rem 0.75rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: ${COLORS.surfaceShadowSoft};
  color: ${COLORS.gray80};
  font-family: var(--font-primary);
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.35;
  opacity: 0;
  pointer-events: none;
  transform: translateY(0.25rem);
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
`;

export const JoinCodeInfoButton = styled(JoinCodeIconButton)`
  position: relative;

  &:hover ${InfoTooltip}, &:focus-visible ${InfoTooltip} {
    opacity: 1;
    transform: translateY(0);
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

export const DropZone = styled.div<{
  $isDragging: boolean;
  $flashError?: boolean;
}>`
  border: 1.5px dashed
    ${({ $isDragging, $flashError }) =>
      $flashError
        ? COLORS.rose100
        : $isDragging
          ? COLORS.evergreen
          : COLORS.surfaceBorder};

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
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;

  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  color: ${COLORS.gray100};

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
  color: ${COLORS.gray60};
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

export const OfflineSupportingText = styled.p<{ $flashError?: boolean }>`
  font-size: var(--font-subtitle-3);
  line-height: var(--lh-subtitle-3);
  color: ${({ $flashError }) => ($flashError ? COLORS.rose100 : COLORS.gray60)};
  margin: 0;

  transition: color 0.15s ease;
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

export const ToggleTrack = styled.label<{
  $checked: boolean;
  $disabled?: boolean;
}>`
  display: block;
  position: relative;
  width: 44px;
  height: 24px;
  background: ${({ $checked, $disabled }) =>
    $disabled ? COLORS.gray40 : $checked ? COLORS.evergreen : COLORS.gray40};
  border-radius: 12px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  transition: background 0.2s;
`;

export const ToggleThumb = styled.div<{
  $checked: boolean;
  $disabled?: boolean;
}>`
  position: absolute;
  top: 2px;
  left: ${({ $checked }) => ($checked ? "22px" : "2px")};
  width: 20px;
  height: 20px;
  background: ${({ $disabled }) => ($disabled ? COLORS.gray10 : COLORS.white)};
  border-radius: 50%;
  transition: left 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

export const ErrorText = styled.p`
  font-size: 0.75rem;
  color: ${COLORS.red};
  margin: 0;
`;

export const SubmitStatus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  background: ${COLORS.pageWash};
`;

export const SubmitStatusText = styled.p`
  margin: 0;
  font-size: var(--font-subtitle-3);
  line-height: var(--lh-subtitle-3);
  font-weight: 500;
  color: ${COLORS.gray100};
`;

export const SubmitStatusBar = styled.div`
  width: 100%;
  height: 0.375rem;
  overflow: hidden;
  border-radius: 999px;
  background: ${COLORS.gray40};
`;

export const SubmitStatusFill = styled.div<{ $progress: number }>`
  width: ${({ $progress }) => Math.max(8, Math.min($progress, 100))}%;
  height: 100%;
  border-radius: inherit;
  background: ${COLORS.activeGreen};
  transition: width 0.2s ease;
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
