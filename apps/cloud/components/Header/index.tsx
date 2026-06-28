"use client";

// This is the top navigation bar rendered on every authenticated page. It displays
// the app logo, primary nav tabs, and a profile dropdown with sign-out. The
// displayName prop is fetched server-side in the authed layout from the Supabase
// Profiles table and passed down; it defaults to "User" if the query fails.
import React, { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  claimDeviceWithCode,
  unlinkCurrentDevice,
} from "@/actions/claimDevice";
import { signOut } from "@/actions/logout";
import RoseLogo from "@/assets/images/rose-academies-logo.png";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/lib/i18n";
import {
  AccountMeta,
  AccountName,
  AccountSummary,
  DeviceLabel,
  DeviceSummary,
  DeviceValue,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownWrapper,
  Header as HeaderBar,
  HeaderInner,
  HeaderRight,
  LogoAndTitle,
  LogoContainer,
  ModalActions,
  ModalDescription,
  ModalOverlay,
  ModalTitle,
  Nav,
  NavTab,
  PairingError,
  PairingHelp,
  PairingInput,
  PairingLabel,
  PrimaryButton,
  ProfileButton,
  ReplaceHubModal,
  SecondaryButton,
  SetupGuideList,
  SetupGuideSection,
  Subtitle,
  Title,
  TitleWrapper,
  UserImg,
  UserName,
} from "./styles";

