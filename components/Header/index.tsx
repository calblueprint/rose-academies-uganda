"use client";

import React from "react";
import SyncButton from "@/components/SyncButton";
import {
  Header as HeaderBar,
  HeaderRight,
  Logo,
  LogoAndTitle,
  PageShell,
  Title,
} from "./styles";

export default function SiteHeader() {
  return (
    <HeaderBar>
      <LogoAndTitle>
        <PageShell />
        <Logo>
          <img src="/Logo.png" alt="Logo" />
          <Title>Rose Academies-Uganda</Title>
        </Logo>
      </LogoAndTitle>
      <SyncButton></SyncButton>
      <HeaderRight />
    </HeaderBar>
  );
}
