"use server";

/**
 * These server actions keep logging available to client-triggered flows while
 * still sending output only to the server console.
 *
 * The wrappers are separate functions because Next.js server actions must be
 * async free functions, not class methods. The Logger facade delegates here so
 * callers do not need to know about that framework constraint.
 */

// Taken from https://github.com/calblueprint/adopt-an-inmate

export async function serverLog(message: string) {
  console.log(message);
}

export async function serverWarn(message: string) {
  console.warn(message);
}

export async function serverError(message: string) {
  console.error(message);
}

export async function serverInfo(message: string) {
  console.info(message);
}