export default function Header({
  displayName,
  email,
  deviceId,
}: {
  displayName: string;
  email: string | null;
  deviceId: string | null;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [replaceHubModalOpen, setReplaceHubModalOpen] = useState(false);
  const [unlinkHubModalOpen, setUnlinkHubModalOpen] = useState(false);
  const [setupGuideModalOpen, setSetupGuideModalOpen] = useState(false);
  const [pairingCode, setPairingCode] = useState("");
  const [pairingError, setPairingError] = useState<string | null>(null);
  const [isReplacingHub, setIsReplacingHub] = useState(false);
  const [unlinkError, setUnlinkError] = useState<string | null>(null);
  const [isUnlinkingHub, setIsUnlinkingHub] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();
  const hubActionLabel = deviceId
    ? t("profile.replaceHub")
    : t("profile.linkHub");
  const navTabs = [
    { label: t("nav.dashboard"), href: "/app" },
    { label: t("nav.lessons"), href: "/app/lessons" },
    { label: t("nav.classrooms"), href: "/app/classrooms" },
    { label: t("nav.sync"), href: "/app/offline-library" },
    { label: t("nav.archive"), href: "/app/archived" },
  ];

  // The ref covers both the trigger button and the menu panel so that clicks
  // inside either one do not close the dropdown.
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

  useEffect(() => {
    if (!replaceHubModalOpen && !unlinkHubModalOpen && !setupGuideModalOpen) {
      return;
    }

    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.documentElement.style.overflowY = "";
    };
  }, [replaceHubModalOpen, setupGuideModalOpen, unlinkHubModalOpen]);

  // Keeps only the first and last word so multi-part names like "Mary Jane Watson"
  // produce "MW" instead of three characters.
  const initials =
    displayName
      .trim()
      .match(/[\p{L}''\-]+/gu)
      ?.filter((_, i, arr) => i === 0 || i === arr.length - 1)
      .map(word => word[0])
      .join("")
      .toUpperCase() ?? "";

  async function handleReplaceHub(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isReplacingHub) return;

    setIsReplacingHub(true);
    setPairingError(null);

    const result = await claimDeviceWithCode(pairingCode);

    if (!result.success) {
      setPairingError(result.error);
      setIsReplacingHub(false);
      return;
    }

    setPairingCode("");
    setReplaceHubModalOpen(false);
    router.refresh();
    setIsReplacingHub(false);
  }

  function closeReplaceHubModal() {
    if (isReplacingHub) return;

    setReplaceHubModalOpen(false);
    setPairingCode("");
    setPairingError(null);
  }

  async function handleUnlinkHub() {
    if (isUnlinkingHub) return;

    setIsUnlinkingHub(true);
    setUnlinkError(null);

    const result = await unlinkCurrentDevice();

    if (!result.success) {
      setUnlinkError(result.error);
      setIsUnlinkingHub(false);
      return;
    }

    setUnlinkHubModalOpen(false);
    router.refresh();
    setIsUnlinkingHub(false);
  }

  function closeUnlinkHubModal() {
    if (isUnlinkingHub) return;

    setUnlinkHubModalOpen(false);
    setUnlinkError(null);
  }

  function openDashboardSetupGuide() {
    setSetupGuideModalOpen(false);
    router.push("/app?setup=1");
  }

  return (
    <>
      <HeaderBar>
        <HeaderInner>
          <LogoAndTitle>
            <LogoContainer
              href="/app"
              aria-label={t("login.title")}
              title={t("login.title")}
            >
              <Image src={RoseLogo} alt="Rose Academies Logo" unoptimized />
              <TitleWrapper>
                <Title>{t("app.title")}</Title>
                <Subtitle>{t("app.educatorDashboard")}</Subtitle>
              </TitleWrapper>
            </LogoContainer>
          </LogoAndTitle>

          <Nav>
            {navTabs.map(tab => (
              <NavTab
                key={tab.label}
                $active={pathname === tab.href}
                href={tab.href}
              >
                {tab.label}
              </NavTab>
            ))}
          </Nav>

          <HeaderRight>
            <LanguageSelector />
            <DropdownWrapper ref={dropdownRef}>
              <ProfileButton
                type="button"
                onClick={() => setDropdownOpen(prev => !prev)}
              >
                <UserImg>{initials}</UserImg>
                <UserName>{displayName}</UserName>
              </ProfileButton>

              {dropdownOpen && (
                <DropdownMenu>
                  <AccountSummary>
                    <AccountName>{displayName}</AccountName>
                    <AccountMeta>
                      {email ?? t("profile.educatorAccount")}
                    </AccountMeta>
                  </AccountSummary>
                  <DropdownDivider />
                  <DeviceSummary>
                    <DeviceLabel>{t("profile.linkedHub")}</DeviceLabel>
                    <DeviceValue $empty={!deviceId}>
                      {deviceId ?? t("profile.noHub")}
                    </DeviceValue>
                  </DeviceSummary>
                  <DropdownItem
                    type="button"
                    onClick={() => {
                      setReplaceHubModalOpen(true);
                      setDropdownOpen(false);
                      setPairingError(null);
                    }}
                  >
                    {hubActionLabel}
                  </DropdownItem>
                  {deviceId && (
                    <DropdownItem
                      type="button"
                      onClick={() => {
                        setUnlinkHubModalOpen(true);
                        setDropdownOpen(false);
                        setUnlinkError(null);
                      }}
                    >
                      {t("profile.unlinkHub")}
                    </DropdownItem>
                  )}

                  <DropdownDivider />
                  <DropdownItem
                    type="button"
                    onClick={() => {
                      setSetupGuideModalOpen(true);
                      setDropdownOpen(false);
                    }}
                  >
                    {t("profile.hubGuide")}
                  </DropdownItem>
                  <DropdownDivider />

                  {/* Sign Out uses a native form so the signOut action works
                      before JS has fully hydrated, so it can work instantly. */}
                  <form action={signOut}>
                    <DropdownItem type="submit">
                      {t("profile.signOut")}
                    </DropdownItem>
                  </form>
                </DropdownMenu>
              )}
            </DropdownWrapper>
          </HeaderRight>
        </HeaderInner>
      </HeaderBar>

      {replaceHubModalOpen && (
        <ModalOverlay onClick={closeReplaceHubModal}>
          <ReplaceHubModal
            onSubmit={handleReplaceHub}
            onClick={event => event.stopPropagation()}
          >
            <ModalTitle>{hubActionLabel}</ModalTitle>
            <ModalDescription>
              {deviceId
                ? t("pairing.replaceDescription")
                : t("pairing.linkDescription")}
            </ModalDescription>

            <PairingLabel htmlFor="replace-hub-code">
              {t("pairing.codeLabel")}
            </PairingLabel>
            <PairingInput
              id="replace-hub-code"
              value={pairingCode}
              onChange={event => {
                setPairingCode(event.target.value.toUpperCase());
                setPairingError(null);
              }}
              placeholder="ABCD-2345"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={13}
              disabled={isReplacingHub}
              required
              autoFocus
            />
            <PairingHelp>{t("pairing.help")}</PairingHelp>
            {pairingError && <PairingError>{pairingError}</PairingError>}

            <ModalActions>
              <SecondaryButton
                type="button"
                onClick={closeReplaceHubModal}
                disabled={isReplacingHub}
              >
                {t("pairing.cancel")}
              </SecondaryButton>
              <PrimaryButton type="submit" disabled={isReplacingHub}>
                {isReplacingHub
                  ? deviceId
                    ? t("pairing.replacing")
                    : t("pairing.linking")
                  : hubActionLabel}
              </PrimaryButton>
            </ModalActions>
          </ReplaceHubModal>
        </ModalOverlay>
      )}

      {unlinkHubModalOpen && (
        <ModalOverlay onClick={closeUnlinkHubModal}>
          <ReplaceHubModal
            as="div"
            role="dialog"
            aria-modal="true"
            aria-labelledby="unlink-hub-title"
            onClick={event => event.stopPropagation()}
          >
            <ModalTitle id="unlink-hub-title">
              {t("pairing.unlinkTitle")}
            </ModalTitle>
            <ModalDescription>
              {t("pairing.unlinkDescription")}
            </ModalDescription>
            {unlinkError && <PairingError>{unlinkError}</PairingError>}

            <ModalActions>
              <SecondaryButton
                type="button"
                onClick={closeUnlinkHubModal}
                disabled={isUnlinkingHub}
              >
                {t("pairing.cancel")}
              </SecondaryButton>
              <PrimaryButton
                type="button"
                onClick={handleUnlinkHub}
                disabled={isUnlinkingHub}
              >
                {isUnlinkingHub
                  ? t("pairing.unlinking")
                  : t("pairing.unlinkConfirm")}
              </PrimaryButton>
            </ModalActions>
          </ReplaceHubModal>
        </ModalOverlay>
      )}

      {setupGuideModalOpen && (
        <ModalOverlay onClick={() => setSetupGuideModalOpen(false)}>
          <ReplaceHubModal
            as="div"
            role="dialog"
            aria-modal="true"
            aria-labelledby="setup-guide-title"
            onClick={event => event.stopPropagation()}
          >
            <ModalTitle id="setup-guide-title">Setup guide</ModalTitle>
            <ModalDescription>
              Keep this Educator Dashboard open. Have the Classroom Hub nearby,
              and use another tablet, phone, or computer to connect to the hub
              setup Wi-Fi and open rosehub.local/setup.
            </ModalDescription>

            <SetupGuideSection>
              <h3>1. At the Classroom Hub</h3>
              <SetupGuideList>
                <li>Power on the hub with a charger or battery pack.</li>
                <li>
                  On another tablet, phone, or computer, join the Rose-Setup
                  Wi-Fi hotspot if it appears.
                </li>
                <li>
                  On that same tablet, phone, or computer, open
                  http://rosehub.local/setup.
                </li>
                <li>Connect the hub to internet Wi-Fi.</li>
                <li>Copy the pairing code shown on the hub.</li>
              </SetupGuideList>
            </SetupGuideSection>

            <SetupGuideSection>
              <h3>2. In the Educator Dashboard</h3>
              <SetupGuideList>
                <li>Use this dashboard at https://rosepch.org.</li>
                <li>Enter the hub pairing code.</li>
                <li>Create classrooms and save each join code.</li>
                <li>Create lessons and upload files.</li>
                <li>Save lessons to the Classroom Hub and sync them.</li>
              </SetupGuideList>
            </SetupGuideSection>

            <SetupGuideSection>
              <h3>3. For students</h3>
              <SetupGuideList>
                <li>
                  Students connect their tablet, phone, or computer to the
                  Classroom Hub Wi-Fi.
                </li>
                <li>
                  Students open the Student Library at
                  http://rosehub.local/join.
                </li>
                <li>
                  Students enter the classroom join code from the educator.
                </li>
              </SetupGuideList>
            </SetupGuideSection>

            <ModalActions>
              <SecondaryButton
                type="button"
                onClick={() => setSetupGuideModalOpen(false)}
              >
                Got it
              </SecondaryButton>
              <PrimaryButton type="button" onClick={openDashboardSetupGuide}>
                Open setup guide
              </PrimaryButton>
            </ModalActions>
          </ReplaceHubModal>
        </ModalOverlay>
      )}
    </>
  );
}
