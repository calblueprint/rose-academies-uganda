"use client";

import { IconSvgs } from "@/lib/icons";
import { Card, Content, IconWrapper, StatusText, Title } from "./styles";

export default function Storage() {
  return (
    <Card>
      <IconWrapper>{IconSvgs.storage}</IconWrapper>

      <Content>
        <Title>Pi Storage</Title>
        <StatusText>Feb 1, 12:00 pm.</StatusText>
      </Content>
    </Card>
  );
}
