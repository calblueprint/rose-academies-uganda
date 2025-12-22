"use client";

import React from "react";
import Icon from "@/components/Icon";
import { IconType } from "@/lib/icons";
import {
  ActionIcon,
  ActionText,
  ActionTextContainer,
  StyledActionButton,
} from "./styles";

interface ActionButtonProps {
  onClick?: () => void;
  backgroundColor: string;
  textColor: string;
  iconColor?: string;
  iconType: IconType;
  iconSize?: string;
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  title?: string;
  animationDuration?: string;
  borderColor?: string;
}

export default function ActionButton({
  onClick,
  backgroundColor,
  textColor,
  iconColor,
  iconType,
  iconSize = "1.25rem",
  text,
  isLoading = false,
  disabled = false,
  title,
  animationDuration = "1.5s",
  borderColor,
}: ActionButtonProps) {
  return (
    <StyledActionButton
      onClick={onClick}
      $backgroundColor={backgroundColor}
      $textColor={textColor}
      disabled={disabled}
      title={title}
      $borderColor={borderColor}
    >
      <ActionIcon
        $iconColor={iconColor || textColor}
        $iconSize={iconSize}
        $isLoading={isLoading}
        $animationDuration={animationDuration}
      >
        <Icon type={iconType} />
      </ActionIcon>
      <ActionTextContainer>
        <ActionText>{text}</ActionText>
      </ActionTextContainer>
    </StyledActionButton>
  );
}
