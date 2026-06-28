import { NextResponse } from "next/server";
import { getLocalReadiness } from "@/lib/setup/readiness";

const FRIENDLY_SETUP_URL = "http://rosehub.local/setup";
const FRIENDLY_JOIN_URL = "http://rosehub.local/join";

function getCaptivePortalUrl() {
  return getLocalReadiness().ready ? FRIENDLY_JOIN_URL : FRIENDLY_SETUP_URL;
}

export function redirectToCaptivePortal() {
  return NextResponse.redirect(getCaptivePortalUrl(), 302);
}

export function captivePortalApi() {
  const portalUrl = getCaptivePortalUrl();

  return NextResponse.json(
    {
      captive: true,
      "user-portal-url": portalUrl,
      "venue-info-url": "http://rosehub.local/join",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
