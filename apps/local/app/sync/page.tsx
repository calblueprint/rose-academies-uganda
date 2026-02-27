"use client";

import SyncButton from "@/components/SyncButton";
import { Card, Header, Outer, Subtitle, Title } from "./style";

export default function SyncPage() {
  return (
    <Outer>
      <Card>
        <Header>
          <Title>Sync Lessons</Title>
          <Subtitle>
            Manage lesson synchronization with the Raspberry Pi
          </Subtitle>
        </Header>
        <SyncButton />
      </Card>
    </Outer>
  );
}
