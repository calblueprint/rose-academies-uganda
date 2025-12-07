"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { fetchLocalDatabase } from "@/api/sqlite/queries/query";
import FilePreview from "@/components/FilePreview/";
import { FileRow, FilesTable } from "@/components/FilesTable";
import { LocalFile } from "@/types/schema";
import {
  BackButton,
  BackButtonIconSlot,
  FileTypeDropdown,
  FileTypeDropdownIcon,
  FileTypeLabel,
  HeaderRight,
  HeaderRow,
  LessonHeader,
  ModalBackdrop,
  ModalContent,
  ModalPanel,
  PageContainer,
  SearchBar,
  SearchBarInner,
  SearchIconWrapper,
  SearchMain,
  SearchPlaceholder,
  SearchRightIconWrapper,
  Title,
} from "./style";

// Modal for displaying file preview.
function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalPanel onClick={e => e.stopPropagation()}>
        <ModalContent>{children}</ModalContent>
      </ModalPanel>
    </ModalBackdrop>
  );
}

export default function FilesPage() {
  const lessonName = useParams().lessonName;
  const [files, setFiles] = useState<LocalFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<LocalFile | null>(null);

  useEffect(() => {
    async function load() {
      const localData = await fetchLocalDatabase();
      setFiles(localData.files);
    }
    load();
  }, []);

  const tableFiles: FileRow[] = useMemo(
    () =>
      files.map(file => ({
        id: file.id,
        name: file.name,
        // TODO: dates are not currently in LocalFile type, should probably add them
        dateAdded: "Feb 12, 2022",
        dateModified: "Feb 12, 2022",
        sizeBytes: file.size_bytes,
      })),
    [files],
  );

  function handleRowClick(row: FileRow) {
    const file = files.find(f => f.id === row.id);
    if (file) {
      setSelectedFile(file);
    }
  }

  return (
    <PageContainer>
      <LessonHeader>
        <BackButton>
          <BackButtonIconSlot>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="11"
              viewBox="0 0 8 11"
              fill="none"
            >
              <path
                d="M0 5.5L6.47542 11L8 9.70691L3.04377 5.5L8 1.29401L6.4765 0L0 5.5Z"
                fill="white"
              />
            </svg>
          </BackButtonIconSlot>
          <span>My Lessons</span>
        </BackButton>
      </LessonHeader>

      <HeaderRow>
        <Title>{lessonName}</Title>

        <HeaderRight>
          {/* Search bar (non-functional, just UI) */}
          <SearchBar>
            <SearchBarInner>
              <SearchMain>
                <SearchIconWrapper>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M11.9307 11.1016C12.8994 9.92765 13.5112 8.42191 13.5112 6.76305C13.5112 3.03699 10.4776 0 6.75561 0C3.03365 0 0 3.03699 0 6.76305C0 10.4891 3.03365 13.5261 6.75561 13.5261C8.38715 13.5261 9.91673 12.9391 11.0894 11.9438L16.3409 17.2011C16.4684 17.3287 16.6214 17.3798 16.7743 17.3798C16.9273 17.3798 17.0802 17.3287 17.2077 17.2011C17.4371 16.9714 17.4371 16.5631 17.2077 16.3334L11.9307 11.1016ZM6.73012 12.3011C3.67097 12.3011 1.19816 9.82556 1.19816 6.76305C1.19816 3.70054 3.67097 1.22501 6.73012 1.22501C9.78926 1.22501 12.2621 3.70054 12.2621 6.76305C12.2621 9.82556 9.78926 12.3011 6.73012 12.3011Z"
                      fill="#808582"
                    />
                  </svg>
                </SearchIconWrapper>

                <SearchPlaceholder>Search for file</SearchPlaceholder>
              </SearchMain>

              <SearchRightIconWrapper>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                >
                  <path
                    d="M6.13222 5.21337L10.2352 1.11645C10.3579 0.993805 10.4267 0.827456 10.4267 0.654004C10.4267 0.480551 10.3579 0.314203 10.2352 0.191553C10.1126 0.0689038 9.94625 0 9.77281 0C9.59938 0 9.43305 0.0689038 9.31041 0.191553L5.21393 4.29499L1.11745 0.191553C0.99481 0.0689038 0.828479 1.53999e-07 0.655045 1.55291e-07C0.481611 1.56584e-07 0.315281 0.0689038 0.192644 0.191553C0.0700079 0.314203 0.00111161 0.480551 0.00111161 0.654004C0.00111161 0.827456 0.0700079 0.993805 0.192644 1.11645L4.29564 5.21337L0.192644 9.31029C0.131602 9.37084 0.0831513 9.44288 0.0500873 9.52225C0.0170232 9.60163 0 9.68676 0 9.77274C0 9.85873 0.0170232 9.94386 0.0500873 10.0232C0.0831513 10.1026 0.131602 10.1746 0.192644 10.2352C0.253188 10.2962 0.325219 10.3447 0.404582 10.3778C0.483946 10.4108 0.56907 10.4279 0.655045 10.4279C0.741021 10.4279 0.826145 10.4108 0.905508 10.3778C0.984872 10.3447 1.0569 10.2962 1.11745 10.2352L5.21393 6.13176L9.31041 10.2352C9.37096 10.2962 9.44299 10.3447 9.52235 10.3778C9.60171 10.4108 9.68684 10.4279 9.77281 10.4279C9.85879 10.4279 9.94391 10.4108 10.0233 10.3778C10.1026 10.3447 10.1747 10.2962 10.2352 10.2352C10.2963 10.1746 10.3447 10.1026 10.3778 10.0232C10.4108 9.94386 10.4279 9.85873 10.4279 9.77274C10.4279 9.68676 10.4108 9.60163 10.3778 9.52225C10.3447 9.44288 10.2963 9.37084 10.2352 9.31029L6.13222 5.21337Z"
                    fill="#808582"
                  />
                </svg>
              </SearchRightIconWrapper>
            </SearchBarInner>
          </SearchBar>

          {/* File type dropdown (non-functional, just UI) */}
          <FileTypeDropdown>
            <FileTypeLabel>File Type</FileTypeLabel>
            <FileTypeDropdownIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="7"
                viewBox="0 0 11 7"
                fill="none"
              >
                <path
                  d="M5.22262 6.45224L10.4452 1.22962L9.21736 0L5.22262 3.99735L1.22875 0L0 1.22875L5.22262 6.45224Z"
                  fill="#808582"
                />
              </svg>
            </FileTypeDropdownIcon>
          </FileTypeDropdown>
        </HeaderRight>
      </HeaderRow>

      <FilesTable files={tableFiles} onRowClick={handleRowClick} />

      {selectedFile && (
        <Modal onClose={() => setSelectedFile(null)}>
          <FilePreview file={selectedFile} />
        </Modal>
      )}
    </PageContainer>
  );
}
