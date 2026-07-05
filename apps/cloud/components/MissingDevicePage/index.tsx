"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { claimDeviceWithCode } from "@/actions/claimDevice";
import { useLanguage } from "@/lib/i18n";
import {
  Button,
  Card,
  Container,
  Description,
  ErrorMessage,
  Form,
  GuideButton,
  HelpText,
  Input,
  Label,
  ModalActions,
  ModalBody,
  ModalCard,
  ModalCloseButton,
  ModalEyebrow,
  ModalOverlay,
  ModalSection,
  ModalTitle,
  Steps,
  SuccessMessage,
  Title,
} from "./styles";

export default function MissingDevicePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [pairingCode, setPairingCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [setupModalOpen, setSetupModalOpen] = useState(true);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    const result = await claimDeviceWithCode(pairingCode);

    if (!result.success) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }

    setSuccess(true);
    router.refresh();
  }

  return (
    <Container>
      <Card>
        <Title>{t("missingDevice.title")}</Title>
        <Description>{t("missingDevice.description")}</Description>

        <GuideButton type="button" onClick={() => setSetupModalOpen(true)}>
          {t("missingDevice.viewSetupSteps")}
        </GuideButton>

        <Steps>
          <li>{t("missingDevice.step1")}</li>
          <li>{t("missingDevice.step2")}</li>
          <li>{t("missingDevice.step3")}</li>
        </Steps>

        <HelpText>{t("missingDevice.help")}</HelpText>

        <Form onSubmit={handleSubmit}>
          <Label htmlFor="pairing-code">{t("pairing.codeLabel")}</Label>
          <Input
            id="pairing-code"
            name="pairing-code"
            value={pairingCode}
            onChange={event => {
              setPairingCode(event.target.value.toUpperCase());
              if (error) setError(null);
            }}
            placeholder="ABCD-2345"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            maxLength={13}
            disabled={isSubmitting || success}
            required
          />

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && (
            <SuccessMessage>{t("missingDevice.linkSuccess")}</SuccessMessage>
          )}

          <Button type="submit" disabled={isSubmitting || success}>
            {isSubmitting
              ? t("pairing.linking")
              : success
                ? t("missingDevice.linked")
                : t("profile.linkHub")}
          </Button>
        </Form>
      </Card>

      {setupModalOpen && (
        <ModalOverlay onClick={() => setSetupModalOpen(false)}>
          <ModalCard
            role="dialog"
            aria-modal="true"
            aria-labelledby="setup-modal-title"
            onClick={event => event.stopPropagation()}
          >
            <ModalEyebrow>{t("setupGuideModal.title")}</ModalEyebrow>
            <ModalTitle id="setup-modal-title">
              {t("setupGuideModal.title")}
            </ModalTitle>
            <ModalBody>{t("setupGuideModal.body")}</ModalBody>

            <ModalSection>
              <h3>{t("setupGuide.mapDashboardTitle")}</h3>
              <p>{t("setupGuide.mapDashboardText")}</p>
            </ModalSection>

            <ModalSection>
              <h3>{t("setupGuide.mapHubTitle")}</h3>
              <p>{t("setupGuide.mapHubText")}</p>
            </ModalSection>

            <ModalSection>
              <h3>{t("setupGuide.mapStudentsTitle")}</h3>
              <p>{t("setupGuide.mapStudentsText")}</p>
            </ModalSection>

            <ModalActions>
              <ModalCloseButton
                type="button"
                onClick={() => setSetupModalOpen(false)}
              >
                {t("common.gotIt")}
              </ModalCloseButton>
            </ModalActions>
          </ModalCard>
        </ModalOverlay>
      )}
    </Container>
  );
}
