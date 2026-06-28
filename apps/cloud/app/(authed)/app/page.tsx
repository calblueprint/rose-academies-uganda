import type { SetupStepData } from "./DashboardSetupWizard";
import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";
import { fetchVisibleClassrooms } from "@/lib/classrooms";
import DashboardClient from "./DashboardClient";

function formatSyncTimestamp(timestamp: string | null) {
  if (!timestamp) return null;

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) return null;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const hour12 = hours % 12 || 12;
  const period = hours >= 12 ? "PM" : "AM";

  return `${month} ${day}, ${hour12}:${minutes} ${period}`;
}

type DashboardPageRouteProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DashboardPageRoute({
  searchParams,
}: DashboardPageRouteProps) {
  const resolvedSearchParams = await searchParams;
  const setupParam = resolvedSearchParams?.setup;
  const shouldOpenSetupGuide =
    setupParam === "1" ||
    (Array.isArray(setupParam) && setupParam.includes("1"));
  const supabase = await getSupabaseServerClientReadOnly();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data: lessons, error: lessonsError } = await supabase
    .from("Lessons")
    .select("id, is_archived")
    .eq("user_id", user.id)
    .eq("is_archived", false);

  if (lessonsError) throw new Error(lessonsError.message);

  const [{ data: device, error: deviceError }, classrooms] = await Promise.all([
    supabase
      .from("devices")
      .select("id, last_synced_at")
      .eq("user_id", user.id)
      .maybeSingle(),
    fetchVisibleClassrooms(supabase, user.id),
  ]);

  if (deviceError) throw new Error(deviceError.message);

  const deviceId = device?.id ?? null;
  const deviceLastSyncedAt = device?.last_synced_at ?? null;
  const deviceLastSyncedLabel = formatSyncTimestamp(deviceLastSyncedAt);

  const { data: deviceLessons, error: deviceLessonsError } = deviceId
    ? await supabase
        .from("DeviceLessons")
        .select("lesson_id, status")
        .eq("device_id", deviceId)
    : { data: [], error: null };

  if (deviceLessonsError) throw new Error(deviceLessonsError.message);

  const lessonCount = lessons?.length ?? 0;
  const classroomCount = classrooms.length;
  const savedToHubCount = deviceLessons?.length ?? 0;
  const syncedCount =
    deviceLessons?.filter(row => row.status === "available").length ?? 0;
  const pendingSyncCount =
    deviceLessons?.filter(row => row.status === "pending").length ?? 0;
  const steps: SetupStepData[] = [
    {
      done: Boolean(deviceId),
      titleKey: deviceId
        ? "setupGuide.stepHub.titleDone"
        : "setupGuide.stepHub.title",
      shortLabelKey: "setupGuide.stepHub.short",
      detailKey: deviceId
        ? "setupGuide.stepHub.detailDone"
        : "setupGuide.stepHub.detail",
      actionKey: deviceId
        ? "setupGuide.stepHub.actionDone"
        : "setupGuide.stepHub.action",
      href: "/app/offline-library",
      helperKey: deviceId
        ? "setupGuide.stepHub.helperDone"
        : "setupGuide.stepHub.helper",
      instructionsKeys: deviceId
        ? undefined
        : [
            "setupGuide.stepHub.instruction1",
            "setupGuide.stepHub.instruction2",
            "setupGuide.stepHub.instruction3",
          ],
    },
    {
      done: classroomCount > 0,
      titleKey: "setupGuide.stepClassroom.title",
      shortLabelKey: "setupGuide.stepClassroom.short",
      detailKey:
        classroomCount > 0
          ? classroomCount === 1
            ? "setupGuide.stepClassroom.detailDoneSingular"
            : "setupGuide.stepClassroom.detailDonePlural"
          : "setupGuide.stepClassroom.detail",
      detailParams: { count: classroomCount },
      actionKey: "nav.classrooms",
      href: "/app/classrooms",
    },
    {
      done: lessonCount > 0 && savedToHubCount > 0,
      titleKey: "setupGuide.stepLesson.title",
      shortLabelKey: "setupGuide.stepLesson.short",
      detailKey:
        savedToHubCount > 0
          ? savedToHubCount === 1
            ? "setupGuide.stepLesson.detailReadySingular"
            : "setupGuide.stepLesson.detailReadyPlural"
          : lessonCount > 0
            ? "setupGuide.stepLesson.detailNeedsSync"
            : "setupGuide.stepLesson.detail",
      detailParams: { count: savedToHubCount },
      actionKey: "lessons.title",
      href: "/app/lessons",
    },
    {
      done: syncedCount > 0,
      titleKey: "setupGuide.stepSync.title",
      shortLabelKey: "setupGuide.stepSync.short",
      detailKey:
        syncedCount > 0
          ? syncedCount === 1
            ? "setupGuide.stepSync.detailDoneSingular"
            : "setupGuide.stepSync.detailDonePlural"
          : "setupGuide.stepSync.detail",
      detailParams: { count: syncedCount },
      actionKey: "nav.sync",
      href: "/app/offline-library",
    },
  ];
  return (
    <DashboardClient
      steps={steps}
      openSetupGuide={shouldOpenSetupGuide}
      deviceId={deviceId}
      deviceLastSyncedAt={deviceLastSyncedAt}
      deviceLastSyncedLabel={deviceLastSyncedLabel}
      userId={user.id}
      lessonCount={lessonCount}
      classroomCount={classroomCount}
      savedToHubCount={savedToHubCount}
      syncedCount={syncedCount}
      pendingSyncCount={pendingSyncCount}
    />
  );
}
