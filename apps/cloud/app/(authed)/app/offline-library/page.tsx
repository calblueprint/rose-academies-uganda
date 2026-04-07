import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";
import LessonItem from "@/components/LessonItem";
import StorageAndSync from "@/components/StorageAndSync";
import SyncSummaryCard from "@/components/SyncSummaryCard";
import { getCurrentDeviceId } from "@/lib/getCurrentUserDevice";
import {
  Content,
  LessonsStack,
  PageSubtitle,
  PageTitle,
  PageWrapper,
  SectionTitle,
  SyncCardsRow,
} from "./styles";

type DeviceLessonLessonRow = {
  id: number;
  name: string;
  image_path: string | null;
  group_id: number | null;
};

type OfflineLessonItem = DeviceLessonLessonRow & {
  status: "available" | "pending" | undefined;
};

type DeviceLessonRow = {
  lesson_id: number;
  status: "pending" | "available" | "failed";
  Lessons: DeviceLessonLessonRow | DeviceLessonLessonRow[] | null;
};

function formatLastSynced(lastSyncedAt: string | null) {
  if (!lastSyncedAt) {
    return "Not synced yet";
  }

  const date = new Date(lastSyncedAt);

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default async function OfflineLibraryPage() {
  const supabase = await getSupabaseServerClientReadOnly();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return (
      <PageWrapper>
        <PageTitle>Sync Lessons</PageTitle>
        <PageSubtitle>Could not load offline library.</PageSubtitle>
        <pre
          style={{ marginTop: 12, whiteSpace: "pre-wrap", color: "crimson" }}
        >
          {userError?.message ?? "User not authenticated."}
        </pre>
      </PageWrapper>
    );
  }

  const deviceId = await getCurrentDeviceId({ userId: user.id });

  const { data, error } = await supabase
    .from("DeviceLessons")
    .select("lesson_id, status, Lessons(id, name, image_path, group_id)")
    .eq("device_id", deviceId)
    .order("created_at", { ascending: false });

  const { data: deviceData, error: deviceError } = await supabase
    .from("devices")
    .select("last_synced_at")
    .eq("id", deviceId)
    .single();

  if (error) {
    return (
      <PageWrapper>
        <PageTitle>Sync Lessons</PageTitle>
        <PageSubtitle>Could not load offline library.</PageSubtitle>
        <pre
          style={{ marginTop: 12, whiteSpace: "pre-wrap", color: "crimson" }}
        >
          {error.message}
        </pre>
      </PageWrapper>
    );
  }

  if (deviceError) {
    return (
      <PageWrapper>
        <PageTitle>Sync Lessons</PageTitle>
        <PageSubtitle>Could not load offline library.</PageSubtitle>
        <pre
          style={{ marginTop: 12, whiteSpace: "pre-wrap", color: "crimson" }}
        >
          {deviceError.message}
        </pre>
      </PageWrapper>
    );
  }

  const lessons: OfflineLessonItem[] =
    (data as DeviceLessonRow[] | null)?.reduce<OfflineLessonItem[]>(
      (acc, row) => {
        const lesson = Array.isArray(row.Lessons)
          ? row.Lessons[0]
          : row.Lessons;
        if (!lesson) return acc;

        acc.push({
          ...lesson,
          status:
            row.status === "available" || row.status === "pending"
              ? row.status
              : undefined,
        });

        return acc;
      },
      [],
    ) ?? [];

  const { availableCount, pendingCount } = (
    data as DeviceLessonRow[] | null
  )?.reduce(
    (acc, row) => {
      if (row.status === "available") {
        acc.availableCount += 1;
      } else if (row.status === "pending") {
        acc.pendingCount += 1;
      }
      return acc;
    },
    { availableCount: 0, pendingCount: 0 },
  ) ?? { availableCount: 0, pendingCount: 0 };

  const lastSyncedLabel = formatLastSynced(deviceData?.last_synced_at ?? null);

  return (
    <PageWrapper>
      <Content>
        <PageTitle>Sync Lessons</PageTitle>
        <PageSubtitle>
          Manage which lessons are sent to village devices.
        </PageSubtitle>

        <SyncCardsRow>
          <StorageAndSync userId={user.id} />
          <SyncSummaryCard
            lastSynced={lastSyncedLabel}
            availableCount={availableCount}
            pendingCount={pendingCount}
          />
        </SyncCardsRow>

        <SectionTitle>Lessons to Sync</SectionTitle>

        <LessonsStack>
          {lessons.map(lesson => (
            <LessonItem
              key={lesson.id}
              lessonId={lesson.id}
              lessonName={lesson.name}
              status={lesson.status}
            />
          ))}
        </LessonsStack>
      </Content>
    </PageWrapper>
  );
}
