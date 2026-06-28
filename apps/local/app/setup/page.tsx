"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RoseLogo from "@/assets/images/rose-academies-logo.png";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/lib/i18n";
import styles from "./page.module.css";

type WifiNetwork = {
  ssid: string;
  signal: number;
  security: string;
  active: boolean;
};

type WifiStatus = {
  supported: boolean;
  hostname?: string;
  hotspotName?: string | null;
  connectionName?: string | null;
  connectivity?: string;
  hotspotActive?: boolean;
  networks?: WifiNetwork[];
  lastResult?: { status: string; message: string } | null;
  error?: string;
};

type DevicePairingInfo = {
  deviceId: string;
  pairingCode: string;
  status: "ready" | "claimed" | "not_registered";
  claimed: boolean;
  linkedEducatorEmail?: string | null;
  linkedEducatorName?: string | null;
  error?: string;
};

type OfflineReadinessReport = {
  ready: boolean;
  checkedAt: string;
  groups: number;
  lessons: number;
  expectedFiles: number;
  readableFiles: number;
  sizeVerifiedFiles: number;
  hashVerifiedFiles: number;
  hasPendingDownloads: boolean;
  pendingLessons: number;
  lastSuccessfulSync: string | null;
  issues: { type: string; fileName?: string; message: string }[];
};

type SetupStep = "welcome" | "wifi" | "account" | "content" | "ready";

const SETUP_STEP_IDS: SetupStep[] = [
  "welcome",
  "wifi",
  "account",
  "content",
  "ready",
];

