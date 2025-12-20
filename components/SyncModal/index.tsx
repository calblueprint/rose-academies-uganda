"use client";

import React from "react";
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
}

const SyncModal: React.FC<SyncModalProps> = ({
  variant,
  onClose,
  onSyncAgain,
}) => {
  const isSuccess = variant === "success";

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

        <Body>
          {isSuccess
            ? "Possibly adding explanation successful sync lorem ipsum"
            : "Explanation for syncing was not successful because lorem ipsum"}
        </Body>

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
