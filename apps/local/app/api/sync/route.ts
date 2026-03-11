import { NextResponse } from "next/server";
import { getIsSyncRunning, runSync } from "@/lib/sync/runSync";

export async function GET(): Promise<NextResponse> {
  if (getIsSyncRunning()) {
    return new NextResponse(
      JSON.stringify({ message: "Sync already running" }),
      { status: 409, headers: { "Content-Type": "application/json" } },
    );
  }

  const result = await runSync();

  return new NextResponse(JSON.stringify({ message: result.message }), {
    status: result.ok ? 200 : 500,
    headers: { "Content-Type": "application/json" },
  });
}
