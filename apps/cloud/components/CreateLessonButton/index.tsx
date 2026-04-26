"use client";

import React from "react";
import { IconSvgs } from "@/lib/icons";
import { Button, Label } from "./styles";

type Props = {
  onClick: () => void;
};

export default function CreateButton({ onClick }: Props) {
  return (
    <Button type="button" onClick={onClick}>
      {IconSvgs.plus}
      <Label>Create Lesson</Label>
    </Button>
  );
}
