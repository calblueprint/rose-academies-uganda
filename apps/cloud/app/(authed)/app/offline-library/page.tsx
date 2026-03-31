// app/(authed)/app/offline-library/page.tsx
import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";
import CloudSyncButton from "@/components/CloudSyncButton";
import InfoBoxes from "@/components/InfoBoxes";
import LessonItem from "@/components/LessonItem";
import SyncSummaryCard from "@/components/SyncSummaryCard";
import {
  Content,
  LessonsStack,
  PageSubtitle,
  PageTitle,
  PageWrapper,
  SectionTitle,
  SyncButtonWrapper,
} from "./styles";

type OfflineLibraryLessonRow = {
  id: number;
  name: string;
  image_path: string | null;
  group_id: number | null;
};

type OfflineLibraryRow = {
  lesson_id: number;
  Lessons: OfflineLibraryLessonRow | OfflineLibraryLessonRow[] | null;
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

  const { data, error } = await supabase
    .from("OfflineLibrary")
    .select("lesson_id, Lessons(id, name, image_path, group_id)")
    .order("lesson_id", { ascending: false });
  const { data: deviceData, error: deviceError } = await supabase
    .from("devices")
    .select("last_synced_at")
    .eq("id", "nathans-pi")
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

  const lessons: OfflineLibraryLessonRow[] =
    (data as OfflineLibraryRow[] | null)
      ?.map(row => {
        const lesson = Array.isArray(row.Lessons)
          ? row.Lessons[0]
          : row.Lessons;
        return lesson ?? null;
      })
      .filter((lesson): lesson is OfflineLibraryLessonRow => lesson !== null) ??
    [];

  // Placeholder stats for now (per sprint requirement)
  // Later: compute from DataContext or from a real "sync status" source.
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
        <SyncButtonWrapper>
          <CloudSyncButton />
        </SyncButtonWrapper>

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
