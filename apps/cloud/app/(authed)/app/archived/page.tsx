import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";
import LessonsClient from "../lessons/LessonsClient";

const ARCHIVE_SORT_OPTIONS = [
  { label: "Recently archived", value: "updated_desc" as const },
  { label: "Oldest archived", value: "updated_asc" as const },
  { label: "Lesson name A-Z", value: "name_asc" as const },
];

export default async function ArchivedLessonsPage() {
  const supabase = await getSupabaseServerClientReadOnly();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data: lessons, error } = await supabase
    .from("Lessons")
    .select(
      "id, name, description, image_path, group_id, is_archived, created_at, updated_at",
    )
    .order("updated_at", { ascending: false })
    .eq("is_archived", true)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  return (
    <LessonsClient
      initialLessons={lessons ?? []}
      lessonStatuses={{}}
      title="Archived Lessons"
      description="Restore lessons when you want them back in the dashboard or sync list."
      showCreateButton={false}
      showSearchBar
      showSortButton
      showClassroomFilter={false}
      showViewToggle={false}
      defaultView="list"
      listAction="restore"
      variant="archive"
      sortOptions={ARCHIVE_SORT_OPTIONS}
      sortStorageKey="archiveLessonsSortBy"
      emptyStateTitle="No archived lessons yet."
      emptyStateDescription="Lessons you archive will appear here."
    />
  );
}
