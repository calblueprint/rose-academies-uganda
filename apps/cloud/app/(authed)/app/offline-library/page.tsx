import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";
import InfoBoxes from "@/components/InfoBoxes";
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
} from "./styles";

type DeviceLessonLessonRow = {
  id: number;
  name: string;
  image_path: string | null;
  group_id: number | null;
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
        <PageTitle>Offline Library</PageTitle>
        <PageSubtitle>Could not load offline library.</PageSubtitle>
        <pre
          style={{ marginTop: 12, whiteSpace: "pre-wrap", color: "crimson" }}
        >
          {userError?.message ?? "User not authenticated."}
        </pre>
      </PageWrapper>
    );
  }

  const deviceId = getCurrentDeviceId();

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
        <PageTitle>Offline Library</PageTitle>
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
        <PageTitle>Offline Library</PageTitle>
        <PageSubtitle>Could not load offline library.</PageSubtitle>
        <pre
          style={{ marginTop: 12, whiteSpace: "pre-wrap", color: "crimson" }}
        >
          {deviceError.message}
        </pre>
      </PageWrapper>
    );
  }

  const lessons: DeviceLessonLessonRow[] =
    (data as DeviceLessonRow[] | null)
      ?.map(row => {
        const lesson = Array.isArray(row.Lessons)
          ? row.Lessons[0]
          : row.Lessons;
        return lesson ?? null;
      })
      .filter((lesson): lesson is DeviceLessonLessonRow => lesson !== null) ??
    [];

  const availableOfflineCount = 3;
  const pendingDownloadCount = 1;
  const lastSyncedLabel = formatLastSynced(deviceData?.last_synced_at ?? null);

  return (
    <PageWrapper>
      <Content>
        <PageTitle>Offline Library</PageTitle>
        <PageSubtitle>
          Lessons in this library will be available offline after you run sync
        </PageSubtitle>

        <StorageAndSync userId={user.id} />
        <SyncSummaryCard lastSynced={lastSyncedLabel} />

        <InfoBoxes
          availableOfflineCount={availableOfflineCount}
          pendingDownloadCount={pendingDownloadCount}
          lastSyncedLabel={lastSyncedLabel}
        />

        <SectionTitle>Synced Lessons</SectionTitle>

        <LessonsStack>
          {lessons.map(lesson => (
            <LessonItem
              key={lesson.id}
              lessonId={lesson.id}
              lessonName={lesson.name}
            />
          ))}
        </LessonsStack>
      </Content>
    </PageWrapper>
  );
}
