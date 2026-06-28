import { NextResponse } from "next/server";
import path from "path";
import Database from "better-sqlite3";
import {
  CLASSROOM_COOKIE_NAME,
  CLASSROOM_SESSION_SECONDS,
  createClassroomSession,
  getClassroomSession,
} from "@/lib/classroom/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DB_PATH =
  process.env.ROSE_DB_PATH ??
  path.join(process.cwd(), "rose-academies-uganda.db");

export async function GET() {
  const session = await getClassroomSession();

  return NextResponse.json(
    session ? { joined: true, groupId: session.groupId } : { joined: false },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    joinCode?: unknown;
  } | null;
  const joinCode =
    typeof body?.joinCode === "string"
      ? body.joinCode
          .trim()
          .toUpperCase()
          .replace(/[^A-Z0-9]/g, "")
          .slice(0, 6)
      : "";

  if (
    !joinCode ||
    joinCode.length !== 6 ||
    /[\u0000-\u001f\u007f]/.test(joinCode)
  ) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  let db: Database.Database | null = null;

  try {
    db = new Database(DB_PATH, { readonly: true, fileMustExist: true });
    const groups = db
      .prepare(
        "SELECT id FROM groups WHERE join_code = ? COLLATE NOCASE LIMIT 2",
      )
      .all(joinCode) as { id: number }[];

    if (groups.length !== 1) {
      await new Promise(resolve => setTimeout(resolve, 250));
      return NextResponse.json({ error: "Invalid code" }, { status: 401 });
    }

    const groupId = groups[0].id;
    const response = NextResponse.json({ groupId });

    response.cookies.set(
      CLASSROOM_COOKIE_NAME,
      createClassroomSession(groupId),
      {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/",
        maxAge: CLASSROOM_SESSION_SECONDS,
      },
    );

    return response;
  } catch (error) {
    console.error("[JOIN] Unable to validate classroom code:", error);
    return NextResponse.json(
      { error: "Unable to join this classroom right now." },
      { status: 500 },
    );
  } finally {
    db?.close();
  }
}

export async function DELETE() {
  const response = NextResponse.json({ joined: false });

  response.cookies.set(CLASSROOM_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 0,
  });

  return response;
}
