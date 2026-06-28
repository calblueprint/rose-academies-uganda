import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

export const CLASSROOM_COOKIE_NAME = "rose-classroom";
export const CLASSROOM_SESSION_SECONDS = 12 * 60 * 60;

function getSessionSecret() {
  const secret =
    process.env.CLASSROOM_SESSION_SECRET?.trim() ??
    process.env.DEVICE_PAIRING_CODE?.trim();

  if (!secret || secret.length < 12) {
    throw new Error("Classroom session secret is not configured.");
  }

  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("base64url");
}

export function createClassroomSession(groupId: number) {
  const expiresAt = Math.floor(Date.now() / 1000) + CLASSROOM_SESSION_SECONDS;
  const payload = `${groupId}.${expiresAt}`;

  return `${payload}.${sign(payload)}`;
}

export function verifyClassroomSession(token: string | undefined) {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [groupIdValue, expiresAtValue, providedSignature] = parts;
  const groupId = Number(groupIdValue);
  const expiresAt = Number(expiresAtValue);

  if (
    !Number.isSafeInteger(groupId) ||
    groupId <= 0 ||
    !Number.isSafeInteger(expiresAt) ||
    expiresAt <= Math.floor(Date.now() / 1000)
  ) {
    return null;
  }

  const expectedSignature = sign(`${groupIdValue}.${expiresAtValue}`);
  const expectedBuffer = Buffer.from(expectedSignature);
  const providedBuffer = Buffer.from(providedSignature);

  if (
    expectedBuffer.length !== providedBuffer.length ||
    !timingSafeEqual(expectedBuffer, providedBuffer)
  ) {
    return null;
  }

  return { groupId, expiresAt };
}

export async function getClassroomSession() {
  const cookieStore = await cookies();

  return verifyClassroomSession(cookieStore.get(CLASSROOM_COOKIE_NAME)?.value);
}
