"use client";

import { IconSvgs } from "@/lib/icons";
import { Card, Content, IconWrapper, StatusText, Title } from "./style";

export default function LastSynced() {
  return (
    <Card>
      <IconWrapper>{IconSvgs.clock}</IconWrapper>
      <Content>
        <Title>Last Synced</Title>
        <StatusText>Mar 2, 12:00 pm.</StatusText>
      </Content>
    </Card>
  );
}
