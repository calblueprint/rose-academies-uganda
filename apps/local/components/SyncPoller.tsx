"use client";

import { useEffect } from "react";
import { startSyncPolling } from "@/lib/pollSync";

export default function SyncPoller() {
  useEffect(() => {
    startSyncPolling();
  }, []);

  return null;
}
