"use client";

import React, { useEffect } from "react";
import { IconSvgs } from "@/lib/icons";
import {
  ActionsRow,
  Body,
  Card,
  CloseButton,
  ContinueButton,
  ContinueText,
  IconWrapper,
  ModalVariant,
  Overlay,
  SyncAgainButton,
  Title,
  TryLaterButton,
} from "./styles";

export interface SyncModalProps {
  variant: ModalVariant; // "success" or "error"
  onClose: () => void;
  onSyncAgain?: () => void;
  bodyText?: string;
}

const SyncModal: React.FC<SyncModalProps> = ({
  variant,
  onClose,
  onSyncAgain,
  bodyText,
}) => {
  useEffect(() => {
    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.documentElement.style.overflowY = "";
    };
  }, []);

  const isSuccess = variant === "success";

  const defaultBodyText = isSuccess
    ? "All changes have been successfully synced."
    : "The sync could not be completed. Please try again later.";

  return (
    <Overlay>
      <Card>
        <CloseButton onClick={onClose}>{IconSvgs.Cross}</CloseButton>

        <IconWrapper>
          {isSuccess ? IconSvgs.syncSuccess : IconSvgs.syncFail}
        </IconWrapper>

        <Title>
          {isSuccess ? "Syncing Successful!" : "Error! Syncing Failed"}
        </Title>

        <Body>{bodyText ?? defaultBodyText}</Body>

        {isSuccess ? (
          <ActionsRow>
            <ContinueButton onClick={onClose}>
              <ContinueText>Continue</ContinueText>
            </ContinueButton>
          </ActionsRow>
        ) : (
          <ActionsRow>
            <TryLaterButton onClick={onClose}>Try Later</TryLaterButton>
            <SyncAgainButton onClick={onSyncAgain}>Sync Again</SyncAgainButton>
          </ActionsRow>
        )}
      </Card>
    </Overlay>
  );
};

export default SyncModal;
