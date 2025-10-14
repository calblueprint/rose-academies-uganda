import React, { CSSProperties } from "react";
import LessonPage from "../components/LessonPage";

export default function Home() {
  return (
    <main style={mainStyles}>
      <LessonPage />
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
