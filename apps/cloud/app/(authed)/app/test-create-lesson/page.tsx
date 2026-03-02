"use client";

// Test page for CreateLessonModal.
// Navigate to /app/test-create-lesson to open the modal and verify the full flow.
// Not intended for production use.
import { useState } from "react";
import { useRouter } from "next/navigation";
import CreateLessonModal from "@/components/modals/CreateLessonModal/CreateLessonModal";

export default function TestCreateLessonPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();

  function handleClose() {
    setIsModalOpen(false);
    router.refresh();
  }

  return (
    <main style={{ padding: "2rem" }}>
      <button type="button" onClick={() => setIsModalOpen(true)}>
        Open Create Lesson Modal
      </button>

      <CreateLessonModal isOpen={isModalOpen} onClose={handleClose} />
    </main>
  );
}
