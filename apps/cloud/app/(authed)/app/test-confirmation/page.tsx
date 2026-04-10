"use client";

import { useState } from "react";
import ConfirmationModal from "@/components/modals/ConfirmationModal/ConfirmationModal";

export default function TestConfirmationPage() {
  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Confirmation Modal Test</h1>

      <button
        /*
      TODO #1:
      clicking this button should open the modal.

      right now, it only logs to the console.
      replace this with the correct behavior.
      */
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Click to Test Modal
      </button>

      <ConfirmationModal
        isOpen={isOpen}
        title="Archive Lesson"
        description="This lesson will be removed from the Lesson Dashboard and Sync Lessons pages. You can restore it through the Archive page."
        confirmText="Archive Lesson"
        isLoading={isLoading}
        onCancel={() => setIsOpen(false)}
        onConfirm={async () => {
          setIsLoading(true);
          await new Promise(r => setTimeout(r, 300));
          setIsLoading(false);
          setIsOpen(false);
        }}
      />
    </div>
  );
}
