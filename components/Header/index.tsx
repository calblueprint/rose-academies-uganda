"use client";

import React from "react";
import {
  Header as HeaderBar,
  HeaderRight,
  Logo,
  LogoAndTitle,
  PageShell,
} from "./styles";

export default function SiteHeader() {
  return (
    <HeaderBar>
      <LogoAndTitle>
        <PageShell />
        <Logo>
          <img src="/Logo.png" alt="Logo" />
          <span>Rose Academies-Uganda</span>
        </Logo>
      </LogoAndTitle>
      <HeaderRight />
    </HeaderBar>
  );
}
