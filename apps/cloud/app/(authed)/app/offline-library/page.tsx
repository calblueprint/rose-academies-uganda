import { getSupabaseServerClientReadOnly } from "@/api/supabase/server-readonly";
import LessonsClient from "@/app/(authed)/app/lessons/LessonsClient";
import CloudSyncButton from "@/components/CloudSyncButton";
import StatusPill from "@/components/StatusPill";
import SyncSummaryCard from "@/components/SyncSummaryCard";
import TranslatedText from "@/components/TranslatedText";
import { getCurrentDeviceId } from "@/lib/getCurrentUserDevice";
import {
  Content,
  EmptyHubCard,
  EmptyHubSteps,
  EmptyHubText,
  EmptyHubTitle,
  HubUpdateActionChip,
  HubUpdateChangeDetails,
  HubUpdateChangeItem,
  HubUpdateChangeList,
  HubUpdateFlowCard,
  HubUpdateFlowIntro,
  HubUpdateFlowPopover,
  HubUpdateFlowSummary,
  HubUpdateFlowSummaryText,
  HubUpdateFlowTitle,
  HubUpdateFlowToggle,
  HubUpdateLessonLink,
  HubUpdateLessonsSection,
  HubUpdateMap,
  HubUpdateMapColumn,
  HubUpdateMapColumnCount,
  HubUpdateMapColumnDescription,
  HubUpdateMapColumnHeader,
  HubUpdateMapColumnTitle,
  HubUpdateMapEmpty,
  HubUpdateMapHeader,
  HubUpdateMapItem,
  HubUpdateMapItemLink,
  HubUpdateMapList,
  HubUpdateNote,
  HubUpdateNotice,
  HubUpdateNoticeBody,
  HubUpdateNoticeText,
  HubUpdateNoticeTitle,
  HubUpdateStatusCheck,
  HubUpdateStatusPill,
  HubUpdateStep,
  HubUpdateStepNumber,
  HubUpdateSteps,
  HubUpdateStepText,
  HubUpdateStepTitle,
  PageHeader,
  PageSubtitle,
  PageTitle,
  PageWrapper,
  SyncCardsRow,
} from "./styles";

type DeviceLessonLessonRow = {
  id: number;
  name: string;
  image_path: string | null;
};

type DeviceLessonRow = {
  lesson_id: number;
  status: "pending" | "available" | "pending_removal" | "failed";
  Lessons: DeviceLessonLessonRow | DeviceLessonLessonRow[] | null;
};

type LessonOverviewRow = {
  id: number;
  name: string;
  image_path: string | null;
};

type HubMapLesson = {
  id: number;
  name: string;
  status: "dashboard" | "pending" | "pending_removal" | "available";
};

function isHubMapLesson(lesson: HubMapLesson | null): lesson is HubMapLesson {
  return Boolean(lesson);
}

