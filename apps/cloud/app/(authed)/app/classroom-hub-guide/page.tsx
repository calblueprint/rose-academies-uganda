"use client";

import { useLanguage } from "@/lib/i18n";
import {
  Badge,
  DiagramCard,
  DiagramConnector,
  DiagramGrid,
  DiagramLabel,
  DiagramStep,
  FieldCard,
  FieldGrid,
  FieldIcon,
  FieldList,
  FieldTitle,
  GuideHeader,
  GuideList,
  GuidePage,
  GuideSubtitle,
  GuideTitle,
  SectionText,
  SectionTitle,
  StepNumber,
  TermCard,
  TermCardBody,
  TermCardHeader,
  TermDevice,
  TermDot,
  TermGrid,
  TermHubBase,
  TermHubBox,
  TermHubLight,
  TermHubPort,
  TermHubVisual,
  TermScreen,
  TermScreenBar,
  TermScreenLine,
  TermScreenPill,
  TermScreenRow,
  TermTablet,
  TermTabletCamera,
  TermTabletScreen,
  TermTitle,
  TermUrl,
  WorkflowCard,
  WorkflowGrid,
} from "./style";

export default function ClassroomHubGuidePage() {
  const { t } = useLanguage();
  const workflowCards = [
    {
      title: t("guide.createLessons"),
      text: t("guide.createLessonsText"),
      items: [t("guide.createLessonsItem1"), t("guide.createLessonsItem2")],
    },
    {
      title: t("guide.createClassrooms"),
      text: t("guide.createClassroomsText"),
      items: [
        t("guide.createClassroomsItem1"),
        t("guide.createClassroomsItem2"),
      ],
    },
    {
      title: t("guide.syncHub"),
      text: t("guide.syncHubText"),
      items: [t("guide.syncHubItem1"), t("guide.syncHubItem2")],
    },
  ];

  return (
    <GuidePage>
      <GuideHeader>
        <Badge>{t("guide.badge")}</Badge>
        <GuideTitle>{t("guide.title")}</GuideTitle>
        <GuideSubtitle>{t("guide.subtitle")}</GuideSubtitle>
      </GuideHeader>

      <DiagramCard>
        <DiagramGrid aria-label="Classroom Hub workflow overview">
          <DiagramStep>
            <DiagramLabel>{t("guide.flowDashboard")}</DiagramLabel>
            <SectionText>{t("guide.flowDashboardText")}</SectionText>
          </DiagramStep>
          <DiagramConnector />
          <DiagramStep>
            <DiagramLabel>{t("guide.flowHub")}</DiagramLabel>
            <SectionText>{t("guide.flowHubText")}</SectionText>
          </DiagramStep>
          <DiagramConnector />
          <DiagramStep>
            <DiagramLabel>{t("guide.flowStudents")}</DiagramLabel>
            <SectionText>{t("guide.flowStudentsText")}</SectionText>
          </DiagramStep>
        </DiagramGrid>
      </DiagramCard>

      <DiagramCard>
        <TermGrid>
          <TermCard>
            <TermCardHeader>
              <TermDot />
              <div>
                <TermTitle>{t("guide.dashboard")}</TermTitle>
                <TermUrl>{t("guide.dashboardUrl")}</TermUrl>
              </div>
            </TermCardHeader>
            <TermDevice $variant="dashboard">
              <TermScreen>
                <TermScreenBar />
                <TermScreenRow>
                  <TermScreenPill />
                  <TermScreenPill />
                  <TermScreenPill />
                </TermScreenRow>
                <TermScreenLine $wide />
                <TermScreenLine />
              </TermScreen>
            </TermDevice>
            <TermCardBody>{t("guide.dashboardBody")}</TermCardBody>
          </TermCard>

          <TermCard>
            <TermCardHeader>
              <TermDot />
              <div>
                <TermTitle>{t("guide.hub")}</TermTitle>
                <TermUrl>{t("guide.hubUrl")}</TermUrl>
              </div>
            </TermCardHeader>
            <TermHubVisual>
              <TermTablet aria-hidden="true">
                <TermTabletCamera />
                <TermTabletScreen>
                  <TermScreenBar />
                  <TermScreenLine $wide />
                  <TermScreenRow>
                    <TermScreenPill />
                    <TermScreenPill />
                  </TermScreenRow>
                  <TermScreenLine />
                </TermTabletScreen>
              </TermTablet>
              <TermHubBase aria-hidden="true">
                <TermHubBox>
                  <span>PCH</span>
                  <TermHubPort />
                  <TermHubPort />
                  <TermHubLight />
                  <TermHubLight />
                </TermHubBox>
              </TermHubBase>
            </TermHubVisual>
            <TermCardBody>{t("guide.hubBody")}</TermCardBody>
          </TermCard>
        </TermGrid>
      </DiagramCard>

      <WorkflowGrid>
        {workflowCards.map((card, index) => (
          <WorkflowCard key={card.title}>
            <StepNumber>{index + 1}</StepNumber>
            <SectionTitle>{card.title}</SectionTitle>
            <SectionText>{card.text}</SectionText>
            <GuideList>
              {card.items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </GuideList>
          </WorkflowCard>
        ))}
      </WorkflowGrid>

      <FieldGrid>
        <FieldCard $tone="wifi">
          <FieldIcon>{t("guide.wifiTag")}</FieldIcon>
          <FieldTitle>{t("guide.syncAtLocation")}</FieldTitle>
          <SectionText>{t("guide.syncAtLocationText")}</SectionText>
          <FieldList>
            <li>{t("guide.syncAtLocationItem1")}</li>
            <li>{t("guide.syncAtLocationItem2")}</li>
            <li>{t("guide.syncAtLocationItem3")}</li>
          </FieldList>
        </FieldCard>

        <FieldCard $tone="offline">
          <FieldIcon>{t("guide.offlineTag")}</FieldIcon>
          <FieldTitle>{t("guide.teachOffline")}</FieldTitle>
          <SectionText>{t("guide.teachOfflineText")}</SectionText>
          <FieldList>
            <li>{t("guide.teachOfflineItem1")}</li>
            <li>{t("guide.teachOfflineItem2")}</li>
            <li>{t("guide.teachOfflineItem3")}</li>
          </FieldList>
        </FieldCard>
      </FieldGrid>
    </GuidePage>
  );
}
