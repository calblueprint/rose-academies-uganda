import styled from "styled-components";
import COLORS from "@/styles/colors";

export {
  ActionRow,
  BrowseButton,
  CancelButton,
  CloseButton,
  DeleteFileButton,
  DropZone,
  DropZoneSubtext,
  DropZoneText,
  ErrorText,
  FileInfo,
  FileNameText,
  FileQueueItemRow,
  FileQueueItemWrapper,
  FileSubtext,
  ModalCard,
  ModalHeader,
  Overlay,
  ProgressFill,
  ProgressTrack,
} from "@/components/modals/CreateLessonModal/styles";

export const ModalTitle = styled.h2`
  font-family: var(--font-gilroy);
  font-size: 1.625rem;
  font-weight: 600;
  color: ${COLORS.veryDarkBlue};
  margin: 0;
`;

export const TabRow = styled.div`
  display: flex;
  background: ${COLORS.gray10};
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
`;

export const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  font-family: var(--font-gilroy);
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s;
  background: ${({ $active }) => ($active ? COLORS.white : "transparent")};
  color: ${({ $active }) => ($active ? COLORS.veryDarkBlue : COLORS.lightGrey)};
  box-shadow: ${({ $active }) =>
    $active ? "0 1px 3px rgba(0,0,0,0.1)" : "none"};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const ComingSoonText = styled.p`
  font-family: var(--font-gilroy);
  font-size: 0.9375rem;
  color: ${COLORS.lightGrey};
  text-align: center;
  margin: 2rem 0;
`;

export const SaveButton = styled.button`
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
