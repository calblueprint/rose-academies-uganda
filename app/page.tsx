import React, { CSSProperties } from "react";
import JoinPage from "./join/page";

export default function Home() {
  return (
    <main style={mainStyles}>
      <JoinPage />
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
