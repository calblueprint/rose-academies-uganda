"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/api/supabase/server";

export type DeleteClassroomResult =
  | { success: true }
  | { success: false; error: string };

export type CreateClassroomResult =
  | {
      success: true;
      classroom: { id: number; name: string; join_code: string };
    }
  | { success: false; error: string };

const JOIN_CODE_PATTERN = /^[A-Z0-9]{6}$/;

function normalizeJoinCode(value: string) {
  return value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 6);
}

function createClassroomId() {
  return Math.floor(1_000_000_000 + Math.random() * 1_000_000_000);
}

export async function createOwnedClassroom({
  name,
  joinCode,
}: {
  name: string;
  joinCode: string;
}): Promise<CreateClassroomResult> {
  const trimmedName = name.trim();
  const normalizedCode = normalizeJoinCode(joinCode);

  if (!trimmedName) {
    return { success: false, error: "Classroom name is required." };
  }

  if (!JOIN_CODE_PATTERN.test(normalizedCode)) {
    return {
      success: false,
      error: "Use exactly 6 letters or numbers for the join code.",
    };
  }

  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "Please sign in again before creating a classroom.",
    };
  }

  const { data: matchingClassrooms, error: matchingError } = await supabase
    .from("Groups")
    .select("id")
    .ilike("join_code", normalizedCode);

  if (matchingError) {
    console.error("[CLASSROOM_CREATE] Unable to check join code:", {
      code: matchingError.code,
      details: matchingError.details,
      hint: matchingError.hint,
      message: matchingError.message,
    });

    return {
      success: false,
      error: "Unable to create classroom. Please try again.",
    };
  }

  if ((matchingClassrooms ?? []).length > 0) {
    return {
      success: false,
      error: "That join code is already used by another classroom.",
    };
  }

  const classroom = {
    id: createClassroomId(),
    name: trimmedName,
    join_code: normalizedCode,
    user_id: user.id,
  };

  const { error: insertError } = await supabase
    .from("Groups")
    .insert(classroom);

  if (insertError) {
    console.error("[CLASSROOM_CREATE] Unable to create classroom:", {
      code: insertError.code,
      details: insertError.details,
      hint: insertError.hint,
      message: insertError.message,
    });

    return {
      success: false,
      error: "Unable to create classroom. Please try again.",
    };
  }

  revalidatePath("/app");
  revalidatePath("/app/classrooms");
  revalidatePath("/app/lessons");
  revalidatePath("/app/offline-library");

  return {
    success: true,
    classroom: {
      id: classroom.id,
      name: classroom.name,
      join_code: classroom.join_code,
    },
  };
}

export async function deleteOwnedClassroom(
  classroomId: number,
): Promise<DeleteClassroomResult> {
  if (!Number.isInteger(classroomId)) {
    return { success: false, error: "Invalid classroom." };
  }

  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "Please sign in again before deleting this classroom.",
    };
  }

  const { error } = await supabase.rpc("delete_owned_classroom", {
    p_group_id: classroomId,
  });

  if (error) {
    console.error("[CLASSROOM_DELETE] Unable to delete classroom:", {
      code: error.code,
      details: error.details,
      hint: error.hint,
      message: error.message,
    });

    return {
      success: false,
      error:
        error.message.includes("Could not find the function") ||
        error.message.includes("schema cache")
          ? "Classroom deletion has not been enabled in Supabase yet."
          : error.message,
    };
  }

  revalidatePath("/app/classrooms");
  revalidatePath("/app/lessons");
  revalidatePath("/app/offline-library");

  return { success: true };
}
