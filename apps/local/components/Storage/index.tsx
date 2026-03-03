"use client";

import { IconSvgs } from "@/lib/icons";
import {
  Card,
  Content,
  IconWrapper,
  StatusText,
  StorageInfo,
  Title,
} from "./styles";

export default function Storage() {
  return (
    <Card>
      <IconWrapper>{IconSvgs.storage}</IconWrapper>
      <Content>
        <Title>Pi Storage</Title>
        <StorageInfo>
          <StatusText>19 GB of 64 GB Used</StatusText>
          <StatusText>30% used</StatusText>
        </StorageInfo>
      </Content>
    </Card>
  );
}
