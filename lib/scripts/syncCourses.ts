// TODO: add logs and check if working
// it should be...

// TODO: change to julee's thing?

// import types
import type { CanvasCourse, RawCanvasCourse } from "../../types/schema.js";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

// connect to supabase
const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const NEXT_PUBLIC_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

const CANVAS_API_KEY = process.env.CANVAS_API_KEY!;

async function fetchCourses(): Promise<RawCanvasCourse[]> {
  const myHeader = new Headers();
  myHeader.append("Authorization", `Bearer ${CANVAS_API_KEY}`);
  myHeader.append("Accept", "application/json");

  const url = "https://canvas.instructure.com/api/v1/courses";
  try {
    console.log("trying to fetch courses...");
    const response = await fetch(url, {
      headers: myHeader,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    console.log("courses fetched without errors. returning result...");
    return result;
  } catch (error) {
    // type guarding for unknown error types
    if (error instanceof Error) {
      console.error("Error fetching courses:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return [];
  }
}

function transformCourses(rawArr: RawCanvasCourse[]): CanvasCourse[] {
  console.log("transforming courses...");
  return rawArr.map(course => ({
    id: course.id,
    created_at: course.created_at,
    title: course.name,
    teacher_id: course.account_id,
    join_code: course.grading_standard_id,
  }));
}

async function upsertCourses(courses: CanvasCourse[]) {
  console.log("upserting data...");
  const { data, error } = await supabase
    .from("Groups")
    .upsert(courses)
    .select();
  if (error) {
    console.error("Upsert error:", error);
  } else {
    console.log("Upsert succeeded. Inserted/updated rows:", data?.length);
  }
}

async function main() {
  console.log("calling fetchCourses.");
  const raw = await fetchCourses();
  const transformed = transformCourses(raw);
  console.log(transformed);
  console.log("calling upsertCourses.");
  await upsertCourses(transformed);
}

main();
