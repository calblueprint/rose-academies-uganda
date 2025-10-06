// TODO: make the properties match

// raw course data from canvas course api
export type RawCanvasCourse = {
  id: number;
  name: string;
  created_at: string;
  account_id: number;
  grading_standard_id: string | null;
  // accounts for the unused properties
  [key: string]: unknown;
};

// transformed course data to fit into database nicely
export type CanvasCourse = {
  id: number;
  created_at: string;
  title: string;
  teacher_id: number | null;
  join_code: string | null;
};
