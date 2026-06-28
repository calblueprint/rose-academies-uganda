"use client";

import React from "react";
import Image from "next/image";
import RoseLogo from "@/assets/images/rose-academies-logo.png";
import ExitClassButton from "@/components/ExitClassButton";
import LanguageSelector from "@/components/LanguageSelector";
import OperationalButton from "@/components/OperationalButton";
import { useLanguage } from "@/lib/i18n";
import {
  Header as HeaderBar,
  HeaderInner,
  HeaderRight,
  LogoAndTitle,
  LogoContainer,
  PageShell,
  Subtitle,
  Title,
  TitleWrapper,
} from "./styles";

export default function Header() {
  const { t } = useLanguage();

  return (
    <HeaderBar>
      <HeaderInner>
        <LogoAndTitle>
          <PageShell />
          <LogoContainer>
            <Image src={RoseLogo} alt="Rose Academies Logo" unoptimized />
            <TitleWrapper>
              <Title>{t("app.title")}</Title>
              <Subtitle>{t("app.studentDashboard")}</Subtitle>
            </TitleWrapper>
          </LogoContainer>
        </LogoAndTitle>
        <HeaderRight>
          <LanguageSelector />
          <OperationalButton />
          <ExitClassButton />
        </HeaderRight>
      </HeaderInner>
    </HeaderBar>
  );
}
