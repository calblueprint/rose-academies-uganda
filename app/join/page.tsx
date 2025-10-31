"use client";

import React from "react";
import { Card, Helper, Input, Logo, Outer, PrimaryLink, Title } from "./style";

export default function JoinPage() {
  return (
    <Outer>
      <Card>
        <Logo />
        <Title>Join Your Class</Title>
        <Helper>Enter the join code provided by your instructor</Helper>
        <Input id="joinCode" name="joinCode" placeholder="Enter Code" />
        <PrimaryLink href="/lessons">Join</PrimaryLink>
      </Card>
    </Outer>
  );
}
