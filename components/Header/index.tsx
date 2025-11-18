"use client";

import React from "react";
import Image from "next/image";
import RoseLogo from "@/assets/images/rose-academies-logo.png";
import SyncButton from "@/components/SyncButton";
import {
  Header as HeaderBar,
  HeaderRight,
  LogoAndTitle,
  LogoContainer,
  PageShell,
  Title,
} from "./styles";

export default function Header() {
  return (
    <HeaderBar>
      <LogoAndTitle>
        <PageShell />
        <LogoContainer>
          <Image src={RoseLogo} alt="Rose Academies Logo" />
          <Title>Rose Academies-Uganda</Title>
        </LogoContainer>
      </LogoAndTitle>
      <SyncButton></SyncButton>
      <HeaderRight />
    </HeaderBar>
  );
}
