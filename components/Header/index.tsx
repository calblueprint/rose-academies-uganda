"use client";

import React from "react";
import { HeaderBar, Left, Logo, Right, TeamName } from "./styles";

export default function Header() {
  return (
    <HeaderBar>
      <Left>
        <Logo />
        <TeamName>Rose Academies Uganda</TeamName>
      </Left>
      <Right></Right>
    </HeaderBar>
  );
}
