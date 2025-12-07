import styled from "styled-components";
import COLORS from "@/styles/colors";

export const PageContainer = styled.div`
  padding: 7rem;
  background-color: #fafafa;
`;

export const Title = styled.h2`
  color: #000000;

  /* Heading 2 */
  font-family: var(--font-gilroy);
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const FileHeaders = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18.75rem;
  color: ${COLORS.gray60};
  font-family: var(--font-gilroy);
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const NameHeader = styled.p``;

export const OtherHeaders = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 7.75rem;
`;

export const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

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

export const LessonHeader = styled.div`
  display: flex;
  width: 100%;
  max-width: 1048px;
  height: 141px;
  padding: 12px 931px 96px 25px;
  align-items: center;
  flex-shrink: 0;
  border-radius: 10px;
  background-color: ${COLORS.evergreen};
`;

export const BackButton = styled.button`
  display: flex;
  padding: 8px 0;
  align-items: center;
  gap: 12px;
  border-radius: 12px;

  background: transparent;
  border: none;
  cursor: pointer;

  color: #ffffff;
  font-family: var(--font-gilroy);
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  white-space: nowrap;
`;

export const BackButtonIconSlot = styled.div`
  width: 0.6875rem;
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1048px;
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SearchBar = styled.div`
  display: flex;
  width: 278px;
  height: 43px;
  padding: 4.345px 20.856px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8.69px;
  flex-shrink: 0;

  border-radius: 17.38px;
  border: 0.869px solid #fafafa;
  background: #ffffff;
`;

export const SearchBarInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8.69px;
  justify-content: space-between;
`;

export const SearchMain = styled.div`
  display: flex;
  align-items: center;
  gap: 8.69px;
  flex: 1;
  min-width: 0;
`;

export const SearchRightIconWrapper = styled.div`
  width: 10.428px;
  height: 10.428px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchIconWrapper = styled.div`
  width: 17.38px;
  height: 17.38px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchPlaceholder = styled.span`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  overflow: hidden;
  text-overflow: ellipsis;
  color: ${COLORS.gray60};
  font-family: var(--font-gilroy);
  font-size: 15.642px;
  font-style: normal;
  font-weight: 400;
  line-height: 15.642px; /* 100% */
`;

export const FileTypeDropdown = styled.div`
  display: flex;
  height: 43.449px;
  padding: 12.166px 19.118px 12.166px 17.38px;
  align-items: center;
  gap: 24px;

  border-radius: 17.38px;
  border: 0.869px solid #fafafa;
  background: #ffffff;
  flex-shrink: 0;
`;

export const FileTypeLabel = styled.span`
  color: ${COLORS.gray60};
  font-family: var(--font-gilroy);
  font-size: 13.904px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const FileTypeDropdownIcon = styled.div`
  width: 10.445px;
  height: 6.452px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
