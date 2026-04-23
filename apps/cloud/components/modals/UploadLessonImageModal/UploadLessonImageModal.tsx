"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadLessonImage } from "@/api/supabase/images";
import { DataContext } from "@/context/DataContext";
import {
  ActionRow,
  BrowseButton,
  CancelButton,
  CloseButton,
  ComingSoonText,
  DropZone,
  DropZoneSubtext,
  DropZoneText,
  ErrorText,
  ModalCard,
  ModalHeader,
  ModalTitle,
  Overlay,
  SaveButton,
  Tab,
  TabRow,
} from "./styles";

// ============================================================
// Types + constants
// ============================================================

type ActiveTab = "select" | "upload";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lessonId: number;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg"];
const ACCEPTED_EXT = ".png, .jpg";

// ============================================================
// Component
// ============================================================

export default function UploadLessonImageModal({
  isOpen,
  onClose,
  lessonId,
}: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const data = useContext(DataContext);
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.documentElement.style.overflowY = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function clearSelectedFile() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setFile(null);
    setPreviewUrl(null);
    setError(null);
  }

  function validateAndSetFile(f: File) {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError("Only .png and .jpg files are accepted.");
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setError(null);
    setFile(f);

    setPreviewUrl(URL.createObjectURL(f));
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) validateAndSetFile(dropped);
  }

  function handleClose() {
    if (isSubmitting) return;
    clearSelectedFile();
    setActiveTab("upload");
    onClose();
  }

  async function handleSubmit() {
    if (!file || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await uploadLessonImage(lessonId, file);
      await data.refresh();
      router.refresh();

      clearSelectedFile();
      setIsSubmitting(false);
      onClose();
    } catch (err) {
      console.error("Failed to upload image:", err);
      setError("Failed to upload image. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <Overlay onClick={handleClose}>
      <ModalCard onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Upload Lesson Cover</ModalTitle>

          <CloseButton
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            <svg width="16" height="16">
              <path d="M12 4L4 12M4 4L12 12" />
            </svg>
          </CloseButton>
        </ModalHeader>

        <TabRow>
          <Tab
            $active={activeTab === "select"}
            onClick={() => setActiveTab("select")}
          >
            Select Image
          </Tab>

          <Tab
            $active={activeTab === "upload"}
            onClick={() => setActiveTab("upload")}
          >
            Upload Image
          </Tab>
        </TabRow>

        {activeTab === "select" ? (
          <ComingSoonText>Preset images coming soon.</ComingSoonText>
        ) : (
          <DropZone
            $isDragging={isDragging}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isSubmitting && fileInputRef.current?.click()}
            style={
              previewUrl
                ? {
                    padding: 0,
                    overflow: "hidden",
                  }
                : undefined
            }
          >
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                }}
              />
            ) : (
              <>
                <svg width="36" height="30">
                  <path d="..." />
                </svg>

                <DropZoneText>
                  Choose a file or drag & drop it here
                </DropZoneText>

                <DropZoneSubtext>
                  {ACCEPTED_EXT} formats accepted
                </DropZoneSubtext>

                <BrowseButton
                  type="button"
                  disabled={isSubmitting}
                  onClick={e => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  Browse File
                </BrowseButton>
              </>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={e => {
                const f = e.target.files?.[0];
                if (f) validateAndSetFile(f);
                e.target.value = "";
              }}
            />
          </DropZone>
        )}

        {error && <ErrorText>{error}</ErrorText>}

        <ActionRow>
          <CancelButton onClick={handleClose}>Cancel</CancelButton>

          <SaveButton
            onClick={handleSubmit}
            disabled={!file || isSubmitting || activeTab === "select"}
          >
            {isSubmitting ? "Uploading..." : "Save Image"}
          </SaveButton>
        </ActionRow>
      </ModalCard>
    </Overlay>
  );
}
