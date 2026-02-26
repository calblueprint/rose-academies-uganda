"use client";

import React, { useState } from "react";
import Image from "next/image";
import RoseLogo from "../../../local/assets/images/rose-academies-logo.png";
import {
  Header as HeaderBar,
  HeaderRight,
  LogoAndTitle,
  LogoContainer,
  Nav,
  NavTab,
  PageShell,
  Subtitle,
  Title,
  TitleWrapper,
  UserImg,
  UserName,
} from "./styles";

export default function Header() {
  const [activeTab, setActiveTab] = useState("Lessons");

  return (
    <HeaderBar>
      <LogoAndTitle>
        <PageShell />
        <LogoContainer>
          <Image src={RoseLogo} alt="Rose Academies Logo" />
          <TitleWrapper>
            <Title>Rose Academies-Uganda</Title>
            <Subtitle>Educator Dashboard</Subtitle>
          </TitleWrapper>
        </LogoContainer>
      </LogoAndTitle>

      <Nav>
        {["Lessons", "Offline Library"].map(tab => (
          <NavTab
            key={tab}
            $active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </NavTab>
        ))}
      </Nav>

      <HeaderRight>
        <UserImg>SJ</UserImg>
        <UserName>Sylvia Johnson</UserName>
      </HeaderRight>
    </HeaderBar>
  );
}
