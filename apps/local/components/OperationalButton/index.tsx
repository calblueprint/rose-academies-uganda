"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ActionButton from "@/components/ActionButton";
import { useLanguage } from "@/lib/i18n";
import COLORS from "@/styles/colors";

export default function OperationalButton() {
  const { t } = useLanguage();
  const [isOperational, setIsOperational] = useState<boolean | null>(false);
  const [statusMessage, setStatusMessage] = useState(
    t("header.checkingConnection"),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const isCheckingRef = useRef(false);

  const checkStatus = useCallback(async () => {
    // Guard: prevent concurrent status checks
    if (isCheckingRef.current) {
      return;
    }

    isCheckingRef.current = true;
    setIsLoading(true);

    // minimum loading time promise (1 second)
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const response = await fetch("/api/status");
      const data = await response.json();

      // Log debug info to help troubleshoot
      console.log("WiFi Status Check:", data);

      // Wait for minimum loading time before updating
      await minLoadingTime;

      setIsOperational(data.operational);
      setStatusMessage(data.message ?? t("header.connectedToHub"));
    } catch (error) {
      console.error("Failed to check operational status:", error);
      await minLoadingTime;
      setIsOperational(false);
      setStatusMessage(t("header.unableToReachHub"));
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
      isCheckingRef.current = false;
    }
  }, [t]);

  useEffect(() => {
    checkStatus();

    // poll status every 30 seconds
    const interval = setInterval(checkStatus, 30000);

    return () => clearInterval(interval);
  }, [checkStatus]);

  // Determine button appearance based on operational state

  const backgroundColor =
    isOperational === null
      ? COLORS.green10
      : isOperational
        ? COLORS.green10
        : COLORS.rose10;

  const textColor =
    isOperational === false ? COLORS.rose80 : COLORS.activeGreen;

  const iconType =
    isLoading && !isInitialLoad ? "refresh" : isOperational ? "check" : "error";

  const iconSize = isOperational === false ? "1.5rem" : "1.25rem";

  const text =
    isOperational === false ? t("header.notConnected") : t("header.connected");

  return (
    <ActionButton
      onClick={() => checkStatus()}
      backgroundColor={backgroundColor}
      textColor={textColor}
      iconColor={textColor}
      iconType={iconType}
      iconSize={iconSize}
      text={text}
      isLoading={isLoading && !isInitialLoad}
      disabled={isLoading}
      title={statusMessage}
      animationDuration="1s"
    />
  );
}
