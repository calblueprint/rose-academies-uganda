"use client";

import type { SetupStepData } from "./DashboardSetupWizard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import DashboardSetupWizard from "./DashboardSetupWizard";
import {
  DashboardActionDescription,
  DashboardActionLink,
  DashboardActions,
  DashboardHeader,
  DashboardHomeGrid,
  DashboardHomeShell,
  DashboardPage,
  DashboardPanel,
  DashboardSectionTitle,
  DashboardStatCard,
  DashboardStatLabel,
  DashboardStatusCard,
  DashboardStatusDetail,
  DashboardStatusTitle,
  DashboardStatValue,
  DashboardTitle,
  SecondaryInlineButton,
  SetupProgressList,
} from "./style";

type DashboardClientProps = {
  steps: SetupStepData[];
  openSetupGuide: boolean;
  deviceId: string | null;
  deviceLastSyncedAt: string | null;
  deviceLastSyncedLabel: string | null;
  userId: string;
  lessonCount: number;
  classroomCount: number;
  savedToHubCount: number;
  syncedCount: number;
  pendingSyncCount: number;
};

function pluralLabel(count: number, singular: string, plural: string) {
  return count === 1 ? singular : plural;
}

export default function DashboardClient({
  steps,
  openSetupGuide,
  deviceId,
  deviceLastSyncedAt,
  deviceLastSyncedLabel,
  userId,
  lessonCount,
  classroomCount,
  savedToHubCount,
  syncedCount,
  pendingSyncCount,
}: DashboardClientProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const shouldStartInSetupGuide =
    !deviceId || classroomCount === 0 || lessonCount === 0;
  const [showSetupGuide, setShowSetupGuide] = useState(shouldStartInSetupGuide);
  const shouldShowSetupGuide = openSetupGuide || showSetupGuide;
  const incompleteSteps = steps.filter(step => !step.done);

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
            <DashboardTitle>Dashboard</DashboardTitle>
            <DashboardStatusDetail>
              Manage lessons, classrooms, and Classroom Hub sync.
            </DashboardStatusDetail>
          </div>
        </DashboardHeader>

        <DashboardPanel>
          <DashboardSectionTitle>Quick actions</DashboardSectionTitle>
          <DashboardActions>
            <DashboardActionLink href="/app/lessons">
              <strong>Create lesson</strong>
              <DashboardActionDescription>
                Upload files and assign them to classrooms.
              </DashboardActionDescription>
            </DashboardActionLink>
            <DashboardActionLink href="/app/classrooms">
              <strong>Create classroom</strong>
              <DashboardActionDescription>
                Make a classroom and student join code.
              </DashboardActionDescription>
            </DashboardActionLink>
            <DashboardActionLink href="/app/offline-library">
              <strong>Sync to Classroom Hub</strong>
              <DashboardActionDescription>
                Send selected lessons to the hub.
              </DashboardActionDescription>
            </DashboardActionLink>
          </DashboardActions>
        </DashboardPanel>

        <DashboardHomeGrid>
          <DashboardStatCard $tone="green">
            <DashboardStatValue $tone="green">{lessonCount}</DashboardStatValue>
            <DashboardStatLabel>
              {pluralLabel(lessonCount, "Lesson", "Lessons")}
            </DashboardStatLabel>
          </DashboardStatCard>
          <DashboardStatCard $tone="sage">
            <DashboardStatValue $tone="sage">
              {classroomCount}
            </DashboardStatValue>
            <DashboardStatLabel>
              {pluralLabel(classroomCount, "Classroom", "Classrooms")}
            </DashboardStatLabel>
          </DashboardStatCard>
          <DashboardStatCard $tone="rose">
            <DashboardStatValue $tone="rose">
              {savedToHubCount}
            </DashboardStatValue>
            <DashboardStatLabel>Ready to sync</DashboardStatLabel>
          </DashboardStatCard>
          <DashboardStatCard $tone="green">
            <DashboardStatValue $tone="green">{syncedCount}</DashboardStatValue>
            <DashboardStatLabel>Synced</DashboardStatLabel>
          </DashboardStatCard>
          <DashboardStatCard $tone="sage">
            <DashboardStatValue $tone="sage">
              {pendingSyncCount}
            </DashboardStatValue>
            <DashboardStatLabel>Pending sync</DashboardStatLabel>
          </DashboardStatCard>
        </DashboardHomeGrid>

        <DashboardStatusCard>
          <div>
            <DashboardStatusTitle>
              {deviceId ? "Classroom Hub linked" : "Classroom Hub not linked"}
            </DashboardStatusTitle>
            <DashboardStatusDetail>
              {deviceLastSyncedLabel
                ? `Last successful sync: ${deviceLastSyncedLabel}.`
                : "No successful sync has been recorded yet."}
            </DashboardStatusDetail>
          </div>
          {incompleteSteps.length > 0 && (
            <SecondaryInlineButton
              type="button"
              onClick={() => setShowSetupGuide(true)}
            >
              Continue setup
            </SecondaryInlineButton>
          )}
        </DashboardStatusCard>

        {incompleteSteps.length > 0 && (
          <DashboardPanel>
            <DashboardSectionTitle>Setup still needs</DashboardSectionTitle>
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
