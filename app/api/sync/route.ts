import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Sync disabled in demo branch",
  });
}
