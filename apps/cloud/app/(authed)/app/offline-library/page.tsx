import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";
import LessonsClient from "@/app/(authed)/app/lessons/LessonsClient";
import StorageAndSync from "@/components/StorageAndSync";
import SyncSummaryCard from "@/components/SyncSummaryCard";
import { getCurrentDeviceId } from "@/lib/getCurrentUserDevice";
import {
  Content,
  PageSubtitle,
  PageTitle,
  PageWrapper,
  SyncCardsRow,
} from "./styles";

type DeviceLessonLessonRow = {
  id: number;
  name: string;
  image_path: string | null;
};

type DeviceLessonRow = {
  lesson_id: number;
  status: "pending" | "available" | "failed";
  Lessons: DeviceLessonLessonRow | DeviceLessonLessonRow[] | null;
};

function formatLastSynced(lastSyncedAt: string | null) {
  if (!lastSyncedAt) return "Not synced yet";

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
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const deviceId = await getCurrentDeviceId({ userId: user.id });
  if (!deviceId) return null;

  const { data } = await supabase
    .from("DeviceLessons")
    .select("lesson_id, status, Lessons(id, name, image_path)")
    .eq("device_id", deviceId);

  const { data: deviceData } = await supabase
    .from("devices")
    .select("last_synced_at")
    .eq("id", deviceId)
    .single();

  const deviceLessonRows = (data as DeviceLessonRow[]) ?? [];

  const lessons = deviceLessonRows.reduce<
    { id: number; name: string; image_path: string | null }[]
  >((acc, row) => {
    const lesson = Array.isArray(row.Lessons) ? row.Lessons[0] : row.Lessons;

    if (!lesson) return acc;

    acc.push({
      id: lesson.id,
      name: lesson.name,
      image_path: lesson.image_path,
    });

    return acc;
  }, []);

  const lessonStatuses = deviceLessonRows.reduce<
    Partial<Record<number, "available" | "pending">>
  >((acc, row) => {
    if (row.status === "available" || row.status === "pending") {
      acc[row.lesson_id] = row.status;
    }
    return acc;
  }, {});

  const { availableCount, pendingCount } = deviceLessonRows.reduce(
    (acc, row) => {
      if (row.status === "available") acc.availableCount++;
      if (row.status === "pending") acc.pendingCount++;
      return acc;
    },
    { availableCount: 0, pendingCount: 0 },
  );

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

        <LessonsClient
          initialLessons={lessons}
          lessonStatuses={lessonStatuses}
          title="Lessons to Sync"
          showCreateButton={false}
          showSearchBar={false}
          showViewToggle={false}
          defaultView="list"
          listAction="remove"
          deviceId={deviceId}
          layout="embedded"
        />
      </Content>
    </PageWrapper>
  );
}
