import { NextResponse } from "next/server";

/**
 * Demo stub: SQLite file serving is disabled on Vercel.
 */
export async function GET() {
  return new NextResponse("File previews are disabled in demo mode.", {
    status: 404,
  });
}
