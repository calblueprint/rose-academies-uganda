"use client";

import React, { useEffect, useState } from "react";
import ActionButton from "@/components/ActionButton";
import COLORS from "@/styles/colors";

export default function OperationalButton() {
  const [isOperational, setIsOperational] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkStatus = async () => {
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
    } catch (error) {
      console.error("Failed to check operational status:", error);
      await minLoadingTime;
      setIsOperational(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();

    // poll status every 30 seconds
    const interval = setInterval(checkStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  // Determine button appearance based on operational state

  const backgroundColor =
    isOperational === null
      ? COLORS.lightGrey
      : isOperational
        ? COLORS.lightGreen
        : COLORS.rose10;

  const textColor =
    isOperational === false ? COLORS.rose80 : COLORS.activeGreen;

  const iconType = isLoading ? "refresh" : isOperational ? "check" : "error";

  const iconSize = isOperational === false ? "1.5rem" : "1.25rem";

  const text = isOperational === false ? "Inactive" : "Active";

  return (
    <ActionButton
      onClick={() => checkStatus()}
      backgroundColor={backgroundColor}
      textColor={textColor}
      iconColor={textColor}
      iconType={iconType}
      iconSize={iconSize}
      text={text}
      isLoading={isLoading}
      disabled={isLoading}
      title="Click to refresh status"
      animationDuration="1.5s"
    />
  );
}
