"use client";

export default function SyncButton() {
  const handleSync = async () => {
    await fetch("/api/sync");
  };

  return <button onClick={handleSync}>Sync</button>;
}
