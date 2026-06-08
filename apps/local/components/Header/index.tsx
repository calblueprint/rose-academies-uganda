"use client";

import React from "react";
import Image from "next/image";
import RoseLogo from "@/assets/images/rose-academies-logo.png";
import ExitClassButton from "@/components/ExitClassButton";
import OperationalButton from "@/components/OperationalButton";
import {
  Header as HeaderBar,
  HeaderInner,
  HeaderRight,
  LogoAndTitle,
  LogoContainer,
  PageShell,
  Title,
} from "./styles";

export default function Header() {
  return (
    <HeaderBar>
      <HeaderInner>
        <LogoAndTitle>
          <PageShell />
          <LogoContainer>
            <Image src={RoseLogo} alt="Rose Academies Logo" unoptimized />
            <Title>Rose Academies-Uganda</Title>
          </LogoContainer>
        </LogoAndTitle>
        <HeaderRight>
          <OperationalButton />
          <ExitClassButton />
        </HeaderRight>
      </HeaderInner>
    </HeaderBar>
  );
}
