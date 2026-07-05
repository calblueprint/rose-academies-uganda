"use client";

import { FormEvent, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { claimDeviceWithCode } from "@/actions/claimDevice";
import { createOwnedClassroom } from "@/app/(authed)/app/classrooms/actions";
import CloudSyncButton from "@/components/CloudSyncButton";
import CreateLessonModal from "@/components/modals/CreateLessonModal/CreateLessonModal";
import {
  ModalCard,
  CloseButton as ModalCloseButton,
  ModalHeader,
  ModalTitle,
  Overlay,
} from "@/components/modals/CreateLessonModal/styles";
import SyncSummaryCard from "@/components/SyncSummaryCard";
import { DataContext } from "@/context/DataContext";
import { useLanguage } from "@/lib/i18n";
import { IconSvgs } from "@/lib/icons";
import {
  BrandRow,
  BrandTitle,
  ClassroomCode,
  ClassroomForm,
  CurrentStepCard,
  CurrentStepText,
  CurrentStepTitle,
  DashboardPage,
  HelperCard,
  HeroIcon,
  InlineCode,
  InputActionRow,
  InstructionList,
  InstructionText,
  OrientationCard,
  PairingError,
  PairingForm,
  PairingHelp,
  PairingInput,
  PairingLabel,
  PrimaryButton,
  PrimaryLink,
  ProgressItem,
  ProgressList,
  ProgressStepButton,
  SafetyCard,
  SecondaryInlineButton,
  SetupSystemItem,
  SetupSystemMap,
  StepActionRow,
  StepBackButton,
  StepCount,
  StepNavRow,
  StepNextButton,
  SyncInlineGrid,
  SyncStepStatus,
  WelcomeChecklist,
  WelcomePanel,
  WizardCard,
} from "./style";

export type SetupStepData = {
  done: boolean;
  titleKey: string;
  titleParams?: Record<string, string | number>;
  shortLabelKey: string;
  detailKey: string;
  detailParams?: Record<string, string | number>;
  actionKey: string;
  href: string;
  helperKey?: string;
  instructionsKeys?: string[];
};

type DashboardSetupWizardProps = {
  steps: SetupStepData[];
  deviceId: string | null;
  deviceLastSyncedAt: string | null;
  deviceLastSyncedLabel?: string | null;
  userId: string;
  classroomCount: number;
  syncedCount: number;
  pendingSyncCount: number;
  onFinish?: () => void;
};

const EMPHASIZED_TERMS =
  /(http:\/\/rosehub\.local\/setup|http:\/\/10\.42\.0\.1\/setup|http:\/\/10\.42\.0\.1\/join|\bRose-Hub-XXXX\b|rosehub!)/g;

function renderInstruction(instruction: string) {
  return instruction.split(EMPHASIZED_TERMS).map(part => {
    if (!part) return null;

    if (EMPHASIZED_TERMS.test(part)) {
      EMPHASIZED_TERMS.lastIndex = 0;
      return <InlineCode key={part}>{part}</InlineCode>;
    }

    EMPHASIZED_TERMS.lastIndex = 0;
    return part;
  });
}

function interpolate(
  template: string,
  replacements: Record<string, string | number> = {},
) {
  return Object.entries(replacements).reduce(
    (value, [name, replacement]) =>
      value.replaceAll(`{${name}}`, String(replacement)),
    template,
  );
}

const SKIPPABLE_STEP_INDEXES = new Set([0, 1, 2, 3]);
const SETUP_FINISH_HREF = "/app/lessons";
const STEP_SAFETY_KEYS = [
  "setupGuide.stepSafetyHub",
  "setupGuide.stepSafetyClassroom",
  "setupGuide.stepSafetyLesson",
  "setupGuide.stepSafetySync",
];

function generateJoinCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let value = "";

  for (let index = 0; index < 6; index++) {
    value += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return value;
}

function normalizeJoinCode(value: string) {
  return value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 6);
}

