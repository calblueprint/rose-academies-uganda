"use client";

import React from "react";
import { Cross, SyncFail, SyncSuccess } from "@/lib/icons";
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
}

const SyncModal: React.FC<SyncModalProps> = ({ variant, onClose }) => {
  const isSuccess = variant === "success";

  return (
    <Overlay onClick={onClose}>
      <Card onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <Cross />
        </CloseButton>

        <IconWrapper>{isSuccess ? <SyncSuccess /> : <SyncFail />}</IconWrapper>

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
            <SyncAgainButton onClick={onClose}>Sync Again</SyncAgainButton>
          </ActionsRow>
        )}
      </Card>
    </Overlay>
  );
};

export default SyncModal;
