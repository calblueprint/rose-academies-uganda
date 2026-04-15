import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";
import { getCurrentDeviceId } from "@/lib/getCurrentUserDevice";
import LessonDetailClient from "./LessonDetailClient";

type PageProps = {
  params: Promise<{ lessonId: string }>;
};

type Lesson = {
  id: number;
  name: string;
  description: string | null;
  group_id: number | null;
  image_path: string | null;
};

const MOCK_FILES_BY_LESSON: Record<string, { id: string; name: string }[]> = {
  "lesson-001": [
    { id: "f1", name: "Fractions Worksheet.pdf" },
    { id: "f2", name: "Fractions Slides.pptx" },
  ],
  "lesson-002": [{ id: "f1", name: "Plant Diagram.png" }],
  "lesson-003": [{ id: "f1", name: "Short Story.pdf" }],
};

export default async function LessonDetailPage({ params }: PageProps) {
  const { lessonId } = await params;
  const numericLessonId = Number(lessonId);

  if (Number.isNaN(numericLessonId)) {
    return <main>Invalid lesson ID.</main>;
  }

  const supabase = await getSupabaseServerClientReadOnly();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error(userError?.message ?? "User not authenticated");
  }

  const { data: lesson, error: lessonError } = await supabase
    .from("Lessons")
    .select("id, name, description, group_id, image_path")
    .eq("id", numericLessonId)
    .single<Lesson>();

  if (lessonError || !lesson) {
    throw new Error(lessonError?.message ?? "Failed to load lesson");
  }

  const deviceId = await getCurrentDeviceId({ userId: user.id });

  const { data: offlineRows, error: offlineError } = await supabase
    .from("DeviceLessons")
    .select("lesson_id")
    .eq("device_id", deviceId)
    .eq("lesson_id", numericLessonId);

  if (offlineError) {
    throw new Error(offlineError.message);
  }

  const isOffline = !!offlineRows && offlineRows.length > 0;
  const files = MOCK_FILES_BY_LESSON[lessonId] ?? [];

  return (
    <LessonDetailClient
      lesson={lesson}
      deviceId={deviceId}
      initialIsOffline={isOffline}
      files={files}
    />
  );
}
