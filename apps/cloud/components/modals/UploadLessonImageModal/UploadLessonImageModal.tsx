"use client";

import React, { useEffect, useRef, useState } from "react";
import { getSupabaseBrowserClient } from "@/api/supabase/browser";
import { uploadLessonImage } from "@/api/supabase/images";
import { getCurrentUserOrThrow } from "@/lib/getCurrentUser";
import {
  ActionRow,
  BrowseButton,
  CancelButton,
  CloseButton,
  DropZone,
  DropZoneSubtext,
  DropZoneText,
  ErrorText,
  ModalCard,
  ModalHeader,
  Overlay,
  PresetCard,
  PresetGrid,
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
  onImageUpdated?: (lessonId: number, imagePath: string) => void;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg"];
const ACCEPTED_EXT = ".png, .jpg";

const PRESET_IMAGES = [
  "/placeholders/preset-0.svg",
  "/placeholders/preset-1.svg",
  "/placeholders/preset-2.svg",
  "/placeholders/preset-3.svg",
  "/placeholders/preset-4.svg",
  "/placeholders/preset-5.svg",
  "/placeholders/preset-6.svg",
  "/placeholders/preset-7.svg",
];

// ============================================================
// Tab icons
// ============================================================

function SelectIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect
        x="2"
        y="3"
        width="14"
        height="12"
        rx="1.5"
        stroke={color}
        strokeWidth="1.4"
      />
      <circle cx="6.5" cy="7.5" r="1.5" stroke={color} strokeWidth="1.4" />
      <path
        d="M2 12.5L5.5 9.5L8 11.5L11 8.5L16 12.5"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UploadIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 12V4M9 4L6 7M9 4L12 7"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 14H15"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ============================================================
// Component
// ============================================================

export default function UploadLessonImageModal({
  isOpen,
  onClose,
  lessonId,
  onImageUpdated,
}: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("select");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
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
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setError(null);
  }

  function validateAndSetFile(f: File) {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError("Only .png and .jpg files are accepted.");
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
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
    setSelectedPreset(null);
    setActiveTab("select");
    onClose();
  }

  async function handleSubmit() {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    try {
      let newImagePath: string;

      if (activeTab === "select") {
        if (!selectedPreset) return;
        const supabase = getSupabaseBrowserClient();
        const user = await getCurrentUserOrThrow();
        const { error: updateError } = await supabase
          .from("Lessons")
          .update({
            image_path: selectedPreset,
            updated_at: new Date().toISOString(),
          })
          .eq("id", lessonId)
          .eq("user_id", user.id);
        if (updateError) throw updateError;
        newImagePath = selectedPreset;
      } else {
        if (!file) return;
        newImagePath = await uploadLessonImage(lessonId, file);
      }

      onImageUpdated?.(lessonId, newImagePath);
      clearSelectedFile();
      setSelectedPreset(null);
      onClose();
    } catch (err) {
      console.error("Failed to save image:", err);
      setError("Failed to save image. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const canSave = activeTab === "select" ? !!selectedPreset : !!file;

  return (
    <Overlay onClick={handleClose}>
      <ModalCard onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h2
            style={{
              margin: 0,
              fontSize: "1.5rem",
              fontWeight: 500,
              lineHeight: "normal",
            }}
          >
            Select Lesson Graphic
          </h2>

          <CloseButton
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </CloseButton>
        </ModalHeader>

        <TabRow>
          <Tab
            type="button"
            $active={activeTab === "select"}
            onClick={() => setActiveTab("select")}
          >
            <SelectIcon color={activeTab === "select" ? "#fff" : "#000"} />
            Select Image
          </Tab>
          <Tab
            type="button"
            $active={activeTab === "upload"}
            onClick={() => setActiveTab("upload")}
          >
            <UploadIcon color={activeTab === "upload" ? "#fff" : "#000"} />
            Upload Image
          </Tab>
        </TabRow>

        {activeTab === "select" ? (
          <PresetGrid>
            {PRESET_IMAGES.map(src => (
              <PresetCard
                key={src}
                type="button"
                $selected={selectedPreset === src}
                onClick={() =>
                  setSelectedPreset(prev => (prev === src ? null : src))
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" />
              </PresetCard>
            ))}
          </PresetGrid>
        ) : (
          <DropZone
            $isDragging={isDragging}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isSubmitting && fileInputRef.current?.click()}
            style={previewUrl ? { padding: 0, overflow: "hidden" } : undefined}
          >
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Preview"
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            ) : (
              <>
                <svg
                  width="36"
                  height="30"
                  viewBox="0 0 36 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.5 12.33C27.46 7.8 23.42 4.5 18.6 4.5C14.73 4.5 11.34 6.66 9.66 9.81C5.94 10.23 3 13.35 3 17.25C3 21.39 6.36 24.75 10.5 24.75H28.2C31.68 24.75 34.5 21.93 34.5 18.45C34.5 15.12 31.98 12.42 28.5 12.33Z"
                    stroke="#4B4A49"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22.5 20.25L18 15.75L13.5 20.25"
                    stroke="#4B4A49"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 15.75V28.5"
                    stroke="#4B4A49"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <DropZoneText>
                  Choose a file or drag &amp; drop it here
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
          <CancelButton type="button" onClick={handleClose}>
            Cancel
          </CancelButton>
          <SaveButton
            type="button"
            onClick={handleSubmit}
            disabled={!canSave || isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : activeTab === "select"
                ? "Select Image"
                : "Save Image"}
          </SaveButton>
        </ActionRow>
      </ModalCard>
    </Overlay>
  );
}
