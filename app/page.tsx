import React, { CSSProperties } from "react";
import Image from "next/image";
import BPLogo from "@/assets/images/bp-logo.png";
import LessonCard from "../components/LessonCard";

function LessonsPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>My Lessons</h1>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(375px, 1fr))",
          gap: 20,
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
    <main style={{ padding: 24 }}>
      <LessonsPage />
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

const imageStyles: CSSProperties = {
  width: "80px",
  height: "80px",
  marginBottom: "0.5rem",
};
