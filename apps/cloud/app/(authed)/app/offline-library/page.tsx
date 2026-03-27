import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";
import InfoBoxes from "@/components/InfoBoxes";
import LessonItem from "@/components/LessonItem";
import StorageAndSync from "@/components/StorageAndSync";
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

type OfflineLibraryRow = {
  lesson_id: number;
  Lessons: OfflineLibraryLessonRow | OfflineLibraryLessonRow[] | null;
};

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

  const { data, error } = await supabase
    .from("OfflineLibrary")
    .select("lesson_id, Lessons(id, name, image_path, group_id)")
    .eq("Lessons.user_id", user.id)
    .order("lesson_id", { ascending: false });

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

  const availableOfflineCount = 3;
  const pendingDownloadCount = 1;
  const lastSyncedLabel = "Mar 2, 12:00 pm";

  return (
    <PageWrapper>
      <Content>
        <PageTitle>Offline Library</PageTitle>
        <PageSubtitle>
          Lessons in this library will be available offline after you run sync
        </PageSubtitle>
        {/* <SyncButtonWrapper>
          <CloudSyncButton />
        </SyncButtonWrapper> */}
        <StorageAndSync userId={user.id} />
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
