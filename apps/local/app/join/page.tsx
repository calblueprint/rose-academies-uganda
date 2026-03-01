"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RoseLogo from "@/assets/images/rose-academies-logo.png";
import { DataContext } from "@/context/DataContext";
import { Group } from "@/types/schema";
import {
  AdminLink,
  Card,
  CodeInput,
  CodeInputSection,
  CodeSection,
  ErrorMessage,
  HeaderSection,
  Helper,
  JoinButton,
  LogoContainer,
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

  function handleJoin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    const group = groups.find(
      g => g.join_code.toLowerCase() === joinCode.toLowerCase(),
    );
    const groupId = group ? group.id : null;

    if (!joinCode || !groupId) {
      setError("Invalid code");
      return;
    }

    // If the join code is valid, navigate to the main app page
    router.push(`/groups/${groupId}/lessons`);
    setError("");
    setJoinCode("");
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Outer>
      <Card>
        <HeaderSection>
          <LogoContainer>
            <Image src={RoseLogo} alt="Rose Academies Logo" />
          </LogoContainer>
          <Title>Join Your Class</Title>
          <Helper>Enter the join code provided by your instructor</Helper>
        </HeaderSection>
        <CodeSection>
          <CodeInputSection>
            <CodeInput
              id="joinCode"
              name="joinCode"
              placeholder="Code"
              onChange={e => setJoinCode(e.target.value)}
              $error={error !== ""}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </CodeInputSection>
          <JoinButton onClick={e => handleJoin(e)}>Join</JoinButton>
        </CodeSection>
        <Helper>
          Need to sync?{" "}
          <AdminLink type="button" onClick={() => router.push("/sync")}>
            Join as administrator
          </AdminLink>
        </Helper>
      </Card>
    </Outer>
  );
}
