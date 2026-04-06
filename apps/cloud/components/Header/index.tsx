"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/actions/logout";
import RoseLogo from "@/assets/images/rose-academies-logo.png";
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
  ProfileButton,
  Subtitle,
  Title,
  TitleWrapper,
  UserImg,
  UserName,
} from "./styles";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();

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
        <LogoContainer>
          <Image src={RoseLogo} alt="Rose Academies Logo" />
          <TitleWrapper>
            <Title>Rose Academies-Uganda</Title>
            <Subtitle>Educator Dashboard</Subtitle>
          </TitleWrapper>
        </LogoContainer>
      </LogoAndTitle>

      <Nav>
        {[
          { label: "Lessons", href: "/app/lessons" },
          { label: "Sync", href: "/app/offline-library" },
          { label: "Archive", href: "/app/archived" },
        ].map(tab => (
          <NavTab
            key={tab.label}
            $active={pathname === tab.href}
            onClick={() => {
              router.push(tab.href);
            }}
          >
            {tab.label}
          </NavTab>
        ))}
      </Nav>

      <HeaderRight>
        <DropdownWrapper ref={dropdownRef}>
          <ProfileButton onClick={() => setDropdownOpen(prev => !prev)}>
            <UserImg>NH</UserImg>
            <UserName>Neha Hussain</UserName>
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

              <form action={signOut}>
                <DropdownItem type="submit">Sign Out</DropdownItem>
              </form>
            </DropdownMenu>
          )}
        </DropdownWrapper>
      </HeaderRight>
    </HeaderBar>
  );
}
