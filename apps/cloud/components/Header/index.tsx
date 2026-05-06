"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/actions/logout";
import RoseLogo from "@/assets/images/rose-academies-logo.png";
import {
  DropdownItem,
  DropdownMenu,
  DropdownWrapper,
  Header as HeaderBar,
  HeaderInner,
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

export default function Header({ displayName }: { displayName: string }) {
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

  const initials =
    displayName
      .trim()
      .match(/[\p{L}''\-]+/gu)
      ?.filter((_, i, arr) => i === 0 || i === arr.length - 1)
      .map(word => word[0])
      .join("")
      .toUpperCase() ?? "";

  return (
    <HeaderBar>
      <HeaderInner>
        <LogoAndTitle>
          <LogoContainer
            onClick={() => {
              router.push("/app/lessons");
            }}
            aria-label="Go to lesson dashboard"
            title="Go to lesson dashboard"
          >
            <Image src={RoseLogo} alt="Rose Academies Logo" unoptimized />
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
              <UserImg>{initials}</UserImg>
              <UserName>{displayName}</UserName>
            </ProfileButton>

            {dropdownOpen && (
              <DropdownMenu>
                <form action={signOut}>
                  <DropdownItem type="submit">Sign Out</DropdownItem>
                </form>
              </DropdownMenu>
            )}
          </DropdownWrapper>
        </HeaderRight>
      </HeaderInner>
    </HeaderBar>
  );
}
