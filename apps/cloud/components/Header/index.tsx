"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import RoseLogo from "../../../local/assets/images/rose-academies-logo.png";
import {
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownWrapper,
  Header as HeaderBar,
  HeaderRight,
  LogoAndTitle,
  LogoContainer,
  Nav,
  NavTab,
  PageShell,
  ProfileButton,
  Subtitle,
  Title,
  TitleWrapper,
  UserImg,
  UserName,
} from "./styles";

export default function Header() {
  const [activeTab, setActiveTab] = useState("Lessons");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        <DropdownWrapper ref={dropdownRef}>
          <ProfileButton onClick={() => setDropdownOpen(prev => !prev)}>
            <UserImg>SJ</UserImg>
            <UserName>Sylvia Johnson</UserName>
          </ProfileButton>

          {dropdownOpen && (
            <DropdownMenu>
              <DropdownItem onClick={() => console.log("Clicked Settings")}>
                Settings
              </DropdownItem>
              <DropdownItem onClick={() => console.log("Clicked Information")}>
                Information
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={() => console.log("Clicked Sign Out")}>
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          )}
        </DropdownWrapper>
      </HeaderRight>
    </HeaderBar>
  );
}