export default function DashboardSetupWizard({
  steps,
  deviceId,
  deviceLastSyncedAt,
  deviceLastSyncedLabel,
  userId,
  classroomCount,
  syncedCount,
  pendingSyncCount,
  onFinish,
}: DashboardSetupWizardProps) {
  const router = useRouter();
  const data = useContext(DataContext);
  const { t } = useLanguage();
  const tr = (
    key: string,
    replacements: Record<string, string | number> = {},
  ) => interpolate(t(key), replacements);
  const [hasStarted, setHasStarted] = useState(false);
  const [manualStepIndex, setManualStepIndex] = useState<number | null>(null);
  const [pairingCode, setPairingCode] = useState("");
  const [pairingError, setPairingError] = useState<string | null>(null);
  const [isPairing, setIsPairing] = useState(false);
  const [classroomName, setClassroomName] = useState("");
  const [classroomJoinCode, setClassroomJoinCode] = useState(generateJoinCode);
  const [classroomError, setClassroomError] = useState<string | null>(null);
  const [createdClassroom, setCreatedClassroom] = useState<{
    name: string;
    join_code: string;
  } | null>(null);
  const [isCreateClassroomOpen, setIsCreateClassroomOpen] = useState(false);
  const [isCreatingClassroom, setIsCreatingClassroom] = useState(false);
  const [isPreparingLessonModal, setIsPreparingLessonModal] = useState(false);
  const [isCreateLessonOpen, setIsCreateLessonOpen] = useState(false);
  const [skippedStepIndexes, setSkippedStepIndexes] = useState<Set<number>>(
    () => new Set(),
  );
  const [localClassroomCount, setLocalClassroomCount] =
    useState(classroomCount);
  const effectiveSteps = useMemo(
    () =>
      steps.map((step, index) => {
        if (index !== 1) return step;

        return {
          ...step,
          done: localClassroomCount > 0,
          detailKey:
            localClassroomCount > 0
              ? localClassroomCount === 1
                ? "setupGuide.stepClassroom.detailDoneSingular"
                : "setupGuide.stepClassroom.detailDonePlural"
              : "setupGuide.stepClassroom.detail",
          detailParams: { count: localClassroomCount },
        };
      }),
    [localClassroomCount, steps],
  );
  const firstIncompleteIndex = useMemo(() => {
    const index = effectiveSteps.findIndex(item => !item.done);
    return index === -1 ? effectiveSteps.length - 1 : index;
  }, [effectiveSteps]);
  const hubAlreadyLinked = steps[0]?.done === true;
  const firstStepAfterWelcome =
    hubAlreadyLinked && effectiveSteps.length > 1 ? 1 : 0;
  const currentStepIndex = manualStepIndex ?? firstIncompleteIndex;
  const currentStep = effectiveSteps[currentStepIndex];
  const isFinalStep = currentStepIndex === effectiveSteps.length - 1;
  const lastSuccessfulSyncText =
    deviceLastSyncedLabel ?? (deviceLastSyncedAt ? t("common.recorded") : null);
  const currentStepTitle = tr(currentStep.titleKey, currentStep.titleParams);
  const currentStepShortLabel = t(currentStep.shortLabelKey);
  const currentStepDetail = tr(currentStep.detailKey, currentStep.detailParams);

  function goToPreviousStep() {
    setManualStepIndex(Math.max(0, currentStepIndex - 1));
  }

  function goToNextStep() {
    if (isFinalStep) {
      if (onFinish) {
        onFinish();
      } else {
        router.push(SETUP_FINISH_HREF);
      }
      return;
    }

    setManualStepIndex(
      Math.min(effectiveSteps.length - 1, currentStepIndex + 1),
    );
  }

  function skipCurrentStep() {
    setSkippedStepIndexes(previous => new Set(previous).add(currentStepIndex));

    if (isFinalStep) {
      if (onFinish) {
        onFinish();
      } else {
        router.push(SETUP_FINISH_HREF);
      }
      return;
    }

    setManualStepIndex(
      Math.min(effectiveSteps.length - 1, currentStepIndex + 1),
    );
  }

  async function handlePairingSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isPairing) return;

    setIsPairing(true);
    setPairingError(null);

    const result = await claimDeviceWithCode(pairingCode);

    if (!result.success) {
      setPairingError(result.error);
      setIsPairing(false);
      return;
    }

    setPairingCode("");
    setManualStepIndex(1);
    router.refresh();
    setIsPairing(false);
  }

  async function handleClassroomSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isCreatingClassroom) return;

    setIsCreatingClassroom(true);
    setClassroomError(null);

    const result = await createOwnedClassroom({
      name: classroomName,
      joinCode: classroomJoinCode,
    });

    if (!result.success) {
      setClassroomError(result.error);
      setIsCreatingClassroom(false);
      return;
    }

    setCreatedClassroom(result.classroom);
    setLocalClassroomCount(count => count + 1);
    setClassroomName("");
    setClassroomJoinCode(generateJoinCode());
    await data.refresh();
    setIsCreateClassroomOpen(false);
    router.refresh();
    setIsCreatingClassroom(false);
  }

  async function openCreateLessonModal() {
    if (isPreparingLessonModal) return;

    setIsPreparingLessonModal(true);

    try {
      await data.refresh();
      setIsCreateLessonOpen(true);
    } finally {
      setIsPreparingLessonModal(false);
    }
  }

  const canSkipCurrentStep =
    SKIPPABLE_STEP_INDEXES.has(currentStepIndex) &&
    !currentStep.done &&
    !skippedStepIndexes.has(currentStepIndex);
  const canAdvanceCurrentStep =
    currentStepIndex !== 0 ||
    currentStep.done ||
    skippedStepIndexes.has(currentStepIndex);

  return (
    <DashboardPage>
      <WizardCard>
        {hasStarted && (
          <BrandRow>
            <BrandTitle>{t("setupGuide.brandTitle")}</BrandTitle>
            <StepCount>
              {tr("setupGuide.stepCount", {
                current: currentStepIndex + 1,
                total: effectiveSteps.length,
              })}
            </StepCount>
          </BrandRow>
        )}

        {!hasStarted ? (
          <WelcomePanel>
            <HeroIcon>🌱</HeroIcon>
            <CurrentStepTitle>{t("setupGuide.welcomeTitle")}</CurrentStepTitle>
            <CurrentStepText>
              {hubAlreadyLinked
                ? t("setupGuide.welcomeLinked")
                : t("setupGuide.welcomeIntro")}
            </CurrentStepText>
            <SetupSystemMap>
              <SetupSystemItem>
                <strong>{t("setupGuide.mapDashboardTitle")}</strong>
                <span>{t("setupGuide.mapDashboardText")}</span>
              </SetupSystemItem>
              <SetupSystemItem>
                <strong>{t("setupGuide.mapHubTitle")}</strong>
                <span>{t("setupGuide.mapHubText")}</span>
              </SetupSystemItem>
              <SetupSystemItem>
                <strong>{t("setupGuide.mapStudentsTitle")}</strong>
                <span>{t("setupGuide.mapStudentsText")}</span>
              </SetupSystemItem>
            </SetupSystemMap>
            <WelcomeChecklist>
              <span>{t("setupGuide.checkDashboardOpen")}</span>
              {!hubAlreadyLinked && (
                <span>{t("setupGuide.checkHubNearby")}</span>
              )}
              {!hubAlreadyLinked && (
                <span>{t("setupGuide.checkOtherDevice")}</span>
              )}
              <span>{t("setupGuide.checkOneStep")}</span>
            </WelcomeChecklist>
            <PrimaryButton
              type="button"
              onClick={() => {
                setManualStepIndex(firstStepAfterWelcome);
                setHasStarted(true);
              }}
            >
              {t("setupGuide.begin")}
            </PrimaryButton>
          </WelcomePanel>
        ) : (
          <>
            <OrientationCard>
              <strong>{t("setupGuide.orientationTitle")}</strong>
              <span>{t("setupGuide.orientationText")}</span>
            </OrientationCard>

            <ProgressList
              $count={effectiveSteps.length}
              aria-label={t("setupGuide.progressLabel")}
            >
              {effectiveSteps.map((item, index) => (
                <ProgressItem
                  key={item.titleKey}
                  $active={index === currentStepIndex}
                  $done={item.done}
                >
                  <ProgressStepButton
                    type="button"
                    onClick={() => setManualStepIndex(index)}
                  >
                    <span>
                      {item.done && index !== currentStepIndex
                        ? "✓"
                        : index + 1}
                    </span>
                    <small>{t(item.shortLabelKey)}</small>
                  </ProgressStepButton>
                </ProgressItem>
              ))}
            </ProgressList>

            <CurrentStepCard>
              <CurrentStepTitle>{currentStepTitle}</CurrentStepTitle>
              <CurrentStepText>{currentStepDetail}</CurrentStepText>
              {currentStep.instructionsKeys && (
                <InstructionList>
                  {currentStep.instructionsKeys.map((instructionKey, index) => (
                    <li key={instructionKey}>
                      <span>{index + 1}</span>
                      <InstructionText>
                        {renderInstruction(t(instructionKey))}
                      </InstructionText>
                    </li>
                  ))}
                </InstructionList>
              )}
              {currentStep.helperKey && (
                <HelperCard>{t(currentStep.helperKey)}</HelperCard>
              )}
              {currentStepIndex !== 0 && (
                <SafetyCard>
                  {t(
                    STEP_SAFETY_KEYS[currentStepIndex] ?? "setupGuide.safeNote",
                  )}
                </SafetyCard>
              )}

              {currentStepIndex === 0 && !currentStep.done ? (
                <PairingForm onSubmit={handlePairingSubmit}>
                  <PairingLabel htmlFor="setup-pairing-code">
                    {t("setupGuide.pairingLabel")}
                  </PairingLabel>
                  <PairingInput
                    id="setup-pairing-code"
                    value={pairingCode}
                    onChange={event => {
                      setPairingCode(event.target.value.toUpperCase());
                      setPairingError(null);
                    }}
                    placeholder="ABCD-2345"
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                    maxLength={13}
                    disabled={isPairing}
                    required
                  />
                  <PairingHelp>
                    {t("setupGuide.pairingHelp")}{" "}
                    <InlineCode>http://rosehub.local/setup</InlineCode>.{" "}
                    {t("setupGuide.pairingFallbackHelp")}{" "}
                    <InlineCode>http://10.42.0.1/setup</InlineCode>.
                  </PairingHelp>
                  {pairingError && <PairingError>{pairingError}</PairingError>}
                  <PrimaryButton type="submit" disabled={isPairing}>
                    {isPairing
                      ? t("setupGuide.linkingHub")
                      : t("setupGuide.enterPairingCode")}
                  </PrimaryButton>
                </PairingForm>
              ) : currentStepIndex === 1 ? (
                <>
                  {createdClassroom && (
                    <ClassroomCode>
                      {t("setupGuide.createdClassroom")} {createdClassroom.name}
                      . {t("setupGuide.joinCode")}:{" "}
                      <InlineCode>{createdClassroom.join_code}</InlineCode>
                    </ClassroomCode>
                  )}
                  <StepActionRow>
                    <PrimaryButton
                      type="button"
                      onClick={() => {
                        setClassroomError(null);
                        setIsCreateClassroomOpen(true);
                      }}
                    >
                      {currentStep.done
                        ? t("setupGuide.createAnotherClassroom")
                        : t("setupGuide.createClassroom")}
                    </PrimaryButton>
                    {createdClassroom && (
                      <SecondaryInlineButton
                        type="button"
                        onClick={goToNextStep}
                      >
                        {t("common.next")}
                      </SecondaryInlineButton>
                    )}
                  </StepActionRow>
                </>
              ) : currentStepIndex === 2 ? (
                <StepActionRow>
                  <PrimaryButton
                    type="button"
                    onClick={() => void openCreateLessonModal()}
                    disabled={isPreparingLessonModal}
                  >
                    {isPreparingLessonModal
                      ? t("setupGuide.loadingClassrooms")
                      : currentStep.done
                        ? t("setupGuide.createAnotherLesson")
                        : t("setupGuide.createLesson")}
                  </PrimaryButton>
                </StepActionRow>
              ) : currentStepIndex === 3 ? (
                <>
                  <SyncStepStatus>
                    <strong>
                      {deviceId
                        ? t("setupGuide.hubLinked")
                        : t("setupGuide.hubNotLinked")}
                    </strong>
                    <span>
                      {lastSuccessfulSyncText
                        ? tr("setupGuide.lastSuccessfulSync", {
                            value: lastSuccessfulSyncText,
                          })
                        : t("setupGuide.noSuccessfulSync")}
                    </span>
                    <span>
                      {deviceId
                        ? t("setupGuide.syncInstruction")
                        : t("setupGuide.linkBeforeSync")}
                    </span>
                  </SyncStepStatus>
                  <SyncInlineGrid>
                    <CloudSyncButton
                      userId={userId}
                      deviceId={deviceId}
                      variant="setup"
                    />
                    <SyncSummaryCard
                      userId={userId}
                      deviceId={deviceId}
                      availableCount={syncedCount}
                      pendingCount={pendingSyncCount}
                    />
                  </SyncInlineGrid>
                </>
              ) : (
                <StepActionRow>
                  <PrimaryLink href={currentStep.href}>
                    {t(currentStep.actionKey)}
                  </PrimaryLink>
                </StepActionRow>
              )}

              <StepNavRow>
                {currentStepIndex > 0 && (
                  <StepBackButton type="button" onClick={goToPreviousStep}>
                    {t("common.back")}
                  </StepBackButton>
                )}
                {canSkipCurrentStep && (
                  <SecondaryInlineButton
                    type="button"
                    onClick={skipCurrentStep}
                  >
                    {t("setupGuide.skipForNow")}
                  </SecondaryInlineButton>
                )}
                <StepNextButton
                  type="button"
                  onClick={goToNextStep}
                  disabled={!canAdvanceCurrentStep}
                >
                  {isFinalStep ? t("setupGuide.finishSetup") : t("common.next")}
                </StepNextButton>
              </StepNavRow>
            </CurrentStepCard>
          </>
        )}
      </WizardCard>
      <CreateLessonModal
        isOpen={isCreateLessonOpen}
        onClose={() => {
          setIsCreateLessonOpen(false);
          router.refresh();
        }}
        deviceId={deviceId}
      />
      {isCreateClassroomOpen && (
        <Overlay
          onClick={() => {
            if (!isCreatingClassroom) setIsCreateClassroomOpen(false);
          }}
        >
          <ModalCard onClick={event => event.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{t("setupGuide.createClassroom")}</ModalTitle>
              <ModalCloseButton
                type="button"
                onClick={() => setIsCreateClassroomOpen(false)}
                disabled={isCreatingClassroom}
                aria-label={t("common.closeModal")}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              </ModalCloseButton>
            </ModalHeader>

            <ClassroomForm onSubmit={handleClassroomSubmit}>
              <PairingLabel htmlFor="setup-classroom-name">
                {t("classrooms.name")}
              </PairingLabel>
              <PairingInput
                id="setup-classroom-name"
                value={classroomName}
                onChange={event => {
                  setClassroomName(event.target.value);
                  setClassroomError(null);
                }}
                placeholder="Learning Group"
                disabled={isCreatingClassroom}
                required
              />

              <PairingLabel htmlFor="setup-classroom-code">
                {t("setupGuide.studentJoinCode")}
              </PairingLabel>
              <InputActionRow>
                <PairingInput
                  id="setup-classroom-code"
                  value={classroomJoinCode}
                  onChange={event => {
                    setClassroomJoinCode(normalizeJoinCode(event.target.value));
                    setClassroomError(null);
                  }}
                  maxLength={6}
                  disabled={isCreatingClassroom}
                  required
                />
                <SecondaryInlineButton
                  type="button"
                  onClick={() => setClassroomJoinCode(generateJoinCode())}
                  disabled={isCreatingClassroom}
                  aria-label={t("setupGuide.regenerateJoinCode")}
                  title={t("setupGuide.regenerateJoinCode")}
                  $iconOnly
                >
                  {IconSvgs.refresh}
                </SecondaryInlineButton>
              </InputActionRow>
              <PairingHelp>{t("setupGuide.studentJoinCodeHelp")}</PairingHelp>
              {classroomError && <PairingError>{classroomError}</PairingError>}
              <StepActionRow>
                <PrimaryButton type="submit" disabled={isCreatingClassroom}>
                  {isCreatingClassroom
                    ? t("setupGuide.creatingClassroom")
                    : t("setupGuide.createClassroom")}
                </PrimaryButton>
              </StepActionRow>
            </ClassroomForm>
          </ModalCard>
        </Overlay>
      )}
    </DashboardPage>
  );
}
