"use client";

import React, { useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
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
  const { t } = useLanguage();

  useEffect(() => {
    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.documentElement.style.overflowY = "";
    };
  }, []);

  const isSuccess = variant === "success";

  const defaultBodyText = isSuccess
    ? t("sync.successBody")
    : t("sync.errorBody");

  return (
    <Overlay>
      <Card>
        <CloseButton onClick={onClose}>{IconSvgs.Cross}</CloseButton>

        <IconWrapper>
          {isSuccess ? IconSvgs.syncSuccess : IconSvgs.syncFail}
        </IconWrapper>

        <Title>
          {isSuccess ? t("sync.successTitle") : t("sync.errorTitle")}
        </Title>

        <Body>{bodyText ?? defaultBodyText}</Body>

        {isSuccess ? (
          <ActionsRow>
            <ContinueButton onClick={onClose}>
              <ContinueText>{t("sync.continue")}</ContinueText>
            </ContinueButton>
          </ActionsRow>
        ) : (
          <ActionsRow>
            <TryLaterButton onClick={onClose}>
              {t("sync.tryLater")}
            </TryLaterButton>
            <SyncAgainButton onClick={onSyncAgain}>
              {t("sync.syncAgain")}
            </SyncAgainButton>
          </ActionsRow>
        )}
      </Card>
    </Overlay>
  );
};

export default SyncModal;
