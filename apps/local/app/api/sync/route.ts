import { NextResponse } from "next/server";
import { getIsSyncRunning, runSync } from "@/lib/sync/runSync";

export async function GET(request: Request): Promise<NextResponse> {
  console.log("[LOCAL API] /api/sync hit");
  if (getIsSyncRunning()) {
    console.log("[LOCAL API] Sync already running");
    return new NextResponse(
      JSON.stringify({ message: "Sync already running" }),
      { status: 409, headers: { "Content-Type": "application/json" } },
    );
  }

  const { searchParams } = new URL(request.url);
  const syncRunIdParam = searchParams.get("syncRunId");
  const syncRunId = syncRunIdParam || undefined;
  console.log("[LOCAL API] Starting sync for run:", syncRunId);

  const result = await runSync({ syncRunId });
  console.log("[LOCAL API] Sync finished:", result);

  return new NextResponse(JSON.stringify(result), {
    status: result.ok ? 200 : 500,
    headers: { "Content-Type": "application/json" },
  });
}
