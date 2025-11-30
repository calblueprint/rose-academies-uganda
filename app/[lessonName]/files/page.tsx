"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { fetchLocalDatabase } from "@/api/sqlite/queries/query";
import FilePreview from "@/components/FilePreview/";
import { FileRow, FilesTable } from "@/components/FilesTable";
import { LocalFile } from "@/types/schema";
import {
  ModalBackdrop,
  ModalContent,
  ModalPanel,
  PageContainer,
  Title,
} from "./style";

// Modal for displaying file preview. Needs styling.
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
        dateAdded: "N/A",
        dateModified: "N/A",
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
      <Title>{lessonName}</Title>

      <FilesTable files={tableFiles} onRowClick={handleRowClick} />

      {selectedFile && (
        <Modal onClose={() => setSelectedFile(null)}>
          <FilePreview file={selectedFile} />
        </Modal>
      )}
    </PageContainer>
  );
}
