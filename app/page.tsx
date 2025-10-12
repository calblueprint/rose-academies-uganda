import React, { CSSProperties } from "react";
import Image from "next/image";
import BPLogo from "@/assets/images/bp-logo.png";
import LessonCard from "../components/LessonCard";
import LessonPage from "../components/LessonPage";

export default function Page() {
  return <LessonPage />;
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
