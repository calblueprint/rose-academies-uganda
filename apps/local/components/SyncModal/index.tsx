"use client";

import React from "react";
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
}

const SyncModal: React.FC<SyncModalProps> = ({
  variant,
  onClose,
  onSyncAgain,
}) => {
  const { t } = useLanguage();
  const isSuccess = variant === "success";

  return (
    <Overlay>
      <Card>
        <CloseButton onClick={onClose}>{IconSvgs.Cross}</CloseButton>

        <IconWrapper>
          {isSuccess ? IconSvgs.syncSuccess : IconSvgs.syncFail}
        </IconWrapper>

        <Title>
          {isSuccess
            ? t("downloadModal.successTitle")
            : t("downloadModal.errorTitle")}
        </Title>

        <Body>
          {isSuccess
            ? t("downloadModal.successBody")
            : t("downloadModal.errorBody")}
        </Body>

        {isSuccess ? (
          <ActionsRow>
            <ContinueButton onClick={onClose}>
              <ContinueText>{t("downloadModal.continue")}</ContinueText>
            </ContinueButton>
          </ActionsRow>
        ) : (
          <ActionsRow>
            <TryLaterButton onClick={onClose}>
              {t("downloadModal.tryLater")}
            </TryLaterButton>
            <SyncAgainButton onClick={onSyncAgain}>
              {t("downloadModal.tryAgain")}
            </SyncAgainButton>
          </ActionsRow>
        )}
      </Card>
    </Overlay>
  );
};

export default SyncModal;
