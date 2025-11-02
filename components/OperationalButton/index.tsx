"use client";

import React, { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import {
  StatusButton,
  StatusContainer,
  StatusIcon,
  StatusText,
} from "./styles";

export default function OperationalButton() {
  const [isOperational, setIsOperational] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkStatus = async () => {
    setIsLoading(true);

    // Create a minimum loading time promise (1 second)
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
    // Check status on mount
    checkStatus();

    // Poll status every 30 seconds
    const interval = setInterval(checkStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    checkStatus();
  };

  return (
    <StatusButton
      onClick={handleClick}
      $isOperational={isOperational}
      disabled={isLoading}
      title="Click to refresh status"
    >
      <StatusIcon $isOperational={isOperational}>
        {isLoading ? (
          <Icon type="refresh" />
        ) : isOperational ? (
          <Icon type="check" />
        ) : (
          <Icon type="close" />
        )}
      </StatusIcon>
      <StatusContainer>
        <StatusText>Operational</StatusText>
      </StatusContainer>
    </StatusButton>
  );
}
