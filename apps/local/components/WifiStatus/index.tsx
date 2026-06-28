"use client";

import { IconSvgs } from "@/lib/icons";
import { Card, Content, IconWrapper, StatusText, Title } from "./style";

export default function WifiStatus() {
  return (
    <Card>
      <IconWrapper>{IconSvgs.wifi}</IconWrapper>
      <Content>
        <Title>Classroom Hub Wi-Fi</Title>
        <StatusText>Broadcasting</StatusText>
      </Content>
    </Card>
  );
}
