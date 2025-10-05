export type CanvasModule = {
  id: number;
  name: string;
  position: number;
  unlock_at: Date | null;
  require_sequential_progress: boolean;
  requirement_type: "all" | "one";
  publish_final_grade: boolean;
  prerequisite_module_ids: number[];
  published: boolean;
  items_count: number;
  items_url: string;
};

export type Lesson = {
  id: number;
  title: string;
  created_at: Date;
  group_id: number;
};
