"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, Helper, Input, Logo, Outer, PrimaryLink, Title } from "./style";

export default function JoinPage() {
  const router = useRouter();
  return (
    <Outer>
      <Card>
        <Logo />
        <Title>Join Your Class</Title>
        <Helper>Enter the join code provided by your instructor</Helper>
        <Input id="joinCode" name="joinCode" placeholder="Enter Code" />
        <PrimaryLink as="button" onClick={() => router.push("/lessons")}>
          Join
        </PrimaryLink>
      </Card>
    </Outer>
  );
}
