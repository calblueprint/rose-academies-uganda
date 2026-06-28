"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { claimDeviceWithCode } from "@/actions/claimDevice";
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
  ModalStepList,
  ModalTitle,
  Steps,
  SuccessMessage,
  Title,
} from "./styles";

export default function MissingDevicePage() {
  const router = useRouter();
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
        <Title>Link Your Classroom Hub</Title>
        <Description>
          You are in the Educator Dashboard at rosepch.org. Link the physical
          Classroom Hub device so lessons from this account can sync to the
          Student Library.
        </Description>

        <GuideButton type="button" onClick={() => setSetupModalOpen(true)}>
          View setup steps
        </GuideButton>

        <Steps>
          <li>
            On the hub device, open Classroom Hub Device Setup at
            rosehub.local/setup.
          </li>
          <li>Copy the one-time pairing code shown on the hub device.</li>
          <li>
            Return to this Educator Dashboard and enter the pairing code here.
          </li>
        </Steps>

        <HelpText>
          Already set up this Classroom Hub with another educator account? Sign
          in with that account, or reset this Classroom Hub before linking it to
          a new educator.
        </HelpText>

        <Form onSubmit={handleSubmit}>
          <Label htmlFor="pairing-code">Classroom Hub pairing code</Label>
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
            <SuccessMessage>
              Classroom Hub linked. Opening your dashboard…
            </SuccessMessage>
          )}

          <Button type="submit" disabled={isSubmitting || success}>
            {isSubmitting
              ? "Linking…"
              : success
                ? "Linked"
                : "Link Classroom Hub"}
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
            <ModalEyebrow>Setup guide</ModalEyebrow>
            <ModalTitle id="setup-modal-title">Setup guide</ModalTitle>
            <ModalBody>
              Keep this Educator Dashboard open. Have the Classroom Hub nearby,
              and use another tablet, phone, or computer to connect to the hub
              setup Wi-Fi and open rosehub.local/setup.
            </ModalBody>

            <ModalSection>
              <h3>1. At the Classroom Hub</h3>
              <ModalStepList>
                <li>Power on the hub with a charger or battery pack.</li>
                <li>
                  On another tablet, phone, or computer, join the Rose-Setup
                  Wi-Fi hotspot if it appears.
                </li>
                <li>
                  On that same tablet, phone, or computer, open
                  http://rosehub.local/setup.
                </li>
                <li>Connect the hub to internet Wi-Fi.</li>
                <li>Copy the pairing code shown on the hub.</li>
              </ModalStepList>
            </ModalSection>

            <ModalSection>
              <h3>2. In the Educator Dashboard</h3>
              <ModalStepList>
                <li>Use this dashboard at https://rosepch.org.</li>
                <li>Enter the hub pairing code below.</li>
                <li>Create classrooms and save each join code.</li>
                <li>Create lessons and upload files.</li>
                <li>Save lessons to the Classroom Hub and sync them.</li>
              </ModalStepList>
            </ModalSection>

            <ModalSection>
              <h3>3. For students</h3>
              <ModalStepList>
                <li>
                  Students connect their tablet, phone, or computer to the
                  Classroom Hub Wi-Fi.
                </li>
                <li>
                  Students open the Student Library at
                  http://rosehub.local/join.
                </li>
                <li>
                  Students enter the classroom join code from the educator.
                </li>
              </ModalStepList>
            </ModalSection>

            <ModalActions>
              <ModalCloseButton
                type="button"
                onClick={() => setSetupModalOpen(false)}
              >
                Got it
              </ModalCloseButton>
            </ModalActions>
          </ModalCard>
        </ModalOverlay>
      )}
    </Container>
  );
}
