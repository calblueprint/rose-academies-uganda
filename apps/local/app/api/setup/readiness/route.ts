import { NextResponse } from "next/server";
import supabase from "@/api/supabase/client";
import { getDeviceId } from "@/lib/getDeviceId";
import { verifyOfflineReadiness } from "@/lib/offline/readiness";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getPendingLessonCount() {
  const { data, error } = await supabase
    .from("DeviceLessons")
    .select("lesson_id, status")
    .eq("device_id", getDeviceId());

  if (error) {
    console.error("[SETUP] Unable to check pending lesson assignments:", error);
    return null;
  }

  return (data ?? []).filter(row => row.status === "pending").length;
}

export async function GET() {
  const [report, pendingLessons] = await Promise.all([
    verifyOfflineReadiness(),
    getPendingLessonCount(),
  ]);
  const hasFileIssue = report.issues.some(issue => issue.type !== "database");
  const hasLibraryIssue = report.issues.some(
    issue => issue.type === "database",
  );
  const hasPendingDownloads = pendingLessons !== null && pendingLessons > 0;
  const issues = [
    ...(hasPendingDownloads
      ? [
          {
            type: "pending_sync",
            message:
              pendingLessons === 1
                ? "1 lesson is waiting to download from the Educator Dashboard."
                : `${pendingLessons} lessons are waiting to download from the Educator Dashboard.`,
          },
        ]
      : []),
    ...(hasLibraryIssue
      ? [
          {
            type: "library",
            message:
              "The offline classroom library is not ready. Download the latest files and try again.",
          },
        ]
      : []),
    ...(hasFileIssue
      ? [
          {
            type: "files",
            message: "One or more classroom files need to be downloaded again.",
          },
        ]
      : []),
  ];

  return NextResponse.json(
    {
      ...report,
      hasPendingDownloads,
      pendingLessons: pendingLessons ?? 0,
      issues,
    },
    {
      headers: { "Cache-Control": "no-store" },
    },
  );
}
