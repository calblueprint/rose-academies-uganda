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
  is_archived: boolean;
};

type LessonFile = {
  id: string;
  name: string;
  sizeBytes: number | null;
  createdAt: string | null;
  updatedAt: string | null;
};

type LessonFileRow = {
  Files: {
    id: number;
    name: string;
    size_bytes: number | null;
    created_at: string | null;
  } | null;
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
    .select("id, name, description, group_id, image_path, is_archived")
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

  const { data: lessonGroupRows, error: lessonGroupsError } = await supabase
    .from("LessonGroups")
    .select("group_id")
    .eq("lesson_id", numericLessonId);

  if (lessonGroupsError) {
    throw new Error(lessonGroupsError.message);
  }

  const groupIds = lessonGroupRows.map(row => row.group_id);

  let villages: string[] = [];

  if (groupIds.length > 0) {
    const { data: groupRows, error: groupsError } = await supabase
      .from("Groups")
      .select("name")
      .in("id", groupIds);

    if (groupsError) {
      throw new Error(groupsError.message);
    }

    villages = groupRows.map(row => row.name);
  }

  const { data: lessonFileRows, error: filesError } = await supabase
    .from("LessonFiles")
    .select("Files(id, name, size_bytes, created_at)")
    .eq("lesson_id", numericLessonId)
    .returns<LessonFileRow[]>();

  if (filesError) {
    throw new Error(filesError.message);
  }

  const normalizedFiles: LessonFile[] =
    lessonFileRows
      ?.map(row => row.Files)
      .filter(
        (file): file is NonNullable<LessonFileRow["Files"]> => file !== null,
      )
      .map(file => ({
        id: String(file.id),
        name: file.name,
        sizeBytes: file.size_bytes,
        createdAt: file.created_at,
        updatedAt: file.created_at,
      })) ?? [];

  const isOffline = !!offlineRows && offlineRows.length > 0;

  return (
    <LessonDetailClient
      lesson={lesson}
      deviceId={deviceId}
      initialIsOffline={isOffline}
      files={normalizedFiles}
      villages={villages}
    />
  );
}
