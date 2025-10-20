"use client";

import React from "react";
import Link from "next/link";
import { Card, Helper, Input, Logo, Outer, PrimaryLink, Title } from "./style";

export default function JoinPage() {
  return (
    <Outer>
      <Card>
        <Logo />
        <Title>Join Your Class</Title>
        <Helper>Enter the join code provided by your instructor</Helper>
        <Input id="joinCode" name="joinCode" placeholder="Enter Code" />
        <Link href="/lessons" passHref>
          <PrimaryLink>Join</PrimaryLink>
        </Link>
      </Card>
    </Outer>
  );
}
