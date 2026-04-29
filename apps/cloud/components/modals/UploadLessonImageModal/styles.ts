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
  color: ${COLORS.gray100};
  margin: 0;

  font-size: 1.5rem;
  font-weight: 500;
  line-height: normal;
`;

export const TabRow = styled.div`
  display: flex;
  background: ${COLORS.whiteSmoke};
  border-radius: 3.5rem;
  padding: 3px 4px;
  gap: 4px;
`;

export const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 3.5rem;

  font-family: var(--font-gilroy);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;

  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s,
    box-shadow 0.15s;

  background: ${({ $active }) => ($active ? COLORS.evergreen : "transparent")};
  color: ${({ $active }) => ($active ? COLORS.white : COLORS.gray100)};
  box-shadow: ${({ $active }) =>
    $active ? "0px 4px 10px rgba(179,179,179,0.49)" : "none"};
`;

export const PresetGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

export const PresetCard = styled.button<{ $selected: boolean }>`
  position: relative;
  background: ${COLORS.evergreen};
  border-radius: 10px;
  overflow: hidden;
  border: 3px solid
    ${({ $selected }) => ($selected ? COLORS.orange100 : "transparent")};
  cursor: pointer;
  padding: 0;
  aspect-ratio: 256 / 120;
  transition: border-color 0.15s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const SaveButton = styled.button`
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
