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

export type RemoveLessonFromClassroomResult =
  | { success: true }
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

export async function removeLessonFromClassroom({
  classroomId,
  lessonId,
}: {
  classroomId: number;
  lessonId: number;
}): Promise<RemoveLessonFromClassroomResult> {
  if (!Number.isInteger(classroomId) || !Number.isInteger(lessonId)) {
    return { success: false, error: "Invalid classroom or lesson." };
  }

  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "Please sign in again before updating this classroom.",
    };
  }

  const { data: lesson, error: lessonReadError } = await supabase
    .from("Lessons")
    .select("id, group_id")
    .eq("id", lessonId)
    .eq("user_id", user.id)
    .single();

  if (lessonReadError || !lesson) {
    console.error("[CLASSROOM_LESSON_REMOVE] Unable to read lesson:", {
      code: lessonReadError?.code,
      details: lessonReadError?.details,
      hint: lessonReadError?.hint,
      message: lessonReadError?.message,
      classroomId,
      lessonId,
      userId: user.id,
    });

    return {
      success: false,
      error: "Unable to find that lesson for this account.",
    };
  }

  const { error: deleteAssignmentError } = await supabase
    .from("LessonGroups")
    .delete()
    .eq("lesson_id", lessonId)
    .eq("group_id", classroomId);

  if (deleteAssignmentError) {
    console.error("[CLASSROOM_LESSON_REMOVE] Unable to delete assignment:", {
      code: deleteAssignmentError.code,
      details: deleteAssignmentError.details,
      hint: deleteAssignmentError.hint,
      message: deleteAssignmentError.message,
      classroomId,
      lessonId,
      userId: user.id,
    });

    return {
      success: false,
      error: "Unable to remove lesson from this classroom.",
    };
  }

  const { data: remainingRows, error: remainingRowsError } = await supabase
    .from("LessonGroups")
    .select("group_id")
    .eq("lesson_id", lessonId);

  if (remainingRowsError) {
    console.error(
      "[CLASSROOM_LESSON_REMOVE] Unable to read remaining groups:",
      {
        code: remainingRowsError.code,
        details: remainingRowsError.details,
        hint: remainingRowsError.hint,
        message: remainingRowsError.message,
        classroomId,
        lessonId,
        userId: user.id,
      },
    );

    return {
      success: false,
      error: "Unable to update this lesson's classroom list.",
    };
  }

  const nextGroupId =
    ((remainingRows ?? []) as { group_id: number | null }[])
      .map(row => row.group_id)
      .find(
        (groupId): groupId is number =>
          typeof groupId === "number" && Number.isInteger(groupId),
      ) ?? null;

  if ((lesson as { group_id: number | null }).group_id === classroomId) {
    const { error: lessonUpdateError } = await supabase
      .from("Lessons")
      .update({
        group_id: nextGroupId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", lessonId)
      .eq("user_id", user.id);

    if (lessonUpdateError) {
      console.error("[CLASSROOM_LESSON_REMOVE] Unable to update lesson:", {
        code: lessonUpdateError.code,
        details: lessonUpdateError.details,
        hint: lessonUpdateError.hint,
        message: lessonUpdateError.message,
        classroomId,
        lessonId,
        userId: user.id,
      });

      return {
        success: false,
        error: "Unable to update this lesson's classroom list.",
      };
    }
  } else {
    const { error: lessonTouchedError } = await supabase
      .from("Lessons")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", lessonId)
      .eq("user_id", user.id);

    if (lessonTouchedError) {
      console.error(
        "[CLASSROOM_LESSON_REMOVE] Unable to mark lesson updated:",
        {
          code: lessonTouchedError.code,
          details: lessonTouchedError.details,
          hint: lessonTouchedError.hint,
          message: lessonTouchedError.message,
          classroomId,
          lessonId,
          userId: user.id,
        },
      );

      return {
        success: false,
        error: "Unable to update this lesson's classroom list.",
      };
    }
  }

  const { data: device, error: deviceReadError } = await supabase
    .from("devices")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (deviceReadError) {
    console.error("[CLASSROOM_LESSON_REMOVE] Unable to read device:", {
      code: deviceReadError.code,
      details: deviceReadError.details,
      hint: deviceReadError.hint,
      message: deviceReadError.message,
      classroomId,
      lessonId,
      userId: user.id,
    });

    return {
      success: false,
      error: "Unable to update this lesson for the Classroom Hub.",
    };
  }

  const deviceId = (device as { id?: string } | null)?.id;

  if (deviceId) {
    const { error: deviceLessonError } = await supabase
      .from("DeviceLessons")
      .update({ status: "pending" })
      .eq("device_id", deviceId)
      .eq("lesson_id", lessonId)
      .neq("status", "pending_removal");

    if (deviceLessonError) {
      console.error("[CLASSROOM_LESSON_REMOVE] Unable to update hub lesson:", {
        code: deviceLessonError.code,
        details: deviceLessonError.details,
        hint: deviceLessonError.hint,
        message: deviceLessonError.message,
        classroomId,
        lessonId,
        userId: user.id,
        deviceId,
      });

      return {
        success: false,
        error: "Unable to update this lesson for the Classroom Hub.",
      };
    }
  }

  revalidatePath("/app");
  revalidatePath("/app/classrooms");
  revalidatePath("/app/lessons");
  revalidatePath(`/app/lessons/${lessonId}`);
  revalidatePath("/app/offline-library");

  return { success: true };
}
