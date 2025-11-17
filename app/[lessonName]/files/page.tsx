"use client";

import { useParams } from "next/navigation";
import {
  FileContainer,
  FileHeaders,
  NameHeader,
  OtherHeaders,
  PageContainer,
  Title,
} from "./style";

export default function FilesPage() {
  const lessonName = useParams().lessonName;

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
      </FileContainer>
    </PageContainer>
  );
}
