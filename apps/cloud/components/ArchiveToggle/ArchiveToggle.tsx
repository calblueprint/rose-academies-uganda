"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/api/supabase/browser";
import ConfirmationModal from "@/components/modals/ConfirmationModal/ConfirmationModal";
import { ArchiveButton, ArchiveButtonText } from "./styles";

type ArchiveToggleProps = {
  lesson_Id: number;
  isArchived: boolean;
  deviceId?: string | null;
};

export default function ArchiveToggle({
  lesson_Id,
  isArchived,
  deviceId = null,
}: ArchiveToggleProps) {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  async function handleConfirm() {
    const { error: lessonError } = await supabase
      .from("Lessons")
      .update({
        is_archived: !isArchived,
        updated_at: new Date().toISOString(),
      })
      .eq("id", lesson_Id);

    if (lessonError) {
      throw new Error(lessonError.message);
    }

    if (!isArchived && deviceId) {
      const { error: syncError } = await supabase
        .from("DeviceLessons")
        .delete()
        .eq("lesson_id", lesson_Id)
        .eq("device_id", deviceId);

      if (syncError) {
        throw new Error(syncError.message);
      }
    }

    setIsOpen(false);
    router.push(
      isArchived || !deviceId ? "/app/lessons" : "/app/offline-library",
    );
  }

  return (
    <>
      <ArchiveButton
        type="button"
        onClick={e => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        <svg viewBox="0 0 18 18" fill="none">
          <path d="M5.25 4.5H12.75" strokeWidth="1.125" strokeLinecap="round" />
          <path
            d="M5.25 6.75H12.75"
            strokeWidth="1.125"
            strokeLinecap="round"
          />
          <path
            d="M6.75 12.75H11.25"
            strokeWidth="1.125"
            strokeLinecap="round"
          />
          <path
            d="M2.25 9H1.95C1.70147 9 1.5 9.20145 1.5 9.45V16.05C1.5 16.2985 1.70147 16.5 1.95 16.5H16.05C16.2985 16.5 16.5 16.2985 16.5 16.05V9.45C16.5 9.20145 16.2985 9 16.05 9H15.75M2.25 9V1.95C2.25 1.70147 2.45147 1.5 2.7 1.5H15.3C15.5485 1.5 15.75 1.70147 15.75 1.95V9M2.25 9H15.75"
            strokeWidth="1.125"
          />
        </svg>

        <ArchiveButtonText>
          {isArchived ? "Restore" : "Archive"}
        </ArchiveButtonText>
      </ArchiveButton>

      <ConfirmationModal
        isOpen={isOpen}
        title={isArchived ? "Restore Lesson" : "Archive Lesson"}
        description={
          isArchived
            ? "This lesson will return to the Lesson Dashboard. You can send it to sync again when it is ready."
            : deviceId
              ? "This lesson will be removed from the Lesson Dashboard and Sync Lessons page. Sync afterwards to remove it from the classroom device."
              : "This lesson will be removed from the Lesson Dashboard. You can restore it later from Archived Lessons."
        }
        confirmText={isArchived ? "Restore Lesson" : "Archive Lesson"}
        onCancel={() => setIsOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
