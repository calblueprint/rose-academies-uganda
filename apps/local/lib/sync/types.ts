import Database from "better-sqlite3";

// Shared sync types live here so the split helper files agree on the shape of
// Supabase rows and SQLite handles without importing from runSync.
export type DB = InstanceType<typeof Database>;

export type SyncRunStatus = "requested" | "in_progress" | "success" | "failed";

export type Group = { id: number; name: string; join_code: string | null };

export type Lesson = {
  id: number;
  name: string;
  description: string | null;
  image_path: string | null;
  group_id: number;
};

export type FileRow = {
  id: number;
  name: string;
  size_bytes: number | null;
  storage_path: string | null;
  lesson_id: number | null;
};

export type LessonFileRow = {
  lesson_id: number;
  file_id: number;
};

// DeviceLessons controls which lessons a Raspberry Pi should keep available
// offline. The status field comes from the cloud assignment workflow.
export type DeviceLessonRow = {
  lesson_id: number;
  status: "pending" | "available" | "failed";
};

// Supabase may return numeric IDs, but route/query serialization can pass the
// cloud sync run ID through as a string.
export type CloudSyncRunId = string | number;

// This is the full device-scoped dataset runSync needs before it can update
// SQLite and the local file library.
export type SyncPayload = {
  groups: Group[];
  lessons: Lesson[];
  files: FileRow[];
  lessonFiles: LessonFileRow[];
};
