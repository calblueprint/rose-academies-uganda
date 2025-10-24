"use client";

import React, { CSSProperties } from "react";
import LessonPage from "../components/LessonPage";

export default function Home() {
  const handleSync = async () => {
    try {
      const res = await fetch("/api/sync");
      const data = await res.json();
    } catch (err) {
      console.error("Error syncing data:", err);
    }
  };

  return (
    <main style={mainStyles}>
      <LessonPage />
      <button onClick={handleSync}>Sync</button>
    </main>
  );
}
// CSS styles

const mainStyles: CSSProperties = {
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
