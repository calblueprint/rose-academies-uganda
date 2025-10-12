import React, { CSSProperties } from "react";
import LessonCard from "../LessonCard";

function LessonsPage() {
  return (
    <main style={{ padding: "1.5rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>My Lessons</h1>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(23.438rem, 1fr))",
          gap: "1.25rem",
        }}
      >
        <LessonCard title="Agriculture" />
        <LessonCard title="Gardening & Food Security" />
        <LessonCard title="Family Wellbeing" />
        <LessonCard title="Nutrition & Wellness" />
        <LessonCard title="Maternal & Child Health" />
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <main style={{ padding: "1.5rem" }}>
      <LessonsPage />
    </main>
  );
}
