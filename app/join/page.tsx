"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SyncButton from "@/components/SyncButton";
import { DataContext } from "@/context/DataContext";
import { Group } from "@/types/schema";
import {
  Card,
  CodeInput,
  CodeInputSection,
  CodeSection,
  ErrorMessage,
  HeaderSection,
  Helper,
  JoinButton,
  Logo,
  Outer,
  Title,
} from "./style";

export default function JoinPage() {
  const router = useRouter();
  const [joinCode, setJoinCode] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState("");
  const data = useContext(DataContext);

  useEffect(() => {
    function fetchGroups() {
      if (data) {
        setGroups(data.groups);
      }
    }
    fetchGroups();
  }, [data]);

  const joinCodes = groups.map(group => group.join_code);

  function handleJoin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (!joinCode || !joinCodes.includes(joinCode)) {
      setError("Invalid code");
      return;
    }
    const groupId = groups.filter(group => group.join_code === joinCode)[0].id;

    // If the join code is valid, navigate to the main app page
    router.push("/lessons/" + groupId);
    setError("");
    setJoinCode("");
  }

  return (
    <Outer>
      <Card>
        <HeaderSection>
          <Logo />
          <Title>Join Your Class</Title>
          <Helper>Enter the join code provided by your instructor</Helper>
        </HeaderSection>
        <CodeSection>
          <CodeInputSection>
            <CodeInput
              id="joinCode"
              name="joinCode"
              placeholder="Enter Code"
              onChange={e => setJoinCode(e.target.value)}
              $error={error !== ""}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </CodeInputSection>
          <JoinButton onClick={e => handleJoin(e)}>Join</JoinButton>
        </CodeSection>
      </Card>
    </Outer>
  );
}
