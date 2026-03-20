import { NextResponse } from "next/server";
import { getIsSyncRunning, runSync } from "@/lib/sync/runSync";

export async function GET(request: Request): Promise<NextResponse> {
  if (getIsSyncRunning()) {
    return new NextResponse(
      JSON.stringify({ message: "Sync already running" }),
      { status: 409, headers: { "Content-Type": "application/json" } },
    );
  }

  const { searchParams } = new URL(request.url);
  const syncRunIdParam = searchParams.get("syncRunId");
  const syncRunId = syncRunIdParam || undefined;

  const result = await runSync({ syncRunId });

  return new NextResponse(JSON.stringify(result), {
    status: result.ok ? 200 : 500,
    headers: { "Content-Type": "application/json" },
  });
}
