export const LANGUAGES = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "es", label: "Español", dir: "ltr" },
  { code: "lg", label: "Luganda", dir: "ltr" },
  { code: "sw", label: "Kiswahili", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export type TranslationKey = string;

export const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    "app.title": "Rose Portable Classroom Hub",
    "app.educatorDashboard": "Educator Dashboard",
    "language.label": "Language",
    "nav.dashboard": "Home",
    "nav.lessons": "Lessons",
    "nav.classrooms": "Classrooms",
    "nav.sync": "Hub Updates",
    "nav.archive": "Archive",
    "home.subtitle": "Manage classrooms and lessons for Student Classroom.",
    "home.metricLessonSingular": "Lesson",
    "home.metricLessonPlural": "Lessons",
    "home.metricClassroomSingular": "Classroom",
    "home.metricClassroomPlural": "Classrooms",
    "home.quickActions": "Quick actions",
    "home.createClassroom": "Create classroom",
    "home.createClassroomDescription":
      "Make a classroom and student join code.",
    "home.createLesson": "Create lesson",
    "home.createLessonDescription":
      "Upload files and assign them to classrooms.",
    "home.updateHub": "Update Classroom Hub",
    "home.updateHubDescription": "Send selected lessons to the hub.",
    "home.hubStatusTitle": "Classroom Hub",
    "home.hubLinked": "Linked",
    "home.hubNotLinked": "Not linked",
    "home.lastUpdate": "Last update:",
    "home.noSuccessfulUpdate": "No successful update yet.",
    "home.linkHubDescription": "Link a Classroom Hub before updating lessons.",
    "home.manageHub": "Manage hub in profile settings.",
    "home.setupStillNeeds": "Setup still needs",
    "profile.educatorAccount": "Educator account",
    "profile.linkedHub": "Linked Classroom Hub",
    "profile.noHub": "No Classroom Hub linked",
    "profile.linkHub": "Link Classroom Hub",
    "profile.replaceHub": "Replace Classroom Hub",
    "profile.unlinkHub": "Unlink Classroom Hub",
    "profile.hubGuide": "Setup Guide",
    "profile.signOut": "Sign Out",
    "pairing.codeLabel": "Classroom Hub pairing code",
    "pairing.help": "You can find this code on the Classroom Hub setup page.",
    "pairing.cancel": "Cancel",
    "pairing.linking": "Linking...",
    "pairing.replacing": "Replacing...",
    "pairing.unlinking": "Unlinking...",
    "pairing.unlinkTitle": "Unlink Classroom Hub?",
    "pairing.unlinkConfirm": "Unlink hub",
    "pairing.unlinkDescription":
      "This disconnects this Educator Dashboard account from the current Classroom Hub device. Lessons and classrooms stay in this account, but this hub will no longer receive updates until it is linked again.",
    "pairing.linkDescription":
      "Enter the pairing code shown on the hub setup page. The Educator Dashboard at rosepch.org creates lessons and classrooms; the Classroom Hub stores them offline for students.",
    "pairing.replaceDescription":
      "Enter the pairing code shown on the hub setup page. Your classrooms and lessons stay in this Educator Dashboard account.",
    "login.title": "Educator Dashboard",
    "login.createTitle": "Create educator account",
    "login.subtitle":
      "Sign in to create lessons, manage classrooms, and send them to your Classroom Hub device.",
    "login.createSubtitle":
      "Use your email and a password to start your educator profile.",
    "login.signIn": "Sign in",
    "login.createAccount": "Create account",
    "login.fullName": "Full name",
    "login.email": "Email",
    "login.password": "Password",
    "login.signingIn": "Signing in...",
    "login.creatingAccount": "Creating account...",
    "login.newEducator": "New educator? Create an account with your email.",
    "login.haveAccount": "Already have an account? Sign in instead.",
    "login.invalid": "Invalid email or password",
    "login.createError":
      "We could not create that account. Try a different email or password.",
    "login.checkEmail":
      "Check your email to finish creating your educator account.",
    "guide.badge": "Setup Guides",
    "guide.title": "Educator Dashboard Guide",
    "guide.subtitle":
      "Use rosepch.org for educator work: accounts, hub linking, classrooms, lessons, files, and hub updates. Use the local Classroom Hub Device Setup page only for Wi-Fi, pairing, and downloading files onto the hub.",
    "guide.dashboard": "Educator Dashboard",
    "guide.dashboardUrl": "Open rosepch.org in a browser",
    "guide.dashboardBody":
      "The cloud website where educators create accounts, link or unlink hubs, create classrooms, upload lesson files, save lessons to the hub, and update the hub.",
    "guide.hub": "Classroom Hub Device Setup",
    "guide.hubUrl": "Open rosehub.local/setup or 10.42.0.1/setup near the hub",
    "guide.hubBody":
      "The local setup page for the hub. Use it for power, setup hotspot, Wi-Fi, pairing code, linked status, and downloading the latest files.",
    "guide.flowDashboard": "Educator Dashboard",
    "guide.flowDashboardText":
      "Create the educator account, link the hub, create classrooms, upload lesson files, and choose what saves to the hub.",
    "guide.flowHub": "Classroom Hub Device Setup",
    "guide.flowHubText":
      "Connect the hub to Wi-Fi, show the pairing code, confirm it is linked, and download the latest files.",
    "guide.flowStudents": "Student Classroom",
    "guide.flowStudentsText":
      "Students open the Student Classroom on the Classroom Hub, enter a classroom join code, and view their lessons.",
    "guide.workflowOverview": "Classroom Hub workflow overview",
    "guide.createLessons": "Create lessons",
    "guide.createLessonsText":
      "Build the learning content in the Educator Dashboard. Add the lesson title, description, cover image, and any files students need.",
    "guide.createLessonsItem1": "Lessons hold the teaching content",
    "guide.createLessonsItem2":
      "Files can be images, PDFs, videos, or PowerPoints",
    "guide.createClassrooms": "Create and assign classrooms",
    "guide.createClassroomsText":
      "In the Educator Dashboard, create each classroom, set its join code, then choose which lessons belong in that classroom.",
    "guide.createClassroomsItem1": "Each classroom has its own join code",
    "guide.createClassroomsItem2":
      "A lesson can be assigned to one or more classrooms",
    "guide.syncHub": "Update the Classroom Hub",
    "guide.syncHubText":
      "Use Hub Updates in the Educator Dashboard to tell the linked hub which lessons to download. Use the local setup page only if the hub needs Wi-Fi help or a manual download.",
    "guide.syncHubItem1":
      "The Classroom Hub must be powered on and connected to internet Wi-Fi",
    "guide.syncHubItem2":
      "Update the hub whenever lessons, files, or classroom assignments change",
    "guide.wifiTag": "Device setup",
    "guide.syncAtLocation": "Set up the hub first",
    "guide.syncAtLocationText":
      "The first Wi-Fi step must happen near the Classroom Hub because the hub creates its own setup hotspot before it is online.",
    "guide.syncAtLocationItem1":
      "Power on the hub with a charger or portable battery.",
    "guide.syncAtLocationItem2":
      "Join the Rose-Hub Wi-Fi hotspot and open rosehub.local/setup. If that does not open, use 10.42.0.1/setup.",
    "guide.syncAtLocationItem3":
      "Connect the hub to internet Wi-Fi and copy the pairing code.",
    "guide.offlineTag": "Offline",
    "guide.teachOffline": "Teach offline",
    "guide.teachOfflineText":
      "After lessons are ready on the Classroom Hub device, you can bring it to a classroom without internet. Students connect to the Classroom Hub and open the Student Classroom.",
    "guide.teachOfflineItem1":
      "Power the Classroom Hub with a portable battery or charger.",
    "guide.teachOfflineItem2":
      "Unlimited tablets, phones, or computers can connect for class.",
    "guide.teachOfflineItem3":
      "Students enter their classroom join code in the Student Classroom.",
    "setupGuide.brandTitle": "Educator Dashboard Setup Guide",
    "setupGuide.orientationTitle": "You are in the Educator Dashboard",
    "setupGuide.orientationText":
      "Use this dashboard to create classrooms, create lessons, upload files, and update the Classroom Hub.",
    "setupGuide.mapDashboardTitle": "Educator Dashboard",
    "setupGuide.mapDashboardText":
      "Create classrooms, lessons, files, and hub updates.",
    "setupGuide.mapHubTitle": "Classroom Hub Setup",
    "setupGuide.mapHubText":
      "Use another device to connect Wi-Fi and get the pairing code.",
    "setupGuide.mapStudentsTitle": "Student Classroom",
    "setupGuide.mapStudentsText":
      "Students enter the join code and open lessons.",
    "setupGuide.safeNote":
      "It is safe to go back, skip a step for now, or restart this guide. Going back does not delete classrooms, lessons, or uploaded files.",
    "setupGuide.stepSafetyHub":
      "This step only links the Classroom Hub to this Educator Dashboard account.",
    "setupGuide.stepSafetyClassroom":
      "You can create one classroom now and add more later.",
    "setupGuide.stepSafetyLesson":
      "You can create one lesson now and edit, add files, or assign more classrooms later.",
    "setupGuide.stepSafetySync":
      "A hub update sends selected lessons to the Classroom Hub. If something changes, update the hub again.",
    "setupGuide.stepCount": "{current} of {total}",
    "setupGuide.progressLabel": "Setup steps",
    "setupGuide.stepBadge": "Step {step} · {label}",
    "setupGuide.welcomeTitle": "Set up the Educator Dashboard",
    "setupGuide.welcomeLinked":
      "This Educator Dashboard is already linked to a Classroom Hub. Begin setup to continue with classrooms, lessons, and hub updates.",
    "setupGuide.welcomeIntro":
      "This guide shows what to do in each place: Educator Dashboard, Classroom Hub Setup, and Student Classroom.",
    "setupGuide.checkDashboardOpen": "Keep this Educator Dashboard open.",
    "setupGuide.checkHubNearby":
      "Have the Classroom Hub powered on and nearby.",
    "setupGuide.checkOtherDevice":
      "Have another tablet, phone, or computer ready to connect to the hub setup Wi-Fi.",
    "setupGuide.checkOneStep":
      "You can safely go back or skip a step and finish it later.",
    "setupGuide.begin": "Begin setup",
    "setupGuide.skipForNow": "Skip for now",
    "setupGuide.finishSetup": "Finish setup",
    "setupGuide.pairingLabel": "Pairing code from hub setup page",
    "setupGuide.pairingHelp": "Enter the pairing code shown on",
    "setupGuide.pairingFallbackHelp": "If that does not open, use",
    "setupGuide.linkingHub": "Linking hub...",
    "setupGuide.enterPairingCode": "Enter pairing code",
    "setupGuide.createdClassroom": "Created",
    "setupGuide.joinCode": "Join code",
    "setupGuide.createClassroom": "Create classroom",
    "setupGuide.createAnotherClassroom": "Create another classroom",
    "setupGuide.creatingClassroom": "Creating classroom...",
    "setupGuide.loadingClassrooms": "Loading classrooms...",
    "setupGuide.createLesson": "Create lesson",
    "setupGuide.createAnotherLesson": "Create another lesson",
    "setupGuide.hubLinked": "Classroom Hub linked",
    "setupGuide.hubNotLinked": "Classroom Hub not linked yet",
    "setupGuide.lastSuccessfulSync": "Last hub update: {value}.",
    "setupGuide.noSuccessfulSync": "No hub update has been recorded yet.",
    "setupGuide.syncInstruction":
      "Press Update Hub to send selected lessons to the Classroom Hub.",
    "setupGuide.linkBeforeSync":
      "Link a Classroom Hub before updating hub lessons.",
    "setupGuide.studentJoinCode": "Student join code",
    "setupGuide.regenerateJoinCode": "Regenerate join code",
    "setupGuide.studentJoinCodeHelp":
      "Students use this 6-character code to join the classroom in the Student Classroom.",
    "setupGuide.stepHub.title": "Set up Hub",
    "setupGuide.stepHub.titleDone": "Already linked to Hub",
    "setupGuide.stepHub.short": "Hub",
    "setupGuide.stepHub.detail":
      "Keep the Educator Dashboard open. Have the Classroom Hub beside you, and have another tablet, phone, or computer ready for the hub setup Wi-Fi.",
    "setupGuide.stepHub.detailDone":
      "This Educator Dashboard is already linked to a Classroom Hub.",
    "setupGuide.stepHub.action": "Enter pairing code",
    "setupGuide.stepHub.actionDone": "Review hub updates",
    "setupGuide.stepHub.helper":
      "When the hub setup page shows the pairing code, enter it below to link this hub to the Educator Dashboard.",
    "setupGuide.stepHub.helperDone": "Continue to Step 2 to set up classrooms.",
    "setupGuide.stepHub.instruction1":
      "Power on the Classroom Hub and wait about one minute.",
    "setupGuide.stepHub.instruction2":
      "On another tablet, phone, or computer beside you, open Wi-Fi settings and join the network named Rose-Hub-XXXX. The last four characters are different for each hub. Use password rosehub! if prompted.",
    "setupGuide.stepHub.instruction3":
      "On that same tablet, phone, or computer, open a browser, enter http://rosehub.local/setup. If that does not open, use http://10.42.0.1/setup. Complete the hub setup steps, then return to this Educator Dashboard with the pairing code.",
    "setupGuide.stepClassroom.title": "Create classroom",
    "setupGuide.stepClassroom.short": "Classroom",
    "setupGuide.stepClassroom.detail":
      "Create a classroom and save its 6-character join code.",
    "setupGuide.stepClassroom.detailDoneSingular": "{count} classroom created.",
    "setupGuide.stepClassroom.detailDonePlural": "{count} classrooms created.",
    "setupGuide.stepLesson.title": "Create lesson",
    "setupGuide.stepLesson.short": "Lesson",
    "setupGuide.stepLesson.detail":
      "Create a lesson, add files, and assign it to a classroom.",
    "setupGuide.stepLesson.detailDoneSingular": "{count} lesson created.",
    "setupGuide.stepLesson.detailDonePlural": "{count} lessons created.",
    "setupGuide.stepLesson.detailNeedsSync":
      "A lesson is created, but it is not selected for the Classroom Hub yet.",
    "setupGuide.stepLesson.detailReadySingular":
      "{count} lesson ready for the Classroom Hub.",
    "setupGuide.stepLesson.detailReadyPlural":
      "{count} lessons ready for the Classroom Hub.",
    "setupGuide.stepSync.title": "Update Classroom Hub",
    "setupGuide.stepSync.short": "Hub update",
    "setupGuide.stepSync.detail":
      "Send selected lessons from the Educator Dashboard to the Classroom Hub.",
    "setupGuide.stepSync.detailDoneSingular":
      "{count} lesson ready on the Classroom Hub.",
    "setupGuide.stepSync.detailDonePlural":
      "{count} lessons ready on the Classroom Hub.",
    "setupGuideModal.title": "Setup guide",
    "setupGuideModal.body":
      "Use the guided setup for the exact order. It will tell you when to use the Educator Dashboard, when to use Classroom Hub Setup, and when students are ready to open Student Classroom.",
    "setupGuideModal.hubTitle": "1. At the Classroom Hub",
    "setupGuideModal.hubStep1":
      "Power on the hub with a charger or battery pack.",
    "setupGuideModal.hubStep2":
      "On another tablet, phone, or computer, join the Rose-Hub Wi-Fi hotspot if it appears.",
    "setupGuideModal.hubStep3":
      "On that same tablet, phone, or computer, open http://rosehub.local/setup. If that does not open, use http://10.42.0.1/setup.",
    "setupGuideModal.hubStep4": "Connect the hub to internet Wi-Fi.",
    "setupGuideModal.hubStep5": "Copy the pairing code shown on the hub.",
    "setupGuideModal.dashboardTitle": "2. In the Educator Dashboard",
    "setupGuideModal.dashboardStep1":
      "Use this dashboard at https://rosepch.org.",
    "setupGuideModal.dashboardStep2": "Enter the hub pairing code.",
    "setupGuideModal.dashboardStep3":
      "Create classrooms and save each join code.",
    "setupGuideModal.dashboardStep4": "Create lessons and upload files.",
    "setupGuideModal.dashboardStep5":
      "Add lessons to the Classroom Hub and update the hub.",
    "setupGuideModal.studentsTitle": "3. For students",
    "setupGuideModal.studentsStep1":
      "Students connect their tablet, phone, or computer to the Classroom Hub Wi-Fi.",
    "setupGuideModal.studentsStep2":
      "Students open the Student Classroom at http://rosehub.local/join. If that does not open, use http://10.42.0.1/join.",
    "setupGuideModal.studentsStep3":
      "Students enter the classroom join code from the educator.",
    "missingDevice.title": "Link Your Classroom Hub",
    "missingDevice.description":
      "You are in the Educator Dashboard at rosepch.org. Link the Classroom Hub so lessons from this account can be sent to the Student Classroom.",
    "missingDevice.viewSetupSteps": "View setup steps",
    "missingDevice.step1":
      "On the hub, open Classroom Hub Device Setup at rosehub.local/setup. If that does not open, use 10.42.0.1/setup.",
    "missingDevice.step2": "Copy the one-time pairing code shown on the hub.",
    "missingDevice.step3":
      "Return to this Educator Dashboard and enter the pairing code here.",
    "missingDevice.help":
      "Already set up this Classroom Hub with another educator account? Sign in with that account, or reset this Classroom Hub before linking it to a new educator.",
    "missingDevice.linkSuccess":
      "Classroom Hub linked. Opening your dashboard...",
    "missingDevice.linked": "Linked",
    "common.back": "Back",
    "common.next": "Next",
    "common.closeModal": "Close modal",
    "common.gotIt": "Got it",
    "common.openSetupGuide": "Open setup guide",
    "common.recorded": "Recorded",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.saving": "Saving...",
    "common.create": "Create",
    "common.creating": "Creating...",
    "common.copied": "Copied",
    "common.working": "Working...",
    "common.searchPlaceholder": "Search for lesson or file",
    "common.clearSearch": "Clear search",
    "common.sortBy": "Sort By",
    "common.classroom": "Classroom",
    "common.selected": "selected",
    "common.card": "Card",
    "common.list": "List",
    "common.morePrefix": "+",
    "common.moreSuffix": "more",
    "common.showLess": "Show less",
    "sort.updatedNewest": "Recently updated",
    "sort.updatedOldest": "Updated (Oldest)",
    "sort.createdNewest": "Newest lessons",
    "sort.createdOldest": "Created (Oldest)",
    "sort.nameAsc": "Lesson name A-Z",
    "sort.recentlyArchived": "Recently archived",
    "sort.oldestArchived": "Oldest archived",
    "status.synced": "Ready on Hub",
    "status.pendingSync": "Update Hub",
    "status.pendingSyncLower": "update hub",
    "status.pendingRemoval": "Remove on Next Update",
    "status.dashboardOnly": "Dashboard Only",
    "lessons.title": "Lessons",
    "lessons.description":
      "Create lessons, assign classrooms, and choose what to save on the Classroom Hub.",
    "lessons.create": "Create Lesson",
    "lessons.createLower": "Create lesson",
    "lessons.searchPlaceholder": "Search lessons, classrooms, or files",
    "lessons.details": "Details",
    "lessons.noLessons": "No lessons yet.",
    "lessons.empty":
      "Create your first lesson to add files and assign a classroom.",
    "lessons.noMatches": "No lessons match your search.",
    "lessons.tryDifferent": "Try a different classroom or search term.",
    "lessons.readySingular": "Lesson ready for hub",
    "lessons.readyPlural": "Lessons ready for hub",
    "lessons.needsClassroomSingular": "Lesson needs a classroom",
    "lessons.needsClassroomPlural": "Lessons need a classroom",
    "lessons.activeSingular": "Active lesson",
    "lessons.activePlural": "Active lessons",
    "lessons.reviewSync": "Review hub updates",
    "lessons.manageClassrooms": "Manage classrooms",
    "lessons.restoreTitle": "Restore Lesson",
    "lessons.restoreDescription": "This lesson will be restored.",
    "lessons.restoreConfirm": "Restore to Active",
    "lessons.removeSyncTitle": "Remove Lesson from Hub",
    "lessons.removeSyncDescription":
      "The lesson will stay saved in the dashboard. It will be removed from the Classroom Hub after the next successful hub update.",
    "lessons.removePendingTitle": "Remove Lesson on Next Hub Update",
    "lessons.removePendingDescription":
      "The lesson will stay saved in the dashboard. After the next successful hub update, students will no longer see it on the Classroom Hub.",
    "lessons.removeConfirm": "Remove from Hub",
    "lessons.removeOnNextUpdate": "Remove on Next Update",
    "lessons.removeHubAction": "Remove",
    "lessons.remove": "Remove from Hub",
    "lessons.restore": "Restore",
    "lessons.noFilesAttached": "No files attached to this lesson.",
    "lessons.lessonCountSingular": "lesson",
    "lessons.lessonCountPlural": "lessons",
    "lessons.of": "of",
    "archive.title": "Archived Lessons",
    "archive.description":
      "Restore lessons when you want them back in the dashboard or hub update list.",
    "archive.emptyTitle": "No archived lessons yet.",
    "archive.emptyDescription": "Lessons you archive will appear here.",
    "classrooms.title": "Classrooms",
    "classrooms.description": "Set up each classroom with its own join code.",
    "classrooms.searchPlaceholder": "Search classrooms, join codes, or lessons",
    "classrooms.classroomCountSingular": "classroom",
    "classrooms.classroomCountPlural": "classrooms",
    "classrooms.name": "Classroom name",
    "classrooms.namePlaceholder": "Learning Group",
    "classrooms.joinCode": "Join code",
    "classrooms.joinCodePlaceholder": "ABC123",
    "classrooms.hint":
      "Students use this 6-character code to join the classroom. It stays valid until you change it.",
    "classrooms.newCode": "New code",
    "classrooms.create": "Create Classroom",
    "classrooms.createModalIntro":
      "Create a classroom, then share its join code with students.",
    "classrooms.nameRequired": "Classroom name is required.",
    "classrooms.joinCodeExact":
      "Use exactly 6 letters or numbers for the join code.",
    "classrooms.joinCodeUsedByAnother":
      "That join code is already used by another classroom.",
    "classrooms.createFailed": "Unable to create classroom. Please try again.",
    "classrooms.updateFailed": "Unable to update classroom. Please try again.",
    "classrooms.removeLessonFailed":
      "Unable to remove lesson from this classroom. Please try again.",
    "classrooms.deleteOwnOnly":
      "Only classrooms created by this account can be deleted.",
    "classrooms.checkFailed":
      "Unable to check this classroom. Please try again.",
    "classrooms.deleteFailed": "Unable to delete classroom. Please try again.",
    "classrooms.deleteTitle": "Delete {classroom}?",
    "classrooms.deleteDescriptionWithLesson":
      "1 lesson uses this classroom. It will be removed from the hub update list until assigned to another classroom.\n\nUpdate the hub afterwards to remove that lesson from the classroom device.",
    "classrooms.deleteDescriptionWithLessons":
      "{count} lessons use this classroom. They will be removed from the hub update list until assigned to another classroom.\n\nUpdate the hub afterwards to remove those lessons from the classroom device.",
    "classrooms.deleteDescriptionNoLessons":
      "This classroom will be removed. Lessons already assigned to other classrooms will not change.",
    "classrooms.tableLabel": "Classroom join codes",
    "classrooms.noCode": "No code set",
    "classrooms.copyCode": "Copy join code",
    "classrooms.editCode": "Edit join code",
    "classrooms.editClassroom": "Edit classroom",
    "classrooms.changeJoinCodeTitle": "Change classroom join code?",
    "classrooms.changeJoinCodeDescription":
      "Students will need the new join code the next time they join this classroom.",
    "classrooms.changeJoinCodeConfirm": "Change code",
    "classrooms.delete": "Delete classroom",
    "classrooms.checking": "Checking classroom",
    "classrooms.empty":
      "Create a classroom to assign lessons and share its join code.",
    "classrooms.noMatches": "No classrooms match your search.",
    "classrooms.tryDifferent": "Try another classroom, join code, or lesson.",
    "classrooms.keep": "Keep classroom",
    "classrooms.lessons": "Lessons",
    "classrooms.lessonSingular": "1 lesson",
    "classrooms.lessonPlural": "{count} lessons",
    "classrooms.noLessonsAssigned": "No lessons assigned yet.",
    "classrooms.removeLesson": "Remove from classroom",
    "classrooms.removeLessonTitle": "Remove lesson from classroom?",
    "classrooms.removeLessonDescription":
      "This removes {lesson} from {classroom}. The lesson stays in your dashboard. Update the Classroom Hub afterwards so students see the change.",
    "classrooms.removeLessonConfirm": "Remove lesson",
    "classrooms.synced": "Ready on Hub",
    "classrooms.needsSync": "Update Hub",
    "classrooms.notSavedToHub": "Dashboard Only",
    "sync.title": "Update Classroom Hub",
    "sync.subtitle":
      "Choose lessons for offline use, then update the Classroom Hub.",
    "sync.emptySubtitle":
      "Link a Classroom Hub when you are ready to send lessons for offline use.",
    "sync.noHubTitle": "Classroom Hub not linked yet",
    "sync.noHubText":
      "You can prepare lessons and classrooms now. Link a Classroom Hub when the device is ready, then return here to send them for offline use.",
    "sync.noHubStep1": "Open the local Classroom Hub setup page.",
    "sync.noHubStep2": "Copy the pairing code shown there.",
    "sync.noHubStep3": "Open your profile menu and choose Link Classroom Hub.",
    "sync.lessonsToSync": "Lessons Selected for Hub",
    "sync.progress": "Classroom Hub Update",
    "sync.addToHub": "Add to Hub",
    "sync.removeFromHub": "Remove from Hub",
    "sync.button": "Update Hub",
    "sync.syncing": "Updating...",
    "sync.buttonTitle": "Click to update the Classroom Hub",
    "sync.linkHubFirst": "Link Hub First",
    "sync.linkHubFirstTitle":
      "Link a Classroom Hub before updating hub lessons",
    "sync.hubLinked": "Classroom Hub linked",
    "sync.hubManagedInProfile": "Manage in Profile Settings.",
    "sync.notSynced": "No hub update yet",
    "sync.lastUpdated": "Last hub update",
    "sync.summary": "Hub Summary",
    "sync.noticeEmptyTitle": "No lessons are selected for the hub yet",
    "sync.noticeEmptyBody":
      "Open a lesson and choose Add to Hub when students should see it in Student Classroom.",
    "sync.noticeNeedsTitle": "The Classroom Hub needs an update",
    "sync.noticeNeedsBody":
      "Press Update Hub so the Classroom Hub receives the latest lessons and classroom changes.",
    "sync.noticeReadyTitle": "The Classroom Hub is up to date",
    "sync.noticeReadyBody":
      "Selected lessons are ready on the Classroom Hub. Update again after changing lessons, files, or classrooms.",
    "sync.emptyLessonsTitle": "No lessons selected for the hub yet.",
    "sync.emptyLessonsDescription":
      "Open a lesson and choose Add to Hub when students should see it in Student Classroom.",
    "sync.mapDashboardTitle": "Dashboard Only",
    "sync.mapDashboardDescription":
      "Saved in the Educator Dashboard, not selected for the hub.",
    "sync.mapPendingTitle": "Pending Hub Updates",
    "sync.mapPendingDescription":
      "Will change on the Classroom Hub after Update Hub runs.",
    "sync.mapReadyTitle": "Ready on Hub",
    "sync.mapReadyDescription":
      "Available to students on the Classroom Hub right now.",
    "sync.mapEmpty": "No lessons here yet.",
    "sync.flowTitle": "How hub updates work",
    "sync.flowIntro":
      "Use this page when lessons or classroom assignments need to change on the Classroom Hub.",
    "sync.flowAddTitle": "Add lessons",
    "sync.flowAddPrefix": "Choose ",
    "sync.flowAddSuffix": " when students need a lesson available offline.",
    "sync.flowChangesTitle": "Watch for changes",
    "sync.flowChangesPrefix":
      "If you edit a lesson, remove it from a classroom, or change where it appears, it will show ",
    "sync.flowChangesSuffix": ".",
    "sync.flowSelectTitle": "Choose lessons",
    "sync.flowSelectText":
      "Choose Add to Hub on a lesson to add it to this list. Choose Remove from Hub when students should no longer see it on the hub.",
    "sync.flowSelectPrefix": "Select ",
    "sync.flowSelectMiddle": " on a lesson to add it here. Select ",
    "sync.flowSelectSuffix":
      " when students should no longer see it on the Classroom Hub.",
    "sync.flowReviewTitle": "Check status",
    "sync.flowReviewText":
      "Update Hub means the dashboard has changes the hub does not have yet. Ready on Hub means the last hub update finished.",
    "sync.flowReviewMiddle":
      " means the dashboard has updates the Classroom Hub does not have yet. ",
    "sync.flowReviewSuffix": " means the last hub update finished.",
    "sync.flowUpdateTitle": "Update the hub",
    "sync.flowUpdateText":
      "Press Update Hub to send lesson files, classroom assignments, and removals to the Classroom Hub.",
    "sync.flowUpdatePrefix": "Press ",
    "sync.flowUpdateSuffix": " to send waiting changes to the Classroom Hub.",
    "sync.flowReadyTitle": "Check Student Classroom",
    "sync.flowReadyPrefix": "When the update finishes, lessons marked ",
    "sync.flowReadySuffix": " are available to students in Student Classroom.",
    "sync.flowRemovalNote":
      "For first-time setup instructions, use the Setup Guide. This section is only for everyday hub updates.",
    "sync.successTitle": "Hub Updated",
    "sync.errorTitle": "Hub Update Failed",
    "sync.successBody": "The Classroom Hub is up to date.",
    "sync.errorBody":
      "The hub update could not be completed. Please try again later.",
    "sync.requestError": "The hub update request could not be completed.",
    "sync.continue": "Continue",
    "sync.tryLater": "Try Later",
    "sync.syncAgain": "Update Again",
    "sync.stage.waiting": "Waiting for hub",
    "sync.stage.preparing": "Preparing offline content...",
    "sync.stage.downloading": "Downloading lesson files...",
    "sync.stage.finalizing": "Finishing hub update...",
    "storage.loading": "Loading storage...",
    "storage.notReported": "Storage not reported yet",
    "storage.syncToUpdate": "Update hub to refresh",
    "storage.usedPercent": "Used",
    "storage.gbUsed": "{used} GB of {total} GB used",
    "files.files": "Files",
    "files.fileSingular": "file",
    "files.filePlural": "files",
    "files.noDescription": "No description added.",
    "files.noFileSelected": "No file selected.",
    "files.previewUnavailable": "Preview URL not available yet.",
    "files.download": "Download",
    "files.openFullScreen": "Open full screen",
    "files.noClassrooms": "No classrooms assigned.",
    "files.name": "Name",
    "files.dateAdded": "Date Added",
    "files.dateModified": "Date Modified",
    "files.fileSize": "File Size",
    "files.drag": "Drag files to reorder.",
    "files.sortingActiveDrag":
      "Sorting is active. Clear sorting to drag and manually reorder files.",
    "files.searchActiveDrag":
      "Search is active. Clear search to drag and manually reorder files.",
    "files.totalSize": "Total size",
    "files.noMatches": "No files match your search.",
    "files.selectAll": "Select all files",
    "files.upload": "Upload files",
    "files.deleteSingular": "Delete file",
    "files.deletePlural": "Delete files",
    "lessons.edit": "Edit lesson",
    "lessons.editDetails": "Edit details",
    "common.loading": "Loading...",
    "lessonModal.customize": "Customize",
    "lessonModal.createTitle": "Create new lesson",
    "lessonModal.editTitle": "Edit lesson",
    "lessonModal.name": "Name",
    "lessonModal.lessonTitlePlaceholder": "Lesson title",
    "lessonModal.description": "Description",
    "lessonModal.descriptionPlaceholder": "Brief description of the lesson",
    "lessonModal.select": "Select",
    "lessonModal.noClassrooms": "No classrooms yet.",
    "lessonModal.newClassroom": "New classroom",
    "lessonModal.classroomNameRequired": "Classroom name is required.",
    "lessonModal.joinCodeLength":
      "For the join code, use exactly 6 letters or numbers.",
    "lessonModal.joinCodeUsed": "That join code is already used.",
    "lessonModal.createClassroomFailed":
      "Unable to create classroom. Please try again.",
    "lessonModal.classroomRequired": "At least one classroom is required.",
    "lessonModal.studentJoinCodeInfo": "What is a student join code?",
    "lessonModal.studentJoinCodeTooltip":
      "Students enter this code on the Classroom Hub join page to see this classroom's lessons.",
    "lessonModal.uploadFiles": "Upload Files",
    "lessonModal.chooseFiles": "Choose files or drag files here",
    "lessonModal.chooseFile": "Choose a file or drag and drop it here",
    "lessonModal.fileFormats":
      "JPEG, PNG, PDF, MP4, PowerPoint, and APK formats accepted",
    "lessonModal.formatsAccepted": "formats accepted",
    "lessonModal.browseFile": "Browse file",
    "lessonModal.uploading": "Uploading",
    "lessonModal.completed": "Completed",
    "lessonModal.failed": "Failed",
    "lessonModal.removeFile": "Remove",
    "lessonModal.addToHubAvailable":
      "Make this lesson available after the next hub update",
    "lessonModal.addToHubNeedsHub":
      "Link a Classroom Hub before adding lessons to the hub",
    "lessonModal.creatingLesson": "Creating lesson...",
    "lessonModal.finishingLesson": "Finishing lesson...",
    "lessonModal.uploadingFile": "Uploading file",
    "lessonModal.duplicateLessonPrefix": "You already have a lesson called",
    "lessonModal.duplicateLessonSuffix": "Try a different name.",
    "lessonModal.linkHubBeforeAdd":
      "Link a Classroom Hub before adding lessons to the hub, or turn off Add to Hub for now.",
    "lessonModal.cannotAddWithoutFiles":
      "Cannot add lesson to the Classroom Hub without files.",
    "lessonModal.createFailed": "Failed to create lesson. Please try again.",
    "lessonModal.uploadFilesFailed":
      "Failed to upload files. Please try again.",
    "lessonModal.duplicateFileSingleSuffix": "is already in this lesson.",
    "lessonModal.duplicateFilePluralPrefix":
      "These files are already in this lesson:",
    "lessonModal.imageTitle": "Select Lesson Graphic",
    "lessonModal.selectImage": "Select Image",
    "lessonModal.uploadImage": "Upload Image",
    "lessonModal.previewAlt": "Preview",
    "lessonModal.saveImage": "Save Image",
    "lessonModal.onlyImagesAccepted": "Only .png and .jpg files are accepted.",
    "lessonModal.saveImageFailed": "Failed to save image. Please try again.",
    "lessonModal.saveChanges": "Save Changes",
    "archive.action": "Archive",
    "archive.modalTitle": "Archive Lesson",
    "archive.modalDescription":
      "This lesson will be removed from the Lesson Dashboard. You can restore it later from Archived Lessons.",
    "archive.modalDescriptionWithHub":
      "This lesson will be removed from the Lesson Dashboard. Update the hub afterwards so students no longer see it on the Classroom Hub.",
    "archive.restoreModalDescription":
      "This lesson will return to the Lesson Dashboard. You can save it to the hub again when it is ready.",
    "archive.modalConfirm": "Archive Lesson",
  },
  es: {
    "app.title": "Rose Portable Classroom Hub",
    "app.educatorDashboard": "Panel del educador",
    "language.label": "Idioma",
    "nav.dashboard": "Inicio",
    "nav.lessons": "Lecciones",
    "nav.classrooms": "Clases",
    "nav.sync": "Actualizaciones del Hub",
    "nav.archive": "Archivo",
    "home.subtitle": "Administra clases y lecciones para Aula del estudiante.",
    "home.metricLessonSingular": "Lección",
    "home.metricLessonPlural": "Lecciones",
    "home.metricClassroomSingular": "Clase",
    "home.metricClassroomPlural": "Clases",
    "home.quickActions": "Acciones rápidas",
    "home.createClassroom": "Crear clase",
    "home.createClassroomDescription":
      "Crea una clase y un código para estudiantes.",
    "home.createLesson": "Crear lección",
    "home.createLessonDescription": "Sube archivos y asígnalos a clases.",
    "home.updateHub": "Actualizar Classroom Hub",
    "home.updateHubDescription": "Envía las lecciones seleccionadas al hub.",
    "home.hubStatusTitle": "Classroom Hub",
    "home.hubLinked": "Vinculado",
    "home.hubNotLinked": "No vinculado",
    "home.lastUpdate": "Última actualización:",
    "home.noSuccessfulUpdate": "Aún no hay una actualización exitosa.",
    "home.linkHubDescription":
      "Vincula un Classroom Hub antes de actualizar lecciones.",
    "home.manageHub": "Administra el hub en la configuración del perfil.",
    "home.setupStillNeeds": "La configuración aún necesita",
    "profile.educatorAccount": "Cuenta de educador",
    "profile.linkedHub": "Classroom Hub vinculado",
    "profile.noHub": "No hay Classroom Hub vinculado",
    "profile.linkHub": "Vincular Classroom Hub",
    "profile.replaceHub": "Reemplazar Classroom Hub",
    "profile.unlinkHub": "Desvincular Classroom Hub",
    "profile.hubGuide": "Guía del Classroom Hub",
    "profile.signOut": "Salir",
    "pairing.codeLabel": "Código de vinculación del Classroom Hub",
    "pairing.help":
      "Puedes encontrar este código en la página de configuración del Classroom Hub.",
    "pairing.cancel": "Cancelar",
    "pairing.linking": "Vinculando...",
    "pairing.replacing": "Reemplazando...",
    "pairing.unlinking": "Desvinculando...",
    "pairing.unlinkTitle": "¿Desvincular Classroom Hub?",
    "pairing.unlinkConfirm": "Desvincular hub",
    "pairing.unlinkDescription":
      "Esto desconecta esta cuenta del Panel del educador del Classroom Hub actual. Tus clases y lecciones permanecen en esta cuenta, pero este hub no recibirá actualizaciones hasta que se vuelva a vincular.",
    "pairing.linkDescription":
      "Ingresa el código que aparece en la página de configuración del hub. El Panel del educador en rosepch.org crea lecciones y clases; el Classroom Hub las guarda sin internet para los estudiantes.",
    "pairing.replaceDescription":
      "Ingresa el código que aparece en la página local de configuración del Classroom Hub en rosehub.local/setup. Si no abre, usa 10.42.0.1/setup. Tus clases y lecciones permanecen en esta cuenta del Panel del educador.",
    "login.title": "Panel del educador",
    "login.createTitle": "Crear cuenta de educador",
    "login.subtitle":
      "Inicia sesión para administrar lecciones, clases y tu Classroom Hub.",
    "login.createSubtitle":
      "Usa tu correo y una contraseña para crear tu perfil de educador.",
    "login.signIn": "Iniciar sesión",
    "login.createAccount": "Crear cuenta",
    "login.fullName": "Nombre completo",
    "login.email": "Correo electrónico",
    "login.password": "Contraseña",
    "login.signingIn": "Iniciando sesión...",
    "login.creatingAccount": "Creando cuenta...",
    "login.newEducator": "¿Nuevo educador? Crea una cuenta con tu correo.",
    "login.haveAccount": "¿Ya tienes una cuenta? Inicia sesión.",
    "login.invalid": "Correo o contraseña inválidos",
    "login.createError":
      "No pudimos crear esa cuenta. Prueba con otro correo o contraseña.",
    "login.checkEmail":
      "Revisa tu correo para terminar de crear tu cuenta de educador.",
    "guide.badge": "Guía del Classroom Hub",
    "guide.title": "Cómo funciona el Classroom Hub",
    "guide.subtitle":
      "Una vista simple de cómo las lecciones pasan del Panel del educador al Classroom Hub, y luego a los estudiantes de cada clase.",
    "guide.dashboard": "Panel del educador",
    "guide.dashboardUrl": "Abre rosepch.org en un navegador",
    "guide.dashboardBody":
      "El sitio web donde los educadores crean cuentas, vinculan o desvinculan hubs, crean clases, suben archivos de lecciones, guardan lecciones en el hub y actualizan el hub.",
    "guide.hub": "Classroom Hub",
    "guide.hubUrl": "Abre rosehub.local/setup o 10.42.0.1/setup",
    "guide.hubBody":
      "El Classroom Hub incluye el dispositivo Rose Portable Classroom Hub y cualquier tableta, teléfono o computadora usado para abrir Aula del estudiante, configuración o mantenimiento.",
    "guide.flowDashboard": "Panel del educador",
    "guide.flowDashboardText":
      "Crea lecciones, sube archivos, crea clases y asigna lecciones.",
    "guide.flowHub": "Classroom Hub",
    "guide.flowHubText":
      "Conecta el hub al Wi-Fi, muestra el código de vinculación, confirma que esté vinculado y descarga los archivos más recientes.",
    "guide.flowStudents": "Aula del estudiante",
    "guide.flowStudentsText":
      "Ingresan un código de clase y abren sus lecciones en cualquier lugar sin internet.",
    "guide.workflowOverview": "Resumen del flujo de trabajo del Classroom Hub",
    "guide.createLessons": "Crear lecciones",
    "guide.createLessonsText":
      "Crea el contenido de aprendizaje en el Panel del educador. Agrega título, descripción, imagen y los archivos que necesitan los estudiantes.",
    "guide.createLessonsItem1":
      "Las lecciones contienen el contenido de enseñanza",
    "guide.createLessonsItem2":
      "Los archivos pueden ser imágenes, PDF, videos o PowerPoints",
    "guide.createClassrooms": "Crear y asignar clases",
    "guide.createClassroomsText":
      "En el Panel del educador, crea cada clase, configura su código y elige qué lecciones pertenecen a esa clase.",
    "guide.createClassroomsItem1": "Cada clase tiene su propio código",
    "guide.createClassroomsItem2":
      "Una lección puede asignarse a una o varias clases",
    "guide.syncHub": "Actualizar el Classroom Hub",
    "guide.syncHubText":
      "Usa Actualizaciones del Hub en el Panel del educador para indicar al hub vinculado qué lecciones descargar. Usa la página local de configuración solo si el hub necesita ayuda con Wi-Fi o una descarga manual.",
    "guide.syncHubItem1":
      "El Classroom Hub debe estar encendido y conectado a Wi-Fi con internet",
    "guide.syncHubItem2":
      "Actualiza el hub cuando cambien lecciones, archivos o asignaciones de clases",
    "guide.wifiTag": "Usanidi wa kifaa",
    "guide.syncAtLocation": "Configura el hub primero",
    "guide.syncAtLocationText":
      "El primer paso de Wi-Fi debe hacerse cerca del Classroom Hub porque el hub crea su propio hotspot de configuración antes de estar en línea.",
    "guide.syncAtLocationItem1":
      "Enciende el hub con un cargador o batería portátil.",
    "guide.syncAtLocationItem2":
      "Únete al hotspot Wi-Fi Rose-Hub y abre rosehub.local/setup. Si no abre, usa 10.42.0.1/setup.",
    "guide.syncAtLocationItem3":
      "Conecta el hub a Wi-Fi con internet y copia el código de vinculación.",
    "guide.offlineTag": "Sin internet",
    "guide.teachOffline": "Enseñar sin internet",
    "guide.teachOfflineText":
      "Después de que las lecciones estén listas en el Classroom Hub, puedes llevarlo a una clase sin internet. Los estudiantes se conectan al Classroom Hub y abren Aula del estudiante.",
    "guide.teachOfflineItem1":
      "Alimenta el Classroom Hub con una batería portátil o cargador.",
    "guide.teachOfflineItem2":
      "Tabletas, teléfonos o computadoras ilimitadas pueden conectarse para la clase.",
    "guide.teachOfflineItem3":
      "Los estudiantes ingresan su código de clase para ver sus lecciones.",
    "setupGuide.brandTitle": "Guía de configuración del Panel del educador",
    "setupGuide.orientationTitle": "Estás en el Panel del educador",
    "setupGuide.orientationText":
      "Usa este panel para crear clases, crear lecciones, subir archivos y actualizar el Classroom Hub.",
    "setupGuide.mapDashboardTitle": "Panel del educador",
    "setupGuide.mapDashboardText":
      "Crea clases, lecciones, archivos y actualizaciones del hub.",
    "setupGuide.mapHubTitle": "Configuración del Classroom Hub",
    "setupGuide.mapHubText":
      "Usa otro dispositivo para conectar Wi-Fi y obtener el código de vinculación.",
    "setupGuide.mapStudentsTitle": "Aula del estudiante",
    "setupGuide.mapStudentsText":
      "Los estudiantes ingresan el código de unión y abren lecciones.",
    "setupGuide.safeNote":
      "Es seguro volver, omitir un paso por ahora o reiniciar esta guía. Volver no elimina clases, lecciones ni archivos subidos.",
    "setupGuide.stepSafetyHub":
      "Este paso solo vincula el Classroom Hub a esta cuenta del Panel del educador.",
    "setupGuide.stepSafetyClassroom":
      "Puedes crear una clase ahora y agregar más después.",
    "setupGuide.stepSafetyLesson":
      "Puedes crear una lección ahora y editarla, agregar archivos o asignar más clases después.",
    "setupGuide.stepSafetySync":
      "Una actualización del hub envía las lecciones seleccionadas al Classroom Hub. Si algo cambia, actualiza el hub otra vez.",
    "setupGuide.stepCount": "{current} de {total}",
    "setupGuide.progressLabel": "Pasos de configuración",
    "setupGuide.stepBadge": "Paso {step} · {label}",
    "setupGuide.welcomeTitle": "Configurar el Panel del educador",
    "setupGuide.welcomeLinked":
      "Este Panel del educador ya está vinculado a un Classroom Hub. Comienza la configuración para continuar con clases, lecciones y actualizaciones del hub.",
    "setupGuide.welcomeIntro":
      "Esta guía muestra qué hacer en cada lugar: Panel del educador, configuración del Classroom Hub y Aula del estudiante.",
    "setupGuide.checkDashboardOpen": "Mantén abierto este Panel del educador.",
    "setupGuide.checkHubNearby": "Ten el Classroom Hub encendido y cerca.",
    "setupGuide.checkOtherDevice":
      "Ten lista otra tableta, teléfono o computadora para conectarte al Wi-Fi de configuración del hub.",
    "setupGuide.checkOneStep":
      "Puedes volver, omitir un paso y terminarlo más tarde.",
    "setupGuide.begin": "Comenzar configuración",
    "setupGuide.skipForNow": "Omitir por ahora",
    "setupGuide.finishSetup": "Finalizar configuración",
    "setupGuide.pairingLabel":
      "Código de vinculación de la página de configuración del hub",
    "setupGuide.pairingHelp": "Ingresa el código de vinculación que aparece en",
    "setupGuide.pairingFallbackHelp": "Si no abre, usa",
    "setupGuide.linkingHub": "Vinculando hub...",
    "setupGuide.enterPairingCode": "Ingresar código de vinculación",
    "setupGuide.createdClassroom": "Creada",
    "setupGuide.joinCode": "Código de ingreso",
    "setupGuide.createClassroom": "Crear clase",
    "setupGuide.createAnotherClassroom": "Crear otra clase",
    "setupGuide.creatingClassroom": "Creando clase...",
    "setupGuide.loadingClassrooms": "Cargando clases...",
    "setupGuide.createLesson": "Crear lección",
    "setupGuide.createAnotherLesson": "Crear otra lección",
    "setupGuide.hubLinked": "Classroom Hub vinculado",
    "setupGuide.hubNotLinked": "Classroom Hub aún no vinculado",
    "setupGuide.lastSuccessfulSync": "Última actualización del hub: {value}.",
    "setupGuide.noSuccessfulSync":
      "Aún no se ha registrado una actualización del hub.",
    "setupGuide.syncInstruction":
      "Presiona Actualizar Hub para enviar las lecciones seleccionadas al Classroom Hub.",
    "setupGuide.linkBeforeSync":
      "Vincula un Classroom Hub antes de actualizar las lecciones del hub.",
    "setupGuide.studentJoinCode": "Código de ingreso del estudiante",
    "setupGuide.regenerateJoinCode": "Regenerar código de ingreso",
    "setupGuide.studentJoinCodeHelp":
      "Los estudiantes usan este código de 6 caracteres para unirse a la clase en Aula del estudiante.",
    "setupGuide.stepHub.title": "Configurar hub",
    "setupGuide.stepHub.titleDone": "Hub ya vinculado",
    "setupGuide.stepHub.short": "Hub",
    "setupGuide.stepHub.detail":
      "Mantén abierto el Panel del educador. Ten el Classroom Hub a tu lado y otra tableta, teléfono o computadora lista para el Wi-Fi de configuración del hub.",
    "setupGuide.stepHub.detailDone":
      "Este Panel del educador ya está vinculado a un Classroom Hub.",
    "setupGuide.stepHub.action": "Ingresar código de vinculación",
    "setupGuide.stepHub.actionDone": "Revisar actualizaciones del hub",
    "setupGuide.stepHub.helper":
      "Cuando la página de configuración del hub muestre el código de vinculación, ingrésalo abajo para vincular este hub al Panel del educador.",
    "setupGuide.stepHub.helperDone":
      "Continúa al Paso 2 para configurar las clases.",
    "setupGuide.stepHub.instruction1":
      "Enchufa o enciende el Classroom Hub a tu lado y espera aproximadamente un minuto.",
    "setupGuide.stepHub.instruction2":
      "En otra tableta, teléfono o computadora a tu lado, abre la configuración Wi-Fi y únete a la red llamada Rose-Hub-XXXX. Los últimos cuatro caracteres son diferentes para cada hub. Usa la contraseña rosehub! si se solicita.",
    "setupGuide.stepHub.instruction3":
      "En esa misma tableta, teléfono o computadora, abre un navegador e ingresa http://rosehub.local/setup. Si no abre, usa http://10.42.0.1/setup. Completa los pasos de configuración del hub y vuelve a este Panel del educador con el código de vinculación.",
    "setupGuide.stepClassroom.title": "Crear clase",
    "setupGuide.stepClassroom.short": "Clase",
    "setupGuide.stepClassroom.detail":
      "Crea una clase y guarda su código de ingreso de 6 caracteres.",
    "setupGuide.stepClassroom.detailDoneSingular": "{count} clase creada.",
    "setupGuide.stepClassroom.detailDonePlural": "{count} clases creadas.",
    "setupGuide.stepLesson.title": "Crear lección",
    "setupGuide.stepLesson.short": "Lección",
    "setupGuide.stepLesson.detail":
      "Crea una lección, agrega archivos y asígnala a una clase.",
    "setupGuide.stepLesson.detailDoneSingular": "{count} lección creada.",
    "setupGuide.stepLesson.detailDonePlural": "{count} lecciones creadas.",
    "setupGuide.stepLesson.detailNeedsSync":
      "Ya hay una lección creada, pero aún no está seleccionada para el Classroom Hub.",
    "setupGuide.stepLesson.detailReadySingular":
      "{count} lección lista para el Classroom Hub.",
    "setupGuide.stepLesson.detailReadyPlural":
      "{count} lecciones listas para el Classroom Hub.",
    "setupGuide.stepSync.title": "Actualizar Classroom Hub",
    "setupGuide.stepSync.short": "Actualizar hub",
    "setupGuide.stepSync.detail":
      "Envía las lecciones seleccionadas desde el Panel del educador al Classroom Hub.",
    "setupGuide.stepSync.detailDoneSingular":
      "{count} lección lista en el Classroom Hub.",
    "setupGuide.stepSync.detailDonePlural":
      "{count} lecciones listas en el Classroom Hub.",
    "setupGuideModal.title": "Guía de configuración",
    "setupGuideModal.body":
      "Usa la configuración guiada para seguir el orden exacto. Te dirá cuándo usar el Panel del educador, cuándo usar la configuración del Classroom Hub y cuándo los estudiantes pueden abrir Aula del estudiante.",
    "setupGuideModal.hubTitle": "1. En el Classroom Hub",
    "setupGuideModal.hubStep1":
      "Enciende el hub con un cargador o una batería portátil.",
    "setupGuideModal.hubStep2":
      "En otra tableta, teléfono o computadora, únete al Wi-Fi Rose-Hub si aparece.",
    "setupGuideModal.hubStep3":
      "En esa misma tableta, teléfono o computadora, abre http://rosehub.local/setup. Si no abre, usa http://10.42.0.1/setup.",
    "setupGuideModal.hubStep4": "Conecta el hub al Wi-Fi con internet.",
    "setupGuideModal.hubStep5":
      "Copia el código de vinculación que aparece en el hub.",
    "setupGuideModal.dashboardTitle": "2. En el Panel del educador",
    "setupGuideModal.dashboardStep1": "Usa este panel en https://rosepch.org.",
    "setupGuideModal.dashboardStep2":
      "Ingresa el código de vinculación del hub.",
    "setupGuideModal.dashboardStep3":
      "Crea clases y guarda cada código de ingreso.",
    "setupGuideModal.dashboardStep4": "Crea lecciones y sube archivos.",
    "setupGuideModal.dashboardStep5":
      "Agrega lecciones al Classroom Hub y actualiza el hub.",
    "setupGuideModal.studentsTitle": "3. Para estudiantes",
    "setupGuideModal.studentsStep1":
      "Los estudiantes conectan su tableta, teléfono o computadora al Wi-Fi del Classroom Hub.",
    "setupGuideModal.studentsStep2":
      "Los estudiantes abren Aula del estudiante en http://rosehub.local/join. Si no abre, usan http://10.42.0.1/join.",
    "setupGuideModal.studentsStep3":
      "Los estudiantes ingresan el código de ingreso de la clase que les da el educador.",
    "missingDevice.title": "Vincula tu Classroom Hub",
    "missingDevice.description":
      "Estás en el Panel del educador en rosepch.org. Vincula el Classroom Hub para que las lecciones de esta cuenta se envíen a Aula del estudiante.",
    "missingDevice.viewSetupSteps": "Ver pasos de configuración",
    "missingDevice.step1":
      "En el hub, abre Configuración del Classroom Hub en rosehub.local/setup. Si no abre, usa 10.42.0.1/setup.",
    "missingDevice.step2":
      "Copia el código de vinculación de un solo uso que aparece en el hub.",
    "missingDevice.step3":
      "Regresa a este Panel del educador e ingresa aquí el código de vinculación.",
    "missingDevice.help":
      "¿Ya configuraste este Classroom Hub con otra cuenta de educador? Inicia sesión con esa cuenta o restablece este Classroom Hub antes de vincularlo a otro educador.",
    "missingDevice.linkSuccess":
      "Classroom Hub vinculado. Abriendo tu panel...",
    "missingDevice.linked": "Vinculado",
    "common.back": "Atrás",
    "common.next": "Siguiente",
    "common.closeModal": "Cerrar modal",
    "common.gotIt": "Entendido",
    "common.openSetupGuide": "Abrir guía de configuración",
    "common.recorded": "Registrado",
    "common.cancel": "Cancelar",
    "common.save": "Guardar",
    "common.saving": "Guardando...",
    "common.create": "Crear",
    "common.creating": "Creando...",
    "common.copied": "Copiado",
    "common.working": "Trabajando...",
    "common.searchPlaceholder": "Buscar lección o archivo",
    "common.clearSearch": "Borrar búsqueda",
    "common.sortBy": "Ordenar",
    "common.classroom": "Clase",
    "common.selected": "seleccionados",
    "common.card": "Tarjetas",
    "common.list": "Lista",
    "common.morePrefix": "+",
    "common.moreSuffix": "más",
    "common.showLess": "Mostrar menos",
    "sort.updatedNewest": "Actualizado recientemente",
    "sort.updatedOldest": "Actualizado (más antiguo)",
    "sort.createdNewest": "Lecciones más nuevas",
    "sort.createdOldest": "Creado (más antiguo)",
    "sort.nameAsc": "Nombre de lección A-Z",
    "sort.recentlyArchived": "Archivado recientemente",
    "sort.oldestArchived": "Archivado más antiguo",
    "status.synced": "Listo en el Hub",
    "status.pendingSync": "Actualizar Hub",
    "status.pendingSyncLower": "Actualizar hub",
    "status.pendingRemoval": "Quitar en la próxima actualización",
    "status.dashboardOnly": "Solo en el panel",
    "lessons.title": "Lecciones",
    "lessons.description":
      "Crea lecciones, asigna clases y elige qué guardar en el Classroom Hub.",
    "lessons.create": "Crear lección",
    "lessons.createLower": "Crear lección",
    "lessons.searchPlaceholder": "Buscar lecciones, clases o archivos",
    "lessons.details": "Detalles",
    "lessons.noLessons": "Aún no hay lecciones.",
    "lessons.empty":
      "Crea tu primera lección para agregar archivos y asignar una clase.",
    "lessons.noMatches": "Ninguna lección coincide con tu búsqueda.",
    "lessons.tryDifferent": "Prueba otra clase o término de búsqueda.",
    "lessons.readySingular": "Lección lista para el hub",
    "lessons.readyPlural": "Lecciones listas para el hub",
    "lessons.needsClassroomSingular": "La lección necesita una clase",
    "lessons.needsClassroomPlural": "Las lecciones necesitan una clase",
    "lessons.activeSingular": "Lección activa",
    "lessons.activePlural": "Lecciones activas",
    "lessons.reviewSync": "Revisar actualizaciones del hub",
    "lessons.manageClassrooms": "Administrar clases",
    "lessons.restoreTitle": "Restaurar lección",
    "lessons.restoreDescription": "Esta lección será restaurada.",
    "lessons.restoreConfirm": "Restaurar a activas",
    "lessons.removeSyncTitle": "Quitar lección del Hub",
    "lessons.removeSyncDescription":
      "La lección seguirá guardada en el panel. Se quitará del Classroom Hub después de la próxima actualización exitosa.",
    "lessons.removePendingTitle": "Quitar lección en la próxima actualización",
    "lessons.removePendingDescription":
      "La lección seguirá guardada en el panel. Después de la próxima actualización exitosa, los estudiantes ya no la verán en el Classroom Hub.",
    "lessons.removeConfirm": "Quitar del hub",
    "lessons.removeOnNextUpdate": "Quitar en la próxima actualización",
    "lessons.removeHubAction": "Quitar",
    "lessons.remove": "Quitar del hub",
    "lessons.restore": "Restaurar",
    "lessons.noFilesAttached": "No hay archivos adjuntos a esta lección.",
    "lessons.lessonCountSingular": "lección",
    "lessons.lessonCountPlural": "lecciones",
    "lessons.of": "de",
    "archive.title": "Lecciones archivadas",
    "archive.description":
      "Restaura lecciones cuando quieras volver a verlas en el panel o en la lista de actualizaciones del hub.",
    "archive.emptyTitle": "Aún no hay lecciones archivadas.",
    "archive.emptyDescription": "Las lecciones que archives aparecerán aquí.",
    "classrooms.title": "Clases",
    "classrooms.description":
      "Configura cada clase con su propio código de ingreso.",
    "classrooms.searchPlaceholder": "Buscar clases, códigos o lecciones",
    "classrooms.classroomCountSingular": "clase",
    "classrooms.classroomCountPlural": "clases",
    "classrooms.createModalIntro":
      "Crea una clase y luego comparte su código con los estudiantes.",
    "classrooms.name": "Nombre de la clase",
    "classrooms.namePlaceholder": "Grupo de aprendizaje",
    "classrooms.joinCode": "Código de ingreso",
    "classrooms.joinCodePlaceholder": "ABC123",
    "classrooms.hint":
      "Los estudiantes usan este código de 6 caracteres para entrar a la clase. Sigue válido hasta que lo cambies.",
    "classrooms.newCode": "Nuevo código",
    "classrooms.create": "Crear clase",
    "classrooms.tableLabel": "Códigos de ingreso de clases",
    "classrooms.nameRequired": "El nombre de la clase es obligatorio.",
    "classrooms.joinCodeExact":
      "Usa exactamente 6 letras o números para el código de ingreso.",
    "classrooms.joinCodeUsedByAnother":
      "Ese código ya está en uso por otra clase.",
    "classrooms.createFailed": "No se pudo crear la clase. Inténtalo de nuevo.",
    "classrooms.updateFailed":
      "No se pudo actualizar la clase. Inténtalo de nuevo.",
    "classrooms.removeLessonFailed":
      "No se pudo quitar la lección de esta clase. Inténtalo de nuevo.",
    "classrooms.deleteOwnOnly":
      "Solo se pueden eliminar las clases creadas por esta cuenta.",
    "classrooms.checkFailed":
      "No se pudo revisar esta clase. Inténtalo de nuevo.",
    "classrooms.deleteFailed":
      "No se pudo eliminar la clase. Inténtalo de nuevo.",
    "classrooms.deleteTitle": "¿Eliminar {classroom}?",
    "classrooms.deleteDescriptionWithLesson":
      "1 lección usa esta clase. Se quitará de la lista de actualizaciones del hub hasta que se asigne a otra clase.\n\nActualiza el hub después para quitar esa lección del dispositivo de aula.",
    "classrooms.deleteDescriptionWithLessons":
      "{count} lecciones usan esta clase. Se quitarán de la lista de actualizaciones del hub hasta que se asignen a otra clase.\n\nActualiza el hub después para quitar esas lecciones del dispositivo de aula.",
    "classrooms.deleteDescriptionNoLessons":
      "Esta clase se eliminará. Las lecciones que ya están asignadas a otras clases no cambiarán.",
    "classrooms.noCode": "Sin código",
    "classrooms.copyCode": "Copiar código",
    "classrooms.editCode": "Editar código",
    "classrooms.editClassroom": "Editar clase",
    "classrooms.changeJoinCodeTitle": "¿Cambiar el código de ingreso?",
    "classrooms.changeJoinCodeDescription":
      "Los estudiantes necesitarán el nuevo código la próxima vez que entren a esta clase.",
    "classrooms.changeJoinCodeConfirm": "Cambiar código",
    "classrooms.delete": "Eliminar clase",
    "classrooms.checking": "Revisando clase",
    "classrooms.empty":
      "Crea una clase para asignar lecciones y compartir su código.",
    "classrooms.noMatches": "Ninguna clase coincide con tu búsqueda.",
    "classrooms.tryDifferent":
      "Prueba otra clase, código de ingreso o lección.",
    "classrooms.keep": "Mantener clase",
    "classrooms.lessons": "Lecciones",
    "classrooms.lessonSingular": "1 lección",
    "classrooms.lessonPlural": "{count} lecciones",
    "classrooms.noLessonsAssigned": "Aún no hay lecciones asignadas.",
    "classrooms.removeLesson": "Quitar de esta clase",
    "classrooms.removeLessonTitle": "¿Quitar la lección de esta clase?",
    "classrooms.removeLessonDescription":
      "Esto quita {lesson} de {classroom}. La lección permanece en tu panel. Actualiza el Classroom Hub después para que los estudiantes vean el cambio.",
    "classrooms.removeLessonConfirm": "Quitar lección",
    "classrooms.synced": "Listo en el Hub",
    "classrooms.needsSync": "Actualizar Hub",
    "classrooms.notSavedToHub": "Solo en el panel",
    "sync.title": "Actualizar Classroom Hub",
    "sync.subtitle":
      "Elige lecciones para usar sin internet y actualiza el Classroom Hub.",
    "sync.emptySubtitle":
      "Vincula un Classroom Hub cuando estés listo para enviar lecciones para uso sin internet.",
    "sync.noHubTitle": "Classroom Hub aún no vinculado",
    "sync.noHubText":
      "Puedes preparar lecciones y clases ahora. Vincula un Classroom Hub cuando el dispositivo esté listo y vuelve aquí para enviarlas para uso sin internet.",
    "sync.noHubStep1":
      "Abre la página local de configuración del Classroom Hub.",
    "sync.noHubStep2": "Copia el código de vinculación que aparece allí.",
    "sync.noHubStep3": "Abre tu menú de perfil y elige Vincular Classroom Hub.",
    "sync.lessonsToSync": "Lecciones seleccionadas para el hub",
    "sync.progress": "Actualización del Classroom Hub",
    "sync.addToHub": "Agregar al Hub",
    "sync.removeFromHub": "Quitar del Hub",
    "sync.button": "Actualizar Hub",
    "sync.syncing": "Actualizando...",
    "sync.buttonTitle": "Actualizar el Classroom Hub",
    "sync.linkHubFirst": "Vincular hub primero",
    "sync.linkHubFirstTitle":
      "Vincula un Classroom Hub antes de actualizar las lecciones del hub",
    "sync.hubLinked": "Classroom Hub vinculado",
    "sync.hubManagedInProfile": "Administrar en Configuración del perfil.",
    "sync.notSynced": "Aún no actualizado",
    "sync.lastUpdated": "Última actualización",
    "sync.summary": "Resumen del Hub",
    "sync.noticeEmptyTitle": "Aún no hay lecciones seleccionadas para el hub",
    "sync.noticeEmptyBody":
      "Abre una lección y elige Agregar al Hub cuando los estudiantes deban verla en Aula del estudiante.",
    "sync.noticeNeedsTitle": "El Classroom Hub necesita una actualización",
    "sync.noticeNeedsBody":
      "Presiona Actualizar Hub para que el Classroom Hub reciba las últimas lecciones y cambios de clases.",
    "sync.noticeReadyTitle": "El Classroom Hub está actualizado",
    "sync.noticeReadyBody":
      "Las lecciones seleccionadas están listas en el Classroom Hub. Actualiza de nuevo después de cambiar lecciones, archivos o clases.",
    "sync.emptyLessonsTitle": "Aún no hay lecciones seleccionadas para el hub.",
    "sync.emptyLessonsDescription":
      "Abre una lección y elige Agregar al Hub cuando los estudiantes deban verla en Aula del estudiante.",
    "sync.mapDashboardTitle": "Solo en el panel",
    "sync.mapDashboardDescription":
      "Guardado en el Panel del educador, no seleccionado para el hub.",
    "sync.mapPendingTitle": "Actualizaciones pendientes del hub",
    "sync.mapPendingDescription":
      "Cambiará en el Classroom Hub después de ejecutar Actualizar Hub.",
    "sync.mapReadyTitle": "Listo en el Hub",
    "sync.mapReadyDescription":
      "Disponible para los estudiantes en el Classroom Hub ahora.",
    "sync.mapEmpty": "Aún no hay lecciones aquí.",
    "sync.flowTitle": "Cómo funcionan las actualizaciones del hub",
    "sync.flowIntro":
      "Usa esta página cuando las lecciones o las asignaciones de clases deban cambiar en el Classroom Hub.",
    "sync.flowAddTitle": "Agrega lecciones",
    "sync.flowAddPrefix": "Elige ",
    "sync.flowAddSuffix":
      " cuando los estudiantes necesiten una lección sin internet.",
    "sync.flowChangesTitle": "Observa los cambios",
    "sync.flowChangesPrefix":
      "Si editas una lección, la quitas de una clase o cambias dónde aparece, se mostrará ",
    "sync.flowChangesSuffix": ".",
    "sync.flowSelectTitle": "Elige lecciones",
    "sync.flowSelectText":
      "Elige Agregar al Hub en una lección para agregarla a esta lista. Elige Quitar del hub cuando los estudiantes ya no deban verla en el hub.",
    "sync.flowSelectPrefix": "Selecciona ",
    "sync.flowSelectMiddle": " en una lección para agregarla aquí. Selecciona ",
    "sync.flowSelectSuffix":
      " cuando los estudiantes ya no deban verla en el Classroom Hub.",
    "sync.flowReviewTitle": "Revisa el estado",
    "sync.flowReviewText":
      "Actualizar Hub significa que el panel tiene cambios que el hub aún no tiene. Listo en el hub significa que la última actualización terminó.",
    "sync.flowReviewMiddle":
      " significa que el panel tiene actualizaciones que el Classroom Hub aún no tiene. ",
    "sync.flowReviewSuffix":
      " significa que la última actualización del hub terminó.",
    "sync.flowUpdateTitle": "Actualiza el hub",
    "sync.flowUpdateText":
      "Presiona Actualizar hub para enviar archivos, asignaciones de clase y eliminaciones al Classroom Hub.",
    "sync.flowUpdatePrefix": "Presiona ",
    "sync.flowUpdateSuffix":
      " para enviar los cambios pendientes al Classroom Hub.",
    "sync.flowReadyTitle": "Revisa Aula del estudiante",
    "sync.flowReadyPrefix":
      "Cuando termine la actualización, las lecciones marcadas como ",
    "sync.flowReadySuffix":
      " estarán disponibles para los estudiantes en Aula del estudiante.",
    "sync.flowRemovalNote":
      "Para instrucciones de configuración inicial, usa la Guía de configuración. Esta sección es solo para actualizaciones diarias del hub.",
    "sync.successTitle": "Hub actualizado",
    "sync.errorTitle": "Error al actualizar el hub",
    "sync.successBody": "El Classroom Hub está actualizado.",
    "sync.errorBody":
      "No se pudo completar la actualización del hub. Inténtalo de nuevo más tarde.",
    "sync.requestError":
      "No se pudo completar la solicitud de actualización del hub.",
    "sync.continue": "Continuar",
    "sync.tryLater": "Intentar más tarde",
    "sync.syncAgain": "Actualizar otra vez",
    "sync.stage.waiting": "Esperando el dispositivo",
    "sync.stage.preparing": "Preparando contenido sin internet...",
    "sync.stage.downloading": "Descargando archivos de lecciones...",
    "sync.stage.finalizing": "Finalizando actualización...",
    "storage.loading": "Cargando almacenamiento...",
    "storage.notReported": "Almacenamiento aún no reportado",
    "storage.syncToUpdate": "Actualiza el hub para renovar",
    "storage.usedPercent": "Usado",
    "storage.gbUsed": "{used} GB de {total} GB usados",
    "files.files": "Archivos",
    "files.fileSingular": "archivo",
    "files.filePlural": "archivos",
    "files.noDescription": "No se agregó descripción.",
    "files.noFileSelected": "No se seleccionó ningún archivo.",
    "files.previewUnavailable": "La vista previa aún no está disponible.",
    "files.download": "Descargar",
    "files.openFullScreen": "Abrir en pantalla completa",
    "files.noClassrooms": "No hay clases asignadas.",
    "files.name": "Nombre",
    "files.dateAdded": "Fecha agregada",
    "files.dateModified": "Fecha modificada",
    "files.fileSize": "Tamaño",
    "files.drag": "Arrastra archivos para cambiar el orden.",
    "files.sortingActiveDrag":
      "El ordenamiento está activo. Borra el ordenamiento para arrastrar y ordenar los archivos manualmente.",
    "files.searchActiveDrag":
      "La búsqueda está activa. Borra la búsqueda para arrastrar y ordenar los archivos manualmente.",
    "files.totalSize": "Tamaño total",
    "files.noMatches": "Ningún archivo coincide con tu búsqueda.",
    "files.selectAll": "Seleccionar todos los archivos",
    "files.upload": "Subir archivos",
    "files.deleteSingular": "Eliminar archivo",
    "files.deletePlural": "Eliminar archivos",
    "lessons.edit": "Editar lección",
    "lessons.editDetails": "Editar detalles",
    "common.loading": "Cargando...",
    "lessonModal.customize": "Personalizar",
    "lessonModal.createTitle": "Crear nueva lección",
    "lessonModal.editTitle": "Editar lección",
    "lessonModal.name": "Nombre",
    "lessonModal.lessonTitlePlaceholder": "Título de la lección",
    "lessonModal.description": "Descripción",
    "lessonModal.descriptionPlaceholder": "Breve descripción de la lección",
    "lessonModal.select": "Seleccionar",
    "lessonModal.noClassrooms": "Aún no hay clases.",
    "lessonModal.newClassroom": "Nueva clase",
    "lessonModal.classroomNameRequired":
      "El nombre de la clase es obligatorio.",
    "lessonModal.joinCodeLength":
      "Para el código de ingreso, usa exactamente 6 letras o números.",
    "lessonModal.joinCodeUsed": "Ese código ya está en uso.",
    "lessonModal.createClassroomFailed":
      "No se pudo crear la clase. Inténtalo de nuevo.",
    "lessonModal.classroomRequired": "Se requiere al menos una clase.",
    "lessonModal.studentJoinCodeInfo": "¿Qué es un código de ingreso?",
    "lessonModal.studentJoinCodeTooltip":
      "Los estudiantes ingresan este código en la página de ingreso del Classroom Hub para ver las lecciones de esta clase.",
    "lessonModal.uploadFiles": "Subir archivos",
    "lessonModal.chooseFiles": "Elige archivos o arrástralos aquí",
    "lessonModal.chooseFile": "Elige un archivo o arrástralo aquí",
    "lessonModal.fileFormats":
      "Formatos aceptados: JPEG, PNG, PDF, MP4, PowerPoint y APK",
    "lessonModal.formatsAccepted": "formatos aceptados",
    "lessonModal.browseFile": "Buscar archivo",
    "lessonModal.uploading": "Subiendo",
    "lessonModal.completed": "Completado",
    "lessonModal.failed": "Falló",
    "lessonModal.removeFile": "Quitar",
    "lessonModal.addToHubAvailable":
      "Haz que esta lección esté disponible después de la próxima actualización del hub",
    "lessonModal.addToHubNeedsHub":
      "Vincula un Classroom Hub antes de agregar lecciones al hub",
    "lessonModal.creatingLesson": "Creando lección...",
    "lessonModal.finishingLesson": "Finalizando lección...",
    "lessonModal.uploadingFile": "Subiendo archivo",
    "lessonModal.duplicateLessonPrefix": "Ya tienes una lección llamada",
    "lessonModal.duplicateLessonSuffix": "Prueba con otro nombre.",
    "lessonModal.linkHubBeforeAdd":
      "Vincula un Classroom Hub antes de agregar lecciones al hub, o desactiva Agregar al Hub por ahora.",
    "lessonModal.cannotAddWithoutFiles":
      "No se puede agregar una lección al Classroom Hub sin archivos.",
    "lessonModal.createFailed":
      "No se pudo crear la lección. Inténtalo de nuevo.",
    "lessonModal.uploadFilesFailed":
      "No se pudieron subir los archivos. Inténtalo de nuevo.",
    "lessonModal.duplicateFileSingleSuffix": "ya está en esta lección.",
    "lessonModal.duplicateFilePluralPrefix":
      "Estos archivos ya están en esta lección:",
    "lessonModal.imageTitle": "Seleccionar imagen de la lección",
    "lessonModal.selectImage": "Seleccionar imagen",
    "lessonModal.uploadImage": "Subir imagen",
    "lessonModal.previewAlt": "Vista previa",
    "lessonModal.saveImage": "Guardar imagen",
    "lessonModal.onlyImagesAccepted": "Solo se aceptan archivos .png y .jpg.",
    "lessonModal.saveImageFailed":
      "No se pudo guardar la imagen. Inténtalo de nuevo.",
    "lessonModal.saveChanges": "Guardar cambios",
    "archive.action": "Archivar",
    "archive.modalTitle": "Archivar lección",
    "archive.modalDescription":
      "Esta lección se quitará del Panel de lecciones. Puedes restaurarla más tarde desde Lecciones archivadas.",
    "archive.modalDescriptionWithHub":
      "Esta lección se quitará del Panel de lecciones. Actualiza el hub después para que los estudiantes ya no la vean en el Classroom Hub.",
    "archive.restoreModalDescription":
      "Esta lección volverá al Panel de lecciones. Puedes agregarla al hub otra vez cuando esté lista.",
    "archive.modalConfirm": "Archivar lección",
  },
  lg: {
    "app.title": "Rose Portable Classroom Hub",
    "app.educatorDashboard": "Dashboard y'omusomesa",
    "language.label": "Olulimi",
    "nav.dashboard": "Awaka",
    "nav.lessons": "Ebisomo",
    "nav.classrooms": "Ebibiina",
    "nav.sync": "Okuzza Hub ku mulembe",
    "nav.archive": "Ebiterekeddwa",
    "home.subtitle": "Ddukanya ebibiina n'ebisomo bya Ekibiina ky'omuyizi.",
    "home.metricLessonSingular": "Essomo",
    "home.metricLessonPlural": "Ebisomo",
    "home.metricClassroomSingular": "Ekibiina",
    "home.metricClassroomPlural": "Ebibiina",
    "home.quickActions": "Ebikolebwa amangu",
    "home.createClassroom": "Tonda ekibiina",
    "home.createClassroomDescription":
      "Tonda ekibiina ne koodi abayizi gye bakozesa okwegatta.",
    "home.createLesson": "Tonda essomo",
    "home.createLessonDescription": "Teekamu fayiro oziwe ebibiina.",
    "home.updateHub": "Zza Classroom Hub ku mulembe",
    "home.updateHubDescription": "Sindika ebisomo ebirondeddwa ku hub.",
    "home.hubStatusTitle": "Classroom Hub",
    "home.hubLinked": "Egattiddwa",
    "home.hubNotLinked": "Tennagattibwa",
    "home.lastUpdate": "Update esembayo:",
    "home.noSuccessfulUpdate": "Tewali update ekolebwa obulungi.",
    "home.linkHubDescription":
      "Gatta Classroom Hub nga tonnakola update y'ebisomo.",
    "home.manageHub": "Ddukanya hub mu profile settings.",
    "home.setupStillNeeds": "Setup ekyetaaga",
    "profile.educatorAccount": "Akaawunti y'omusomesa",
    "profile.linkedHub": "Classroom Hub egattiddwa",
    "profile.noHub": "Tewali Classroom Hub egattiddwa",
    "profile.linkHub": "Gatta Classroom Hub",
    "profile.replaceHub": "Kyusa Classroom Hub",
    "profile.unlinkHub": "Ggyako Classroom Hub",
    "profile.hubGuide": "Ekitabo ekikuyamba ku Classroom Hub",
    "profile.signOut": "Fuluma",
    "pairing.codeLabel": "Koodi egatta Classroom Hub",
    "pairing.help":
      "Koodi eno ogisanga ku lupapula lw'okuteekateeka Classroom Hub.",
    "pairing.cancel": "Sazaamu",
    "pairing.linking": "Egattibwa...",
    "pairing.replacing": "Ekyusibwa...",
    "pairing.unlinking": "Eggyibwako...",
    "pairing.unlinkTitle": "Ggyako Classroom Hub?",
    "pairing.unlinkConfirm": "Ggyako hub",
    "pairing.unlinkDescription":
      "Kino kiggya akaawunti eno eya Dashboard y'omusomesa ku Classroom Hub eriwo kati. Ebibiina n'ebisomo byo bisigala mu akaawunti eno, naye hub eno tejja kufuna updates okutuusa lw'onoogigatta nate.",
    "pairing.linkDescription":
      "Yingiza koodi erabika ku setup page ya hub. Dashboard y'omusomesa ku rosepch.org etonda ebisomo n'ebibiina; Classroom Hub ebitereka offline eri abayizi.",
    "pairing.replaceDescription":
      "Yingiza koodi erabika ku lupapula lw'okuteekateeka Classroom Hub ku rosehub.local/setup. Bwe kitagguka, kozesa 10.42.0.1/setup. Ebibiina byo n'ebisomo byo bisigala mu Dashboard y'omusomesa eno.",
    "login.title": "Dashboard y'omusomesa",
    "login.createTitle": "Tonda akaawunti y'omusomesa",
    "login.subtitle":
      "Yingira okuddukanya ebisomo, ebibiina, ne Classroom Hub yo.",
    "login.createSubtitle":
      "Kozesa email yo n'akasumuluzo okutandika pulofayiro y'omusomesa.",
    "login.signIn": "Yingira",
    "login.createAccount": "Tonda akaawunti",
    "login.fullName": "Erinnya lyonna",
    "login.email": "Email",
    "login.password": "Akasumuluzo",
    "login.signingIn": "Eyingira...",
    "login.creatingAccount": "Akaawunti etondebwa...",
    "login.newEducator": "Omusomesa omupya? Tonda akaawunti n'email yo.",
    "login.haveAccount": "Olina akaawunti? Yingira.",
    "login.invalid": "Email oba akasumuluzo si bituufu",
    "login.createError":
      "Tetwasobodde kutonda akaawunti eyo. Gezaako email oba akasumuluzo akalala.",
    "login.checkEmail":
      "Kebera email yo okumaliriza okutonda akaawunti y'omusomesa.",
    "guide.badge": "Ekitabo kya Classroom Hub",
    "guide.title": "Classroom Hub ekola etya",
    "guide.subtitle":
      "Endaba ennyangu eraga ebisomo bwe biva ku Dashboard y'omusomesa ne bigenda ku Classroom Hub, oluvannyuma eri abayizi mu buli kibiina.",
    "guide.dashboard": "Dashboard y'omusomesa",
    "guide.dashboardUrl": "Ggulawo rosepch.org mu browser",
    "guide.dashboardBody":
      "Omukutu omusomesa gw'akozesa okutonda akaawunti, okugatta oba okuggyako hub, okutonda ebibiina, okuteeka fayiro z'ebisomo, okutereka ebisomo ku hub, n'okukola update ya hub.",
    "guide.hub": "Classroom Hub",
    "guide.hubUrl": "Ggulawo rosehub.local/setup oba 10.42.0.1/setup",
    "guide.hubBody":
      "Classroom Hub erimu ekyuma kya Rose Portable Classroom Hub ne tablet, essimu, oba kompyuta ekozesebwa okuggulawo Ekibiina ky'omuyizi, setup, oba maintenance page.",
    "guide.flowDashboard": "Dashboard y'omusomesa",
    "guide.flowDashboardText":
      "Tonda ebisomo, teekamu fayiro, tonda ebibiina, era ogabire ebisomo.",
    "guide.flowHub": "Classroom Hub",
    "guide.flowHubText":
      "Gatta hub ku Wi-Fi, laga koodi egatta, kakasa nti egattiddwa, era wanula fayiro ezisembyeyo.",
    "guide.flowStudents": "Ekibiina ky'omuyizi",
    "guide.flowStudentsText":
      "Bayingiza koodi y'ekibiina ne baggulawo ebisomo byabwe wonna nga tewali internet.",
    "guide.workflowOverview": "Enkola ya Classroom Hub mu bufunze",
    "guide.createLessons": "Tonda ebisomo",
    "guide.createLessonsText":
      "Zimba ebisomesebwa mu Dashboard y'omusomesa. Teekako omutwe gw'essomo, ennyonyola, ekifaananyi, ne fayiro zonna abayizi ze beetaaga.",
    "guide.createLessonsItem1": "Ebisomo bibaamu ebisomesebwa",
    "guide.createLessonsItem2":
      "Fayiro ziyinza okuba ebifaananyi, PDF, vidiyo, oba PowerPoints",
    "guide.createClassrooms": "Tonda era ogabire ebibiina",
    "guide.createClassroomsText":
      "Mu Dashboard y'omusomesa, tonda buli kibiina, teekawo join code yaakyo, oluvannyuma londa ebisomo ebigenda mu kibiina ekyo.",
    "guide.createClassroomsItem1": "Buli kibiina kirina join code yaakyo",
    "guide.createClassroomsItem2":
      "Essomo liyinza okugabibwa eri ekibiina kimu oba ebibiina bingi",
    "guide.syncHub": "Zza Classroom Hub ku mulembe",
    "guide.syncHubText":
      "Kozesa okuzza Hub ku mulembe mu Dashboard y'omusomesa okulagira hub egattiddwa ebisomo bye balina okuwanula. Kozesa setup page ya hub yokka nga hub yeetaaga obuyambi bwa Wi-Fi oba okuwanula mu ngalo.",
    "guide.syncHubItem1":
      "Classroom Hub erina okubaeko amasannyalaze era egattiddwa ku Wi-Fi erina internet",
    "guide.syncHubItem2":
      "Update hub buli lwe wabaawo enkyukakyuka mu bisomo, fayiro, oba ebibiina",
    "guide.wifiTag": "Setup y'ekyuma",
    "guide.syncAtLocation": "Teekateeka hub okusooka",
    "guide.syncAtLocationText":
      "Omutendera gwa Wi-Fi ogusooka gulina okukolebwa okumpi ne Classroom Hub kubanga hub etonda hotspot ya setup nga tennagenda online.",
    "guide.syncAtLocationItem1":
      "Wa hub amasannyalaze nga okozesa charger oba battery etambuzibwa.",
    "guide.syncAtLocationItem2":
      "Gatta ku Rose-Hub Wi-Fi hotspot oggule rosehub.local/setup. Bwe kitagguka, kozesa 10.42.0.1/setup.",
    "guide.syncAtLocationItem3":
      "Gatta hub ku Wi-Fi erina internet okoppe koodi egatta.",
    "guide.offlineTag": "Tewali internet",
    "guide.teachOffline": "Somesa nga tewali internet",
    "guide.teachOfflineText":
      "Ebisomo bwe biba byetegefu ku Classroom Hub, osobola okugenda nayo mu kibiina awatali internet. Abayizi bagatta ku Classroom Hub ne baggulawo Ekibiina ky'omuyizi.",
    "guide.teachOfflineItem1":
      "Wa Classroom Hub amasannyalaze nga okozesa battery etambuzibwa oba charger.",
    "guide.teachOfflineItem2":
      "Tablets, amasimu, oba kompyuta nnyingi bisobola okugattibwa ku ssomo.",
    "guide.teachOfflineItem3":
      "Abayizi bayingiza koodi y'ekibiina okulaba ebisomo byabwe.",
    "setupGuide.brandTitle": "Ekitabo kya Setup ya Dashboard y'omusomesa",
    "setupGuide.orientationTitle": "Oli mu Dashboard y'omusomesa",
    "setupGuide.orientationText":
      "Kozesa dashboard eno okutonda ebibiina, okutonda ebisomo, okuteekamu fayiro, n'okukola update ya Classroom Hub.",
    "setupGuide.mapDashboardTitle": "Dashboard y'omusomesa",
    "setupGuide.mapDashboardText":
      "Tonda ebibiina, ebisomo, fayiro, ne hub updates.",
    "setupGuide.mapHubTitle": "Setup ya Classroom Hub",
    "setupGuide.mapHubText":
      "Kozesa ekyuma ekirala okugatta Wi-Fi n'okufuna koodi egatta.",
    "setupGuide.mapStudentsTitle": "Ekibiina ky'omuyizi",
    "setupGuide.mapStudentsText":
      "Abayizi bayingiza join code ne baggulawo ebisomo.",
    "setupGuide.safeNote":
      "Kirungi okuddayo, okubuuka omutendera kati, oba okuddamu okutandika ekitabo kino. Okuddayo tekusangula bibiina, bisomo, oba fayiro z'otaddeko.",
    "setupGuide.stepSafetyHub":
      "Omutendera guno gugatta Classroom Hub ku akaawunti eno eya Dashboard y'omusomesa yokka.",
    "setupGuide.stepSafetyClassroom":
      "Osobola okutonda ekibiina kimu kati n'oyongerako ebirala oluvannyuma.",
    "setupGuide.stepSafetyLesson":
      "Osobola okutonda essomo limu kati n'olikyusa, n'oyongerako fayiro, oba n'oliwa ebibiina ebirala oluvannyuma.",
    "setupGuide.stepSafetySync":
      "Hub update esindika ebisomo ebirondeddwa ku Classroom Hub. Ekintu bwe kikyuka, ddamu update hub.",
    "setupGuide.stepCount": "{current} ku {total}",
    "setupGuide.progressLabel": "Emitendera gya setup",
    "setupGuide.stepBadge": "Omutendera {step} · {label}",
    "setupGuide.welcomeTitle": "Teekateeka Dashboard y'omusomesa",
    "setupGuide.welcomeLinked":
      "Dashboard y'omusomesa eno yagattibwa dda ku Classroom Hub. Tandika setup okugenda mu maaso n'ebibiina, ebisomo, ne hub updates.",
    "setupGuide.welcomeIntro":
      "Ekitabo kino kiraga eky'okukola mu buli kifo: Dashboard y'omusomesa, Setup ya Classroom Hub, ne Ekibiina ky'omuyizi.",
    "setupGuide.checkDashboardOpen": "Leka Dashboard y'omusomesa eno eggule.",
    "setupGuide.checkHubNearby":
      "Classroom Hub ebeereeko amasannyalaze era okumpi.",
    "setupGuide.checkOtherDevice":
      "Tegeka tablet, essimu, oba kompyuta endala okugatta ku Wi-Fi ya setup ya hub.",
    "setupGuide.checkOneStep":
      "Osobola okuddayo, okubuuka omutendera, n'ogumaliriza oluvannyuma.",
    "setupGuide.begin": "Tandika setup",
    "setupGuide.skipForNow": "Buuka kati",
    "setupGuide.finishSetup": "Maliriza setup",
    "setupGuide.pairingLabel": "Koodi egatta okuva ku setup page ya hub",
    "setupGuide.pairingHelp": "Yingiza koodi egatta erabika ku",
    "setupGuide.pairingFallbackHelp": "Bwe kitagguka, kozesa",
    "setupGuide.linkingHub": "Egatta hub...",
    "setupGuide.enterPairingCode": "Yingiza koodi egatta",
    "setupGuide.createdClassroom": "Kitondeddwa",
    "setupGuide.joinCode": "Koodi y'okwegatta",
    "setupGuide.createClassroom": "Tonda ekibiina",
    "setupGuide.createAnotherClassroom": "Tonda ekibiina ekirala",
    "setupGuide.creatingClassroom": "Ekitonda ekibiina...",
    "setupGuide.loadingClassrooms": "Epanga ebibiina...",
    "setupGuide.createLesson": "Tonda essomo",
    "setupGuide.createAnotherLesson": "Tonda essomo eddala",
    "setupGuide.hubLinked": "Classroom Hub egattiddwa",
    "setupGuide.hubNotLinked": "Classroom Hub tennagattibwa",
    "setupGuide.lastSuccessfulSync": "Hub update eyasembayo: {value}.",
    "setupGuide.noSuccessfulSync": "Tewali hub update erekodeddwa.",
    "setupGuide.syncInstruction":
      "Nyiga Zza Hub ku mulembe okuweereza ebisomo ebirondeddwa ku Classroom Hub.",
    "setupGuide.linkBeforeSync":
      "Gatta Classroom Hub nga tonnakola update y'ebisomo bya hub.",
    "setupGuide.studentJoinCode": "Koodi y'abayizi okwegatta",
    "setupGuide.regenerateJoinCode": "Zzaawo koodi y'okwegatta empya",
    "setupGuide.studentJoinCodeHelp":
      "Abayizi bakozesa koodi eno ya ennukuta 6 okwegatta ku kibiina mu Ekibiina ky'omuyizi.",
    "setupGuide.stepHub.title": "Teekateeka Hub",
    "setupGuide.stepHub.titleDone": "Hub yagattiddwa dda",
    "setupGuide.stepHub.short": "Hub",
    "setupGuide.stepHub.detail":
      "Leka Dashboard y'omusomesa eggule. Classroom Hub ebeere ku lusegere lwo, era obeere ne tablet, essimu, oba kompyuta endala eyetegefu ku Wi-Fi ya setup ya hub.",
    "setupGuide.stepHub.detailDone":
      "Dashboard y'omusomesa eno yagattibwa dda ku Classroom Hub.",
    "setupGuide.stepHub.action": "Yingiza koodi egatta",
    "setupGuide.stepHub.actionDone": "Kebera hub updates",
    "setupGuide.stepHub.helper":
      "Setup page ya hub bw'eraga koodi egatta, giyingize wansi okugatta hub eno ku Dashboard y'omusomesa.",
    "setupGuide.stepHub.helperDone":
      "Genda ku Mutendera 2 okuteekateeka ebibiina.",
    "setupGuide.stepHub.instruction1":
      "Gatta oba kola ku Classroom Hub eri ku lusegere lwo, olinde eddakiika nga emu.",
    "setupGuide.stepHub.instruction2":
      "Ku tablet, essimu, oba kompyuta endala eri ku lusegere lwo, ggulawo Wi-Fi settings ogatte ku network eyitibwa Rose-Hub-XXXX. Ennukuta ennya ezisembayo za njawulo ku buli hub. Kozesa akasumuluzo rosehub! bwe kasabibwa.",
    "setupGuide.stepHub.instruction3":
      "Ku kyuma ekyo kye kimu, ggulawo browser, yingiza http://rosehub.local/setup. Bwe kitagguka, kozesa http://10.42.0.1/setup. Maliriza emitendera gya setup ya hub, oluvannyuma odde ku Dashboard y'omusomesa eno ne koodi egatta.",
    "setupGuide.stepClassroom.title": "Tonda ekibiina",
    "setupGuide.stepClassroom.short": "Ekibiina",
    "setupGuide.stepClassroom.detail":
      "Tonda ekibiina otereke koodi yaakyo ey'okwegatta ya ennukuta 6.",
    "setupGuide.stepClassroom.detailDoneSingular":
      "Ekibiina {count} kitondeddwa.",
    "setupGuide.stepClassroom.detailDonePlural":
      "Ebibiina {count} bitondeddwa.",
    "setupGuide.stepLesson.title": "Tonda essomo",
    "setupGuide.stepLesson.short": "Essomo",
    "setupGuide.stepLesson.detail":
      "Tonda essomo, oteekemu fayiro, oliteeke mu kibiina.",
    "setupGuide.stepLesson.detailDoneSingular": "Essomo {count} litondeddwa.",
    "setupGuide.stepLesson.detailDonePlural": "Ebisomo {count} bitondeddwa.",
    "setupGuide.stepLesson.detailNeedsSync":
      "Essomo litondeddwa, naye terinnalondebwa ku Classroom Hub.",
    "setupGuide.stepLesson.detailReadySingular":
      "Essomo {count} lyetegefu ku Classroom Hub.",
    "setupGuide.stepLesson.detailReadyPlural":
      "Ebisomo {count} byetegefu ku Classroom Hub.",
    "setupGuide.stepSync.title": "Zza Classroom Hub ku mulembe",
    "setupGuide.stepSync.short": "Update ya Hub",
    "setupGuide.stepSync.detail":
      "Sindika ebisomo ebirondeddwa okuva ku Dashboard y'omusomesa okugenda ku Classroom Hub.",
    "setupGuide.stepSync.detailDoneSingular":
      "Essomo {count} lyetegefu ku Classroom Hub.",
    "setupGuide.stepSync.detailDonePlural":
      "Ebisomo {count} byetegefu ku Classroom Hub.",
    "setupGuideModal.title": "Ekitabo kya setup",
    "setupGuideModal.body":
      "Kozesa setup egobererwa okusobola okugenda mu ngeri entuufu. Ejja kukubuulira ddi lw'okozesa Dashboard y'omusomesa, ddi lw'okozesa Setup ya Classroom Hub, ne ddi abayizi lwe baba basobola okuggulawo Ekibiina ky'omuyizi.",
    "setupGuideModal.hubTitle": "1. Ku Classroom Hub",
    "setupGuideModal.hubStep1":
      "Teekako amasannyalaze ku hub nga okozesa charger oba battery etambuzibwa.",
    "setupGuideModal.hubStep2":
      "Ku tablet, essimu, oba kompyuta endala, gatta ku Wi-Fi ya Rose-Hub bw'erabika.",
    "setupGuideModal.hubStep3":
      "Ku tablet, essimu, oba kompyuta eyo, ggulawo http://rosehub.local/setup. Bwe kitagguka, kozesa http://10.42.0.1/setup.",
    "setupGuideModal.hubStep4": "Gatta hub ku Wi-Fi erina internet.",
    "setupGuideModal.hubStep5": "Koppa koodi egatta erabika ku hub.",
    "setupGuideModal.dashboardTitle": "2. Mu Dashboard y'omusomesa",
    "setupGuideModal.dashboardStep1":
      "Kozesa dashboard eno ku https://rosepch.org.",
    "setupGuideModal.dashboardStep2": "Yingiza koodi egatta eya hub.",
    "setupGuideModal.dashboardStep3":
      "Tonda ebibiina era otereke buli join code.",
    "setupGuideModal.dashboardStep4": "Tonda ebisomo era oteekemu fayiro.",
    "setupGuideModal.dashboardStep5":
      "Gatta ebisomo ku Classroom Hub era okole update ya hub.",
    "setupGuideModal.studentsTitle": "3. Ku bayizi",
    "setupGuideModal.studentsStep1":
      "Abayizi bagatta tablet, essimu, oba kompyuta yaabwe ku Wi-Fi ya Classroom Hub.",
    "setupGuideModal.studentsStep2":
      "Abayizi baggulawo Ekibiina ky'omuyizi ku http://rosehub.local/join. Bwe kitagguka, bakozese http://10.42.0.1/join.",
    "setupGuideModal.studentsStep3":
      "Abayizi bayingiza join code y'ekibiina okuva eri omusomesa.",
    "missingDevice.title": "Gatta Classroom Hub yo",
    "missingDevice.description":
      "Oli mu Dashboard y'omusomesa ku rosepch.org. Gatta Classroom Hub ebisomo okuva mu akaawunti eno bisobole okugenda ku Ekibiina ky'omuyizi.",
    "missingDevice.viewSetupSteps": "Laba emitendera gya setup",
    "missingDevice.step1":
      "Ku hub, ggulawo Classroom Hub Device Setup ku rosehub.local/setup. Bwe kitagguka, kozesa 10.42.0.1/setup.",
    "missingDevice.step2":
      "Koppa koodi egatta ey'omulundi gumu erabika ku hub.",
    "missingDevice.step3":
      "Ddayo ku Dashboard y'omusomesa eno oyingize koodi egatta wano.",
    "missingDevice.help":
      "Classroom Hub eno yatereezeddwa dda n'akaawunti y'omusomesa omulala? Yingira n'akaawunti eyo, oba zza Classroom Hub eno ku ntandikwa nga tonnagigatta ku musomesa omupya.",
    "missingDevice.linkSuccess":
      "Classroom Hub egattiddwa. Eggulawo dashboard yo...",
    "missingDevice.linked": "Egattiddwa",
    "common.back": "Ddayo",
    "common.next": "Ekiddako",
    "common.closeModal": "Ggalawo modal",
    "common.gotIt": "Kitegeerekese",
    "common.openSetupGuide": "Ggulawo ekitabo kya setup",
    "common.recorded": "Kirekodeddwa",
    "common.cancel": "Sazaamu",
    "common.save": "Tereka",
    "common.saving": "Eterekebwa...",
    "common.create": "Tonda",
    "common.creating": "Kitondebwa...",
    "common.copied": "Kopiddwamu",
    "common.working": "Kikolebwa...",
    "common.searchPlaceholder": "Noonya essomo oba fayiro",
    "common.clearSearch": "Gyawo okunoonya",
    "common.sortBy": "Tegeka nga",
    "common.classroom": "Ekibiina",
    "common.selected": "kilondeddwa",
    "common.card": "Kaadi",
    "common.list": "Olukalala",
    "common.morePrefix": "+",
    "common.moreSuffix": "ebirala",
    "common.showLess": "Laga bitono",
    "sort.updatedNewest": "Ebyakyusiddwa gye buvuddeko",
    "sort.updatedOldest": "Ekyakyusiddwa kumpi (ekisinga okukaddiwa)",
    "sort.createdNewest": "Ebisomo ebipya",
    "sort.createdOldest": "Ekitondeddwa (ekisinga okukaddiwa)",
    "sort.nameAsc": "Erinnya ly'essomo A-Z",
    "sort.recentlyArchived": "Ebiterekeddwa gye buvuddeko",
    "sort.oldestArchived": "Ebiterekeddwa ebisinga okukaddiwa",
    "status.synced": "Kiri ku Hub",
    "status.pendingSync": "Zza Hub ku mulembe",
    "status.pendingSyncLower": "zza hub ku mulembe",
    "status.pendingRemoval": "Ggyamu ku update eddako",
    "status.dashboardOnly": "Kiri ku dashboard yokka",
    "lessons.title": "Ebisomo",
    "lessons.description":
      "Tonda ebisomo, gabira ebibiina, era londa eby'okutereka ku Classroom Hub.",
    "lessons.create": "Tonda essomo",
    "lessons.createLower": "Tonda essomo",
    "lessons.searchPlaceholder": "Noonya ebisomo, ebibiina, oba fayiro",
    "lessons.details": "Ebisingawo",
    "lessons.noLessons": "Tewali bisomo.",
    "lessons.empty":
      "Tonda essomo lyo erisooka okwongerako fayiro n'okuligabira ekibiina.",
    "lessons.noMatches": "Tewali bisomo bikwatagana n'okunoonya kwo.",
    "lessons.tryDifferent": "Gezaako ekibiina ekirala oba ekigambo ekirala.",
    "lessons.readySingular": "Essomo lyetegefu ku hub",
    "lessons.readyPlural": "Ebisomo byetegefu ku hub",
    "lessons.needsClassroomSingular": "Essomo lyetaaga ekibiina",
    "lessons.needsClassroomPlural": "Ebisomo byetaaga ekibiina",
    "lessons.activeSingular": "Essomo erikola",
    "lessons.activePlural": "Ebisomo ebikola",
    "lessons.reviewSync": "Kebera hub updates",
    "lessons.manageClassrooms": "Ddukanya ebibiina",
    "lessons.restoreTitle": "Zza essomo",
    "lessons.restoreDescription": "Essomo lino lijja kuzzibwawo.",
    "lessons.restoreConfirm": "Zza mu bikola",
    "lessons.removeSyncTitle": "Ggyamu essomo ku Hub",
    "lessons.removeSyncDescription":
      "Essomo lijja kusigala ku dashboard. Lijja kuggyibwa ku Classroom Hub ng'update eddako ewedde bulungi.",
    "lessons.removePendingTitle": "Ggyamu essomo ku update eddako",
    "lessons.removePendingDescription":
      "Essomo lijja kusigala ku dashboard. Oluvannyuma lwa update eddako okuggwa obulungi, abayizi tebajja kuliraba ku Classroom Hub.",
    "lessons.removeConfirm": "Ggyamu ku Hub",
    "lessons.removeOnNextUpdate": "Ggyamu ku update eddako",
    "lessons.removeHubAction": "Ggyamu",
    "lessons.remove": "Ggyamu ku Hub",
    "lessons.restore": "Zzawo",
    "lessons.noFilesAttached": "Tewali fayiro zigattiddwa ku ssomo lino.",
    "lessons.lessonCountSingular": "ssomo",
    "lessons.lessonCountPlural": "bisomo",
    "lessons.of": "ku",
    "archive.title": "Ebisomo ebiterekeddwa",
    "archive.description":
      "Zza ebisomo bwe oba oyagala bidde ku dashboard oba ku lukalala lwa hub updates.",
    "archive.emptyTitle": "Tewali bisomo biterekeddwa.",
    "archive.emptyDescription": "Ebisomo by'otereka bijja kulabikira wano.",
    "classrooms.title": "Ebibiina",
    "classrooms.description":
      "Teekateeka buli kibiina n'ekoodi yaakyo ey'okuyingira.",
    "classrooms.searchPlaceholder": "Noonya ebibiina, join codes, oba ebisomo",
    "classrooms.classroomCountSingular": "ekibiina",
    "classrooms.classroomCountPlural": "ebibiina",
    "classrooms.createModalIntro":
      "Tonda ekibiina, oluvannyuma ogabane join code yaakyo n'abayizi.",
    "classrooms.name": "Erinnya ly'ekibiina",
    "classrooms.namePlaceholder": "Ekibiina",
    "classrooms.joinCode": "Join code",
    "classrooms.joinCodePlaceholder": "ABC123",
    "classrooms.hint":
      "Abayizi bakozesa koodi eno ey'ennukuta oba namba 6 okuyingira mu kibiina. Esigala ekola okutuusa lw'ogikyusa.",
    "classrooms.newCode": "Koodi empya",
    "classrooms.create": "Tonda ekibiina",
    "classrooms.nameRequired": "Erinnya ly'ekibiina lyetaagisa.",
    "classrooms.joinCodeExact":
      "Kozesa ennukuta oba namba 6 zokka ku koodi y'okwegatta.",
    "classrooms.joinCodeUsedByAnother":
      "Join code eyo ekozesebwa dda mu kibiina ekirala.",
    "classrooms.createFailed": "Okutonda ekibiina kulemye. Ddamu ogezeeko.",
    "classrooms.updateFailed": "Okukyusa ekibiina kulemye. Ddamu ogezeeko.",
    "classrooms.removeLessonFailed":
      "Okuggyamu essomo mu kibiina kino kulemye. Ddamu ogezeeko.",
    "classrooms.deleteOwnOnly":
      "Osobola okusangula ebibiina ebitondeddwa akaawunti eno yokka.",
    "classrooms.checkFailed":
      "Okukebera ekibiina kino kulemye. Ddamu ogezeeko.",
    "classrooms.deleteFailed": "Okusangula ekibiina kulemye. Ddamu ogezeeko.",
    "classrooms.deleteTitle": "Sangula {classroom}?",
    "classrooms.deleteDescriptionWithLesson":
      "Essomo 1 likozesa ekibiina kino. Lijja kuggyibwa ku lukalala lwa hub updates okutuusa lwe linaagabibwa ku kibiina ekirala.\n\nZza hub ku mulembe oluvannyuma okuggyamu essomo eryo ku kyuma ky'ekibiina.",
    "classrooms.deleteDescriptionWithLessons":
      "Ebisomo {count} bikozesa ekibiina kino. Bijja kuggyibwa ku lukalala lwa hub updates okutuusa lwe binaagabibwa ku kibiina ekirala.\n\nZza hub ku mulembe oluvannyuma okuggyamu ebisomo ebyo ku kyuma ky'ekibiina.",
    "classrooms.deleteDescriptionNoLessons":
      "Ekibiina kino kijja kusangulwa. Ebisomo ebiri mu bibiina ebirala tebijja kukyuka.",
    "classrooms.tableLabel": "Join codes z'ebibiina",
    "classrooms.noCode": "Tewali koodi",
    "classrooms.copyCode": "Koppa join code",
    "classrooms.editCode": "Kyusa join code",
    "classrooms.editClassroom": "Kyusa ekibiina",
    "classrooms.changeJoinCodeTitle": "Kyusa join code y'ekibiina?",
    "classrooms.changeJoinCodeDescription":
      "Abayizi bajja kwetaaga join code empya omulundi oguddako nga bayingira mu kibiina kino.",
    "classrooms.changeJoinCodeConfirm": "Kyusa koodi",
    "classrooms.delete": "Sangula ekibiina",
    "classrooms.checking": "Ekibiina kikeberebwa",
    "classrooms.empty":
      "Tonda ekibiina okugabira ebisomo n'okugabana join code yaakyo.",
    "classrooms.noMatches": "Tewali bibiina bikwatagana n'okunoonya kwo.",
    "classrooms.tryDifferent":
      "Gezaako ekibiina ekirala, join code, oba essomo.",
    "classrooms.keep": "Sigaza ekibiina",
    "classrooms.lessons": "Ebisomo",
    "classrooms.lessonSingular": "Essomo 1",
    "classrooms.lessonPlural": "Ebisomo {count}",
    "classrooms.noLessonsAssigned": "Tewali bisomo bigabiddwa.",
    "classrooms.removeLesson": "Ggyamu mu kibiina kino",
    "classrooms.removeLessonTitle": "Ggyamu essomo mu kibiina kino?",
    "classrooms.removeLessonDescription":
      "Kino kiggyamu {lesson} mu {classroom}. Essomo lisigala ku dashboard yo. Oluvannyuma kola update ya Classroom Hub abayizi balabe enkyukakyuka.",
    "classrooms.removeLessonConfirm": "Ggyamu essomo",
    "classrooms.synced": "Kiri ku Hub",
    "classrooms.needsSync": "Zza Hub ku mulembe",
    "classrooms.notSavedToHub": "Ku dashboard yokka",
    "sync.title": "Zza Classroom Hub ku mulembe",
    "sync.subtitle":
      "Londa ebisomo eby'okukozesa nga tewali internet, oluvannyuma ozze Classroom Hub ku mulembe.",
    "sync.emptySubtitle":
      "Gatta Classroom Hub bw'oba weetegese okuweereza ebisomo eby'okukozesa nga tewali internet.",
    "sync.noHubTitle": "Classroom Hub tennagattibwa",
    "sync.noHubText":
      "Osobola okuteekateeka ebisomo n'ebibiina kati. Gatta Classroom Hub ng'ekyuma kyetegefu, oluvannyuma odde wano okubisindika.",
    "sync.noHubStep1": "Ggulawo setup page ya Classroom Hub.",
    "sync.noHubStep2": "Koppa koodi egatta erabika eyo.",
    "sync.noHubStep3": "Ggulawo profile menu olonde Gatta Classroom Hub.",
    "sync.lessonsToSync": "Ebisomo ebirondeddwa ku Hub",
    "sync.progress": "Okuzza Classroom Hub ku mulembe",
    "sync.addToHub": "Gatta ku Hub",
    "sync.removeFromHub": "Ggyamu ku Hub",
    "sync.button": "Zza Hub ku mulembe",
    "sync.syncing": "Ezza ku mulembe...",
    "sync.buttonTitle": "Zza Classroom Hub ku mulembe",
    "sync.linkHubFirst": "Sooka ogatte Hub",
    "sync.linkHubFirstTitle":
      "Gatta Classroom Hub nga tonnazza bisomo bya hub ku mulembe",
    "sync.hubLinked": "Classroom Hub egattiddwa",
    "sync.hubManagedInProfile": "Tegeka mu Profile Settings.",
    "sync.notSynced": "Tebinnaba ku update",
    "sync.lastUpdated": "Kyakomezeddwa okukyusibwa",
    "sync.summary": "Obufunze bwa Hub",
    "sync.noticeEmptyTitle": "Tewali bisomo birondeddwa ku hub",
    "sync.noticeEmptyBody":
      "Ggulawo essomo olonde Gatta ku Hub abayizi bwe balina okuliraba mu Ekibiina ky'omuyizi.",
    "sync.noticeNeedsTitle": "Classroom Hub yeetaaga update",
    "sync.noticeNeedsBody":
      "Nyiga Zza Hub ku mulembe Classroom Hub efune ebisomo n'enkyukakyuka ezisembyeyo.",
    "sync.noticeReadyTitle": "Classroom Hub eri ku mulembe",
    "sync.noticeReadyBody":
      "Ebisomo ebirondeddwa biri ku Classroom Hub. Ddamu update ng'omaze okukyusa ebisomo, fayiro, oba ebibiina.",
    "sync.emptyLessonsTitle": "Tewali bisomo birondeddwa ku hub.",
    "sync.emptyLessonsDescription":
      "Ggulawo essomo olonde Gatta ku Hub abayizi bwe balina okuliraba mu Ekibiina ky'omuyizi.",
    "sync.mapDashboardTitle": "Ku dashboard yokka",
    "sync.mapDashboardDescription":
      "Kiri ku Dashboard y'omusomesa, naye tekirondeddwa ku hub.",
    "sync.mapPendingTitle": "Hub updates ezilindiridde",
    "sync.mapPendingDescription":
      "Kijja kukyuka ku Classroom Hub ng'okuzza Hub ku mulembe kuwedde.",
    "sync.mapReadyTitle": "Kiri ku Hub",
    "sync.mapReadyDescription":
      "Abayizi basobola okukiraba ku Classroom Hub kati.",
    "sync.mapEmpty": "Tewali bisomo wano.",
    "sync.flowTitle": "Engeri hub updates gye zikola",
    "sync.flowIntro":
      "Kozesa omuko guno ebisomo oba ebibiina bwe byetaaga okukyuka ku Classroom Hub.",
    "sync.flowAddTitle": "Gatta ebisomo",
    "sync.flowAddPrefix": "Londa ",
    "sync.flowAddSuffix":
      " abayizi bwe beetaaga essomo erikola nga tewali internet.",
    "sync.flowChangesTitle": "Laba enkyukakyuka",
    "sync.flowChangesPrefix":
      "Bw'okyusa essomo, olibiggya mu kibiina, oba okyusa gye lirabikira, lijja kulaga ",
    "sync.flowChangesSuffix": ".",
    "sync.flowSelectTitle": "Londa ebisomo",
    "sync.flowSelectText":
      "Londa Gatta ku Hub ku ssomo okuligatta ku lukalala luno. Londa Ggyamu ku Hub abayizi bwe batalina kuddamu kuliraba ku hub.",
    "sync.flowSelectPrefix": "Londa ",
    "sync.flowSelectMiddle": " ku ssomo okuligatta wano. Londa ",
    "sync.flowSelectSuffix":
      " abayizi bwe batalina kuddamu kuliraba ku Classroom Hub.",
    "sync.flowReviewTitle": "Kebera status",
    "sync.flowReviewText":
      "Zza Hub ku mulembe kitegeeza dashboard erina enkyukakyuka hub z'etannafuna. Kiri ku Hub kitegeeza update yasembyeyo yawedde.",
    "sync.flowReviewMiddle":
      " kitegeeza dashboard erina updates Classroom Hub z'etannafuna. ",
    "sync.flowReviewSuffix": " kitegeeza update yasembyeyo yawedde.",
    "sync.flowUpdateTitle": "Zza hub ku mulembe",
    "sync.flowUpdateText":
      "Nyiga Zza Hub ku mulembe okusindika fayiro z'ebisomo, ebibiina, n'ebiggyiddwa ku Classroom Hub.",
    "sync.flowUpdatePrefix": "Nyiga ",
    "sync.flowUpdateSuffix":
      " okusindika enkyukakyuka ezilindiridde ku Classroom Hub.",
    "sync.flowReadyTitle": "Kebera Ekibiina ky'omuyizi",
    "sync.flowReadyPrefix": "Update bw'emala, ebisomo ebiriko ",
    "sync.flowReadySuffix":
      " biba bisobola okukozesebwa abayizi mu Ekibiina ky'omuyizi.",
    "sync.flowRemovalNote":
      "Okufuna ebiragiro bya setup esooka, kozesa Setup Guide. Ekitundu kino kya updates za bulijjo eza hub zokka.",
    "sync.successTitle": "Hub ewedde update",
    "sync.errorTitle": "Update ya hub eremye",
    "sync.successBody": "Classroom Hub eri ku mulembe.",
    "sync.errorBody":
      "Update ya hub tesobodde kumalirizibwa. Ddamu ogezeeko oluvannyuma.",
    "sync.requestError": "Okusaba update ya hub tekusobodde kumalirizibwa.",
    "sync.continue": "Weyongereyo",
    "sync.tryLater": "Gezaako oluvannyuma",
    "sync.syncAgain": "Ddamu okuzza ku mulembe",
    "sync.stage.waiting": "Tulindirira ekyuma",
    "sync.stage.preparing": "Tuteekateeka ebikozesebwa nga tewali internet...",
    "sync.stage.downloading": "Tuwanula fayiro z'ebisomo...",
    "sync.stage.finalizing": "Tumala update...",
    "storage.loading": "Tupakira etterekero...",
    "storage.notReported": "Etterekero terinnalabika",
    "storage.syncToUpdate": "Update hub okukyusa",
    "storage.usedPercent": "Ekozeddwa",
    "storage.gbUsed": "{used} GB ku {total} GB ekozeddwa",
    "files.files": "Fayiro",
    "files.fileSingular": "fayiro",
    "files.filePlural": "fayiro",
    "files.noDescription": "Tewali nnyonyola.",
    "files.noFileSelected": "Tewali fayiro erondeddwa.",
    "files.previewUnavailable": "Preview tennaba kubeerawo.",
    "files.download": "Wanula",
    "files.openFullScreen": "Ggulawo ku screen yonna",
    "files.noClassrooms": "Tewali bibiina bigabiddwa.",
    "files.name": "Erinnya",
    "files.dateAdded": "Lwe yayongerwako",
    "files.dateModified": "Lwe yakyusibwa",
    "files.fileSize": "Obunene bwa fayiro",
    "files.drag": "Sika fayiro okuzitegeka.",
    "files.sortingActiveDrag":
      "Okutegeka kuli ku. Gyawo okutegeka okusobola okusika fayiro n'okuzitegeka.",
    "files.searchActiveDrag":
      "Okunoonya kuli ku. Gyawo okunoonya okusobola okusika fayiro n'okuzitegeka.",
    "files.totalSize": "Obunene bwonna",
    "files.noMatches": "Tewali fayiro zikwatagana n'okunoonya kwo.",
    "files.selectAll": "Londa fayiro zonna",
    "files.upload": "Teekamu fayiro",
    "files.deleteSingular": "Sangula fayiro",
    "files.deletePlural": "Sangula fayiro",
    "lessons.edit": "Kyusa essomo",
    "lessons.editDetails": "Kyusa ebisingawo",
    "common.loading": "Kipakira...",
    "lessonModal.customize": "Kyusa",
    "lessonModal.createTitle": "Tonda essomo eppya",
    "lessonModal.editTitle": "Kyusa essomo",
    "lessonModal.name": "Erinnya",
    "lessonModal.lessonTitlePlaceholder": "Omutwe gw'essomo",
    "lessonModal.description": "Ennyonyola",
    "lessonModal.descriptionPlaceholder": "Ennyonyola ennyimpi ey'essomo",
    "lessonModal.select": "Londa",
    "lessonModal.noClassrooms": "Tewali bibiina.",
    "lessonModal.newClassroom": "Ekibiina ekipya",
    "lessonModal.classroomNameRequired": "Erinnya ly'ekibiina lyetaagisa.",
    "lessonModal.joinCodeLength":
      "Ku join code, kozesa ennukuta oba namba 6 zokka.",
    "lessonModal.joinCodeUsed": "Join code eyo ekozesebwa dda.",
    "lessonModal.createClassroomFailed":
      "Tetuyinza kutonda kibiina. Ddamu ogezeeko.",
    "lessonModal.classroomRequired": "Wetaagisa ekibiina waakiri kimu.",
    "lessonModal.studentJoinCodeInfo": "Join code y'abayizi kye ki?",
    "lessonModal.studentJoinCodeTooltip":
      "Abayizi bayingiza koodi eno ku join page ya Classroom Hub okulaba ebisomo by'ekibiina kino.",
    "lessonModal.uploadFiles": "Teekamu fayiro",
    "lessonModal.chooseFiles": "Londa fayiro oba zisike wano",
    "lessonModal.chooseFile": "Londa fayiro oba gisike wano",
    "lessonModal.fileFormats":
      "JPEG, PNG, PDF, MP4, PowerPoint, ne APK zikkirizibwa",
    "lessonModal.formatsAccepted": "formats zikkirizibwa",
    "lessonModal.browseFile": "Noonya fayiro",
    "lessonModal.uploading": "Eteekebwako",
    "lessonModal.completed": "Kiwedde",
    "lessonModal.failed": "Kiremye",
    "lessonModal.removeFile": "Ggyamu",
    "lessonModal.addToHubAvailable":
      "Essomo lino lijja kubeerawo oluvannyuma lwa hub update eddako",
    "lessonModal.addToHubNeedsHub":
      "Gatta Classroom Hub nga tonnagatta bisomo ku hub",
    "lessonModal.creatingLesson": "Essomo litondebwa...",
    "lessonModal.finishingLesson": "Essomo liggwa...",
    "lessonModal.uploadingFile": "Fayiro eteekebwako",
    "lessonModal.duplicateLessonPrefix": "Olina dda essomo eriyitibwa",
    "lessonModal.duplicateLessonSuffix": "Gezaako erinnya eddala.",
    "lessonModal.linkHubBeforeAdd":
      "Gatta Classroom Hub nga tonnagatta bisomo ku hub, oba ggyaako Gatta ku Hub kati.",
    "lessonModal.cannotAddWithoutFiles":
      "Toyinza kugatta ssomo ku Classroom Hub nga terina fayiro.",
    "lessonModal.createFailed": "Okutonda essomo kulemye. Ddamu ogezeeko.",
    "lessonModal.uploadFilesFailed": "Okuteeka fayiro kulemye. Ddamu ogezeeko.",
    "lessonModal.duplicateFileSingleSuffix": "eri mu ssomo lino dda.",
    "lessonModal.duplicateFilePluralPrefix":
      "Fayiro zino ziri mu ssomo lino dda:",
    "lessonModal.imageTitle": "Londa ekifaananyi ky'essomo",
    "lessonModal.selectImage": "Londa ekifaananyi",
    "lessonModal.uploadImage": "Teekako ekifaananyi",
    "lessonModal.previewAlt": "Okulaba okusooka",
    "lessonModal.saveImage": "Tereka ekifaananyi",
    "lessonModal.onlyImagesAccepted":
      "Fayiro za .png ne .jpg zokka ze zikkirizibwa.",
    "lessonModal.saveImageFailed":
      "Okutereka ekifaananyi kulemye. Ddamu ogezeeko.",
    "lessonModal.saveChanges": "Tereka enkyukakyuka",
    "archive.action": "Tereka",
    "archive.modalTitle": "Tereka essomo",
    "archive.modalDescription":
      "Essomo lino lijja kuggyibwa ku Dashboard y'ebisomo. Osobola okulizza oluvannyuma okuva mu bisomo ebiterekeddwa.",
    "archive.modalDescriptionWithHub":
      "Essomo lino lijja kuggyibwa ku Dashboard y'ebisomo. Zza hub ku mulembe oluvannyuma abayizi baleme okuliraba ku Classroom Hub.",
    "archive.restoreModalDescription":
      "Essomo lino lijja kudda ku Dashboard y'ebisomo. Osobola okuligatta ku hub nate nga lyetegefu.",
    "archive.modalConfirm": "Tereka essomo",
  },
  sw: {
    "app.title": "Rose Portable Classroom Hub",
    "app.educatorDashboard": "Dashibodi ya Mwalimu",
    "language.label": "Lugha",
    "nav.dashboard": "Nyumbani",
    "nav.lessons": "Masomo",
    "nav.classrooms": "Madarasa",
    "nav.sync": "Masasisho ya Hub",
    "nav.archive": "Kumbukumbu",
    "home.subtitle": "Simamia madarasa na masomo ya Darasa la mwanafunzi.",
    "home.metricLessonSingular": "Somo",
    "home.metricLessonPlural": "Masomo",
    "home.metricClassroomSingular": "Darasa",
    "home.metricClassroomPlural": "Madarasa",
    "home.quickActions": "Vitendo vya haraka",
    "home.createClassroom": "Unda darasa",
    "home.createClassroomDescription":
      "Unda darasa na msimbo wa kujiunga wa wanafunzi.",
    "home.createLesson": "Unda somo",
    "home.createLessonDescription": "Pakia faili na uziweke kwenye madarasa.",
    "home.updateHub": "Sasisha Classroom Hub",
    "home.updateHubDescription": "Tuma masomo yaliyochaguliwa kwenye hub.",
    "home.hubStatusTitle": "Classroom Hub",
    "home.hubLinked": "Imeunganishwa",
    "home.hubNotLinked": "Haijaunganishwa",
    "home.lastUpdate": "Sasisho la mwisho:",
    "home.noSuccessfulUpdate": "Bado hakuna sasisho lililofaulu.",
    "home.linkHubDescription":
      "Unganisha Classroom Hub kabla ya kusasisha masomo.",
    "home.manageHub": "Simamia hub kwenye mipangilio ya wasifu.",
    "home.setupStillNeeds": "Usanidi bado unahitaji",
    "profile.educatorAccount": "Akaunti ya mwalimu",
    "profile.linkedHub": "Classroom Hub iliyounganishwa",
    "profile.noHub": "Hakuna Classroom Hub iliyounganishwa",
    "profile.linkHub": "Unganisha Classroom Hub",
    "profile.replaceHub": "Badilisha Classroom Hub",
    "profile.unlinkHub": "Tenganisha Classroom Hub",
    "profile.hubGuide": "Mwongozo wa Classroom Hub",
    "profile.signOut": "Ondoka",
    "pairing.codeLabel": "Msimbo wa kuunganisha Classroom Hub",
    "pairing.help":
      "Unaweza kupata msimbo huu kwenye ukurasa wa usanidi wa Classroom Hub.",
    "pairing.cancel": "Ghairi",
    "pairing.linking": "Inaunganisha...",
    "pairing.replacing": "Inabadilisha...",
    "pairing.unlinking": "Inatenganisha...",
    "pairing.unlinkTitle": "Tenganisha Classroom Hub?",
    "pairing.unlinkConfirm": "Tenganisha hub",
    "pairing.unlinkDescription":
      "Hii inatenganisha akaunti hii ya Dashibodi ya Mwalimu na kifaa cha sasa cha Classroom Hub. Madarasa na masomo yako yatabaki kwenye akaunti hii, lakini hub hii haitapokea masasisho hadi iunganishwe tena.",
    "pairing.linkDescription":
      "Weka msimbo unaoonekana kwenye ukurasa wa usanidi wa hub. Dashibodi ya Mwalimu katika rosepch.org huunda masomo na madarasa; Classroom Hub huyahifadhi bila intaneti kwa wanafunzi.",
    "pairing.replaceDescription":
      "Weka msimbo unaoonekana kwenye ukurasa wa usanidi wa Classroom Hub katika rosehub.local/setup. Ikiwa haifunguki, tumia 10.42.0.1/setup. Madarasa na masomo yako yatabaki kwenye akaunti hii ya Dashibodi ya Mwalimu.",
    "login.title": "Dashibodi ya Mwalimu",
    "login.createTitle": "Unda akaunti ya mwalimu",
    "login.subtitle":
      "Ingia ili kusimamia masomo, madarasa, na Classroom Hub yako.",
    "login.createSubtitle":
      "Tumia barua pepe na nenosiri kuanza wasifu wako wa mwalimu.",
    "login.signIn": "Ingia",
    "login.createAccount": "Unda akaunti",
    "login.fullName": "Jina kamili",
    "login.email": "Barua pepe",
    "login.password": "Nenosiri",
    "login.signingIn": "Inaingia...",
    "login.creatingAccount": "Inaunda akaunti...",
    "login.newEducator": "Mwalimu mpya? Unda akaunti kwa barua pepe yako.",
    "login.haveAccount": "Tayari una akaunti? Ingia badala yake.",
    "login.invalid": "Barua pepe au nenosiri si sahihi",
    "login.createError":
      "Hatukuweza kuunda akaunti hiyo. Jaribu barua pepe au nenosiri lingine.",
    "login.checkEmail":
      "Angalia barua pepe yako ili kukamilisha kuunda akaunti ya mwalimu.",
    "guide.badge": "Mwongozo wa Classroom Hub",
    "guide.title": "Jinsi Classroom Hub inavyofanya kazi",
    "guide.subtitle":
      "Muonekano rahisi wa jinsi masomo yanavyotoka kwenye Dashibodi ya Mwalimu kwenda kwenye Classroom Hub, kisha kwa wanafunzi katika kila darasa.",
    "guide.dashboard": "Dashibodi ya Mwalimu",
    "guide.dashboardUrl": "Fungua rosepch.org kwenye kivinjari",
    "guide.dashboardBody":
      "Tovuti ambapo walimu huunda akaunti, huunganisha au kutenganisha hubs, huunda madarasa, hupakia faili za masomo, huhifadhi masomo kwenye hub, na husasisha hub.",
    "guide.hub": "Classroom Hub",
    "guide.hubUrl": "Fungua rosehub.local/setup au 10.42.0.1/setup",
    "guide.hubBody":
      "Classroom Hub inajumuisha kifaa cha Rose Portable Classroom Hub na tablet, simu, au kompyuta yoyote inayotumika kufungua Darasa la mwanafunzi, ukurasa wa usanidi, au ukurasa wa matengenezo.",
    "guide.flowDashboard": "Dashibodi ya Mwalimu",
    "guide.flowDashboardText":
      "Unda masomo, pakia faili, unda madarasa, na gawa masomo.",
    "guide.flowHub": "Classroom Hub",
    "guide.flowHubText":
      "Unganisha hub kwenye Wi-Fi, onyesha msimbo wa kuunganisha, thibitisha imeunganishwa, na pakua faili za karibuni.",
    "guide.flowStudents": "Darasa la mwanafunzi",
    "guide.flowStudentsText":
      "Wanaingiza msimbo wa darasa na kufungua masomo yao mahali popote bila intaneti.",
    "guide.workflowOverview": "Muhtasari wa mtiririko wa Classroom Hub",
    "guide.createLessons": "Unda masomo",
    "guide.createLessonsText":
      "Jenga maudhui ya kujifunzia kwenye Dashibodi ya Mwalimu. Ongeza kichwa cha somo, maelezo, picha ya jalada, na faili zozote ambazo wanafunzi wanahitaji.",
    "guide.createLessonsItem1": "Masomo huhifadhi maudhui ya kufundishia",
    "guide.createLessonsItem2":
      "Faili zinaweza kuwa picha, PDF, video, au PowerPoints",
    "guide.createClassrooms": "Unda na gawa madarasa",
    "guide.createClassroomsText":
      "Kwenye Dashibodi ya Mwalimu, unda kila darasa, weka msimbo wake wa kujiunga, kisha chagua masomo yanayohusika na darasa hilo.",
    "guide.createClassroomsItem1": "Kila darasa lina msimbo wake wa kujiunga",
    "guide.createClassroomsItem2":
      "Somo linaweza kugawiwa darasa moja au madarasa mengi",
    "guide.syncHub": "Sasisha Classroom Hub",
    "guide.syncHubText":
      "Tumia Masasisho ya Hub kwenye Dashibodi ya Mwalimu kumwambia hub iliyounganishwa masomo ya kupakua. Tumia ukurasa wa usanidi wa hub ikiwa tu hub inahitaji msaada wa Wi-Fi au upakuaji wa mkono.",
    "guide.syncHubItem1":
      "Classroom Hub lazima iwe imewashwa na imeunganishwa kwenye Wi-Fi yenye intaneti",
    "guide.syncHubItem2":
      "Sasisha hub kila unapobadilisha masomo, faili, au ugawaji wa madarasa",
    "guide.wifiTag": "Usanidi wa kifaa",
    "guide.syncAtLocation": "Sanidi hub kwanza",
    "guide.syncAtLocationText":
      "Hatua ya kwanza ya Wi-Fi lazima ifanyike karibu na Classroom Hub kwa sababu hub hutengeneza hotspot yake ya usanidi kabla haijawa mtandaoni.",
    "guide.syncAtLocationItem1": "Washa hub kwa chaja au betri ya kubebeka.",
    "guide.syncAtLocationItem2":
      "Jiunge na hotspot ya Wi-Fi ya Rose-Hub na ufungue rosehub.local/setup. Ikiwa haifunguki, tumia 10.42.0.1/setup.",
    "guide.syncAtLocationItem3":
      "Unganisha hub kwenye Wi-Fi yenye intaneti na unakili msimbo wa kuunganisha.",
    "guide.offlineTag": "Bila intaneti",
    "guide.teachOffline": "Fundisha bila intaneti",
    "guide.teachOfflineText":
      "Baada ya masomo kuwa tayari kwenye Classroom Hub, unaweza kuipeleka darasani bila intaneti. Wanafunzi huunganishwa kwenye Classroom Hub na kufungua Darasa la mwanafunzi.",
    "guide.teachOfflineItem1":
      "Washa Classroom Hub kwa betri ya kubebeka au chaja.",
    "guide.teachOfflineItem2":
      "Tablet, simu, au kompyuta nyingi zinaweza kuunganishwa kwa darasa.",
    "guide.teachOfflineItem3":
      "Wanafunzi huingiza msimbo wa darasa ili kuona masomo yao.",
    "setupGuide.brandTitle": "Mwongozo wa Usanidi wa Dashibodi ya Mwalimu",
    "setupGuide.orientationTitle": "Uko kwenye Dashibodi ya Mwalimu",
    "setupGuide.orientationText":
      "Tumia dashibodi hii kuunda madarasa, kuunda masomo, kupakia faili, na kusasisha Classroom Hub.",
    "setupGuide.mapDashboardTitle": "Dashibodi ya Mwalimu",
    "setupGuide.mapDashboardText":
      "Unda madarasa, masomo, faili, na masasisho ya hub.",
    "setupGuide.mapHubTitle": "Usanidi wa Classroom Hub",
    "setupGuide.mapHubText":
      "Tumia kifaa kingine kuunganisha Wi-Fi na kupata msimbo wa kuunganisha.",
    "setupGuide.mapStudentsTitle": "Darasa la mwanafunzi",
    "setupGuide.mapStudentsText":
      "Wanafunzi huingiza msimbo wa kujiunga na kufungua masomo.",
    "setupGuide.safeNote":
      "Ni salama kurudi nyuma, kuruka hatua kwa sasa, au kuanza mwongozo huu upya. Kurudi nyuma hakufuti madarasa, masomo, au faili zilizopakiwa.",
    "setupGuide.stepSafetyHub":
      "Hatua hii inaunganisha Classroom Hub na akaunti hii ya Dashibodi ya Mwalimu tu.",
    "setupGuide.stepSafetyClassroom":
      "Unaweza kuunda darasa moja sasa na kuongeza mengine baadaye.",
    "setupGuide.stepSafetyLesson":
      "Unaweza kuunda somo moja sasa na kulihariri, kuongeza faili, au kugawa madarasa zaidi baadaye.",
    "setupGuide.stepSafetySync":
      "Sasisho la hub hutuma masomo yaliyochaguliwa kwenye Classroom Hub. Kitu kikibadilika, sasisha hub tena.",
    "setupGuide.stepCount": "{current} kati ya {total}",
    "setupGuide.progressLabel": "Hatua za usanidi",
    "setupGuide.stepBadge": "Hatua {step} · {label}",
    "setupGuide.welcomeTitle": "Sanidi Dashibodi ya Mwalimu",
    "setupGuide.welcomeLinked":
      "Dashibodi hii ya Mwalimu tayari imeunganishwa na Classroom Hub. Anza usanidi ili kuendelea na madarasa, masomo, na masasisho ya hub.",
    "setupGuide.welcomeIntro":
      "Mwongozo huu unaonyesha cha kufanya katika kila sehemu: Dashibodi ya Mwalimu, Usanidi wa Classroom Hub, na Darasa la mwanafunzi.",
    "setupGuide.checkDashboardOpen": "Acha Dashibodi hii ya Mwalimu wazi.",
    "setupGuide.checkHubNearby": "Classroom Hub iwe imewashwa na iwe karibu.",
    "setupGuide.checkOtherDevice":
      "Uwe na tablet, simu, au kompyuta nyingine tayari kuunganisha kwenye Wi-Fi ya usanidi wa hub.",
    "setupGuide.checkOneStep":
      "Unaweza kurudi nyuma, kuruka hatua, na kuimaliza baadaye.",
    "setupGuide.begin": "Anza usanidi",
    "setupGuide.skipForNow": "Ruka kwa sasa",
    "setupGuide.finishSetup": "Maliza usanidi",
    "setupGuide.pairingLabel":
      "Msimbo wa kuunganisha kutoka ukurasa wa usanidi wa hub",
    "setupGuide.pairingHelp": "Weka msimbo wa kuunganisha unaoonyeshwa kwenye",
    "setupGuide.pairingFallbackHelp": "Ikiwa haifunguki, tumia",
    "setupGuide.linkingHub": "Inaunganisha hub...",
    "setupGuide.enterPairingCode": "Weka msimbo wa kuunganisha",
    "setupGuide.createdClassroom": "Limeundwa",
    "setupGuide.joinCode": "Msimbo wa kujiunga",
    "setupGuide.createClassroom": "Unda darasa",
    "setupGuide.createAnotherClassroom": "Unda darasa lingine",
    "setupGuide.creatingClassroom": "Inaunda darasa...",
    "setupGuide.loadingClassrooms": "Inapakia madarasa...",
    "setupGuide.createLesson": "Unda somo",
    "setupGuide.createAnotherLesson": "Unda somo lingine",
    "setupGuide.hubLinked": "Classroom Hub imeunganishwa",
    "setupGuide.hubNotLinked": "Classroom Hub bado haijaunganishwa",
    "setupGuide.lastSuccessfulSync": "Sasisho la mwisho la hub: {value}.",
    "setupGuide.noSuccessfulSync": "Hakuna sasisho la hub lililorekodiwa bado.",
    "setupGuide.syncInstruction":
      "Bonyeza Sasisha Hub kutuma masomo yaliyochaguliwa kwenye Classroom Hub.",
    "setupGuide.linkBeforeSync":
      "Unganisha Classroom Hub kabla ya kusasisha masomo ya hub.",
    "setupGuide.studentJoinCode": "Msimbo wa mwanafunzi kujiunga",
    "setupGuide.regenerateJoinCode": "Tengeneza msimbo mpya wa kujiunga",
    "setupGuide.studentJoinCodeHelp":
      "Wanafunzi hutumia msimbo huu wa herufi 6 kujiunga na darasa katika Darasa la mwanafunzi.",
    "setupGuide.stepHub.title": "Sanidi Hub",
    "setupGuide.stepHub.titleDone": "Hub tayari imeunganishwa",
    "setupGuide.stepHub.short": "Hub",
    "setupGuide.stepHub.detail":
      "Acha Dashibodi ya Mwalimu wazi. Classroom Hub iwe kando yako, na uwe na tablet, simu, au kompyuta nyingine tayari kwa Wi-Fi ya usanidi wa hub.",
    "setupGuide.stepHub.detailDone":
      "Dashibodi hii ya Mwalimu tayari imeunganishwa na Classroom Hub.",
    "setupGuide.stepHub.action": "Weka msimbo wa kuunganisha",
    "setupGuide.stepHub.actionDone": "Kagua masasisho ya hub",
    "setupGuide.stepHub.helper":
      "Ukurasa wa usanidi wa hub ukionyesha msimbo wa kuunganisha, uweke hapa chini ili kuunganisha hub hii na Dashibodi ya Mwalimu.",
    "setupGuide.stepHub.helperDone": "Endelea Hatua ya 2 kusanidi madarasa.",
    "setupGuide.stepHub.instruction1":
      "Chomeka au washa Classroom Hub iliyo kando yako na subiri kama dakika moja.",
    "setupGuide.stepHub.instruction2":
      "Kwenye tablet, simu, au kompyuta nyingine iliyo karibu, fungua mipangilio ya Wi-Fi na ujiunge na mtandao unaoitwa Rose-Hub-XXXX. Herufi nne za mwisho ni tofauti kwa kila hub. Tumia nenosiri rosehub! ukiombwa.",
    "setupGuide.stepHub.instruction3":
      "Kwenye kifaa hicho hicho, fungua kivinjari, weka http://rosehub.local/setup. Ikiwa haifunguki, tumia http://10.42.0.1/setup. Kamilisha hatua za usanidi wa hub, kisha urudi kwenye Dashibodi hii ya Mwalimu na msimbo wa kuunganisha.",
    "setupGuide.stepClassroom.title": "Unda darasa",
    "setupGuide.stepClassroom.short": "Darasa",
    "setupGuide.stepClassroom.detail":
      "Unda darasa na uhifadhi msimbo wake wa kujiunga wa herufi 6.",
    "setupGuide.stepClassroom.detailDoneSingular": "Darasa {count} limeundwa.",
    "setupGuide.stepClassroom.detailDonePlural": "Madarasa {count} yameundwa.",
    "setupGuide.stepLesson.title": "Unda somo",
    "setupGuide.stepLesson.short": "Somo",
    "setupGuide.stepLesson.detail":
      "Unda somo, ongeza faili, na liweke kwenye darasa.",
    "setupGuide.stepLesson.detailDoneSingular": "Somo {count} limeundwa.",
    "setupGuide.stepLesson.detailDonePlural": "Masomo {count} yameundwa.",
    "setupGuide.stepLesson.detailNeedsSync":
      "Somo limeundwa, lakini bado halijachaguliwa kwa Classroom Hub.",
    "setupGuide.stepLesson.detailReadySingular":
      "Somo {count} liko tayari kwa Classroom Hub.",
    "setupGuide.stepLesson.detailReadyPlural":
      "Masomo {count} yako tayari kwa Classroom Hub.",
    "setupGuide.stepSync.title": "Sasisha Classroom Hub",
    "setupGuide.stepSync.short": "Hub update",
    "setupGuide.stepSync.detail":
      "Tuma masomo yaliyochaguliwa kutoka Dashibodi ya Mwalimu kwenda Classroom Hub.",
    "setupGuide.stepSync.detailDoneSingular":
      "Somo {count} liko tayari kwenye Classroom Hub.",
    "setupGuide.stepSync.detailDonePlural":
      "Masomo {count} yako tayari kwenye Classroom Hub.",
    "setupGuideModal.title": "Mwongozo wa usanidi",
    "setupGuideModal.body":
      "Tumia usanidi unaokuongoza ili kufuata mpangilio sahihi. Utakuambia wakati wa kutumia Dashibodi ya Mwalimu, wakati wa kutumia Usanidi wa Classroom Hub, na wakati wanafunzi wako tayari kufungua Darasa la mwanafunzi.",
    "setupGuideModal.hubTitle": "1. Kwenye Classroom Hub",
    "setupGuideModal.hubStep1": "Washa hub kwa chaja au betri ya kubebeka.",
    "setupGuideModal.hubStep2":
      "Kwenye tablet, simu, au kompyuta nyingine, jiunge na Wi-Fi ya Rose-Hub ikiwa inaonekana.",
    "setupGuideModal.hubStep3":
      "Kwenye tablet, simu, au kompyuta hiyo hiyo, fungua http://rosehub.local/setup. Ikiwa haifunguki, tumia http://10.42.0.1/setup.",
    "setupGuideModal.hubStep4": "Unganisha hub kwenye Wi-Fi yenye intaneti.",
    "setupGuideModal.hubStep5":
      "Nakili msimbo wa kuunganisha unaoonyeshwa kwenye hub.",
    "setupGuideModal.dashboardTitle": "2. Kwenye Dashibodi ya Mwalimu",
    "setupGuideModal.dashboardStep1":
      "Tumia dashibodi hii kwenye https://rosepch.org.",
    "setupGuideModal.dashboardStep2": "Weka msimbo wa kuunganisha hub.",
    "setupGuideModal.dashboardStep3":
      "Unda madarasa na uhifadhi kila msimbo wa kujiunga.",
    "setupGuideModal.dashboardStep4": "Unda masomo na upakie faili.",
    "setupGuideModal.dashboardStep5":
      "Ongeza masomo kwenye Classroom Hub na usasishe hub.",
    "setupGuideModal.studentsTitle": "3. Kwa wanafunzi",
    "setupGuideModal.studentsStep1":
      "Wanafunzi huunganisha tablet, simu, au kompyuta yao kwenye Wi-Fi ya Classroom Hub.",
    "setupGuideModal.studentsStep2":
      "Wanafunzi hufungua Darasa la mwanafunzi kwenye http://rosehub.local/join. Ikiwa haifunguki, watumie http://10.42.0.1/join.",
    "setupGuideModal.studentsStep3":
      "Wanafunzi huingiza msimbo wa kujiunga wa darasa kutoka kwa mwalimu.",
    "missingDevice.title": "Unganisha Classroom Hub yako",
    "missingDevice.description":
      "Uko kwenye Dashibodi ya Mwalimu katika rosepch.org. Unganisha Classroom Hub ili masomo kutoka akaunti hii yatumwe kwenye Darasa la mwanafunzi.",
    "missingDevice.viewSetupSteps": "Angalia hatua za usanidi",
    "missingDevice.step1":
      "Kwenye hub, fungua Usanidi wa Classroom Hub kwenye rosehub.local/setup. Ikiwa haifunguki, tumia 10.42.0.1/setup.",
    "missingDevice.step2":
      "Nakili msimbo wa kuunganisha wa mara moja unaoonekana kwenye hub.",
    "missingDevice.step3":
      "Rudi kwenye Dashibodi hii ya Mwalimu na uweke msimbo wa kuunganisha hapa.",
    "missingDevice.help":
      "Tayari umeisanidi Classroom Hub hii kwa akaunti nyingine ya mwalimu? Ingia kwa akaunti hiyo, au weka upya Classroom Hub hii kabla ya kuiunganisha na mwalimu mpya.",
    "missingDevice.linkSuccess":
      "Classroom Hub imeunganishwa. Inafungua dashibodi yako...",
    "missingDevice.linked": "Imeunganishwa",
    "common.back": "Rudi",
    "common.next": "Endelea",
    "common.closeModal": "Funga dirisha",
    "common.gotIt": "Nimeelewa",
    "common.openSetupGuide": "Fungua mwongozo wa usanidi",
    "common.recorded": "Imerekodiwa",
    "common.cancel": "Ghairi",
    "common.save": "Hifadhi",
    "common.saving": "Inahifadhi...",
    "common.create": "Unda",
    "common.creating": "Inaunda...",
    "common.copied": "Imenakiliwa",
    "common.working": "Inafanya kazi...",
    "common.searchPlaceholder": "Tafuta somo au faili",
    "common.clearSearch": "Futa utafutaji",
    "common.sortBy": "Panga kwa",
    "common.classroom": "Darasa",
    "common.selected": "imechaguliwa",
    "common.card": "Kadi",
    "common.list": "Orodha",
    "common.morePrefix": "+",
    "common.moreSuffix": "zaidi",
    "common.showLess": "Onyesha kidogo",
    "sort.updatedNewest": "Iliyosasishwa karibuni",
    "sort.updatedOldest": "Iliyosasishwa zamani",
    "sort.createdNewest": "Masomo mapya",
    "sort.createdOldest": "Iliyoundwa zamani",
    "sort.nameAsc": "Jina la somo A-Z",
    "sort.recentlyArchived": "Iliyowekwa kumbukumbu karibuni",
    "sort.oldestArchived": "Iliyowekwa kumbukumbu zamani",
    "status.synced": "Tayari kwenye Hub",
    "status.pendingSync": "Sasisha Hub",
    "status.pendingSyncLower": "Sasisha hub",
    "status.pendingRemoval": "Ondoa kwenye sasisho lijalo",
    "status.dashboardOnly": "Kwenye dashibodi tu",
    "lessons.title": "Masomo",
    "lessons.description":
      "Unda masomo, gawa madarasa, na chagua cha kuhifadhi kwenye Classroom Hub.",
    "lessons.create": "Unda somo",
    "lessons.createLower": "Unda somo",
    "lessons.searchPlaceholder": "Tafuta masomo, madarasa, au faili",
    "lessons.details": "Maelezo",
    "lessons.noLessons": "Bado hakuna masomo.",
    "lessons.empty":
      "Unda somo lako la kwanza ili kuongeza faili na kuligawa darasani.",
    "lessons.noMatches": "Hakuna masomo yanayolingana na utafutaji wako.",
    "lessons.tryDifferent": "Jaribu darasa au neno lingine la utafutaji.",
    "lessons.readySingular": "Somo liko tayari kwa hub",
    "lessons.readyPlural": "Masomo yako tayari kwa hub",
    "lessons.needsClassroomSingular": "Somo linahitaji darasa",
    "lessons.needsClassroomPlural": "Masomo yanahitaji darasa",
    "lessons.activeSingular": "Somo linalotumika",
    "lessons.activePlural": "Masomo yanayotumika",
    "lessons.reviewSync": "Kagua masasisho ya hub",
    "lessons.manageClassrooms": "Simamia madarasa",
    "lessons.restoreTitle": "Rudisha somo",
    "lessons.restoreDescription": "Somo hili litarudishwa.",
    "lessons.restoreConfirm": "Rudisha kwenye masomo yanayotumika",
    "lessons.removeSyncTitle": "Ondoa somo kwenye Hub",
    "lessons.removeSyncDescription":
      "Somo litabaki kwenye dashibodi. Litaondolewa kwenye Classroom Hub baada ya sasisho linalofuata kufanikiwa.",
    "lessons.removePendingTitle": "Ondoa somo kwenye sasisho lijalo",
    "lessons.removePendingDescription":
      "Somo litabaki kwenye dashibodi. Baada ya sasisho linalofuata kufanikiwa, wanafunzi hawataliona tena kwenye Classroom Hub.",
    "lessons.removeConfirm": "Ondoa kwenye Hub",
    "lessons.removeOnNextUpdate": "Ondoa kwenye sasisho lijalo",
    "lessons.removeHubAction": "Ondoa",
    "lessons.remove": "Ondoa kwenye Hub",
    "lessons.restore": "Rudisha",
    "lessons.noFilesAttached":
      "Hakuna faili zilizoambatishwa kwenye somo hili.",
    "lessons.lessonCountSingular": "somo",
    "lessons.lessonCountPlural": "masomo",
    "lessons.of": "kati ya",
    "archive.title": "Masomo yaliyohifadhiwa",
    "archive.description":
      "Rudisha masomo unapotaka yarudi kwenye dashibodi au orodha ya masasisho ya hub.",
    "archive.emptyTitle": "Bado hakuna masomo yaliyohifadhiwa.",
    "archive.emptyDescription": "Masomo utakayohifadhi yataonekana hapa.",
    "classrooms.title": "Madarasa",
    "classrooms.description": "Weka kila darasa na msimbo wake wa kujiunga.",
    "classrooms.searchPlaceholder": "Tafuta madarasa, misimbo, au masomo",
    "classrooms.classroomCountSingular": "darasa",
    "classrooms.classroomCountPlural": "madarasa",
    "classrooms.createModalIntro":
      "Unda darasa, kisha shiriki msimbo wake wa kujiunga na wanafunzi.",
    "classrooms.name": "Jina la darasa",
    "classrooms.namePlaceholder": "Darasa",
    "classrooms.joinCode": "Msimbo wa kujiunga",
    "classrooms.joinCodePlaceholder": "ABC123",
    "classrooms.hint":
      "Wanafunzi hutumia msimbo huu wa herufi au nambari 6 kujiunga na darasa. Unaendelea kufanya kazi hadi ubadilishe.",
    "classrooms.newCode": "Msimbo mpya",
    "classrooms.create": "Unda darasa",
    "classrooms.nameRequired": "Jina la darasa linahitajika.",
    "classrooms.joinCodeExact":
      "Tumia herufi au nambari 6 kamili kwa msimbo wa kujiunga.",
    "classrooms.joinCodeUsedByAnother":
      "Msimbo huo tayari unatumiwa na darasa jingine.",
    "classrooms.createFailed": "Haikuwezekana kuunda darasa. Jaribu tena.",
    "classrooms.updateFailed": "Haikuwezekana kusasisha darasa. Jaribu tena.",
    "classrooms.removeLessonFailed":
      "Haikuwezekana kuondoa somo kwenye darasa hili. Jaribu tena.",
    "classrooms.deleteOwnOnly":
      "Unaweza kufuta madarasa yaliyoundwa na akaunti hii pekee.",
    "classrooms.checkFailed": "Haikuwezekana kukagua darasa hili. Jaribu tena.",
    "classrooms.deleteFailed": "Haikuwezekana kufuta darasa. Jaribu tena.",
    "classrooms.deleteTitle": "Futa {classroom}?",
    "classrooms.deleteDescriptionWithLesson":
      "Somo 1 linatumia darasa hili. Litaondolewa kwenye orodha ya masasisho ya hub hadi liwekwe kwenye darasa lingine.\n\nSasisha hub baadaye ili kuondoa somo hilo kwenye kifaa cha darasa.",
    "classrooms.deleteDescriptionWithLessons":
      "Masomo {count} yanatumia darasa hili. Yataondolewa kwenye orodha ya masasisho ya hub hadi yawekwe kwenye darasa lingine.\n\nSasisha hub baadaye ili kuondoa masomo hayo kwenye kifaa cha darasa.",
    "classrooms.deleteDescriptionNoLessons":
      "Darasa hili litafutwa. Masomo yaliyowekwa kwenye madarasa mengine hayatabadilika.",
    "classrooms.tableLabel": "Misimbo ya kujiunga ya madarasa",
    "classrooms.noCode": "Hakuna msimbo",
    "classrooms.copyCode": "Nakili msimbo wa kujiunga",
    "classrooms.editCode": "Hariri msimbo wa kujiunga",
    "classrooms.editClassroom": "Hariri darasa",
    "classrooms.changeJoinCodeTitle": "Badilisha msimbo wa kujiunga?",
    "classrooms.changeJoinCodeDescription":
      "Wanafunzi watahitaji msimbo mpya watakapojiunga na darasa hili tena.",
    "classrooms.changeJoinCodeConfirm": "Badilisha msimbo",
    "classrooms.delete": "Futa darasa",
    "classrooms.checking": "Inakagua darasa",
    "classrooms.empty":
      "Unda darasa ili kugawa masomo na kushiriki msimbo wake wa kujiunga.",
    "classrooms.noMatches": "Hakuna madarasa yanayolingana na utafutaji wako.",
    "classrooms.tryDifferent":
      "Jaribu darasa, msimbo wa kujiunga, au somo lingine.",
    "classrooms.keep": "Baki na darasa",
    "classrooms.lessons": "Masomo",
    "classrooms.lessonSingular": "Somo 1",
    "classrooms.lessonPlural": "Masomo {count}",
    "classrooms.noLessonsAssigned": "Bado hakuna masomo yaliyogawiwa.",
    "classrooms.removeLesson": "Ondoa kwenye darasa hili",
    "classrooms.removeLessonTitle": "Ondoa somo kwenye darasa hili?",
    "classrooms.removeLessonDescription":
      "Hii inaondoa {lesson} kwenye {classroom}. Somo linabaki kwenye dashibodi yako. Sasisha Classroom Hub baadaye ili wanafunzi waone mabadiliko.",
    "classrooms.removeLessonConfirm": "Ondoa somo",
    "classrooms.synced": "Tayari kwenye Hub",
    "classrooms.needsSync": "Sasisha Hub",
    "classrooms.notSavedToHub": "Dashibodi tu",
    "sync.title": "Sasisha Classroom Hub",
    "sync.subtitle":
      "Chagua masomo ya matumizi bila intaneti, kisha sasisha Classroom Hub.",
    "sync.emptySubtitle":
      "Unganisha Classroom Hub ukiwa tayari kutuma masomo kwa matumizi bila intaneti.",
    "sync.noHubTitle": "Classroom Hub bado haijaunganishwa",
    "sync.noHubText":
      "Unaweza kuandaa masomo na madarasa sasa. Unganisha Classroom Hub kifaa kikiwa tayari, kisha rudi hapa kuyatuma kwa matumizi bila intaneti.",
    "sync.noHubStep1": "Fungua ukurasa wa usanidi wa Classroom Hub.",
    "sync.noHubStep2": "Nakili msimbo wa kuunganisha unaoonekana hapo.",
    "sync.noHubStep3":
      "Fungua menyu ya wasifu wako na uchague Unganisha Classroom Hub.",
    "sync.lessonsToSync": "Masomo yaliyochaguliwa kwa Hub",
    "sync.progress": "Sasisho la Classroom Hub",
    "sync.addToHub": "Ongeza kwenye Hub",
    "sync.removeFromHub": "Ondoa kwenye Hub",
    "sync.button": "Sasisha Hub",
    "sync.syncing": "Inasasisha...",
    "sync.buttonTitle": "Sasisha Classroom Hub",
    "sync.linkHubFirst": "Unganisha hub kwanza",
    "sync.linkHubFirstTitle":
      "Unganisha Classroom Hub kabla ya kusasisha masomo ya hub",
    "sync.hubLinked": "Classroom Hub imeunganishwa",
    "sync.hubManagedInProfile": "Dhibiti kwenye Mipangilio ya Wasifu.",
    "sync.notSynced": "Bado haijasasishwa",
    "sync.lastUpdated": "Ilisasishwa mwisho",
    "sync.summary": "Muhtasari wa Hub",
    "sync.noticeEmptyTitle": "Bado hakuna masomo yaliyochaguliwa kwa hub",
    "sync.noticeEmptyBody":
      "Fungua somo na uchague Ongeza kwenye Hub wakati wanafunzi wanapaswa kuliona katika Darasa la mwanafunzi.",
    "sync.noticeNeedsTitle": "Classroom Hub inahitaji kusasishwa",
    "sync.noticeNeedsBody":
      "Bonyeza Sasisha Hub ili Classroom Hub ipokee masomo na mabadiliko ya madarasa ya karibuni.",
    "sync.noticeReadyTitle": "Classroom Hub imesasishwa",
    "sync.noticeReadyBody":
      "Masomo yaliyochaguliwa yako tayari kwenye Classroom Hub. Sasisha tena baada ya kubadilisha masomo, faili, au madarasa.",
    "sync.emptyLessonsTitle": "Bado hakuna masomo yaliyochaguliwa kwa hub.",
    "sync.emptyLessonsDescription":
      "Fungua somo na uchague Ongeza kwenye Hub wakati wanafunzi wanapaswa kuliona katika Darasa la mwanafunzi.",
    "sync.mapDashboardTitle": "Dashibodi tu",
    "sync.mapDashboardDescription":
      "Imehifadhiwa kwenye Dashibodi ya Mwalimu, haijachaguliwa kwa hub.",
    "sync.mapPendingTitle": "Masasisho ya hub yanayosubiri",
    "sync.mapPendingDescription":
      "Itabadilika kwenye Classroom Hub baada ya Sasisha Hub kukamilika.",
    "sync.mapReadyTitle": "Tayari kwenye Hub",
    "sync.mapReadyDescription":
      "Inapatikana kwa wanafunzi kwenye Classroom Hub sasa.",
    "sync.mapEmpty": "Bado hakuna masomo hapa.",
    "sync.flowTitle": "Jinsi masasisho ya hub yanavyofanya kazi",
    "sync.flowIntro":
      "Tumia ukurasa huu wakati masomo au ugawaji wa madarasa vinahitaji kubadilika kwenye Classroom Hub.",
    "sync.flowAddTitle": "Ongeza masomo",
    "sync.flowAddPrefix": "Chagua ",
    "sync.flowAddSuffix":
      " wakati wanafunzi wanahitaji somo lipatikane bila intaneti.",
    "sync.flowChangesTitle": "Angalia mabadiliko",
    "sync.flowChangesPrefix":
      "Ukihariri somo, ukiliondoa kwenye darasa, au ukibadilisha linapoonekana, litaonyesha ",
    "sync.flowChangesSuffix": ".",
    "sync.flowSelectTitle": "Chagua masomo",
    "sync.flowSelectText":
      "Chagua Ongeza kwenye Hub kwenye somo ili kuliongeza kwenye orodha hii. Chagua Ondoa kwenye Hub wakati wanafunzi hawapaswi kuliona tena kwenye hub.",
    "sync.flowSelectPrefix": "Chagua ",
    "sync.flowSelectMiddle": " kwenye somo ili kuliongeza hapa. Chagua ",
    "sync.flowSelectSuffix":
      " wakati wanafunzi hawapaswi kuliona tena kwenye Classroom Hub.",
    "sync.flowReviewTitle": "Angalia hali",
    "sync.flowReviewText":
      "Sasisha Hub inamaanisha dashibodi ina mabadiliko ambayo hub bado haina. Tayari kwenye Hub inamaanisha sasisho la mwisho limekamilika.",
    "sync.flowReviewMiddle":
      " inamaanisha dashibodi ina masasisho ambayo Classroom Hub bado haina. ",
    "sync.flowReviewSuffix":
      " inamaanisha sasisho la mwisho la hub limekamilika.",
    "sync.flowUpdateTitle": "Sasisha hub",
    "sync.flowUpdateText":
      "Bonyeza Sasisha Hub kutuma faili za masomo, ugawaji wa madarasa, na uondoaji kwenye Classroom Hub.",
    "sync.flowUpdatePrefix": "Bonyeza ",
    "sync.flowUpdateSuffix":
      " kutuma mabadiliko yanayosubiri kwenye Classroom Hub.",
    "sync.flowReadyTitle": "Angalia Darasa la mwanafunzi",
    "sync.flowReadyPrefix": "Sasisho likikamilika, masomo yenye alama ",
    "sync.flowReadySuffix":
      " yatapatikana kwa wanafunzi katika Darasa la mwanafunzi.",
    "sync.flowRemovalNote":
      "Kwa maelekezo ya usanidi wa kwanza, tumia Mwongozo wa Usanidi. Sehemu hii ni kwa masasisho ya kawaida ya hub tu.",
    "sync.successTitle": "Hub imesasishwa",
    "sync.errorTitle": "Sasisho la hub limeshindwa",
    "sync.successBody": "Classroom Hub imesasishwa.",
    "sync.errorBody":
      "Sasisho la hub halikuweza kukamilika. Tafadhali jaribu tena baadaye.",
    "sync.requestError": "Ombi la kusasisha hub halikuweza kukamilika.",
    "sync.continue": "Endelea",
    "sync.tryLater": "Jaribu baadaye",
    "sync.syncAgain": "Sasisha tena",
    "sync.stage.waiting": "Inasubiri kifaa",
    "sync.stage.preparing": "Inaandaa maudhui ya bila intaneti...",
    "sync.stage.downloading": "Inapakua faili za masomo...",
    "sync.stage.finalizing": "Inamalizia sasisho...",
    "storage.loading": "Inapakia hifadhi...",
    "storage.notReported": "Hifadhi bado haijaripotiwa",
    "storage.syncToUpdate": "Sasisha hub ili kubadilisha",
    "storage.usedPercent": "Imetumika",
    "storage.gbUsed": "{used} GB kati ya {total} GB zimetumika",
    "files.files": "Faili",
    "files.fileSingular": "faili",
    "files.filePlural": "faili",
    "files.noDescription": "Hakuna maelezo yaliyoongezwa.",
    "files.noFileSelected": "Hakuna faili iliyochaguliwa.",
    "files.previewUnavailable": "Hakiki bado haipatikani.",
    "files.download": "Pakua",
    "files.openFullScreen": "Fungua skrini nzima",
    "files.noClassrooms": "Hakuna madarasa yaliyogawiwa.",
    "files.name": "Jina",
    "files.dateAdded": "Tarehe iliyoongezwa",
    "files.dateModified": "Tarehe iliyobadilishwa",
    "files.fileSize": "Ukubwa wa faili",
    "files.drag": "Buruta faili ili kupanga upya.",
    "files.sortingActiveDrag":
      "Upangaji umewashwa. Futa upangaji ili uburute na kupanga faili mwenyewe.",
    "files.searchActiveDrag":
      "Utafutaji umewashwa. Futa utafutaji ili uburute na kupanga faili mwenyewe.",
    "files.totalSize": "Ukubwa jumla",
    "files.noMatches": "Hakuna faili zinazolingana na utafutaji wako.",
    "files.selectAll": "Chagua faili zote",
    "files.upload": "Pakia faili",
    "files.deleteSingular": "Futa faili",
    "files.deletePlural": "Futa faili",
    "lessons.edit": "Hariri somo",
    "lessons.editDetails": "Hariri maelezo",
    "common.loading": "Inapakia...",
    "lessonModal.customize": "Badilisha",
    "lessonModal.createTitle": "Unda somo jipya",
    "lessonModal.editTitle": "Hariri somo",
    "lessonModal.name": "Jina",
    "lessonModal.lessonTitlePlaceholder": "Kichwa cha somo",
    "lessonModal.description": "Maelezo",
    "lessonModal.descriptionPlaceholder": "Maelezo mafupi ya somo",
    "lessonModal.select": "Chagua",
    "lessonModal.noClassrooms": "Bado hakuna madarasa.",
    "lessonModal.newClassroom": "Darasa jipya",
    "lessonModal.classroomNameRequired": "Jina la darasa linahitajika.",
    "lessonModal.joinCodeLength":
      "Kwa msimbo wa kujiunga, tumia herufi au nambari 6 kamili.",
    "lessonModal.joinCodeUsed": "Msimbo huo tayari umetumika.",
    "lessonModal.createClassroomFailed":
      "Haikuwezekana kuunda darasa. Jaribu tena.",
    "lessonModal.classroomRequired": "Darasa angalau moja linahitajika.",
    "lessonModal.studentJoinCodeInfo": "Msimbo wa kujiunga ni nini?",
    "lessonModal.studentJoinCodeTooltip":
      "Wanafunzi huingiza msimbo huu kwenye ukurasa wa kujiunga wa Classroom Hub ili kuona masomo ya darasa hili.",
    "lessonModal.uploadFiles": "Pakia faili",
    "lessonModal.chooseFiles": "Chagua faili au ziburuze hapa",
    "lessonModal.chooseFile": "Chagua faili au iburuze hapa",
    "lessonModal.fileFormats":
      "Miundo ya JPEG, PNG, PDF, MP4, PowerPoint, na APK inakubaliwa",
    "lessonModal.formatsAccepted": "miundo inakubaliwa",
    "lessonModal.browseFile": "Tafuta faili",
    "lessonModal.uploading": "Inapakia",
    "lessonModal.completed": "Imekamilika",
    "lessonModal.failed": "Imeshindwa",
    "lessonModal.removeFile": "Ondoa",
    "lessonModal.addToHubAvailable":
      "Fanya somo hili lipatikane baada ya sasisho lijalo la hub",
    "lessonModal.addToHubNeedsHub":
      "Unganisha Classroom Hub kabla ya kuongeza masomo kwenye hub",
    "lessonModal.creatingLesson": "Inaunda somo...",
    "lessonModal.finishingLesson": "Inamalizia somo...",
    "lessonModal.uploadingFile": "Inapakia faili",
    "lessonModal.duplicateLessonPrefix": "Tayari una somo linaloitwa",
    "lessonModal.duplicateLessonSuffix": "Jaribu jina lingine.",
    "lessonModal.linkHubBeforeAdd":
      "Unganisha Classroom Hub kabla ya kuongeza masomo kwenye hub, au zima Ongeza kwenye Hub kwa sasa.",
    "lessonModal.cannotAddWithoutFiles":
      "Huwezi kuongeza somo kwenye Classroom Hub bila faili.",
    "lessonModal.createFailed": "Imeshindwa kuunda somo. Jaribu tena.",
    "lessonModal.uploadFilesFailed": "Imeshindwa kupakia faili. Jaribu tena.",
    "lessonModal.duplicateFileSingleSuffix": "tayari iko kwenye somo hili.",
    "lessonModal.duplicateFilePluralPrefix":
      "Faili hizi tayari ziko kwenye somo hili:",
    "lessonModal.imageTitle": "Chagua picha ya somo",
    "lessonModal.selectImage": "Chagua picha",
    "lessonModal.uploadImage": "Pakia picha",
    "lessonModal.previewAlt": "Hakiki",
    "lessonModal.saveImage": "Hifadhi picha",
    "lessonModal.onlyImagesAccepted":
      "Faili za .png na .jpg pekee zinakubaliwa.",
    "lessonModal.saveImageFailed": "Imeshindwa kuhifadhi picha. Jaribu tena.",
    "lessonModal.saveChanges": "Hifadhi mabadiliko",
    "archive.action": "Hifadhi kwenye kumbukumbu",
    "archive.modalTitle": "Hifadhi somo kwenye kumbukumbu",
    "archive.modalDescription":
      "Somo hili litaondolewa kwenye Dashibodi ya Masomo. Unaweza kulirudisha baadaye kutoka Masomo yaliyohifadhiwa.",
    "archive.modalDescriptionWithHub":
      "Somo hili litaondolewa kwenye Dashibodi ya Masomo. Sasisha hub baadaye ili wanafunzi wasilione tena kwenye Classroom Hub.",
    "archive.restoreModalDescription":
      "Somo hili litarudi kwenye Dashibodi ya Masomo. Unaweza kuliongeza kwenye hub tena likiwa tayari.",
    "archive.modalConfirm": "Hifadhi somo",
  },
  ar: {
    "app.title": "Rose Portable Classroom Hub",
    "app.educatorDashboard": "لوحة المعلم",
    "language.label": "اللغة",
    "nav.dashboard": "الرئيسية",
    "nav.lessons": "الدروس",
    "nav.classrooms": "الصفوف",
    "nav.sync": "تحديثات Hub",
    "nav.archive": "الأرشيف",
    "home.subtitle": "إدارة الصفوف والدروس لـ صف الطالب.",
    "home.metricLessonSingular": "درس",
    "home.metricLessonPlural": "دروس",
    "home.metricClassroomSingular": "صف",
    "home.metricClassroomPlural": "صفوف",
    "home.quickActions": "إجراءات سريعة",
    "home.createClassroom": "إنشاء صف",
    "home.createClassroomDescription": "أنشئ صفًا ورمز انضمام للطلاب.",
    "home.createLesson": "إنشاء درس",
    "home.createLessonDescription": "ارفع الملفات وعيّنها إلى الصفوف.",
    "home.updateHub": "تحديث Classroom Hub",
    "home.updateHubDescription": "إرسال الدروس المحددة إلى Hub.",
    "home.hubStatusTitle": "Classroom Hub",
    "home.hubLinked": "مرتبط",
    "home.hubNotLinked": "غير مرتبط",
    "home.lastUpdate": "آخر تحديث:",
    "home.noSuccessfulUpdate": "لا يوجد تحديث ناجح بعد.",
    "home.linkHubDescription": "اربط Classroom Hub قبل تحديث الدروس.",
    "home.manageHub": "إدارة Hub من إعدادات الملف الشخصي.",
    "home.setupStillNeeds": "الإعداد ما زال يحتاج",
    "profile.educatorAccount": "حساب المعلم",
    "profile.linkedHub": "Classroom Hub المرتبط",
    "profile.noHub": "لا يوجد Classroom Hub مرتبط",
    "profile.linkHub": "ربط Classroom Hub",
    "profile.replaceHub": "استبدال Classroom Hub",
    "profile.unlinkHub": "إلغاء ربط Classroom Hub",
    "profile.hubGuide": "دليل Classroom Hub",
    "profile.signOut": "تسجيل الخروج",
    "pairing.codeLabel": "رمز ربط Classroom Hub",
    "pairing.help": "يمكنك العثور على هذا الرمز في صفحة إعداد Classroom Hub.",
    "pairing.cancel": "إلغاء",
    "pairing.linking": "جارٍ الربط...",
    "pairing.replacing": "جارٍ الاستبدال...",
    "pairing.unlinking": "جارٍ إلغاء الربط...",
    "pairing.unlinkTitle": "إلغاء ربط Classroom Hub؟",
    "pairing.unlinkConfirm": "إلغاء ربط الجهاز",
    "pairing.unlinkDescription":
      "سيؤدي هذا إلى فصل حساب لوحة المعلم هذا عن جهاز Classroom Hub الحالي. ستبقى الصفوف والدروس في هذا الحساب، لكن هذا الجهاز لن يتلقى تحديثات حتى يتم ربطه مرة أخرى.",
    "pairing.linkDescription":
      "أدخل الرمز الظاهر في صفحة إعداد hub. تنشئ لوحة المعلم على rosepch.org الدروس والصفوف؛ ويحفظها Classroom Hub دون إنترنت للطلاب.",
    "pairing.replaceDescription":
      "أدخل الرمز الظاهر في صفحة إعداد Classroom Hub المحلية على rosehub.local/setup. إذا لم يفتح، استخدم 10.42.0.1/setup. تبقى صفوفك ودروسك في حساب لوحة المعلم هذا.",
    "login.title": "لوحة المعلم",
    "login.createTitle": "إنشاء حساب معلم",
    "login.subtitle": "سجّل الدخول لإدارة الدروس والصفوف وClassroom Hub.",
    "login.createSubtitle":
      "استخدم بريدك الإلكتروني وكلمة مرور لبدء ملف المعلم.",
    "login.signIn": "تسجيل الدخول",
    "login.createAccount": "إنشاء حساب",
    "login.fullName": "الاسم الكامل",
    "login.email": "البريد الإلكتروني",
    "login.password": "كلمة المرور",
    "login.signingIn": "جارٍ تسجيل الدخول...",
    "login.creatingAccount": "جارٍ إنشاء الحساب...",
    "login.newEducator": "معلم جديد؟ أنشئ حسابًا ببريدك الإلكتروني.",
    "login.haveAccount": "لديك حساب؟ سجّل الدخول.",
    "login.invalid": "البريد الإلكتروني أو كلمة المرور غير صحيحة",
    "login.createError":
      "تعذر إنشاء هذا الحساب. جرّب بريدًا أو كلمة مرور مختلفة.",
    "login.checkEmail": "تحقق من بريدك لإكمال إنشاء حساب المعلم.",
    "guide.badge": "دليل Classroom Hub",
    "guide.title": "كيف يعمل Classroom Hub",
    "guide.subtitle":
      "عرض بسيط لكيفية انتقال الدروس من لوحة المعلم إلى Classroom Hub ثم إلى الطلاب في كل صف.",
    "guide.dashboard": "لوحة المعلم",
    "guide.dashboardUrl": "افتح rosepch.org في المتصفح",
    "guide.dashboardBody":
      "الموقع الذي يستخدمه المعلمون لإنشاء الحسابات وربط أو إلغاء ربط hubs وإنشاء الصفوف ورفع ملفات الدروس وحفظ الدروس على hub وتحديث hub.",
    "guide.hub": "Classroom Hub",
    "guide.hubUrl": "افتح rosehub.local/setup أو 10.42.0.1/setup",
    "guide.hubBody":
      "يشمل Classroom Hub جهاز Rose Portable Classroom Hub وأي جهاز لوحي أو هاتف أو كمبيوتر يُستخدم لفتح صف الطالب أو صفحة الإعداد أو الصيانة.",
    "guide.flowDashboard": "لوحة المعلم",
    "guide.flowDashboardText":
      "أنشئ الدروس وارفع الملفات وأنشئ الصفوف وعيّن الدروس.",
    "guide.flowHub": "Classroom Hub",
    "guide.flowHubText":
      "وصّل hub بشبكة Wi-Fi، واعرض رمز الربط، وأكد أنه مرتبط، ونزّل أحدث الملفات.",
    "guide.flowStudents": "صف الطالب",
    "guide.flowStudentsText":
      "يدخلون رمز الصف ويفتحون دروسهم في أي مكان دون إنترنت.",
    "guide.workflowOverview": "نظرة عامة على سير عمل Classroom Hub",
    "guide.createLessons": "إنشاء الدروس",
    "guide.createLessonsText":
      "أنشئ محتوى التعلم في لوحة المعلم. أضف عنوان الدرس والوصف والصورة وأي ملفات يحتاجها الطلاب.",
    "guide.createLessonsItem1": "تحتوي الدروس على محتوى التعليم",
    "guide.createLessonsItem2":
      "يمكن أن تكون الملفات صورًا أو PDF أو فيديوهات أو PowerPoints",
    "guide.createClassrooms": "إنشاء الصفوف وتعيينها",
    "guide.createClassroomsText":
      "في لوحة المعلم، أنشئ كل صف، واضبط رمز الانضمام، ثم اختر الدروس التي تنتمي إلى ذلك الصف.",
    "guide.createClassroomsItem1": "لكل صف رمز انضمام خاص",
    "guide.createClassroomsItem2": "يمكن تعيين الدرس لصف واحد أو أكثر",
    "guide.syncHub": "تحديث Classroom Hub",
    "guide.syncHubText":
      "استخدم تحديثات Hub في لوحة المعلم لإخبار hub المرتبط بالدروس التي يجب تنزيلها. استخدم صفحة الإعداد المحلية فقط إذا احتاج hub إلى مساعدة Wi-Fi أو تنزيل يدوي.",
    "guide.syncHubItem1":
      "يجب أن يكون Classroom Hub قيد التشغيل ومتصلًا بشبكة Wi-Fi فيها إنترنت",
    "guide.syncHubItem2":
      "حدّث hub عند تغيير الدروس أو الملفات أو تعيينات الصفوف",
    "guide.wifiTag": "إعداد الجهاز",
    "guide.syncAtLocation": "إعداد hub أولًا",
    "guide.syncAtLocationText":
      "يجب أن تتم خطوة Wi-Fi الأولى بالقرب من Classroom Hub لأن hub ينشئ نقطة اتصال إعداد خاصة به قبل الاتصال بالإنترنت.",
    "guide.syncAtLocationItem1": "شغّل hub باستخدام شاحن أو بطارية محمولة.",
    "guide.syncAtLocationItem2":
      "انضم إلى نقطة اتصال Wi-Fi باسم Rose-Hub وافتح rosehub.local/setup. إذا لم يفتح، استخدم 10.42.0.1/setup.",
    "guide.syncAtLocationItem3":
      "وصّل hub بشبكة Wi-Fi فيها إنترنت وانسخ رمز الربط.",
    "guide.offlineTag": "دون إنترنت",
    "guide.teachOffline": "التعليم دون إنترنت",
    "guide.teachOfflineText":
      "بعد أن تصبح الدروس جاهزة على Classroom Hub، يمكنك أخذه إلى صف دون إنترنت. يتصل الطلاب بـ Classroom Hub ويفتحون صف الطالب.",
    "guide.teachOfflineItem1": "شغّل Classroom Hub ببطارية محمولة أو شاحن.",
    "guide.teachOfflineItem2":
      "يمكن لعدد غير محدود من الأجهزة اللوحية أو الهواتف أو الكمبيوترات الاتصال أثناء الصف.",
    "guide.teachOfflineItem3": "يدخل الطلاب رمز الصف لرؤية دروسهم.",
    "setupGuide.brandTitle": "دليل إعداد لوحة المعلم",
    "setupGuide.orientationTitle": "أنت في لوحة المعلم",
    "setupGuide.orientationText":
      "استخدم هذه اللوحة لإنشاء الصفوف والدروس ورفع الملفات وتحديث Classroom Hub.",
    "setupGuide.mapDashboardTitle": "لوحة المعلم",
    "setupGuide.mapDashboardText": "أنشئ الصفوف والدروس والملفات وتحديثات Hub.",
    "setupGuide.mapHubTitle": "إعداد Classroom Hub",
    "setupGuide.mapHubText":
      "استخدم جهازًا آخر للاتصال بـ Wi-Fi والحصول على رمز الربط.",
    "setupGuide.mapStudentsTitle": "صف الطالب",
    "setupGuide.mapStudentsText": "يدخل الطلاب رمز الانضمام ويفتحون الدروس.",
    "setupGuide.safeNote":
      "من الآمن الرجوع أو تخطي خطوة الآن أو إعادة تشغيل هذا الدليل. الرجوع لا يحذف الصفوف أو الدروس أو الملفات المرفوعة.",
    "setupGuide.stepSafetyHub":
      "هذه الخطوة تربط Classroom Hub بحساب لوحة المعلم هذا فقط.",
    "setupGuide.stepSafetyClassroom":
      "يمكنك إنشاء صف واحد الآن وإضافة المزيد لاحقًا.",
    "setupGuide.stepSafetyLesson":
      "يمكنك إنشاء درس واحد الآن ثم تعديله أو إضافة ملفات أو تعيين صفوف أخرى لاحقًا.",
    "setupGuide.stepSafetySync":
      "يرسل تحديث Hub الدروس المحددة إلى Classroom Hub. إذا تغيّر شيء، حدّث Hub مرة أخرى.",
    "setupGuide.stepCount": "{current} من {total}",
    "setupGuide.progressLabel": "خطوات الإعداد",
    "setupGuide.stepBadge": "الخطوة {step} · {label}",
    "setupGuide.welcomeTitle": "إعداد لوحة المعلم",
    "setupGuide.welcomeLinked":
      "لوحة المعلم هذه مرتبطة بالفعل بـ Classroom Hub. ابدأ الإعداد للمتابعة مع الصفوف والدروس وتحديثات hub.",
    "setupGuide.welcomeIntro":
      "يعرض هذا الدليل ما يجب فعله في كل مكان: لوحة المعلم، إعداد Classroom Hub، وصف الطالب.",
    "setupGuide.checkDashboardOpen": "أبقِ لوحة المعلم هذه مفتوحة.",
    "setupGuide.checkHubNearby": "تأكد أن Classroom Hub يعمل وقريب منك.",
    "setupGuide.checkOtherDevice":
      "جهّز جهازًا لوحيًا أو هاتفًا أو كمبيوترًا آخر للاتصال بشبكة Wi-Fi الخاصة بإعداد hub.",
    "setupGuide.checkOneStep": "يمكنك الرجوع أو تخطي خطوة وإكمالها لاحقًا.",
    "setupGuide.begin": "بدء الإعداد",
    "setupGuide.skipForNow": "تخطي الآن",
    "setupGuide.finishSetup": "إنهاء الإعداد",
    "setupGuide.pairingLabel": "رمز الربط من صفحة إعداد hub",
    "setupGuide.pairingHelp": "أدخل رمز الربط الظاهر في",
    "setupGuide.pairingFallbackHelp": "إذا لم يفتح، استخدم",
    "setupGuide.linkingHub": "جارٍ ربط hub...",
    "setupGuide.enterPairingCode": "إدخال رمز الربط",
    "setupGuide.createdClassroom": "تم إنشاء",
    "setupGuide.joinCode": "رمز الانضمام",
    "setupGuide.createClassroom": "إنشاء صف",
    "setupGuide.createAnotherClassroom": "إنشاء صف آخر",
    "setupGuide.creatingClassroom": "جارٍ إنشاء الصف...",
    "setupGuide.loadingClassrooms": "جارٍ تحميل الصفوف...",
    "setupGuide.createLesson": "إنشاء درس",
    "setupGuide.createAnotherLesson": "إنشاء درس آخر",
    "setupGuide.hubLinked": "تم ربط Classroom Hub",
    "setupGuide.hubNotLinked": "لم يتم ربط Classroom Hub بعد",
    "setupGuide.lastSuccessfulSync": "آخر تحديث لـ hub: {value}.",
    "setupGuide.noSuccessfulSync": "لم يتم تسجيل تحديث hub بعد.",
    "setupGuide.syncInstruction":
      "اضغط تحديث Hub لإرسال الدروس المحددة إلى Classroom Hub.",
    "setupGuide.linkBeforeSync": "اربط Classroom Hub قبل تحديث دروس hub.",
    "setupGuide.studentJoinCode": "رمز انضمام الطالب",
    "setupGuide.regenerateJoinCode": "إنشاء رمز انضمام جديد",
    "setupGuide.studentJoinCodeHelp":
      "يستخدم الطلاب هذا الرمز المكون من 6 أحرف للانضمام إلى الصف في صف الطالب.",
    "setupGuide.stepHub.title": "إعداد Hub",
    "setupGuide.stepHub.titleDone": "Hub مرتبط بالفعل",
    "setupGuide.stepHub.short": "Hub",
    "setupGuide.stepHub.detail":
      "أبقِ لوحة المعلم مفتوحة. ضع Classroom Hub بجانبك، وجهّز جهازًا لوحيًا أو هاتفًا أو كمبيوترًا آخر لشبكة Wi-Fi الخاصة بإعداد hub.",
    "setupGuide.stepHub.detailDone":
      "لوحة المعلم هذه مرتبطة بالفعل بـ Classroom Hub.",
    "setupGuide.stepHub.action": "إدخال رمز الربط",
    "setupGuide.stepHub.actionDone": "مراجعة تحديثات hub",
    "setupGuide.stepHub.helper":
      "عندما تعرض صفحة إعداد hub رمز الربط، أدخله أدناه لربط هذا hub بلوحة المعلم.",
    "setupGuide.stepHub.helperDone": "تابع إلى الخطوة 2 لإعداد الصفوف.",
    "setupGuide.stepHub.instruction1":
      "وصّل أو شغّل Classroom Hub بجانبك وانتظر حوالي دقيقة واحدة.",
    "setupGuide.stepHub.instruction2":
      "على جهاز لوحي أو هاتف أو كمبيوتر آخر بجانبك، افتح إعدادات Wi-Fi وانضم إلى الشبكة المسماة Rose-Hub-XXXX. تختلف آخر أربعة أحرف لكل hub. استخدم كلمة المرور rosehub! إذا طُلبت.",
    "setupGuide.stepHub.instruction3":
      "على الجهاز نفسه، افتح متصفحًا وأدخل http://rosehub.local/setup. إذا لم يفتح، استخدم http://10.42.0.1/setup. أكمل خطوات إعداد hub، ثم عُد إلى لوحة المعلم هذه ومعك رمز الربط.",
    "setupGuide.stepClassroom.title": "إنشاء صف",
    "setupGuide.stepClassroom.short": "الصف",
    "setupGuide.stepClassroom.detail":
      "أنشئ صفًا واحفظ رمز الانضمام المكون من 6 أحرف.",
    "setupGuide.stepClassroom.detailDoneSingular": "تم إنشاء {count} صف.",
    "setupGuide.stepClassroom.detailDonePlural": "تم إنشاء {count} صفوف.",
    "setupGuide.stepLesson.title": "إنشاء درس",
    "setupGuide.stepLesson.short": "الدرس",
    "setupGuide.stepLesson.detail": "أنشئ درسًا، وأضف الملفات، وعيّنه إلى صف.",
    "setupGuide.stepLesson.detailDoneSingular": "تم إنشاء درس واحد.",
    "setupGuide.stepLesson.detailDonePlural": "تم إنشاء {count} دروس.",
    "setupGuide.stepLesson.detailNeedsSync":
      "تم إنشاء درس، لكنه غير محدد بعد لـ Classroom Hub.",
    "setupGuide.stepLesson.detailReadySingular":
      "{count} درس جاهز لـ Classroom Hub.",
    "setupGuide.stepLesson.detailReadyPlural":
      "{count} دروس جاهزة لـ Classroom Hub.",
    "setupGuide.stepSync.title": "تحديث Classroom Hub",
    "setupGuide.stepSync.short": "تحديث hub",
    "setupGuide.stepSync.detail":
      "أرسل الدروس المحددة من لوحة المعلم إلى Classroom Hub.",
    "setupGuide.stepSync.detailDoneSingular":
      "{count} درس جاهز على Classroom Hub.",
    "setupGuide.stepSync.detailDonePlural":
      "{count} دروس جاهزة على Classroom Hub.",
    "setupGuideModal.title": "دليل الإعداد",
    "setupGuideModal.body":
      "استخدم الإعداد الموجّه لمعرفة الترتيب الصحيح. سيخبرك متى تستخدم لوحة المعلم، ومتى تستخدم إعداد Classroom Hub، ومتى يصبح الطلاب جاهزين لفتح صف الطالب.",
    "setupGuideModal.hubTitle": "1. عند Classroom Hub",
    "setupGuideModal.hubStep1": "شغّل hub باستخدام شاحن أو بطارية محمولة.",
    "setupGuideModal.hubStep2":
      "على جهاز لوحي أو هاتف أو كمبيوتر آخر، انضم إلى Wi-Fi باسم Rose-Hub إذا ظهر.",
    "setupGuideModal.hubStep3":
      "على الجهاز نفسه، افتح http://rosehub.local/setup. إذا لم يفتح، استخدم http://10.42.0.1/setup.",
    "setupGuideModal.hubStep4": "وصّل hub بشبكة Wi-Fi فيها إنترنت.",
    "setupGuideModal.hubStep5": "انسخ رمز الربط الظاهر على hub.",
    "setupGuideModal.dashboardTitle": "2. في لوحة المعلم",
    "setupGuideModal.dashboardStep1":
      "استخدم هذه اللوحة على https://rosepch.org.",
    "setupGuideModal.dashboardStep2": "أدخل رمز ربط hub.",
    "setupGuideModal.dashboardStep3": "أنشئ الصفوف واحفظ رمز الانضمام لكل صف.",
    "setupGuideModal.dashboardStep4": "أنشئ الدروس وارفع الملفات.",
    "setupGuideModal.dashboardStep5": "أضف الدروس إلى Classroom Hub وحدّث hub.",
    "setupGuideModal.studentsTitle": "3. للطلاب",
    "setupGuideModal.studentsStep1":
      "يتصل الطلاب بأجهزتهم اللوحية أو هواتفهم أو كمبيوتراتهم بشبكة Wi-Fi الخاصة بـ Classroom Hub.",
    "setupGuideModal.studentsStep2":
      "يفتح الطلاب صف الطالب على http://rosehub.local/join. إذا لم يفتح، يستخدمون http://10.42.0.1/join.",
    "setupGuideModal.studentsStep3": "يدخل الطلاب رمز انضمام الصف من المعلم.",
    "missingDevice.title": "اربط Classroom Hub الخاص بك",
    "missingDevice.description":
      "أنت في لوحة المعلم على rosepch.org. اربط Classroom Hub حتى تُرسل دروس هذا الحساب إلى صف الطالب.",
    "missingDevice.viewSetupSteps": "عرض خطوات الإعداد",
    "missingDevice.step1":
      "على hub، افتح إعداد Classroom Hub على rosehub.local/setup. إذا لم يفتح، استخدم 10.42.0.1/setup.",
    "missingDevice.step2": "انسخ رمز الربط لمرة واحدة الظاهر على hub.",
    "missingDevice.step3": "ارجع إلى لوحة المعلم هذه وأدخل رمز الربط هنا.",
    "missingDevice.help":
      "هل تم إعداد Classroom Hub هذا بالفعل بحساب معلم آخر؟ سجّل الدخول بذلك الحساب، أو أعد ضبط Classroom Hub هذا قبل ربطه بمعلم جديد.",
    "missingDevice.linkSuccess":
      "تم ربط Classroom Hub. جارٍ فتح لوحة التحكم...",
    "missingDevice.linked": "مرتبط",
    "common.back": "رجوع",
    "common.next": "التالي",
    "common.closeModal": "إغلاق النافذة",
    "common.gotIt": "فهمت",
    "common.openSetupGuide": "فتح دليل الإعداد",
    "common.recorded": "مسجل",
    "common.cancel": "إلغاء",
    "common.save": "حفظ",
    "common.saving": "جارٍ الحفظ...",
    "common.create": "إنشاء",
    "common.creating": "جارٍ الإنشاء...",
    "common.copied": "تم النسخ",
    "common.working": "جارٍ العمل...",
    "common.searchPlaceholder": "ابحث عن درس أو ملف",
    "common.clearSearch": "مسح البحث",
    "common.sortBy": "ترتيب حسب",
    "common.classroom": "الصف",
    "common.selected": "محدد",
    "common.card": "بطاقات",
    "common.list": "قائمة",
    "common.morePrefix": "+",
    "common.moreSuffix": "المزيد",
    "common.showLess": "عرض أقل",
    "sort.updatedNewest": "المحدّثة مؤخرًا",
    "sort.updatedOldest": "آخر تحديث (الأقدم)",
    "sort.createdNewest": "الدروس الأحدث",
    "sort.createdOldest": "تاريخ الإنشاء (الأقدم)",
    "sort.nameAsc": "اسم الدرس أ-ي",
    "sort.recentlyArchived": "الأرشيف الأحدث",
    "sort.oldestArchived": "الأرشيف الأقدم",
    "status.synced": "جاهز على Hub",
    "status.pendingSync": "تحديث Hub",
    "status.pendingSyncLower": "تحديث hub",
    "status.pendingRemoval": "إزالة في التحديث التالي",
    "status.dashboardOnly": "في لوحة التحكم فقط",
    "lessons.title": "الدروس",
    "lessons.description":
      "أنشئ الدروس وعيّن الصفوف واختر ما تريد حفظه على Classroom Hub.",
    "lessons.create": "إنشاء درس",
    "lessons.createLower": "إنشاء درس",
    "lessons.searchPlaceholder": "ابحث عن الدروس أو الصفوف أو الملفات",
    "lessons.details": "التفاصيل",
    "lessons.noLessons": "لا توجد دروس بعد.",
    "lessons.empty": "أنشئ أول درس لإضافة الملفات وتعيين صف.",
    "lessons.noMatches": "لا توجد دروس تطابق البحث.",
    "lessons.tryDifferent": "جرّب صفًا آخر أو كلمة بحث مختلفة.",
    "lessons.readySingular": "درس جاهز لـ hub",
    "lessons.readyPlural": "دروس جاهزة لـ hub",
    "lessons.needsClassroomSingular": "الدرس يحتاج إلى صف",
    "lessons.needsClassroomPlural": "الدروس تحتاج إلى صف",
    "lessons.activeSingular": "درس نشط",
    "lessons.activePlural": "دروس نشطة",
    "lessons.reviewSync": "مراجعة تحديثات hub",
    "lessons.manageClassrooms": "إدارة الصفوف",
    "lessons.restoreTitle": "استعادة الدرس",
    "lessons.restoreDescription": "سيتم استعادة هذا الدرس.",
    "lessons.restoreConfirm": "استعادة إلى النشطة",
    "lessons.removeSyncTitle": "إزالة الدرس من Hub",
    "lessons.removeSyncDescription":
      "سيبقى الدرس محفوظًا في لوحة التحكم. سيُزال من Classroom Hub بعد نجاح التحديث التالي.",
    "lessons.removePendingTitle": "إزالة الدرس في التحديث التالي",
    "lessons.removePendingDescription":
      "سيبقى الدرس محفوظًا في لوحة التحكم. بعد نجاح التحديث التالي، لن يراه الطلاب على Classroom Hub.",
    "lessons.removeConfirm": "إزالة من Hub",
    "lessons.removeOnNextUpdate": "إزالة في التحديث التالي",
    "lessons.removeHubAction": "إزالة",
    "lessons.remove": "إزالة من Hub",
    "lessons.restore": "استعادة",
    "lessons.noFilesAttached": "لا توجد ملفات مرفقة بهذا الدرس.",
    "lessons.lessonCountSingular": "درس",
    "lessons.lessonCountPlural": "دروس",
    "lessons.of": "من",
    "archive.title": "الدروس المؤرشفة",
    "archive.description":
      "استعد الدروس عندما تريد إعادتها إلى اللوحة أو قائمة تحديثات hub.",
    "archive.emptyTitle": "لا توجد دروس مؤرشفة بعد.",
    "archive.emptyDescription": "ستظهر هنا الدروس التي تقوم بأرشفتها.",
    "classrooms.title": "الصفوف",
    "classrooms.description": "قم بإعداد كل صف برمز انضمام خاص به.",
    "classrooms.searchPlaceholder": "ابحث عن الصفوف أو الرموز أو الدروس",
    "classrooms.classroomCountSingular": "صف",
    "classrooms.classroomCountPlural": "صفوف",
    "classrooms.createModalIntro": "أنشئ صفًا ثم شارك رمز الانضمام مع الطلاب.",
    "classrooms.name": "اسم الصف",
    "classrooms.namePlaceholder": "مجموعة تعليمية",
    "classrooms.joinCode": "رمز الانضمام",
    "classrooms.joinCodePlaceholder": "ABC123",
    "classrooms.hint":
      "يستخدم الطلاب هذا الرمز المكوّن من 6 أحرف أو أرقام للانضمام إلى الصف. يبقى صالحًا حتى تغيّره.",
    "classrooms.newCode": "رمز جديد",
    "classrooms.create": "إنشاء صف",
    "classrooms.nameRequired": "اسم الصف مطلوب.",
    "classrooms.joinCodeExact": "استخدم 6 أحرف أو أرقام بالضبط لرمز الانضمام.",
    "classrooms.joinCodeUsedByAnother":
      "رمز الانضمام هذا مستخدم بالفعل في صف آخر.",
    "classrooms.createFailed": "تعذر إنشاء الصف. يرجى المحاولة مرة أخرى.",
    "classrooms.updateFailed": "تعذر تحديث الصف. يرجى المحاولة مرة أخرى.",
    "classrooms.removeLessonFailed":
      "تعذر إزالة الدرس من هذا الصف. يرجى المحاولة مرة أخرى.",
    "classrooms.deleteOwnOnly": "يمكن حذف الصفوف التي أنشأها هذا الحساب فقط.",
    "classrooms.checkFailed": "تعذر فحص هذا الصف. يرجى المحاولة مرة أخرى.",
    "classrooms.deleteFailed": "تعذر حذف الصف. يرجى المحاولة مرة أخرى.",
    "classrooms.deleteTitle": "حذف {classroom}؟",
    "classrooms.deleteDescriptionWithLesson":
      "يستخدم درس واحد هذا الصف. ستتم إزالته من قائمة تحديثات hub حتى يتم تعيينه إلى صف آخر.\n\nحدّث hub بعد ذلك لإزالة ذلك الدرس من جهاز الصف.",
    "classrooms.deleteDescriptionWithLessons":
      "تستخدم {count} دروس هذا الصف. ستتم إزالتها من قائمة تحديثات hub حتى يتم تعيينها إلى صف آخر.\n\nحدّث hub بعد ذلك لإزالة تلك الدروس من جهاز الصف.",
    "classrooms.deleteDescriptionNoLessons":
      "سيتم حذف هذا الصف. لن تتغير الدروس المعينة بالفعل إلى صفوف أخرى.",
    "classrooms.tableLabel": "رموز انضمام الصفوف",
    "classrooms.noCode": "لا يوجد رمز",
    "classrooms.copyCode": "نسخ رمز الانضمام",
    "classrooms.editCode": "تعديل رمز الانضمام",
    "classrooms.editClassroom": "تعديل الصف",
    "classrooms.changeJoinCodeTitle": "تغيير رمز انضمام الصف؟",
    "classrooms.changeJoinCodeDescription":
      "سيحتاج الطلاب إلى رمز الانضمام الجديد في المرة التالية التي ينضمون فيها إلى هذا الصف.",
    "classrooms.changeJoinCodeConfirm": "تغيير الرمز",
    "classrooms.delete": "حذف الصف",
    "classrooms.checking": "جارٍ فحص الصف",
    "classrooms.empty": "أنشئ صفًا لتعيين الدروس ومشاركة رمز الانضمام.",
    "classrooms.noMatches": "لا توجد صفوف تطابق البحث.",
    "classrooms.tryDifferent": "جرّب صفًا أو رمز انضمام أو درسًا آخر.",
    "classrooms.keep": "الاحتفاظ بالصف",
    "classrooms.lessons": "الدروس",
    "classrooms.lessonSingular": "درس واحد",
    "classrooms.lessonPlural": "{count} دروس",
    "classrooms.noLessonsAssigned": "لا توجد دروس معينة بعد.",
    "classrooms.removeLesson": "إزالة من هذا الصف",
    "classrooms.removeLessonTitle": "إزالة الدرس من هذا الصف؟",
    "classrooms.removeLessonDescription":
      "سيؤدي هذا إلى إزالة {lesson} من {classroom}. سيبقى الدرس في لوحة التحكم. حدّث Classroom Hub بعد ذلك حتى يرى الطلاب التغيير.",
    "classrooms.removeLessonConfirm": "إزالة الدرس",
    "classrooms.synced": "جاهز على Hub",
    "classrooms.needsSync": "تحديث Hub",
    "classrooms.notSavedToHub": "لوحة التحكم فقط",
    "sync.title": "تحديث Classroom Hub",
    "sync.subtitle": "اختر الدروس للاستخدام دون إنترنت ثم حدّث Classroom Hub.",
    "sync.emptySubtitle":
      "اربط Classroom Hub عندما تكون جاهزًا لإرسال الدروس للاستخدام دون إنترنت.",
    "sync.noHubTitle": "لم يتم ربط Classroom Hub بعد",
    "sync.noHubText":
      "يمكنك تجهيز الدروس والصفوف الآن. اربط Classroom Hub عندما يكون الجهاز جاهزًا، ثم عُد هنا لإرسالها للاستخدام دون إنترنت.",
    "sync.noHubStep1": "افتح صفحة إعداد Classroom Hub المحلية.",
    "sync.noHubStep2": "انسخ رمز الربط الظاهر هناك.",
    "sync.noHubStep3": "افتح قائمة ملفك الشخصي واختر ربط Classroom Hub.",
    "sync.lessonsToSync": "الدروس المحددة لـ Hub",
    "sync.progress": "تحديث Classroom Hub",
    "sync.addToHub": "إضافة إلى Hub",
    "sync.removeFromHub": "إزالة من Hub",
    "sync.button": "تحديث Hub",
    "sync.syncing": "جارٍ التحديث...",
    "sync.buttonTitle": "تحديث Classroom Hub",
    "sync.linkHubFirst": "اربط Hub أولاً",
    "sync.linkHubFirstTitle": "اربط Classroom Hub قبل تحديث دروس hub",
    "sync.hubLinked": "Classroom Hub مرتبط",
    "sync.hubManagedInProfile": "إدارة من إعدادات الملف الشخصي.",
    "sync.notSynced": "لم يتم التحديث بعد",
    "sync.lastUpdated": "آخر تحديث",
    "sync.summary": "ملخص Hub",
    "sync.noticeEmptyTitle": "لم يتم اختيار أي دروس للـ Hub بعد",
    "sync.noticeEmptyBody":
      "افتح درسًا واختر إضافة إلى Hub عندما يجب أن يراه الطلاب في صف الطالب.",
    "sync.noticeNeedsTitle": "يحتاج Classroom Hub إلى تحديث",
    "sync.noticeNeedsBody":
      "اضغط تحديث Hub حتى يستلم Classroom Hub أحدث الدروس وتغييرات الصفوف.",
    "sync.noticeReadyTitle": "Classroom Hub محدّث",
    "sync.noticeReadyBody":
      "الدروس المحددة جاهزة على Classroom Hub. حدّث مرة أخرى بعد تغيير الدروس أو الملفات أو الصفوف.",
    "sync.emptyLessonsTitle": "لم يتم اختيار أي دروس للـ Hub بعد.",
    "sync.emptyLessonsDescription":
      "افتح درسًا واختر إضافة إلى Hub عندما يجب أن يراه الطلاب في صف الطالب.",
    "sync.mapDashboardTitle": "لوحة التحكم فقط",
    "sync.mapDashboardDescription": "محفوظ في لوحة المعلم، وغير محدد للـ Hub.",
    "sync.mapPendingTitle": "تحديثات Hub المعلقة",
    "sync.mapPendingDescription":
      "سيتغير على Classroom Hub بعد تشغيل تحديث Hub.",
    "sync.mapReadyTitle": "جاهز على Hub",
    "sync.mapReadyDescription": "متاح للطلاب على Classroom Hub الآن.",
    "sync.mapEmpty": "لا توجد دروس هنا بعد.",
    "sync.flowTitle": "كيف تعمل تحديثات Hub",
    "sync.flowIntro":
      "استخدم هذه الصفحة عندما تحتاج الدروس أو الصفوف إلى تغيير على Classroom Hub.",
    "sync.flowAddTitle": "أضف الدروس",
    "sync.flowAddPrefix": "اختر ",
    "sync.flowAddSuffix": " عندما يحتاج الطلاب إلى درس متاح دون إنترنت.",
    "sync.flowChangesTitle": "راقب التغييرات",
    "sync.flowChangesPrefix":
      "إذا عدّلت درسًا أو أزلته من صف أو غيّرت مكان ظهوره، سيظهر ",
    "sync.flowChangesSuffix": ".",
    "sync.flowSelectTitle": "اختر الدروس",
    "sync.flowSelectText":
      "اختر إضافة إلى Hub في الدرس لإضافته إلى هذه القائمة. اختر إزالة من Hub عندما لا يجب أن يراه الطلاب على الجهاز.",
    "sync.flowSelectPrefix": "اختر ",
    "sync.flowSelectMiddle": " في الدرس لإضافته هنا. اختر ",
    "sync.flowSelectSuffix": " عندما لا يجب أن يراه الطلاب على Classroom Hub.",
    "sync.flowReviewTitle": "راجع الحالة",
    "sync.flowReviewText":
      "تحديث Hub يعني أن لوحة التحكم فيها تغييرات لم تصل إلى الجهاز بعد. جاهز على Hub يعني أن آخر تحديث اكتمل.",
    "sync.flowReviewMiddle":
      " يعني أن لوحة التحكم فيها تحديثات لم تصل إلى Classroom Hub بعد. ",
    "sync.flowReviewSuffix": " يعني أن آخر تحديث لـ Hub اكتمل.",
    "sync.flowUpdateTitle": "حدّث الجهاز",
    "sync.flowUpdateText":
      "اضغط تحديث Hub لإرسال ملفات الدروس وتعيينات الصفوف والإزالة إلى Classroom Hub.",
    "sync.flowUpdatePrefix": "اضغط ",
    "sync.flowUpdateSuffix": " لإرسال التغييرات المنتظرة إلى Classroom Hub.",
    "sync.flowReadyTitle": "راجع صف الطالب",
    "sync.flowReadyPrefix": "عند انتهاء التحديث، تكون الدروس التي تحمل علامة ",
    "sync.flowReadySuffix": " متاحة للطلاب في صف الطالب.",
    "sync.flowRemovalNote":
      "لتعليمات الإعداد لأول مرة، استخدم دليل الإعداد. هذا القسم للتحديثات اليومية للـ Hub فقط.",
    "sync.successTitle": "تم تحديث Hub",
    "sync.errorTitle": "فشل تحديث hub",
    "sync.successBody": "تم تحديث Classroom Hub.",
    "sync.errorBody": "تعذر إكمال تحديث hub. يرجى المحاولة لاحقًا.",
    "sync.requestError": "تعذر إكمال طلب تحديث hub.",
    "sync.continue": "متابعة",
    "sync.tryLater": "المحاولة لاحقًا",
    "sync.syncAgain": "التحديث مرة أخرى",
    "sync.stage.waiting": "بانتظار الجهاز",
    "sync.stage.preparing": "جارٍ تجهيز المحتوى دون إنترنت...",
    "sync.stage.downloading": "جارٍ تنزيل ملفات الدروس...",
    "sync.stage.finalizing": "جارٍ إنهاء التحديث...",
    "storage.loading": "جارٍ تحميل التخزين...",
    "storage.notReported": "لم يتم إرسال معلومات التخزين بعد",
    "storage.syncToUpdate": "حدّث hub للتغيير",
    "storage.usedPercent": "مستخدم",
    "storage.gbUsed": "{used} غيغابايت من {total} غيغابايت مستخدمة",
    "files.files": "الملفات",
    "files.fileSingular": "ملف",
    "files.filePlural": "ملفات",
    "files.noDescription": "لم تتم إضافة وصف.",
    "files.noFileSelected": "لم يتم اختيار ملف.",
    "files.previewUnavailable": "المعاينة غير متاحة بعد.",
    "files.download": "تنزيل",
    "files.openFullScreen": "فتح بملء الشاشة",
    "files.noClassrooms": "لا توجد صفوف معينة.",
    "files.name": "الاسم",
    "files.dateAdded": "تاريخ الإضافة",
    "files.dateModified": "تاريخ التعديل",
    "files.fileSize": "حجم الملف",
    "files.drag": "اسحب الملفات لتغيير الترتيب.",
    "files.sortingActiveDrag":
      "الترتيب مفعّل. امسح الترتيب لسحب الملفات وترتيبها يدويًا.",
    "files.searchActiveDrag":
      "البحث مفعّل. امسح البحث لسحب الملفات وترتيبها يدويًا.",
    "files.totalSize": "الحجم الإجمالي",
    "files.noMatches": "لا توجد ملفات تطابق البحث.",
    "files.selectAll": "تحديد كل الملفات",
    "files.upload": "رفع الملفات",
    "files.deleteSingular": "حذف ملف",
    "files.deletePlural": "حذف ملفات",
    "lessons.edit": "تعديل الدرس",
    "lessons.editDetails": "تعديل التفاصيل",
    "common.loading": "جارٍ التحميل...",
    "lessonModal.customize": "تخصيص",
    "lessonModal.createTitle": "إنشاء درس جديد",
    "lessonModal.editTitle": "تعديل الدرس",
    "lessonModal.name": "الاسم",
    "lessonModal.lessonTitlePlaceholder": "عنوان الدرس",
    "lessonModal.description": "الوصف",
    "lessonModal.descriptionPlaceholder": "وصف مختصر للدرس",
    "lessonModal.select": "اختيار",
    "lessonModal.noClassrooms": "لا توجد صفوف بعد.",
    "lessonModal.newClassroom": "صف جديد",
    "lessonModal.classroomNameRequired": "اسم الصف مطلوب.",
    "lessonModal.joinCodeLength":
      "لرمز الانضمام، استخدم 6 أحرف أو أرقام بالضبط.",
    "lessonModal.joinCodeUsed": "رمز الانضمام هذا مستخدم بالفعل.",
    "lessonModal.createClassroomFailed": "تعذر إنشاء الصف. حاول مرة أخرى.",
    "lessonModal.classroomRequired": "مطلوب صف واحد على الأقل.",
    "lessonModal.studentJoinCodeInfo": "ما هو رمز انضمام الطالب؟",
    "lessonModal.studentJoinCodeTooltip":
      "يدخل الطلاب هذا الرمز في صفحة الانضمام على Classroom Hub لرؤية دروس هذا الصف.",
    "lessonModal.uploadFiles": "رفع الملفات",
    "lessonModal.chooseFiles": "اختر الملفات أو اسحبها هنا",
    "lessonModal.chooseFile": "اختر ملفًا أو اسحبه هنا",
    "lessonModal.fileFormats": "تُقبل صيغ JPEG وPNG وPDF وMP4 وPowerPoint وAPK",
    "lessonModal.formatsAccepted": "صيغ مقبولة",
    "lessonModal.browseFile": "تصفح ملف",
    "lessonModal.uploading": "جارٍ الرفع",
    "lessonModal.completed": "اكتمل",
    "lessonModal.failed": "فشل",
    "lessonModal.removeFile": "إزالة",
    "lessonModal.addToHubAvailable":
      "اجعل هذا الدرس متاحًا بعد تحديث hub التالي",
    "lessonModal.addToHubNeedsHub":
      "اربط Classroom Hub قبل إضافة الدروس إلى hub",
    "lessonModal.creatingLesson": "جارٍ إنشاء الدرس...",
    "lessonModal.finishingLesson": "جارٍ إنهاء الدرس...",
    "lessonModal.uploadingFile": "جارٍ رفع الملف",
    "lessonModal.duplicateLessonPrefix": "لديك درس بالفعل باسم",
    "lessonModal.duplicateLessonSuffix": "جرّب اسمًا مختلفًا.",
    "lessonModal.linkHubBeforeAdd":
      "اربط Classroom Hub قبل إضافة الدروس إلى hub، أو أوقف إضافة إلى Hub الآن.",
    "lessonModal.cannotAddWithoutFiles":
      "لا يمكن إضافة درس إلى Classroom Hub دون ملفات.",
    "lessonModal.createFailed": "فشل إنشاء الدرس. حاول مرة أخرى.",
    "lessonModal.uploadFilesFailed": "فشل رفع الملفات. حاول مرة أخرى.",
    "lessonModal.duplicateFileSingleSuffix": "موجود بالفعل في هذا الدرس.",
    "lessonModal.duplicateFilePluralPrefix":
      "هذه الملفات موجودة بالفعل في هذا الدرس:",
    "lessonModal.imageTitle": "اختيار صورة الدرس",
    "lessonModal.selectImage": "اختيار صورة",
    "lessonModal.uploadImage": "رفع صورة",
    "lessonModal.previewAlt": "معاينة",
    "lessonModal.saveImage": "حفظ الصورة",
    "lessonModal.onlyImagesAccepted": "تُقبل ملفات .png و.jpg فقط.",
    "lessonModal.saveImageFailed": "فشل حفظ الصورة. حاول مرة أخرى.",
    "lessonModal.saveChanges": "حفظ التغييرات",
    "archive.action": "أرشفة",
    "archive.modalTitle": "أرشفة الدرس",
    "archive.modalDescription":
      "سيُزال هذا الدرس من لوحة الدروس. يمكنك استعادته لاحقًا من الدروس المؤرشفة.",
    "archive.modalDescriptionWithHub":
      "سيُزال هذا الدرس من لوحة الدروس. حدّث hub بعد ذلك حتى لا يراه الطلاب على Classroom Hub.",
    "archive.restoreModalDescription":
      "سيعود هذا الدرس إلى لوحة الدروس. يمكنك إضافته إلى hub مرة أخرى عندما يكون جاهزًا.",
    "archive.modalConfirm": "أرشفة الدرس",
  },
};
