"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchLocalDatabase } from "@/api/sqlite/queries/query";
import FilePreview from "@/components/FilePreview/";
import { LocalFile } from "@/types/schema";
import {
  FileContainer,
  FileHeaders,
  NameHeader,
  OtherHeaders,
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
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          width: "90%",
          height: "90%",
          overflow: "hidden",
          display: "flex",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}

export default function FilesPage() {
  const lessonName = useParams().lessonName;

  const [files, setFiles] = useState<LocalFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<LocalFile | null>(null);

  useEffect(() => {
    async function load() {
      const localData = await fetchLocalDatabase();
      // Temporarily use all files.
      // TODO: set my lesson
      setFiles(localData.files);
    }
    load();
  }, []);

  return (
    <PageContainer>
      <Title>{lessonName}</Title>

      <FileContainer>
        <FileHeaders>
          <NameHeader>Name</NameHeader>
          <OtherHeaders>
            <p>Date Added</p>
            <p>Date Modified</p>
            <p>File Size</p>
            <p>File Type</p>
          </OtherHeaders>
        </FileHeaders>

        {files.map(file => (
          <div key={file.id} onClick={() => setSelectedFile(file)}>
            <NameHeader>{file.name}</NameHeader>
          </div>
        ))}
      </FileContainer>

      {selectedFile && (
        <Modal onClose={() => setSelectedFile(null)}>
          <FilePreview file={selectedFile} />
        </Modal>
      )}
    </PageContainer>
  );
}
