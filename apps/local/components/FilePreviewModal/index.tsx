"use client";

import React, { useEffect } from "react";
import { ModalBackdrop, ModalContent, ModalPanel } from "./style";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function FilePreviewModal({ children, onClose }: ModalProps) {
  useEffect(() => {
    const scrollY = window.scrollY;
    const originalBodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = originalBodyStyles.position;
      document.body.style.top = originalBodyStyles.top;
      document.body.style.left = originalBodyStyles.left;
      document.body.style.right = originalBodyStyles.right;
      document.body.style.width = originalBodyStyles.width;
      document.body.style.overflow = originalBodyStyles.overflow;
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalPanel onClick={e => e.stopPropagation()}>
        <ModalContent>{children}</ModalContent>
      </ModalPanel>
    </ModalBackdrop>
  );
}
