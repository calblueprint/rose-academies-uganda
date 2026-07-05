"use client";

import type { SetupStepData } from "./DashboardSetupWizard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import DashboardSetupWizard from "./DashboardSetupWizard";
import {
  DashboardActionBadge,
  DashboardActionContent,
  DashboardActionDescription,
  DashboardActionLink,
  DashboardActions,
  DashboardHeader,
  DashboardHomeShell,
  DashboardHubStatusBadge,
  DashboardHubStatusMain,
  DashboardHubStatusPanel,
  DashboardHubStatusText,
  DashboardMetricItem,
  DashboardMetricLabel,
  DashboardMetricStrip,
  DashboardMetricValue,
  DashboardPage,
  DashboardPanel,
  DashboardSectionTitle,
  DashboardStatusDetail,
  DashboardTitle,
  SetupProgressList,
} from "./style";

type DashboardClientProps = {
  steps: SetupStepData[];
  openSetupGuide: boolean;
  deviceId: string | null;
  deviceLastSyncedAt: string | null;
  userId: string;
  lessonCount: number;
  classroomCount: number;
  dashboardOnlyCount: number;
  syncedCount: number;
  pendingSyncCount: number;
};

function pluralLabel(count: number, singular: string, plural: string) {
  return count === 1 ? singular : plural;
}

function formatLastSynced(lastSyncedAt: string | null, locale: string) {
  if (!lastSyncedAt) return null;

  const date = new Date(lastSyncedAt);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleString(locale, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function DashboardClient({
  steps,
  openSetupGuide,
  deviceId,
  deviceLastSyncedAt,
  userId,
  lessonCount,
  classroomCount,
  syncedCount,
  pendingSyncCount,
}: DashboardClientProps) {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [deviceLastSyncedLabel, setDeviceLastSyncedLabel] = useState<
    string | null
  >(null);
  const shouldStartInSetupGuide =
    !deviceId || classroomCount === 0 || lessonCount === 0;
  const [showSetupGuide, setShowSetupGuide] = useState(shouldStartInSetupGuide);
  const shouldShowSetupGuide = openSetupGuide || showSetupGuide;
  const incompleteSteps = steps.filter(step => !step.done);
  const hubMetricValue =
    pendingSyncCount > 0 ? pendingSyncCount : syncedCount > 0 ? syncedCount : 0;
  const hubMetricLabel =
    pendingSyncCount > 0 ? t("status.pendingSync") : t("status.synced");
  const hubStatusDetail = deviceId
    ? deviceLastSyncedLabel
      ? `${t("home.lastUpdate")} ${deviceLastSyncedLabel}`
      : t("home.noSuccessfulUpdate")
    : t("home.linkHubDescription");

  useEffect(() => {
    setDeviceLastSyncedLabel(formatLastSynced(deviceLastSyncedAt, language));
  }, [deviceLastSyncedAt, language]);

  function closeSetupGuide() {
    setShowSetupGuide(false);
    if (openSetupGuide) {
      router.replace("/app", { scroll: false });
    }
  }

  if (shouldShowSetupGuide) {
    return (
      <DashboardSetupWizard
        steps={steps}
        deviceId={deviceId}
        deviceLastSyncedAt={deviceLastSyncedAt}
        deviceLastSyncedLabel={deviceLastSyncedLabel}
        userId={userId}
        classroomCount={classroomCount}
        syncedCount={syncedCount}
        pendingSyncCount={pendingSyncCount}
        onFinish={closeSetupGuide}
      />
    );
  }

  return (
    <DashboardPage>
      <DashboardHomeShell>
        <DashboardHeader>
          <div>
            <DashboardTitle>{t("nav.dashboard")}</DashboardTitle>
            <DashboardStatusDetail>{t("home.subtitle")}</DashboardStatusDetail>
          </div>
        </DashboardHeader>

        <DashboardMetricStrip>
          <DashboardMetricItem>
            <DashboardMetricValue>{classroomCount}</DashboardMetricValue>
            <DashboardMetricLabel>
              {pluralLabel(
                classroomCount,
                t("home.metricClassroomSingular"),
                t("home.metricClassroomPlural"),
              )}
            </DashboardMetricLabel>
          </DashboardMetricItem>
          <DashboardMetricItem>
            <DashboardMetricValue>{lessonCount}</DashboardMetricValue>
            <DashboardMetricLabel>
              {pluralLabel(
                lessonCount,
                t("home.metricLessonSingular"),
                t("home.metricLessonPlural"),
              )}
            </DashboardMetricLabel>
          </DashboardMetricItem>
          <DashboardMetricItem $attention={pendingSyncCount > 0}>
            <DashboardMetricValue>{hubMetricValue}</DashboardMetricValue>
            <DashboardMetricLabel>{hubMetricLabel}</DashboardMetricLabel>
          </DashboardMetricItem>
        </DashboardMetricStrip>

        <DashboardPanel>
          <DashboardSectionTitle>
            {t("home.quickActions")}
          </DashboardSectionTitle>
          <DashboardActions>
            <DashboardActionLink href="/app/classrooms">
              <DashboardActionBadge>1</DashboardActionBadge>
              <DashboardActionContent>
                <strong>{t("home.createClassroom")}</strong>
                <DashboardActionDescription>
                  {t("home.createClassroomDescription")}
                </DashboardActionDescription>
              </DashboardActionContent>
            </DashboardActionLink>
            <DashboardActionLink href="/app/lessons">
              <DashboardActionBadge>2</DashboardActionBadge>
              <DashboardActionContent>
                <strong>{t("home.createLesson")}</strong>
                <DashboardActionDescription>
                  {t("home.createLessonDescription")}
                </DashboardActionDescription>
              </DashboardActionContent>
            </DashboardActionLink>
            <DashboardActionLink href="/app/offline-library">
              <DashboardActionBadge $tone="orange">3</DashboardActionBadge>
              <DashboardActionContent>
                <strong>{t("home.updateHub")}</strong>
                <DashboardActionDescription>
                  {t("home.updateHubDescription")}
                </DashboardActionDescription>
              </DashboardActionContent>
            </DashboardActionLink>
          </DashboardActions>
        </DashboardPanel>

        <DashboardHubStatusPanel>
          <DashboardHubStatusMain>
            <DashboardHubStatusBadge $linked={Boolean(deviceId)}>
              {deviceId ? t("home.hubLinked") : t("home.hubNotLinked")}
            </DashboardHubStatusBadge>
            <DashboardHubStatusText>
              <DashboardSectionTitle>
                {t("home.hubStatusTitle")}
              </DashboardSectionTitle>
              <DashboardStatusDetail>{hubStatusDetail}</DashboardStatusDetail>
            </DashboardHubStatusText>
          </DashboardHubStatusMain>
          <DashboardStatusDetail>{t("home.manageHub")}</DashboardStatusDetail>
        </DashboardHubStatusPanel>

        {incompleteSteps.length > 0 && (
          <DashboardPanel>
            <DashboardSectionTitle>
              {t("home.setupStillNeeds")}
            </DashboardSectionTitle>
            <SetupProgressList>
              {incompleteSteps.map(step => (
                <li key={step.titleKey}>{t(step.titleKey)}</li>
              ))}
            </SetupProgressList>
          </DashboardPanel>
        )}
      </DashboardHomeShell>
    </DashboardPage>
  );
}
