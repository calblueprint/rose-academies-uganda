import { NextResponse } from "next/server";
import supabase from "@/api/supabase/client";
import { getDevicePairingCode } from "@/lib/devicePairing";
import { getDeviceId } from "@/lib/getDeviceId";
import { verifyOfflineReadiness } from "@/lib/offline/readiness";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getPendingLessonCount() {
  const { data, error } = await supabase.rpc(
    "get_device_pending_update_count",
    {
      p_device_id: getDeviceId(),
      p_pairing_code: getDevicePairingCode(),
    },
  );

  if (error) {
    console.error("[SETUP] Unable to check pending lesson assignments:", error);
    return null;
  }

  return typeof data === "number" ? data : 0;
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
                ? "1 hub update is waiting from the Educator Dashboard."
                : `${pendingLessons} hub updates are waiting from the Educator Dashboard.`,
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
