"use client";

import React from "react";
import { ModalBackdrop, ModalContent, ModalPanel } from "./style";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function FilePreviewModal({ children, onClose }: ModalProps) {
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalPanel onClick={e => e.stopPropagation()}>
        <ModalContent>{children}</ModalContent>
      </ModalPanel>
    </ModalBackdrop>
  );
}
