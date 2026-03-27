"use client";

import LastSynced from "@/components/LastSynced";
import Storage from "@/components/Storage";
import SyncButton from "@/components/SyncButton";
import WifiStatus from "@/components/WifiStatus";
import {
  Cards,
  Header,
  Outer,
  Subtitle,
  SyncCard,
  Title,
  Wrapper,
} from "./style";

export default function SyncPage() {
  return (
    <Outer>
      <Cards>
        <SyncCard>
          <Header>
            <Title>Sync Lessons</Title>
            <Subtitle>
              Manage lesson synchronization with the Raspberry Pi
            </Subtitle>
          </Header>
          <SyncButton />
        </SyncCard>
        <Wrapper>
          <WifiStatus />
          <LastSynced />
        </Wrapper>
        <Storage />
      </Cards>
    </Outer>
  );
}