function formatTimestamp(timestamp: string | null | undefined, locale: string) {
  if (!timestamp) return null;

  return new Date(timestamp).toLocaleString(locale, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatLinkedEducator(pairing: DevicePairingInfo, fallback: string) {
  if (pairing.linkedEducatorName && pairing.linkedEducatorEmail) {
    return `${pairing.linkedEducatorName} (${pairing.linkedEducatorEmail})`;
  }

  return pairing.linkedEducatorEmail ?? pairing.linkedEducatorName ?? fallback;
}

function getPairingSetupMessage(message: string, fallback: string) {
  if (message.toLowerCase().includes("missing classroom hub pairing code")) {
    return fallback;
  }

  return message;
}

export default function SetupPage() {
  const { language, t } = useLanguage();
  const [step, setStep] = useState<SetupStep>("welcome");
  const [status, setStatus] = useState<WifiStatus | null>(null);
  const [selectedSsid, setSelectedSsid] = useState("");
  const [manualSsid, setManualSsid] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pairing, setPairing] = useState<DevicePairingInfo | null>(null);
  const [pairingError, setPairingError] = useState<string | null>(null);
  const [isPairingLoading, setIsPairingLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [readiness, setReadiness] = useState<OfflineReadinessReport | null>(
    null,
  );
  const [isReadinessLoading, setIsReadinessLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [showDeviceSetup, setShowDeviceSetup] = useState(false);
  const previousPairingClaimedRef = useRef<boolean | null>(null);
  const hasUserNavigatedRef = useRef(false);
  const setupSteps = SETUP_STEP_IDS.map(id => ({
    id,
    label: t(`setup.step.${id === "wifi" ? "internet" : id}`),
  }));

  function tr(key: string, replacements: Record<string, string | number> = {}) {
    return Object.entries(replacements).reduce(
      (value, [name, replacement]) =>
        value.replaceAll(`{${name}}`, String(replacement)),
      t(key),
    );
  }

  function signalLabel(signal: number) {
    if (signal >= 75) return "Strong";
    if (signal >= 45) return "Good";
    return "Weak";
  }

  function internetStatusLabel(connectivity: string | null | undefined) {
    switch (connectivity?.toLowerCase()) {
      case "full":
        return t("setup.online");
      case "limited":
        return t("setup.limited");
      case "portal":
        return t("setup.portal");
      case "none":
        return t("setup.noInternet");
      case "setup mode":
        return t("setup.setupNetworkActive");
      case "unknown":
        return t("setup.checkingConnection");
      case "unsupported":
        return t("setup.availableOnHub");
      default:
        return connectivity ? t("setup.connected") : t("setup.online");
    }
  }

  function pluralize(count: number, singularKey: string, pluralKey: string) {
    return `${count} ${count === 1 ? t(singularKey) : t(pluralKey)}`;
  }

  const changeStep = useCallback((nextStep: SetupStep) => {
    hasUserNavigatedRef.current = true;
    setStep(nextStep);
    window.localStorage.setItem("rose-setup-step", nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const savedStep = window.localStorage.getItem(
      "rose-setup-step",
    ) as SetupStep | null;

    if (savedStep && SETUP_STEP_IDS.includes(savedStep)) {
      setStep(savedStep);
    }
  }, []);

  const loadNetworks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/setup/wifi", { cache: "no-store" });
      const result = (await response.json()) as WifiStatus;

      setStatus(result);
      if (!response.ok) {
        throw new Error(result.error ?? t("setup.unableScan"));
      }
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : t("setup.unableScan"),
      );
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  const loadPairing = useCallback(
    async (silent = false) => {
      if (!silent) {
        setIsPairingLoading(true);
        setPairingError(null);
      }

      try {
        const response = await fetch("/api/setup/device", {
          cache: "no-store",
        });
        const result = (await response.json()) as DevicePairingInfo;

        if (!response.ok) {
          throw new Error(result.error ?? t("setup.statusUnavailable"));
        }

        setPairing(result);
      } catch (pairingLoadError) {
        if (!silent) {
          setPairingError(
            pairingLoadError instanceof Error
              ? getPairingSetupMessage(
                  pairingLoadError.message,
                  t("setup.statusUnavailable"),
                )
              : t("setup.statusUnavailable"),
          );
        }
      } finally {
        if (!silent) setIsPairingLoading(false);
      }
    },
    [t],
  );

  const loadReadiness = useCallback(
    async (silent = false) => {
      if (!silent) setIsReadinessLoading(true);

      try {
        const response = await fetch("/api/setup/readiness", {
          cache: "no-store",
        });
        const result = (await response.json()) as OfflineReadinessReport;

        if (!response.ok) {
          throw new Error(t("setup.unableVerify"));
        }

        setReadiness(result);
      } catch (readinessError) {
        setReadiness({
          ready: false,
          checkedAt: new Date().toISOString(),
          groups: 0,
          lessons: 0,
          expectedFiles: 0,
          readableFiles: 0,
          sizeVerifiedFiles: 0,
          hashVerifiedFiles: 0,
          hasPendingDownloads: false,
          pendingLessons: 0,
          lastSuccessfulSync: null,
          issues: [
            {
              type: "verification",
              message:
                readinessError instanceof Error
                  ? readinessError.message
                  : t("setup.unableVerify"),
            },
          ],
        });
      } finally {
        if (!silent) setIsReadinessLoading(false);
      }
    },
    [t],
  );

  useEffect(() => {
    void Promise.all([loadNetworks(), loadPairing(), loadReadiness()]);
  }, [loadNetworks, loadPairing, loadReadiness]);

  useEffect(() => {
    if (step === "account") void loadPairing();
    if (step === "content" || step === "ready") {
      void loadReadiness();
    }
  }, [loadPairing, loadReadiness, step]);

  useEffect(() => {
    if (step !== "account" || pairing?.claimed) return;

    const refreshPairing = () => {
      if (document.visibilityState === "hidden") return;
      void loadPairing(true);
    };

    const intervalId = window.setInterval(refreshPairing, 3000);
    window.addEventListener("focus", refreshPairing);
    document.addEventListener("visibilitychange", refreshPairing);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", refreshPairing);
      document.removeEventListener("visibilitychange", refreshPairing);
    };
  }, [loadPairing, pairing?.claimed, step]);

  useEffect(() => {
    const wasClaimed = previousPairingClaimedRef.current;
    const isClaimed = pairing?.claimed === true;

    previousPairingClaimedRef.current = isClaimed;

    if (step === "account" && wasClaimed === false && isClaimed) {
      changeStep("content");
    }
  }, [changeStep, pairing?.claimed, step]);

  useEffect(() => {
    if (step !== "content" && step !== "ready") return;

    const refreshReadiness = () => {
      if (document.visibilityState === "hidden") return;
      void loadReadiness(true);
    };

    const intervalId = window.setInterval(refreshReadiness, 10000);
    window.addEventListener("focus", refreshReadiness);
    document.addEventListener("visibilitychange", refreshReadiness);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", refreshReadiness);
      document.removeEventListener("visibilitychange", refreshReadiness);
    };
  }, [loadReadiness, step]);

  const networks = status?.networks ?? [];
  const ssid = selectedSsid === "__manual" ? manualSsid.trim() : selectedSsid;
  const selectedNetwork = networks.find(
    network => network.ssid === selectedSsid,
  );
  const isLocalPreview = status?.supported === false;
  const localHostname = isLocalPreview
    ? "rosehub.local"
    : status?.hostname
      ? status.hostname.endsWith(".local")
        ? status.hostname
        : `${status.hostname}.local`
      : "rosehub.local";
  const needsPassword =
    selectedSsid === "__manual" ||
    (selectedNetwork?.security !== "Open" && selectedNetwork !== undefined);
  const wifiComplete =
    status?.hotspotActive === false && Boolean(status.connectionName);
  const hasPendingDownloads = readiness?.hasPendingDownloads === true;
  const offlineReady = readiness?.ready === true && !hasPendingDownloads;
  const currentStepIndex = setupSteps.findIndex(item => item.id === step);
  const isHubLinked = pairing?.claimed === true;
  const useStandaloneHubStatus = false;
  const showHubStatus =
    useStandaloneHubStatus && isHubLinked && !showDeviceSetup;

  const getRecommendedSetupStep = useCallback((): SetupStep => {
    if (!wifiComplete) return "wifi";
    if (!isHubLinked) return "account";
    if (!offlineReady) return "content";
    return "ready";
  }, [isHubLinked, offlineReady, wifiComplete]);

  useEffect(() => {
    if (hasUserNavigatedRef.current) return;
    if (!isHubLinked || isPairingLoading || isReadinessLoading) return;
    if (step === "welcome" || (step === "ready" && !offlineReady)) {
      changeStep(getRecommendedSetupStep());
    }
  }, [
    changeStep,
    isHubLinked,
    isPairingLoading,
    isReadinessLoading,
    offlineReady,
    getRecommendedSetupStep,
    step,
  ]);

  function beginSetup() {
    changeStep(getRecommendedSetupStep());
  }

  async function handleWifiSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);

    if (!ssid) {
      setError(t("setup.chooseWifi"));
      return;
    }

    setIsConnecting(true);

    try {
      const response = await fetch("/api/setup/wifi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ssid,
          password,
          hidden: selectedSsid === "__manual",
        }),
      });
      const result = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error ?? t("setup.unableWifi"));
      }

      setMessage(
        tr("setup.wifiSwitching", {
          ssid,
          url: `http://${localHostname}/setup`,
        }),
      );
    } catch (connectError) {
      if (connectError instanceof TypeError) {
        setMessage(
          tr("setup.networkDisconnected", {
            ssid,
            url: `http://${localHostname}/setup`,
          }),
        );
      } else {
        setError(
          connectError instanceof Error
            ? connectError.message
            : t("setup.unableWifi"),
        );
      }
    } finally {
      setIsConnecting(false);
    }
  }

  async function syncContent() {
    setIsSyncing(true);
    setSyncError(null);
    setSyncMessage(t("setup.downloadStarting"));

    try {
      const response = await fetch("/api/sync", { cache: "no-store" });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || result.ok !== true) {
        throw new Error(result.message ?? t("setup.contentSyncFailed"));
      }

      setSyncMessage(null);
      await loadReadiness();
    } catch (syncError) {
      setSyncMessage(null);
      setSyncError(
        syncError instanceof Error ? syncError.message : t("setup.unableSync"),
      );
    } finally {
      setIsSyncing(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.brandRow}>
          <div className={styles.brandIdentity}>
            <div className={styles.logoMark}>
              <Image src={RoseLogo} alt="" unoptimized />
            </div>
            <div>
              <div className={styles.eyebrow}>{t("setup.brand")}</div>
              <div className={styles.brandTitle}>{t("setup.title")}</div>
            </div>
          </div>
          <div className={styles.headerActions}>
            <LanguageSelector />
            {!showHubStatus && (
              <span className={styles.stepCount}>
                {tr("setup.stepCount", {
                  current: currentStepIndex + 1,
                  total: setupSteps.length,
                })}
              </span>
            )}
          </div>
        </div>

        {showHubStatus ? (
          <div className={styles.hubStatusPanel}>
            <div className={styles.hubStatusHeader}>
              <div>
                <div className={styles.eyebrow}>{t("setup.deviceSetup")}</div>
                <h1>{t("setup.hubStatusTitle")}</h1>
                <p className={styles.intro}>{t("setup.hubStatusIntro")}</p>
              </div>
              <div className={styles.hubStatusBadge}>{t("setup.ready")}</div>
            </div>

            <div className={styles.readinessCard}>
              <div>
                <span>{t("setup.internetSetup")}</span>
                <strong>{internetStatusLabel(status?.connectivity)}</strong>
              </div>
              <div>
                <span>{t("setup.educatorAccount")}</span>
                <strong>
                  {formatLinkedEducator(
                    pairing,
                    t("setup.educatorAccountFallback"),
                  )}
                </strong>
              </div>
              <div>
                <span>{t("setup.offlineLibrary")}</span>
                <strong>
                  {pluralize(
                    readiness?.groups ?? 0,
                    "setup.classroomSingular",
                    "setup.classroomPlural",
                  )}{" "}
                  ·{" "}
                  {pluralize(
                    readiness?.lessons ?? 0,
                    "setup.lessonSingular",
                    "setup.lessonPlural",
                  )}{" "}
                  ·{" "}
                  {pluralize(
                    readiness?.expectedFiles ?? 0,
                    "setup.fileSingular",
                    "setup.filePlural",
                  )}
                </strong>
              </div>
              <div>
                <span>{t("setup.offlineFiles")}</span>
                <strong>
                  {offlineReady ? t("setup.ready") : t("setup.needsAttention")}
                </strong>
              </div>
              <div>
                <span>{t("setup.filesUpdated")}</span>
                <strong>
                  {formatTimestamp(readiness?.lastSuccessfulSync, language) ??
                    t("setup.notAvailable")}
                </strong>
              </div>
              <div>
                <span>{t("setup.studentAddress")}</span>
                <strong>http://rosehub.local/join</strong>
              </div>
              {status?.hotspotName && (
                <div>
                  <span>{t("setup.offlineWifi")}</span>
                  <strong>{status.hotspotName}</strong>
                </div>
              )}
            </div>

            <section className={styles.downloadPanel}>
              <div>
                <h2>{t("setup.downloadPanelTitle")}</h2>
                <p>{t("setup.downloadPanelIntro")}</p>
              </div>

              {isReadinessLoading && !readiness ? (
                <div className={styles.notice}>{t("setup.checkingFiles")}</div>
              ) : hasPendingDownloads ? (
                <div className={styles.notice}>
                  <strong>{t("setup.newFilesReady")}</strong>{" "}
                  {readiness?.pendingLessons === 1
                    ? t("setup.lessonWaitingSingular")
                    : tr("setup.lessonWaitingPlural", {
                        count: readiness?.pendingLessons ?? 0,
                      })}{" "}
                  {t("setup.tapDownload")}
                </div>
              ) : offlineReady ? (
                <div className={styles.success}>
                  <strong>{t("setup.everythingReady")}</strong>{" "}
                  {t("setup.readyExplanation")}
                </div>
              ) : (
                <div className={styles.readinessIssues}>
                  <strong>{t("setup.filesNeedAttention")}</strong>
                  {(readiness?.issues ?? []).map((issue, index) => (
                    <p key={`${issue.type}-${issue.fileName ?? index}`}>
                      {issue.message}
                    </p>
                  ))}
                </div>
              )}

              {syncMessage && (
                <div className={styles.success}>{syncMessage}</div>
              )}
              {syncError && <div className={styles.error}>{syncError}</div>}

              <div className={styles.statusActions}>
                <button
                  type="button"
                  className={styles.utilityButton}
                  onClick={() => void loadReadiness()}
                  disabled={isReadinessLoading || isSyncing}
                >
                  {isReadinessLoading
                    ? t("setup.refreshing")
                    : t("setup.refresh")}
                </button>
                <button
                  type="button"
                  className={styles.downloadButton}
                  onClick={() => void syncContent()}
                  disabled={isSyncing || isReadinessLoading}
                >
                  {isSyncing
                    ? t("setup.downloading")
                    : t("setup.downloadLatest")}
                </button>
              </div>
            </section>

            <div className={styles.statusActions}>
              <Link href="/join" className={styles.finishButton}>
                {t("setup.openClassroomApp")}
              </Link>
              <button
                type="button"
                className={styles.textButton}
                onClick={() => {
                  setShowDeviceSetup(true);
                  changeStep("wifi");
                }}
              >
                {t("setup.changeWifi")}
              </button>
            </div>
          </div>
        ) : (
          <>
            <ol
              className={styles.progress}
              aria-label={t("setup.progressLabel")}
            >
              {setupSteps.map((item, index) => (
                <li
                  key={item.id}
                  className={
                    index === currentStepIndex
                      ? styles.activeStep
                      : index < currentStepIndex
                        ? styles.completeStep
                        : undefined
                  }
                >
                  <span>{index < currentStepIndex ? "✓" : index + 1}</span>
                  <small>{item.label}</small>
                </li>
              ))}
            </ol>

            {step === "welcome" && (
              <div className={`${styles.stepPanel} ${styles.centerPanel}`}>
                <div className={styles.heroIcon}>🌱</div>
                <h1>{t("setup.welcomeTitle")}</h1>
                <p className={styles.intro}>{t("setup.welcomeIntro")}</p>
                <div className={styles.checkList}>
                  <span>{t("setup.checkOneStep")}</span>
                  <span>{t("setup.checkRecognized")}</span>
                  <span>{t("setup.checkSaved")}</span>
                </div>
                <button
                  className={styles.primaryButton}
                  type="button"
                  onClick={beginSetup}
                  disabled={isLoading || isPairingLoading}
                >
                  {isLoading || isPairingLoading
                    ? t("setup.checkingHub")
                    : t("setup.begin")}
                </button>
              </div>
            )}

            {step === "wifi" && (
              <div className={styles.stepPanel}>
                <div>
                  <div className={styles.eyebrow}>
                    {t("setup.stepInternet")}
                  </div>
                  <h1>{t("setup.internetTitle")}</h1>
                  <p className={styles.intro}>{t("setup.internetIntro")}</p>
                </div>

                {isLocalPreview ? (
                  <>
                    <div className={styles.notice}>
                      {tr("setup.previewNotice", {
                        url: "http://rosehub.local/setup",
                      })}
                    </div>
                    <div className={styles.statusGrid}>
                      <span>{t("setup.connection")}</span>
                      <strong>{t("setup.previewOnly")}</strong>
                      <span>{t("setup.hubAddress")}</span>
                      <strong>http://rosehub.local</strong>
                    </div>
                    <div className={styles.navigationRow}>
                      <button
                        type="button"
                        className={styles.backButton}
                        onClick={() => changeStep("welcome")}
                      >
                        {t("setup.back")}
                      </button>
                      <button
                        type="button"
                        className={styles.primaryButton}
                        onClick={() => changeStep("account")}
                      >
                        {t("setup.continue")}
                      </button>
                    </div>
                  </>
                ) : wifiComplete ? (
                  <>
                    <div className={styles.success}>
                      {t("setup.connectedTo")}{" "}
                      <strong>
                        {status?.connectionName ?? t("setup.hubNetwork")}
                      </strong>
                      .
                    </div>
                    <div className={styles.statusGrid}>
                      <span>{t("setup.connection")}</span>
                      <strong>
                        {internetStatusLabel(status?.connectivity)}
                      </strong>
                      <span>{t("setup.localAddress")}</span>
                      <strong>http://{localHostname}</strong>
                    </div>
                    <div className={styles.navigationRow}>
                      <button
                        type="button"
                        className={styles.backButton}
                        onClick={() => changeStep("welcome")}
                      >
                        {t("setup.back")}
                      </button>
                      <button
                        type="button"
                        className={styles.primaryButton}
                        onClick={() => changeStep("account")}
                      >
                        {t("setup.continue")}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {status?.lastResult?.status === "failure" && (
                      <div className={styles.error}>
                        {status.lastResult.message}
                      </div>
                    )}
                    {status?.lastResult?.status === "success" && (
                      <div className={styles.success}>
                        {tr("setup.connectedSuccessfully", {
                          message: status.lastResult.message,
                        })}
                      </div>
                    )}

                    {status?.supported === false ? (
                      <div className={styles.notice}>
                        {t("setup.wifiHubOnly")}
                      </div>
                    ) : (
                      <form onSubmit={handleWifiSubmit} className={styles.form}>
                        <label htmlFor="network">
                          {t("setup.wifiNetwork")}
                        </label>
                        <div className={styles.row}>
                          <select
                            id="network"
                            value={selectedSsid}
                            onChange={event => {
                              setSelectedSsid(event.target.value);
                              setPassword("");
                            }}
                            disabled={isLoading || isConnecting}
                          >
                            <option value="">
                              {isLoading
                                ? t("setup.searching")
                                : t("setup.selectNetwork")}
                            </option>
                            {networks.map(network => (
                              <option key={network.ssid} value={network.ssid}>
                                {network.ssid} · {signalLabel(network.signal)}
                                {network.active
                                  ? ` · ${t("setup.connected")}`
                                  : ""}
                              </option>
                            ))}
                            <option value="__manual">
                              {t("setup.enterNetworkManually")}
                            </option>
                          </select>
                          <button
                            type="button"
                            className={styles.secondaryButton}
                            onClick={() => void loadNetworks()}
                            disabled={isLoading || isConnecting}
                          >
                            {t("setup.refresh")}
                          </button>
                        </div>

                        {selectedSsid === "__manual" && (
                          <div className={styles.field}>
                            <label htmlFor="manualSsid">
                              {t("setup.networkName")}
                            </label>
                            <input
                              id="manualSsid"
                              value={manualSsid}
                              onChange={event =>
                                setManualSsid(event.target.value)
                              }
                              autoComplete="off"
                              maxLength={32}
                              disabled={isConnecting}
                            />
                          </div>
                        )}

                        {needsPassword && (
                          <div className={styles.field}>
                            <label htmlFor="password">
                              {t("setup.wifiPassword")}
                            </label>
                            <div className={styles.passwordField}>
                              <input
                                id="password"
                                className={styles.passwordInput}
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={event =>
                                  setPassword(event.target.value)
                                }
                                autoComplete="new-password"
                                disabled={isConnecting}
                              />
                              <button
                                type="button"
                                className={styles.passwordToggle}
                                aria-label={
                                  showPassword
                                    ? "Hide password"
                                    : "Show password"
                                }
                                aria-pressed={showPassword}
                                onClick={() => setShowPassword(value => !value)}
                                disabled={isConnecting}
                              >
                                {showPassword ? (
                                  <svg
                                    aria-hidden="true"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      d="M3 3L21 21"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M10.6 10.6A2 2 0 0 0 13.4 13.4"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M9.5 5.3A9.9 9.9 0 0 1 12 5C17.5 5 21 12 21 12A16 16 0 0 1 18.8 15.2"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M6.4 6.7C4.2 8.2 3 12 3 12S6.5 19 12 19C13.4 19 14.7 18.6 15.8 18"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    aria-hidden="true"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      d="M3 12S6.5 5 12 5S21 12 21 12S17.5 19 12 19S3 12 3 12Z"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M12 15A3 3 0 1 0 12 9A3 3 0 0 0 12 15Z"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                    />
                                  </svg>
                                )}
                              </button>
                            </div>
                          </div>
                        )}

                        {error && <div className={styles.error}>{error}</div>}
                        {message && (
                          <div className={styles.success}>{message}</div>
                        )}

                        <button
                          className={styles.primaryButton}
                          type="submit"
                          disabled={
                            !ssid ||
                            isConnecting ||
                            status?.hotspotActive !== true
                          }
                        >
                          {isConnecting
                            ? t("setup.connecting")
                            : t("setup.connectHub")}
                        </button>
                      </form>
                    )}
                  </>
                )}
              </div>
            )}

            {step === "account" && (
              <div className={styles.stepPanel}>
                <div>
                  <div className={styles.eyebrow}>{t("setup.stepAccount")}</div>
                  <h1>{t("setup.accountTitle")}</h1>
                  <p className={styles.intro}>{t("setup.accountIntro")}</p>
                </div>

                {isPairingLoading && !pairing ? (
                  <div className={styles.notice}>
                    {t("setup.checkingAccount")}
                  </div>
                ) : pairing?.claimed ? (
                  <div className={styles.accountStatusRow}>
                    <div className={styles.success}>
                      {t("setup.alreadyLinked")}{" "}
                      <strong>
                        {formatLinkedEducator(
                          pairing,
                          t("setup.educatorAccountFallback"),
                        )}
                      </strong>
                    </div>
                    <button
                      type="button"
                      className={styles.utilityButton}
                      onClick={() => void loadPairing()}
                      disabled={isPairingLoading}
                    >
                      {isPairingLoading
                        ? t("setup.checking")
                        : t("setup.checkStatus")}
                    </button>
                  </div>
                ) : pairing ? (
                  <>
                    <p className={styles.statusHint}>{t("setup.enterCode")}</p>
                    <div className={styles.pairingCode}>
                      {pairing.pairingCode}
                    </div>
                    <div className={styles.accountStatusRow}>
                      <p className={styles.statusHint}>
                        {t("setup.afterLink")}
                      </p>
                      <button
                        type="button"
                        className={styles.utilityButton}
                        onClick={() => void loadPairing()}
                        disabled={isPairingLoading}
                      >
                        {isPairingLoading
                          ? t("setup.checking")
                          : t("setup.checkStatus")}
                      </button>
                    </div>
                  </>
                ) : null}

                {pairingError && (
                  <div className={styles.error}>
                    {pairingError} {t("setup.tryInternet")}
                  </div>
                )}

                <div className={styles.navigationRow}>
                  <button
                    type="button"
                    className={styles.backButton}
                    onClick={() => changeStep("wifi")}
                  >
                    {t("setup.back")}
                  </button>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={() => changeStep("content")}
                    disabled={!pairing?.claimed}
                  >
                    {t("setup.continue")}
                  </button>
                </div>
              </div>
            )}

            {step === "content" && (
              <div className={styles.stepPanel}>
                <div>
                  <div className={styles.eyebrow}>{t("setup.stepContent")}</div>
                  <h1>{t("setup.contentTitle")}</h1>
                  <p className={styles.intro}>{t("setup.contentIntro")}</p>
                </div>

                <div className={styles.summaryGrid}>
                  <div>
                    <strong>{readiness?.groups ?? 0}</strong>
                    <span>{t("setup.classrooms")}</span>
                  </div>
                  <div>
                    <strong>{readiness?.lessons ?? 0}</strong>
                    <span>{t("setup.lessons")}</span>
                  </div>
                  <div>
                    <strong>{readiness?.expectedFiles ?? 0}</strong>
                    <span>{t("setup.files")}</span>
                  </div>
                </div>

                {isReadinessLoading && !readiness ? (
                  <div className={styles.notice}>
                    {t("setup.checkingFiles")}
                  </div>
                ) : hasPendingDownloads ? (
                  <div className={styles.notice}>
                    <strong>{t("setup.newFilesReady")}</strong>{" "}
                    {readiness?.pendingLessons === 1
                      ? t("setup.lessonWaitingSingular")
                      : tr("setup.lessonWaitingPlural", {
                          count: readiness?.pendingLessons ?? 0,
                        })}{" "}
                    {t("setup.tapDownload")}
                  </div>
                ) : offlineReady ? (
                  <div className={styles.success}>
                    <strong>{t("setup.everythingReady")}</strong>{" "}
                    {t("setup.readyExplanation")}
                  </div>
                ) : (
                  <div className={styles.readinessIssues}>
                    <strong>{t("setup.filesNeedAttention")}</strong>
                    {(readiness?.issues ?? []).map((issue, index) => (
                      <p key={`${issue.type}-${issue.fileName ?? index}`}>
                        {issue.message}
                      </p>
                    ))}
                  </div>
                )}

                {syncMessage && (
                  <div className={styles.success}>{syncMessage}</div>
                )}
                {syncError && <div className={styles.error}>{syncError}</div>}

                <div className={styles.contentActionRow}>
                  <p className={styles.lastChecked}>
                    {t("setup.filesLastUpdated")}{" "}
                    <strong>
                      {formatTimestamp(
                        readiness?.lastSuccessfulSync,
                        language,
                      ) ?? t("setup.notAvailable")}
                    </strong>
                  </p>

                  <div className={styles.contentActions}>
                    <button
                      type="button"
                      className={styles.utilityButton}
                      onClick={() => void loadReadiness()}
                      disabled={isReadinessLoading || isSyncing}
                    >
                      {isReadinessLoading
                        ? t("setup.refreshing")
                        : t("setup.refresh")}
                    </button>
                    <button
                      type="button"
                      className={styles.downloadButton}
                      onClick={() => void syncContent()}
                      disabled={
                        isSyncing || isReadinessLoading || !pairing?.claimed
                      }
                    >
                      {isSyncing
                        ? t("setup.downloading")
                        : t("setup.downloadLatest")}
                    </button>
                  </div>
                </div>

                <div className={styles.navigationRow}>
                  <button
                    type="button"
                    className={styles.backButton}
                    onClick={() => changeStep("account")}
                  >
                    {t("setup.back")}
                  </button>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={() => changeStep("ready")}
                    disabled={!offlineReady || isSyncing}
                  >
                    {t("setup.continue")}
                  </button>
                </div>
              </div>
            )}

            {step === "ready" && (
              <div className={`${styles.stepPanel} ${styles.centerPanel}`}>
                <div className={styles.heroIcon}>✓</div>
                <h1>{t("setup.readyTitle")}</h1>
                <p className={styles.intro}>{t("setup.readyIntro")}</p>

                <div className={styles.readinessCard}>
                  <div>
                    <span>{t("setup.internetSetup")}</span>
                    <strong>{t("setup.complete")}</strong>
                  </div>
                  <div>
                    <span>{t("setup.educatorAccount")}</span>
                    <strong>
                      {pairing?.claimed
                        ? formatLinkedEducator(
                            pairing,
                            t("setup.educatorAccountFallback"),
                          )
                        : t("setup.needsAttention")}
                    </strong>
                  </div>
                  <div>
                    <span>{t("setup.offlineLibrary")}</span>
                    <strong>
                      {pluralize(
                        readiness?.groups ?? 0,
                        "setup.classroomSingular",
                        "setup.classroomPlural",
                      )}{" "}
                      ·{" "}
                      {pluralize(
                        readiness?.lessons ?? 0,
                        "setup.lessonSingular",
                        "setup.lessonPlural",
                      )}{" "}
                      ·{" "}
                      {pluralize(
                        readiness?.expectedFiles ?? 0,
                        "setup.fileSingular",
                        "setup.filePlural",
                      )}
                    </strong>
                  </div>
                  <div>
                    <span>{t("setup.offlineFiles")}</span>
                    <strong>
                      {offlineReady
                        ? t("setup.ready")
                        : t("setup.needsAttention")}
                    </strong>
                  </div>
                  <div>
                    <span>{t("setup.filesUpdated")}</span>
                    <strong>
                      {formatTimestamp(
                        readiness?.lastSuccessfulSync,
                        language,
                      ) ?? t("setup.notAvailable")}
                    </strong>
                  </div>
                  <div>
                    <span>{t("setup.studentAddress")}</span>
                    <strong>http://rosehub.local/join</strong>
                  </div>
                  {status?.hotspotName && (
                    <div>
                      <span>{t("setup.offlineWifi")}</span>
                      <strong>{status.hotspotName}</strong>
                    </div>
                  )}
                </div>

                {!offlineReady && (
                  <div className={styles.error}>{t("setup.notComplete")}</div>
                )}

                <section className={styles.downloadPanel}>
                  <div>
                    <h2>{t("setup.downloadPanelTitle")}</h2>
                    <p>{t("setup.downloadPanelIntro")}</p>
                  </div>

                  {isReadinessLoading && !readiness ? (
                    <div className={styles.notice}>
                      {t("setup.checkingFiles")}
                    </div>
                  ) : hasPendingDownloads ? (
                    <div className={styles.notice}>
                      <strong>{t("setup.newFilesReady")}</strong>{" "}
                      {readiness?.pendingLessons === 1
                        ? t("setup.lessonWaitingSingular")
                        : tr("setup.lessonWaitingPlural", {
                            count: readiness?.pendingLessons ?? 0,
                          })}{" "}
                      {t("setup.tapDownload")}
                    </div>
                  ) : offlineReady ? (
                    <div className={styles.success}>
                      <strong>{t("setup.everythingReady")}</strong>{" "}
                      {t("setup.readyExplanation")}
                    </div>
                  ) : (
                    <div className={styles.readinessIssues}>
                      <strong>{t("setup.filesNeedAttention")}</strong>
                      {(readiness?.issues ?? []).map((issue, index) => (
                        <p key={`${issue.type}-${issue.fileName ?? index}`}>
                          {issue.message}
                        </p>
                      ))}
                    </div>
                  )}

                  {syncMessage && (
                    <div className={styles.success}>{syncMessage}</div>
                  )}
                  {syncError && <div className={styles.error}>{syncError}</div>}

                  <div className={styles.statusActions}>
                    <button
                      type="button"
                      className={styles.utilityButton}
                      onClick={() => void loadReadiness()}
                      disabled={isReadinessLoading || isSyncing}
                    >
                      {isReadinessLoading
                        ? t("setup.refreshing")
                        : t("setup.refresh")}
                    </button>
                    <button
                      type="button"
                      className={styles.downloadButton}
                      onClick={() => void syncContent()}
                      disabled={isSyncing || isReadinessLoading}
                    >
                      {isSyncing
                        ? t("setup.downloading")
                        : t("setup.downloadLatest")}
                    </button>
                  </div>
                </section>

                <div className={styles.statusActions}>
                  <Link href="/join" className={styles.finishButton}>
                    {t("setup.openClassroomApp")}
                  </Link>
                  <button
                    type="button"
                    className={styles.textButton}
                    onClick={() => changeStep("wifi")}
                  >
                    {t("setup.changeWifi")}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