export default async function OfflineLibraryPage() {
  const supabase = await getSupabaseServerClientReadOnly();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const deviceId = await getCurrentDeviceId({ userId: user.id });
  if (!deviceId) {
    return (
      <PageWrapper>
        <Content>
          <PageHeader>
            <PageTitle>
              <TranslatedText tKey="sync.title" />
            </PageTitle>
            <PageSubtitle>
              <TranslatedText tKey="sync.emptySubtitle" />
            </PageSubtitle>
          </PageHeader>

          <EmptyHubCard>
            <EmptyHubTitle>
              <TranslatedText tKey="sync.noHubTitle" />
            </EmptyHubTitle>
            <EmptyHubText>
              <TranslatedText tKey="sync.noHubText" />
            </EmptyHubText>
            <EmptyHubSteps>
              <li>
                <TranslatedText tKey="sync.noHubStep1" />
              </li>
              <li>
                <TranslatedText tKey="sync.noHubStep2" />
              </li>
              <li>
                <TranslatedText tKey="sync.noHubStep3" />
              </li>
            </EmptyHubSteps>
          </EmptyHubCard>
        </Content>
      </PageWrapper>
    );
  }

  const [
    { data, error: deviceLessonsError },
    { data: allLessonsData, error: allLessonsError },
  ] = await Promise.all([
    // The offline library is derived from DeviceLessons because it represents
    // what this specific Pi should sync.
    supabase
      .from("DeviceLessons")
      .select("lesson_id, status, Lessons(id, name, image_path)")
      .eq("device_id", deviceId),
    supabase
      .from("Lessons")
      .select("id, name, image_path")
      .eq("user_id", user.id)
      .eq("is_archived", false),
  ]);

  if (deviceLessonsError) throw new Error(deviceLessonsError.message);
  if (allLessonsError) throw new Error(allLessonsError.message);

  const deviceLessonRows = (data as DeviceLessonRow[]) ?? [];
  const allLessons = ((allLessonsData ?? []) as LessonOverviewRow[]).sort(
    (a, b) => a.name.localeCompare(b.name),
  );

  // Supabase can return joined Lessons as an object or array depending on the
  // generated relationship shape, so normalize it before passing to the client.
  const lessons = deviceLessonRows.reduce<
    { id: number; name: string; image_path: string | null }[]
  >((acc, row) => {
    const lesson = Array.isArray(row.Lessons) ? row.Lessons[0] : row.Lessons;

    if (!lesson) return acc;

    acc.push({
      id: lesson.id,
      name: lesson.name,
      image_path: lesson.image_path,
    });

    return acc;
  }, []);

  const lessonStatuses = deviceLessonRows.reduce<
    Partial<Record<number, "available" | "pending" | "pending_removal">>
  >((acc, row) => {
    if (
      row.status === "available" ||
      row.status === "pending" ||
      row.status === "pending_removal"
    ) {
      acc[row.lesson_id] = row.status;
    }

    return acc;
  }, {});

  const { availableCount, pendingCount } = deviceLessonRows.reduce(
    (acc, row) => {
      if (row.status === "available") acc.availableCount++;
      if (row.status === "pending" || row.status === "pending_removal") {
        acc.pendingCount++;
      }

      return acc;
    },
    { availableCount: 0, pendingCount: 0 },
  );
  const pendingLessons = deviceLessonRows
    .filter(row => row.status === "pending" || row.status === "pending_removal")
    .map(row => {
      const lesson = Array.isArray(row.Lessons) ? row.Lessons[0] : row.Lessons;

      return lesson
        ? {
            id: lesson.id,
            name: lesson.name,
          }
        : null;
    })
    .filter((lesson): lesson is { id: number; name: string } => Boolean(lesson))
    .sort((a, b) => a.name.localeCompare(b.name));
  const statusByLessonId = new Map(
    deviceLessonRows.map(row => [row.lesson_id, row.status] as const),
  );
  const dashboardOnlyLessons: HubMapLesson[] = allLessons
    .filter(lesson => !statusByLessonId.has(lesson.id))
    .map(lesson => ({
      id: lesson.id,
      name: lesson.name,
      status: "dashboard",
    }));
  const pendingHubLessons: HubMapLesson[] = deviceLessonRows
    .filter(row => row.status === "pending" || row.status === "pending_removal")
    .map<HubMapLesson | null>(row => {
      const lesson = Array.isArray(row.Lessons) ? row.Lessons[0] : row.Lessons;

      return lesson
        ? {
            id: lesson.id,
            name: lesson.name,
            status: row.status as "pending" | "pending_removal",
          }
        : null;
    })
    .filter(isHubMapLesson)
    .sort((a, b) => a.name.localeCompare(b.name));
  const readyHubLessons: HubMapLesson[] = deviceLessonRows
    .filter(row => row.status === "available")
    .map<HubMapLesson | null>(row => {
      const lesson = Array.isArray(row.Lessons) ? row.Lessons[0] : row.Lessons;

      return lesson
        ? {
            id: lesson.id,
            name: lesson.name,
            status: "available" as const,
          }
        : null;
    })
    .filter(isHubMapLesson)
    .sort((a, b) => a.name.localeCompare(b.name));
  const hubMapColumns = [
    {
      key: "dashboard",
      titleKey: "sync.mapDashboardTitle",
      descriptionKey: "sync.mapDashboardDescription",
      tone: "dashboard" as const,
      lessons: dashboardOnlyLessons,
    },
    {
      key: "pending",
      titleKey: "sync.mapPendingTitle",
      descriptionKey: "sync.mapPendingDescription",
      tone: "pending" as const,
      lessons: pendingHubLessons,
    },
    {
      key: "ready",
      titleKey: "sync.mapReadyTitle",
      descriptionKey: "sync.mapReadyDescription",
      tone: "ready" as const,
      lessons: readyHubLessons,
    },
  ];
  const noticeTone =
    lessons.length === 0 ? "empty" : pendingCount > 0 ? "needs" : "ready";
  const noticeStatus =
    noticeTone === "empty"
      ? "dashboard"
      : noticeTone === "needs"
        ? "pending"
        : "available";
  const noticeTitleKey =
    noticeTone === "empty"
      ? "sync.noticeEmptyTitle"
      : noticeTone === "needs"
        ? "sync.noticeNeedsTitle"
        : "sync.noticeReadyTitle";
  const noticeBodyKey =
    noticeTone === "empty"
      ? "sync.noticeEmptyBody"
      : noticeTone === "needs"
        ? "sync.noticeNeedsBody"
        : "sync.noticeReadyBody";

  return (
    <PageWrapper>
      <Content>
        <PageHeader>
          <PageTitle>
            <TranslatedText tKey="sync.title" />
          </PageTitle>
          <PageSubtitle>
            <TranslatedText tKey="sync.subtitle" />
          </PageSubtitle>
        </PageHeader>

        <SyncCardsRow>
          <CloudSyncButton userId={user.id} deviceId={deviceId} />
          <SyncSummaryCard
            userId={user.id}
            deviceId={deviceId}
            availableCount={availableCount}
            pendingCount={pendingCount}
          />
        </SyncCardsRow>

        <HubUpdateNotice $tone={noticeTone}>
          <StatusPill status={noticeStatus} />
          <HubUpdateNoticeText>
            <HubUpdateNoticeTitle>
              <TranslatedText tKey={noticeTitleKey} />
            </HubUpdateNoticeTitle>
            <HubUpdateNoticeBody>
              <TranslatedText tKey={noticeBodyKey} />
            </HubUpdateNoticeBody>
          </HubUpdateNoticeText>

          {pendingLessons.length > 0 && (
            <HubUpdateChangeDetails>
              <HubUpdateChangeList>
                {pendingLessons.map(lesson => (
                  <HubUpdateChangeItem key={lesson.id}>
                    <HubUpdateLessonLink href={`/app/lessons/${lesson.id}`}>
                      {lesson.name}
                    </HubUpdateLessonLink>
                  </HubUpdateChangeItem>
                ))}
              </HubUpdateChangeList>
            </HubUpdateChangeDetails>
          )}
        </HubUpdateNotice>

        <HubUpdateMap aria-label="Classroom Hub lesson status">
          {hubMapColumns.map(column => (
            <HubUpdateMapColumn key={column.key} $tone={column.tone}>
              <HubUpdateMapColumnHeader>
                <div>
                  <HubUpdateMapColumnTitle>
                    <TranslatedText tKey={column.titleKey} />
                  </HubUpdateMapColumnTitle>
                  <HubUpdateMapColumnDescription>
                    <TranslatedText tKey={column.descriptionKey} />
                  </HubUpdateMapColumnDescription>
                </div>
                <HubUpdateMapColumnCount $tone={column.tone}>
                  {column.lessons.length}
                </HubUpdateMapColumnCount>
              </HubUpdateMapColumnHeader>

              {column.lessons.length > 0 ? (
                <HubUpdateMapList>
                  {column.lessons.slice(0, 5).map(lesson => (
                    <HubUpdateMapItem key={lesson.id}>
                      <HubUpdateMapItemLink href={`/app/lessons/${lesson.id}`}>
                        {lesson.name}
                      </HubUpdateMapItemLink>
                      <StatusPill status={lesson.status} />
                    </HubUpdateMapItem>
                  ))}
                  {column.lessons.length > 5 && (
                    <HubUpdateMapItem>
                      <HubUpdateMapItemLink href="#hub-update-lessons">
                        <TranslatedText tKey="common.morePrefix" />{" "}
                        {column.lessons.length - 5}{" "}
                        <TranslatedText tKey="common.moreSuffix" />
                      </HubUpdateMapItemLink>
                    </HubUpdateMapItem>
                  )}
                </HubUpdateMapList>
              ) : (
                <HubUpdateMapEmpty>
                  <TranslatedText tKey="sync.mapEmpty" />
                </HubUpdateMapEmpty>
              )}
            </HubUpdateMapColumn>
          ))}
        </HubUpdateMap>

        <HubUpdateMapHeader>
          <HubUpdateFlowCard>
            <HubUpdateFlowSummary aria-label="How hub updates work">
              <HubUpdateFlowToggle aria-hidden="true">?</HubUpdateFlowToggle>
            </HubUpdateFlowSummary>

            <HubUpdateFlowPopover>
              <HubUpdateFlowSummaryText>
                <HubUpdateFlowTitle>
                  <TranslatedText tKey="sync.flowTitle" />
                </HubUpdateFlowTitle>
                <HubUpdateFlowIntro>
                  <TranslatedText tKey="sync.flowIntro" />
                </HubUpdateFlowIntro>
              </HubUpdateFlowSummaryText>

              <HubUpdateSteps>
                <HubUpdateStep>
                  <HubUpdateStepNumber>1</HubUpdateStepNumber>
                  <div>
                    <HubUpdateStepTitle>
                      <TranslatedText tKey="sync.flowAddTitle" />
                    </HubUpdateStepTitle>
                    <HubUpdateStepText>
                      <TranslatedText tKey="sync.flowAddPrefix" />
                      <HubUpdateActionChip>
                        <TranslatedText tKey="sync.addToHub" />
                      </HubUpdateActionChip>
                      <TranslatedText tKey="sync.flowAddSuffix" />
                    </HubUpdateStepText>
                  </div>
                </HubUpdateStep>

                <HubUpdateStep>
                  <HubUpdateStepNumber>2</HubUpdateStepNumber>
                  <div>
                    <HubUpdateStepTitle>
                      <TranslatedText tKey="sync.flowChangesTitle" />
                    </HubUpdateStepTitle>
                    <HubUpdateStepText>
                      <TranslatedText tKey="sync.flowChangesPrefix" />
                      <HubUpdateStatusPill $tone="needs">
                        <TranslatedText tKey="status.pendingSync" />
                      </HubUpdateStatusPill>
                      <TranslatedText tKey="sync.flowChangesSuffix" />
                    </HubUpdateStepText>
                  </div>
                </HubUpdateStep>

                <HubUpdateStep>
                  <HubUpdateStepNumber>3</HubUpdateStepNumber>
                  <div>
                    <HubUpdateStepTitle>
                      <TranslatedText tKey="sync.flowUpdateTitle" />
                    </HubUpdateStepTitle>
                    <HubUpdateStepText>
                      <TranslatedText tKey="sync.flowUpdatePrefix" />
                      <HubUpdateActionChip>
                        <TranslatedText tKey="sync.button" />
                      </HubUpdateActionChip>
                      <TranslatedText tKey="sync.flowUpdateSuffix" />
                    </HubUpdateStepText>
                  </div>
                </HubUpdateStep>

                <HubUpdateStep>
                  <HubUpdateStepNumber>4</HubUpdateStepNumber>
                  <div>
                    <HubUpdateStepTitle>
                      <TranslatedText tKey="sync.flowReadyTitle" />
                    </HubUpdateStepTitle>
                    <HubUpdateStepText>
                      <TranslatedText tKey="sync.flowReadyPrefix" />
                      <HubUpdateStatusPill $tone="ready">
                        <HubUpdateStatusCheck aria-hidden="true">
                          ✓
                        </HubUpdateStatusCheck>
                        <TranslatedText tKey="status.synced" />
                      </HubUpdateStatusPill>
                      <TranslatedText tKey="sync.flowReadySuffix" />
                    </HubUpdateStepText>
                  </div>
                </HubUpdateStep>
              </HubUpdateSteps>

              <HubUpdateNote>
                <TranslatedText tKey="sync.flowRemovalNote" />
              </HubUpdateNote>
            </HubUpdateFlowPopover>
          </HubUpdateFlowCard>
        </HubUpdateMapHeader>

        <HubUpdateLessonsSection id="hub-update-lessons">
          <LessonsClient
            initialLessons={lessons}
            lessonStatuses={lessonStatuses}
            showCreateButton={false}
            showSearchBar={false}
            showViewToggle
            defaultView="grid"
            listAction="remove"
            deviceId={deviceId}
            layout="embedded"
            variant="offline"
          />
        </HubUpdateLessonsSection>
      </Content>
    </PageWrapper>
  );
}
