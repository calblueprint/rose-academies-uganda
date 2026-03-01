// app/(authed)/app/offline-library/page.tsx
import { getSupabaseServerClient } from "@/api/supabase/server";
import InfoBoxes from "@/components/InfoBoxes";
import LessonItem from "@/components/LessonItem";
import {
  Content,
  LessonsStack,
  PageSubtitle,
  PageTitle,
  PageWrapper,
  SectionTitle,
} from "./styles";

type OfflineLibraryLessonRow = {
  id: number;
  name: string;
  image_path: string | null;
  group_id: number | null;
};

export default async function OfflineLibraryPage() {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from("OfflineLibraryNathanH") // Temp database till we figure out how exactly we want to structure OfflineLibrary
    .select("id,name,image_path,group_id")
    .order("id", { ascending: true });

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

  const lessons: OfflineLibraryLessonRow[] = data ?? [];

  // Placeholder stats for now (per sprint requirement)
  // Later: compute from DataContext or from a real "sync status" source.
  const availableOfflineCount = 5;
  const pendingDownloadCount = 8;
  const lastSyncedLabel = "Feb 1, 12:00 pm";

  return (
    <PageWrapper>
      <Content>
        <PageTitle>Offline Library</PageTitle>
        <PageSubtitle>
          Lessons in this library will be available offline after you open the
          local app and run sync
        </PageSubtitle>

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
